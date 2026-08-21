"use client";

import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext({
  socket: null,
  isConnected: false,
  latestNotification: null,
  unreadCount: 0,
  setUnreadCount: () => {},
  subscribe: () => () => {},
});

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "https://api.humanova.live";

export function SocketProvider({ children }) {
  const { token, user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [latestNotification, setLatestNotification] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const socketRef = useRef(null);
  const listenersRef = useRef(new Map());

  // Subscribe to custom event names dynamically
  const subscribe = useCallback((eventName, callback) => {
    if (!listenersRef.current.has(eventName)) {
      listenersRef.current.set(eventName, new Set());
    }
    listenersRef.current.get(eventName).add(callback);

    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
    }

    return () => {
      const set = listenersRef.current.get(eventName);
      if (set) {
        set.delete(callback);
        if (set.size === 0) listenersRef.current.delete(eventName);
      }
      if (socketRef.current) {
        socketRef.current.off(eventName, callback);
      }
    };
  }, []);

  useEffect(() => {
    if (!token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setIsConnected(false);
      return;
    }

    const userType = user?.role || user?.userType || user?.type || "student";

    console.log("🔌 Initializing Socket.io connection to:", SOCKET_URL, "with userType:", userType);

    const socketInstance = io(SOCKET_URL, {
      auth: {
        token: token,
        Bearer: token,
        authorization: `Bearer ${token}`,
        userType: userType,
        user_type: userType,
        role: userType,
      },
      query: {
        token: token,
        userType: userType,
        user_type: userType,
        role: userType,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      secure: true,
      rejectUnauthorized: false,
    });

    socketRef.current = socketInstance;

    socketInstance.on("connect", () => {
      console.log("🟢 [Socket.io] Connected successfully! Socket ID:", socketInstance.id);
      setIsConnected(true);

      // Emit initial requests to server over socket
      socketInstance.emit("get_unread_count");
      socketInstance.emit("get_notifications");
    });

    socketInstance.on("connect_error", (err) => {
      console.warn("⚠️ [Socket.io] Connection error / fallback:", err?.message || err);
      setIsConnected(false);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("🟡 [Socket.io] Disconnected:", reason);
      setIsConnected(false);
    });

    // Listen for notification events
    const handleNotification = (data) => {
      console.log("📩 [Socket.io] Real-Time Notification Pushed:", data);
      if (data) {
        setLatestNotification(data);
        setUnreadCount((prev) => prev + 1);
      }
    };

    const handleUnreadCount = (data) => {
      console.log("📩 [Socket.io] Real-Time Unread Count Pushed:", data);
      const count = typeof data === "number" ? data : (data?.count ?? data?.unreadCount ?? 0);
      setUnreadCount(count);
    };

    socketInstance.on("notification", handleNotification);
    socketInstance.on("NEW_NOTIFICATION", handleNotification);
    socketInstance.on("new_notification", handleNotification);
    socketInstance.on("notify", handleNotification);
    socketInstance.on("user_notification", handleNotification);
    socketInstance.on("unread_count", handleUnreadCount);
    socketInstance.on("unread-count", handleUnreadCount);

    // Wildcard logger for all events
    socketInstance.onAny((event, ...args) => {
      console.log(`📡 [Socket.io Received Event: "${event}"]`, args);
      const firstArg = args[0];
      if (firstArg && typeof firstArg === "object") {
        if (firstArg.title || firstArg.message || firstArg.content || firstArg.text || firstArg._id) {
          setLatestNotification(firstArg);
        }
      }
    });

    // Re-attach dynamic subscribers
    listenersRef.current.forEach((callbacks, eventName) => {
      callbacks.forEach((cb) => socketInstance.on(eventName, cb));
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        socketRef.current = null;
      }
    };
  }, [token, user]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        latestNotification,
        unreadCount,
        setUnreadCount,
        subscribe,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);

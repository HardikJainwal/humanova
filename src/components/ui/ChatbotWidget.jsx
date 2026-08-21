"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { startWaapiAnimation } from "framer-motion";

export default function ChatbotWidget() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const toggleWidget = () => {
      if (window.Tawk_API) {
        if (isDashboard) {
          if (typeof window.Tawk_API.hideWidget === "function") {
            window.Tawk_API.hideWidget();
          }
        } else {
          if (typeof window.Tawk_API.showWidget === "function") {
            window.Tawk_API.showWidget();
          }
        }
      }
    };
    toggleWidget();

    // Clean event listener approach without infinite setInterval polling
    if (window.Tawk_API) {
      const prevOnLoad = window.Tawk_API.onLoad;
      window.Tawk_API.onLoad = function () {
        if (typeof prevOnLoad === "function") prevOnLoad();
        toggleWidget();
      };
    }
  }, [isDashboard]);

  return (
    <>
      <Script
        id="tawk-to"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API = Tawk_API || {};
            Tawk_API.disablePopup = true;
            Tawk_API.disableMobileAttentionGrabber = true;
            Tawk_API.onLoad = function() {
              if (typeof Tawk_API.minimize === 'function') {
                Tawk_API.minimize();
              }
              if (window.location.pathname.indexOf('/dashboard') === 0) {
                if (typeof Tawk_API.hideWidget === 'function') {
                  Tawk_API.hideWidget();
                }
              }
            };
            var Tawk_LoadStart = new Date();
            (function(){
              var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/6a47a6c3bb890f1d47e70b50/1jsju6rlj';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin', '*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `,
        }}
      />
      {isDashboard && (
        <style jsx global>{`
          #tawk-bubble-container,
          .tawk-min-container,
          .tawk-custom-color,
          .tawk-button,
          div[id*="tawk"],
          iframe[title*="chat"],
          iframe[title*="tawk"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        `}</style>
      )}
    </>
  );
}

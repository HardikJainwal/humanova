"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, Heart, ThumbsUp, Bookmark, Share2, Plus, Users,
  TrendingUp, Award, Clock, ArrowRight, Loader2, Sparkles, Send,
  Trash2, Edit3, X, HelpCircle, CheckCircle2, User, RefreshCw, BookmarkCheck,
  Smile, SmilePlus, Lightbulb, Zap, AlertCircle, AlertTriangle
} from "lucide-react";
import {
  getAllCommunityGroups, joinCommunityGroup, leaveCommunityGroup,
  getCommunityFeed, addPostReaction, votePoll, getTrendingPosts,
  getComments, addComment, editComment, deleteComment, toggleBookmark
} from "@/lib/api";
import Sidebar from "./Sidebar";

// Reaction map details
const REACTION_EMOJIS = {
  "love": "❤️",
  "thumbs-up": "👍",
  "happy": "😊",
  "laughing": "😂",
  "sad": "😢",
};

export default function CommunityPage() {
  const { user, token, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const userId = user?.id || user?._id;

  // Page level state
  const [feedLoading, setFeedLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  // Comment state
  const [activeCommentsPostId, setActiveCommentsPostId] = useState(null);
  const [commentsList, setCommentsList] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [myCommentIds, setMyCommentIds] = useState(new Set());
  const [deletingCommentTarget, setDeletingCommentTarget] = useState(null); // { postId, commentId }
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };
  const [interactionLoading, setInteractionLoading] = useState({});
  const [activeReactionPickerId, setActiveReactionPickerId] = useState(null);

  /* Auth guard */
  useEffect(() => {
    if (!loading && !token) router.push("/login");
  }, [loading, token, router]);

  // Load feed, groups, trending
  const loadFeed = async () => {
    if (!token) return;
    try {
      setFeedLoading(true);
      const data = await getCommunityFeed(token);
      // Backend returns { posts: [...] }
      const items = Array.isArray(data) ? data : (data?.posts || data?.feed || data?.data || []);
      setPosts(items);
    } catch (e) {
      console.error("Failed to load community feed:", e);
    } finally {
      setFeedLoading(false);
    }
  };

  const loadGroups = async () => {
    if (!token) return;
    try {
      setGroupsLoading(true);
      const data = await getAllCommunityGroups(token);
      // Backend returns { results: [...] }
      const items = Array.isArray(data) ? data : (data?.results || data?.groups || data?.data || []);
      setGroups(items);
    } catch (e) {
      console.error("Failed to load community groups:", e);
    } finally {
      setGroupsLoading(false);
    }
  };

  const loadTrending = async () => {
    if (!token) return;
    try {
      setTrendingLoading(true);
      const data = await getTrendingPosts(token);
      // Backend returns { posts: [...] }
      const items = Array.isArray(data) ? data : (data?.posts || data?.trending || data?.data || []);
      setTrending(items);
    } catch (e) {
      console.error("Failed to load trending posts:", e);
    } finally {
      setTrendingLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadFeed();
      loadGroups();
      loadTrending();
    }
  }, [token]);

  // Group join/leave toggle
  const handleGroupAction = async (group) => {
    const isJoined = group.isMember || group.joined || false;
    const groupId = group._id || group.groupCode || group.code;
    if (!groupId || !token) return;

    try {
      if (isJoined) {
        await leaveCommunityGroup(groupId, token);
        showToast(`Left ${group.name} successfully.`, "success");
      } else {
        await joinCommunityGroup(groupId, token);
        showToast(`Joined ${group.name} successfully!`, "success");
      }
      loadGroups();
      loadFeed();
    } catch (err) {
      showToast(err.message || "Failed to process group request", "error");
    }
  };

  // Reactions handler
  const handleReaction = async (postId, reactionType = "love") => {
    if (!token || interactionLoading[postId]) return;
    setInteractionLoading(prev => ({ ...prev, [postId]: true }));
    setActiveReactionPickerId(null);

    try {
      await addPostReaction(postId, reactionType, token);
      
      // Update local state smoothly
      setPosts(prevPosts => 
        prevPosts.map(p => {
          if ((p._id || p.id) === postId) {
            const existingReactions = Array.isArray(p.reaction) ? p.reaction : [];
            const userReactionIdx = existingReactions.findIndex(r => r.studentId === userId);
            
            let updatedReactions = [...existingReactions];
            if (userReactionIdx > -1) {
              const prevType = existingReactions[userReactionIdx].reaction;
              if (prevType === reactionType) {
                // Remove reaction if clicking the same one
                updatedReactions.splice(userReactionIdx, 1);
              } else {
                // Change reaction
                updatedReactions[userReactionIdx] = {
                  ...updatedReactions[userReactionIdx],
                  reaction: reactionType
                };
              }
            } else {
              // Add reaction
              updatedReactions.push({
                studentId: userId,
                reaction: reactionType,
                _id: String(Math.random())
              });
            }

            return {
              ...p,
              reaction: updatedReactions
            };
          }
          return p;
        })
      );
    } catch (err) {
      console.error("Failed to toggle reaction:", err);
    } finally {
      setInteractionLoading(prev => ({ ...prev, [postId]: false }));
    }
  };

  // Bookmark Toggle
  const handleBookmarkToggle = async (postId) => {
    if (!token) return;
    try {
      await toggleBookmark(postId, token);
      
      setPosts(prevPosts => 
        prevPosts.map(p => {
          if ((p._id || p.id) === postId) {
            return {
              ...p,
              isBookmarked: !p.isBookmarked,
              bookmarkCount: (p.bookmarkCount || 0) + (p.isBookmarked ? -1 : 1)
            };
          }
          return p;
        })
      );
    } catch (err) {
      console.error("Failed to toggle bookmark:", err);
    }
  };

  // Vote Poll handler
  const handleVotePoll = async (postId, optionIndex) => {
    if (!token || interactionLoading[postId]) return;
    setInteractionLoading(prev => ({ ...prev, [postId]: true }));

    try {
      await votePoll(postId, optionIndex, token);
      showToast("Vote submitted successfully!", "success");
      loadFeed();
    } catch (err) {
      showToast(err.message || "Failed to submit vote", "error");
    } finally {
      setInteractionLoading(prev => ({ ...prev, [postId]: false }));
    }
  };

  // Expand Comments section
  const handleToggleComments = async (postId) => {
    if (activeCommentsPostId === postId) {
      setActiveCommentsPostId(null);
      setCommentsList([]);
      return;
    }

    setActiveCommentsPostId(postId);
    setCommentsLoading(true);
    try {
      const data = await getComments(postId, token);
      const list = Array.isArray(data) ? data : (data?.comments || data?.data || []);
      setCommentsList(list);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setCommentsLoading(false);
    }
  };

  // Check comment ownership robustly
  const checkIsCommentAuthor = (c) => {
    if (!c) return false;
    const cId = String(c._id || c.id || "");
    if (cId && myCommentIds.has(cId)) return true;

    if (!user) return true; // fallback if logged in user exists

    const currentIds = [
      userId,
      user?.id,
      user?._id,
      user?.studentId,
      user?.student?._id,
      user?.student?.id,
    ].filter(Boolean).map(String);

    const currentEmails = [
      user?.email,
      user?.student?.email,
    ].filter(Boolean).map(e => String(e).toLowerCase());

    const candidateIds = [
      typeof c.studentId === "object" ? (c.studentId?._id || c.studentId?.id) : c.studentId,
      typeof c.userId === "object" ? (c.userId?._id || c.userId?.id) : c.userId,
      typeof c.user === "object" ? (c.user?._id || c.user?.id) : c.user,
      typeof c.author === "object" ? (c.author?._id || c.author?.id) : c.author,
      typeof c.student === "object" ? (c.student?._id || c.student?.id) : c.student,
      c.authorId,
      c.createdBy,
      c.created_by,
    ].filter(Boolean).map(String);

    const candidateEmails = [
      c.student?.email,
      c.user?.email,
      c.author?.email,
      c.email,
    ].filter(Boolean).map(e => String(e).toLowerCase());

    if (candidateIds.some(id => currentIds.includes(id))) return true;
    if (candidateEmails.some(email => currentEmails.includes(email))) return true;

    // Default to true for comments in student dashboard if no strict student ID is specified
    if (!candidateIds.length && !candidateEmails.length) return true;

    return false;
  };

  // Add Comment handler
  const handleAddComment = async (postId) => {
    if (!newCommentText.trim() || !token) return;

    try {
      const result = await addComment(postId, newCommentText.trim(), token);
      setNewCommentText("");
      
      const newCommentId = result?._id || result?.id || result?.comment?._id || result?.comment?.id;
      if (newCommentId) {
        setMyCommentIds(prev => new Set([...prev, String(newCommentId)]));
      }

      // Reload comments
      const data = await getComments(postId, token);
      const list = Array.isArray(data) ? data : (data?.comments || data?.data || []);
      setCommentsList(list);

      // Increment count locally
      setPosts(prevPosts => 
        prevPosts.map(p => {
          if ((p._id || p.id) === postId) {
            return { ...p, commentCount: (p.commentCount || 0) + 1 };
          }
          return p;
        })
      );
      showToast("Comment posted!", "success");
    } catch (err) {
      showToast(err.message || "Failed to post comment", "error");
    }
  };

  // Action loading state for comments
  const [commentActionLoading, setCommentActionLoading] = useState({});

  // Trigger Delete Confirmation Modal
  const handleDeleteComment = (postId, commentId) => {
    setDeletingCommentTarget({ postId, commentId, loading: false });
  };

  // Perform Delete after Modal Confirmation
  const confirmDeleteComment = async () => {
    if (!deletingCommentTarget || !token) return;
    const { postId, commentId } = deletingCommentTarget;

    setDeletingCommentTarget(prev => ({ ...prev, loading: true }));
    setCommentActionLoading(prev => ({ ...prev, [commentId]: true }));

    try {
      await deleteComment(commentId, token);
      setCommentsList(prev => prev.filter(c => (c._id || c.id) !== commentId));
      
      // Decrement count locally
      setPosts(prevPosts => 
        prevPosts.map(p => {
          if ((p._id || p.id) === postId) {
            return { ...p, commentCount: Math.max(0, (p.commentCount || 0) - 1) };
          }
          return p;
        })
      );
      showToast("Comment deleted successfully.", "success");
      setDeletingCommentTarget(null);
    } catch (err) {
      showToast(err.message || "Failed to delete comment", "error");
      setDeletingCommentTarget(prev => ({ ...prev, loading: false }));
    } finally {
      setCommentActionLoading(prev => ({ ...prev, [commentId]: false }));
    }
  };

  // Edit Comment handler
  const handleSaveEditComment = async (postId, commentId) => {
    if (!editingCommentText.trim() || !token) return;

    setCommentActionLoading(prev => ({ ...prev, [commentId]: true }));
    try {
      await editComment(commentId, editingCommentText.trim(), token);
      setCommentsList(prev => 
        prev.map(c => ((c._id || c.id) === commentId ? { ...c, content: editingCommentText.trim(), message: editingCommentText.trim() } : c))
      );
      setEditingCommentId(null);
      setEditingCommentText("");
      showToast("Comment updated successfully.", "success");
    } catch (err) {
      showToast(err.message || "Failed to update comment", "error");
    } finally {
      setCommentActionLoading(prev => ({ ...prev, [commentId]: false }));
    }
  };

  return (
    <Sidebar>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Title / Refresh header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1F2937] tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Humanova Community
            </h1>
            <p className="text-[#5F6B73] text-sm mt-1">Connect with peer groups, share knowledge, and explore polls.</p>
          </div>
          
          <button 
            onClick={() => { loadFeed(); loadGroups(); loadTrending(); }}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4.5 py-2.5 border border-[#E5DED6] bg-white rounded-full text-xs font-bold text-[#5F6B73] hover:text-[#1F2937] transition-all shadow-sm cursor-pointer hover:shadow"
          >
            <RefreshCw size={14} />
            Refresh Feed
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT: Feed posts */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {feedLoading ? (
              <div className="bg-white rounded-[28px] border border-[#E5DED6] py-24 text-center flex flex-col items-center justify-center gap-4">
                <Loader2 size={36} className="animate-spin text-[#2C8C91]" />
                <p className="text-xs text-[#8FA8A3] font-bold uppercase tracking-wider">Fetching feeds...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white rounded-[28px] border border-[#E5DED6] py-24 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] grid place-items-center text-[#8FA8A3]">
                  <MessageSquare size={28} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1F2937]">Your feed is quiet</h3>
                  <p className="text-xs text-[#8FA8A3] max-w-sm mt-1 px-4">
                    Join more community groups on the sidebar to view active posts, conversations, and surveys.
                  </p>
                </div>
              </div>
            ) : (
              posts.map((post) => {
                const postId = post._id || post.id;
                const authorName = post.student?.name || post.author?.name || post.student?.firstName || "Anonymous Member";
                const authorRole = post.student?.role || post.author?.role || "Member";
                const isPoll = post.postType === "poll" || post.poll?.options?.length > 0;
                
                const postReactions = Array.isArray(post.reaction) ? post.reaction : [];
                const totalReactionsCount = postReactions.length;
                const userReaction = postReactions.find(r => r.studentId === userId)?.reaction;

                // Extract poll parameters
                let pollVotedIndex = null;
                let pollTotalVotes = 0;
                if (isPoll && post.poll) {
                  pollTotalVotes = post.poll.options?.reduce((sum, opt) => sum + (opt.votes || 0), 0) || 0;
                  const userVote = post.poll.voters?.find(v => v.userId === userId);
                  if (userVote != null) {
                    pollVotedIndex = userVote.optionIndex;
                  }
                }

                return (
                  <div key={postId} className="bg-white rounded-[28px] border border-[#E5DED6] p-6 sm:p-8 hover:shadow-[0_8px_32px_rgba(0,0,0,0.02)] transition-shadow">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E5DED6] grid place-items-center text-[#2C8C91] text-xs font-bold uppercase overflow-hidden shrink-0">
                          {post.student?.photo || post.author?.photo ? (
                            <Image 
                              src={post.student?.photo || post.author?.photo} 
                              alt={authorName} 
                              width={40} 
                              height={40} 
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <User size={18} />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-[#1F2937] leading-tight">{authorName}</h4>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#2C8C91] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#2C8C91]/10">
                              {authorRole}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#8FA8A3] font-semibold flex items-center gap-1 mt-0.5">
                            <Clock size={10} />
                            {new Date(post.createdAt).toLocaleDateString([], { month: "short", day: "numeric" })}
                          </p>
                        </div>
                      </div>

                      {/* Bookmark Button */}
                      <button 
                        onClick={() => handleBookmarkToggle(postId)}
                        className={`p-2 rounded-full border transition-all cursor-pointer ${
                          post.isBookmarked 
                            ? "bg-[#FAF7F2] border-[#2C8C91]/30 text-[#2C8C91]" 
                            : "border-transparent text-[#8FA8A3] hover:text-[#1F2937] hover:bg-[#FAF7F2]"
                        }`}
                      >
                        <Bookmark size={16} className={post.isBookmarked ? "fill-current" : ""} />
                      </button>
                    </div>

                    {/* Post Text content */}
                    <div className="mb-5">
                      <p className="text-sm text-[#5F6B73] leading-relaxed whitespace-pre-line">
                        {post.message || post.content}
                      </p>
                      
                      {/* Attached images */}
                      {post.images && post.images.length > 0 && (
                        <div className="mt-4 rounded-2xl overflow-hidden border border-[#E5DED6] bg-[#FAF7F2] max-h-96">
                          <Image 
                            src={post.images[0]} 
                            alt="Attached illustration" 
                            width={700} 
                            height={350} 
                            className="object-cover w-full max-h-96"
                          />
                        </div>
                      )}
                    </div>

                    {/* POLL WIDGET */}
                    {isPoll && post.poll?.options?.length > 0 && (
                      <div className="bg-[#FAF7F2] rounded-2xl border border-[#E5DED6] p-5 mb-5">
                        <div className="flex items-center gap-2 mb-3.5">
                          <Sparkles size={14} className="text-[#E8A020]" />
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#8FA8A3]">Community Poll</h4>
                        </div>

                        <div className="flex flex-col gap-2.5">
                          {post.poll.options.map((opt, oIdx) => {
                            const votes = opt.votes || 0;
                            const percentage = pollTotalVotes > 0 ? Math.round((votes / pollTotalVotes) * 100) : 0;
                            const isVoted = pollVotedIndex != null && Number(pollVotedIndex) === oIdx;

                            return (
                              <div key={opt._id || oIdx} className="relative">
                                {/* Percentage bar background */}
                                <div 
                                  className={`absolute inset-y-0 left-0 rounded-xl transition-all duration-500 ${
                                    isVoted ? "bg-[#2C8C91]/15 border-l-2 border-[#2C8C91]" : "bg-white border-l border-[#E5DED6]"
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />

                                {/* Interactive poll layer */}
                                <div className="relative flex items-center justify-between p-3.5 text-xs font-semibold">
                                  <div className="flex items-center gap-2">
                                    <button
                                      disabled={pollVotedIndex != null}
                                      onClick={() => handleVotePoll(postId, oIdx)}
                                      className={`w-4.5 h-4.5 rounded-full border grid place-items-center transition-all ${
                                        isVoted 
                                          ? "bg-[#2C8C91] border-transparent text-white" 
                                          : pollVotedIndex != null 
                                          ? "border-[#E5DED6] cursor-not-allowed" 
                                          : "border-[#8FA8A3] hover:border-[#2C8C91] cursor-pointer"
                                      }`}
                                    >
                                      {isVoted && <CheckCircle2 size={10} />}
                                    </button>
                                    <span className="text-[#1F2937]">{opt.optionText}</span>
                                  </div>
                                  <span className="text-[10px] text-[#8FA8A3] font-mono">{percentage}% ({votes})</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="text-[9px] text-[#8FA8A3] font-bold mt-3 text-right">
                          Total Votes Cast: {pollTotalVotes}
                        </div>
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#FAF7F2] text-xs font-bold text-[#8FA8A3] relative">
                      
                      <div className="flex items-center gap-6">
                        {/* Reaction Picker Trigger */}
                        <div className="relative">
                          <button 
                            onClick={() => setActiveReactionPickerId(activeReactionPickerId === postId ? null : postId)}
                            className={`flex items-center gap-1.5 hover:text-[#2C8C91] transition-colors cursor-pointer ${
                              userReaction ? "text-[#2C8C91]" : ""
                            }`}
                          >
                            <ThumbsUp size={15} className={userReaction ? "fill-current" : ""} />
                            <span>
                              {totalReactionsCount} {userReaction ? `(${REACTION_EMOJIS[userReaction] || userReaction})` : "Reactions"}
                            </span>
                          </button>

                          {/* Reaction flyout menu */}
                          <AnimatePresence>
                            {activeReactionPickerId === postId && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-8 left-0 bg-white border border-[#E5DED6] rounded-full px-3 py-2 flex gap-3 shadow-lg z-20"
                              >
                                {Object.entries(REACTION_EMOJIS).map(([type, emoji]) => (
                                  <button
                                    key={type}
                                    onClick={() => handleReaction(postId, type)}
                                    className="text-lg hover:scale-130 transition-transform cursor-pointer"
                                    title={type}
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Comments Toggle */}
                        <button 
                          onClick={() => handleToggleComments(postId)}
                          className={`flex items-center gap-1.5 hover:text-[#2C8C91] transition-colors cursor-pointer ${
                            activeCommentsPostId === postId ? "text-[#2C8C91]" : ""
                          }`}
                        >
                          <MessageSquare size={15} />
                          <span>{post.commentCount || 0} Comments</span>
                        </button>
                      </div>

                      {post.groupName && (
                        <div className="text-[10px] text-[#2C8C91] bg-[#FAF7F2] border border-[#2C8C91]/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          {post.groupName}
                        </div>
                      )}
                    </div>

                    {/* Collapsible comment logger */}
                    <AnimatePresence>
                      {activeCommentsPostId === postId && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-6 border-t border-[#FAF7F2] pt-6 overflow-hidden"
                        >
                          <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                            <MessageSquare size={12} className="text-[#2C8C91]" />
                            Comments Discussion
                          </h4>

                          {/* Write a comment */}
                          <div className="flex items-center gap-2 mb-6">
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              value={newCommentText}
                              onChange={(e) => setNewCommentText(e.target.value)}
                              className="flex-1 bg-[#FAF7F2] border border-[#E5DED6] rounded-full px-4.5 py-2.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#2C8C91]/60 focus:bg-white transition-all placeholder-[#8FA8A3]"
                            />
                            <button
                              onClick={() => handleAddComment(postId)}
                              disabled={!newCommentText.trim()}
                              className="w-9 h-9 rounded-full bg-[#2C8C91] text-white flex items-center justify-center hover:bg-[#216B6F] disabled:opacity-40 disabled:hover:bg-[#2C8C91] transition-colors cursor-pointer shrink-0"
                            >
                              <Send size={14} fill="currentColor" />
                            </button>
                          </div>

                          {/* Comment threads */}
                          {commentsLoading ? (
                            <div className="py-8 text-center text-[#8FA8A3] text-xs flex justify-center items-center gap-2">
                              <Loader2 size={14} className="animate-spin text-[#2C8C91]" />
                              Loading conversation...
                            </div>
                          ) : commentsList.length === 0 ? (
                            <div className="py-8 text-center text-[#8FA8A3] text-xs font-semibold">
                              No comments yet. Share your thoughts!
                            </div>
                          ) : (
                            <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-2">
                              {commentsList.map((c) => {
                                const cId = c._id || c.id;
                                const isAuthor = checkIsCommentAuthor(c);
                                const isActionLoading = commentActionLoading[cId];

                                return (
                                  <div key={cId} className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E5DED6]/50 flex gap-3 items-start group">
                                    <div className="w-8 h-8 rounded-full bg-white border border-[#E5DED6] grid place-items-center text-xs font-bold text-[#2C8C91] uppercase overflow-hidden shrink-0">
                                      {c.student?.photo ? (
                                        <Image src={c.student.photo} alt={c.student.name || "User"} width={32} height={32} className="object-cover w-full h-full" />
                                      ) : (
                                        <User size={14} className="text-[#8FA8A3]" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-center">
                                        <div>
                                          <span className="text-xs font-bold text-[#1F2937]">
                                            {c.student?.name || c.student?.firstName || "Anonymous"}
                                          </span>
                                          <span className="text-[9px] font-semibold text-[#8FA8A3] ml-2">
                                            {c.createdAt ? new Date(c.createdAt).toLocaleDateString([], { month: "short", day: "numeric" }) : ""}
                                          </span>
                                        </div>
                                        
                                        {/* Actions for comment owner — Always visible */}
                                        {isAuthor && (
                                          <div className="flex items-center gap-1">
                                            {isActionLoading ? (
                                              <Loader2 size={12} className="animate-spin text-[#2C8C91]" />
                                            ) : (
                                              <>
                                                <button 
                                                  onClick={() => {
                                                    setEditingCommentId(cId);
                                                    setEditingCommentText(c.content || c.message || "");
                                                  }}
                                                  className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-[#2C8C91] hover:bg-[#2C8C91]/10 rounded-md transition-colors cursor-pointer"
                                                  title="Edit comment"
                                                >
                                                  <Edit3 size={11} />
                                                  <span>Edit</span>
                                                </button>
                                                <button 
                                                  onClick={() => handleDeleteComment(postId, cId)}
                                                  className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-[#E05FA0] hover:bg-[#E05FA0]/10 rounded-md transition-colors cursor-pointer"
                                                  title="Delete comment"
                                                >
                                                  <Trash2 size={11} />
                                                  <span>Delete</span>
                                                </button>
                                              </>
                                            )}
                                          </div>
                                        )}
                                      </div>

                                      {editingCommentId === cId ? (
                                        <div className="flex items-center gap-2 mt-2">
                                          <input
                                            type="text"
                                            value={editingCommentText}
                                            disabled={isActionLoading}
                                            onChange={(e) => setEditingCommentText(e.target.value)}
                                            onKeyDown={(e) => {
                                              if (e.key === "Enter") handleSaveEditComment(postId, cId);
                                              if (e.key === "Escape") {
                                                setEditingCommentId(null);
                                                setEditingCommentText("");
                                              }
                                            }}
                                            className="flex-1 bg-white border border-[#E5DED6] rounded-lg px-3 py-1.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#2C8C91]"
                                          />
                                          <button 
                                            onClick={() => handleSaveEditComment(postId, cId)}
                                            disabled={isActionLoading || !editingCommentText.trim()}
                                            className="px-3 py-1.5 bg-[#2C8C91] text-white text-[10px] font-bold rounded-lg hover:bg-[#216B6F] disabled:opacity-50 transition-colors cursor-pointer flex items-center gap-1"
                                          >
                                            {isActionLoading && <Loader2 size={10} className="animate-spin" />}
                                            Save
                                          </button>
                                          <button 
                                            onClick={() => {
                                              setEditingCommentId(null);
                                              setEditingCommentText("");
                                            }}
                                            disabled={isActionLoading}
                                            className="px-3 py-1.5 border border-[#E5DED6] text-[#5F6B73] text-[10px] font-bold rounded-lg hover:bg-white transition-colors cursor-pointer"
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      ) : (
                                        <p className="text-xs text-[#5F6B73] mt-1 leading-relaxed">{c.content || c.message}</p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT SIDEBAR: Groups & Trending Posts */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Community Groups */}
            <div className="bg-white rounded-[28px] border border-[#E5DED6] p-6 shadow-sm">
              <h3 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-5 flex items-center gap-2">
                <Users size={16} className="text-[#2C8C91]" />
                Explore Groups
              </h3>

              {groupsLoading ? (
                <div className="py-6 text-center text-[#8FA8A3] text-xs flex justify-center items-center gap-2">
                  <Loader2 size={14} className="animate-spin text-[#2C8C91]" />
                  Loading channels...
                </div>
              ) : groups.length === 0 ? (
                <div className="py-6 text-center text-[#8FA8A3] text-xs">
                  No active community groups found.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {groups.map((group) => {
                    const isJoined = group.isMember || group.joined || false;
                    return (
                      <div key={group._id || group.id} className="flex flex-col border-b border-[#FAF7F2] pb-4 last:border-b-0 last:pb-0">
                        {group.coverImage && (
                          <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-[#FAF7F2] border border-[#E5DED6]/50">
                            <Image 
                              src={group.coverImage} 
                              alt={group.name} 
                              width={300} 
                              height={100} 
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-[#1F2937] truncate">{group.name}</h4>
                            <p className="text-[10px] text-[#8FA8A3] leading-relaxed line-clamp-2 mt-0.5">{group.description}</p>
                            <span className="inline-block text-[9px] text-[#2C8C91] font-bold bg-[#EAF6F4] px-1.5 py-0.5 rounded-full mt-1.5">
                              {group.membersCount || 0} members
                            </span>
                          </div>

                          <button
                            onClick={() => handleGroupAction(group)}
                            className={`px-3 py-1.5 rounded-full text-[9px] font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
                              isJoined
                                ? "border border-[#E5DED6] text-[#8FA8A3] hover:text-[#E05FA0] hover:bg-[#FFF0F6] hover:border-transparent"
                                : "bg-[#2C8C91] text-white hover:bg-[#216B6F]"
                            }`}
                          >
                            {isJoined ? "Leave" : "Join"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Trending / Recommended Posts */}
            <div className="bg-white rounded-[28px] border border-[#E5DED6] p-6 shadow-sm">
              <h3 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-5 flex items-center gap-2">
                <TrendingUp size={16} className="text-[#2C8C91]" />
                Trending Topics
              </h3>

              {trendingLoading ? (
                <div className="py-6 text-center text-[#8FA8A3] text-xs flex justify-center items-center gap-2">
                  <Loader2 size={14} className="animate-spin text-[#2C8C91]" />
                  Gathering metrics...
                </div>
              ) : trending.length === 0 ? (
                <div className="py-6 text-center text-[#8FA8A3] text-xs">
                  No active trending posts right now.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {trending.slice(0, 5).map((trend, idx) => (
                    <div key={trend._id || trend.id || idx} className="flex gap-3 py-2 border-b border-[#FAF7F2] last:border-b-0 items-start">
                      <span className="text-sm font-extrabold text-[#2C8C91]/35 font-mono mt-0.5">0{idx + 1}</span>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#1F2937] hover:text-[#2C8C91] cursor-pointer line-clamp-2">
                          {trend.message || trend.title || trend.content}
                        </h4>
                        <span className="text-[9px] text-[#8FA8A3] font-bold block mt-1.5 flex items-center gap-1">
                          <Heart size={10} className="text-[#E05FA0]" />
                          {(trend.reaction?.length || trend.likes || 0)} reactions
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FAQ guidelines */}
            <div className="bg-[#FAF7F2] rounded-[28px] border border-[#E5DED6] p-6">
              <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb size={14} className="text-[#E8A020]" />
                Community Code
              </h4>
              <p className="text-[10px] text-[#5F6B73] leading-relaxed">
                Respect your peers. Maintain positive, constructive discussions. All contributions in channels are visible to team leaders and compliance administrators.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* Delete Comment Confirmation Modal */}
      <AnimatePresence>
        {deletingCommentTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !deletingCommentTarget.loading && setDeletingCommentTarget(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative z-10 w-full max-w-sm bg-white rounded-[28px] border border-[#E5DED6] p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#FFF0F6] text-[#E05FA0] grid place-items-center mb-4 border border-[#E05FA0]/20">
                  <Trash2 size={24} />
                </div>

                <h3 className="text-lg font-extrabold text-[#1F2937]" style={{ fontFamily: "var(--font-outfit)" }}>
                  Delete Comment?
                </h3>
                <p className="text-xs text-[#5F6B73] mt-2 leading-relaxed">
                  Are you sure you want to delete this comment? This action cannot be undone.
                </p>

                <div className="flex gap-3 w-full mt-6">
                  <button
                    type="button"
                    disabled={deletingCommentTarget.loading}
                    onClick={() => setDeletingCommentTarget(null)}
                    className="flex-1 px-4 py-2.5 rounded-full border border-[#E5DED6] bg-white text-xs font-bold text-[#5F6B73] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={deletingCommentTarget.loading}
                    onClick={confirmDeleteComment}
                    className="flex-1 px-4 py-2.5 rounded-full bg-[#E05FA0] text-white text-xs font-bold hover:bg-[#C94D8D] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    {deletingCommentTarget.loading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-full text-xs font-bold shadow-2xl border flex items-center gap-2.5 backdrop-blur-md ${
              toast.type === "error"
                ? "bg-[#FFF0F6] border-[#E05FA0]/30 text-[#E05FA0]"
                : "bg-[#EAF6F4] border-[#2C8C91]/30 text-[#2C8C91]"
            }`}
          >
            {toast.type === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </Sidebar>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { RichTextEditor } from "@/app/components/ui/rich-text-editor";
import {
  ThumbsUp,
  ThumbsDown,
  Trash2,
  Reply,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { HiBadgeCheck } from "react-icons/hi";
import { EmptyComment } from "@/components/Svgs";
import { validateComment } from "@/lib/commentValidation";

interface Reaction {
  id: string;
  type: "like" | "dislike";
  userId: number;
  user: { id: number; name: string };
}

interface User {
  id: number;
  name: string;
  image: string | null;
  role: string;
  canComment?: boolean;
}

interface TemplateComment {
  id: number;
  content: string;
  createdAt: string;
  user: User;
  reactions: Reaction[];
  replies: TemplateComment[];
}

interface TemplateCommentsSectionProps {
  templateId: string;
}

// Helper function for shorter distance formatting
const formatShortDistanceToNow = (date: Date): string => {
  const result = formatDistanceToNow(date, { addSuffix: true });
  if (result.includes("month")) {
    const months = result.match(/\d+/)?.[0];
    return months ? `${months} mo ago` : result;
  }
  if (result.includes("year")) {
    const years = result.match(/\d+/)?.[0];
    return years ? `${years} yr ago` : result;
  }
  // Keep original format for smaller units (seconds, minutes, hours, days, weeks)
  return result;
};

export function TemplateCommentsSection({
  templateId,
}: TemplateCommentsSectionProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [topLevel, setTopLevel] = useState<TemplateComment[]>([]);
  const [allComments, setAllComments] = useState<TemplateComment[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>(
    {}
  );
  const [cursor, setCursor] = useState<string | null>(null);
  const userId = session?.user?.id ? parseInt(session.user.id) : null;
  const userRole = (session?.user as any)?.role || "";
  const userCanComment = (session?.user as any)?.canComment !== false; // Default to true if not set
  const limit = 4;
  const [loading, setLoading] = useState(true);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(
    new Set()
  );
  const [replyCharCount, setReplyCharCount] = useState<{
    [key: number]: number;
  }>({});

  // Helper: Build a nested tree from flat allComments
  function buildTree(
    comments: TemplateComment[]
  ): Record<number, TemplateComment[]> {
    const byParent: Record<number, TemplateComment[]> = {};
    comments.forEach((c: any) => {
      const pid = c.parentId || 0;
      if (!byParent[pid]) byParent[pid] = [];
      byParent[pid].push(c);
    });
    return byParent;
  }

  // Toggle expanded state for a comment
  const toggleExpanded = (commentId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  // Helper: Recursively render nested comments
  function renderNested(
    comment: TemplateComment,
    byParent: Record<number, TemplateComment[]>,
    isReply = false,
    parentUser?: string
  ) {
    const hasReplies = byParent[comment.id] && byParent[comment.id].length > 0;
    const isExpanded = expandedComments.has(comment.id);
    const replyCount = byParent[comment.id]?.length || 0;

    return (
      <React.Fragment key={comment.id}>
        {renderComment(
          comment,
          isReply,
          parentUser,
          hasReplies,
          replyCount,
          isExpanded,
          toggleExpanded
        )}
        {hasReplies && isExpanded && (
          <div className="ml-1 space-y-4 mt-2">
            {byParent[comment.id].map((child) =>
              renderNested(child, byParent, true, comment.user.name)
            )}
          </div>
        )}
      </React.Fragment>
    );
  }

  // Helper function to update nested comments
  const updateNestedComments = (
    comments: TemplateComment[],
    targetId: number,
    updateFn: (comment: TemplateComment) => TemplateComment
  ): TemplateComment[] => {
    return comments.map((comment) => {
      if (comment.id === targetId) {
        return updateFn(comment);
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateNestedComments(comment.replies, targetId, updateFn),
        };
      }
      return comment;
    });
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [templateId]);

  const fetchComments = async (append = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        templateId: String(templateId),
        limit: String(limit),
      });
      if (cursor) params.append("cursor", cursor);
      const { data } = await axios.get(
        `/api/template-comments?${params.toString()}`
      );
      if (append) {
        setTopLevel((prev) => [...prev, ...data.topLevel]);
      } else {
        setTopLevel(data.topLevel);
      }
      setAllComments(data.allComments);
      setHasMore(data.hasMore);
      if (data.topLevel.length > 0) {
        setCursor(String(data.topLevel[data.topLevel.length - 1].id));
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!userCanComment) {
      toast.error("You have been blocked from commenting");
      return;
    }

    // Validate comment content
    const validation = validateComment(newComment);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/template-comments", {
        templateId,
        content: newComment.trim(),
      });
      setTopLevel([data, ...topLevel]);
      setNewComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (parentId: number) => {
    const content = replyContent[parentId];
    if (!content?.trim()) return;
    if (!userCanComment) {
      toast.error("You have been blocked from commenting");
      return;
    }

    // Validate reply content
    const validation = validateComment(content);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    try {
      setIsLoading(true);

      // Create the new reply object immediately
      const newReply: TemplateComment = {
        id: Date.now(), // Temporary ID until we get the real one
        content: content.trim(),
        createdAt: new Date().toISOString(),
        user: {
          id: userId!,
          name: session?.user?.name || "",
          image: session?.user?.image || null,
          role: userRole,
        },
        reactions: [],
        replies: [],
      };

      // Update UI immediately with the new reply
      const addReplyToComment = (comment: TemplateComment) => ({
        ...comment,
        replies: [...(comment.replies || []), newReply],
      });

      setAllComments((prev) => [...prev, newReply]);
      setTopLevel((prev) =>
        updateNestedComments(prev, parentId, addReplyToComment)
      );

      // Auto-expand the parent comment when replying
      setExpandedComments((prev) => new Set(prev).add(parentId));

      // Clear the reply form
      setReplyContent((prev) => ({ ...prev, [parentId]: "" }));
      setReplyingTo(null);

      // Make the API call
      const { data } = await axios.post("/api/template-comments", {
        templateId,
        content: content.trim(),
        parentId,
      });

      // Update the temporary ID with the real one from the server
      const updateCommentId = (comment: TemplateComment) => ({
        ...comment,
        id: data.id,
      });

      setAllComments((prev) =>
        prev.map((comment) =>
          comment.id === Date.now() ? updateCommentId(comment) : comment
        )
      );
      setTopLevel((prev) =>
        updateNestedComments(prev, parentId, (comment) => ({
          ...comment,
          replies:
            comment.replies?.map((reply) =>
              reply.id === Date.now() ? updateCommentId(reply) : reply
            ) || [],
        }))
      );

      toast.success("Reply added successfully");
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("Failed to add reply");
      // Revert the optimistic update on error
      setAllComments((prev) =>
        prev.filter((comment) => comment.id !== Date.now())
      );
      setTopLevel((prev) =>
        updateNestedComments(prev, parentId, (comment) => ({
          ...comment,
          replies:
            comment.replies?.filter((reply) => reply.id !== Date.now()) || [],
        }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    try {
      await axios.delete("/api/template-comments", { data: { commentId } });

      // Update allComments and topLevel
      setAllComments((prev) => prev.filter((c) => c.id !== commentId));
      setTopLevel((prev) => prev.filter((c) => c.id !== commentId));

      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  const handleReaction = async (
    commentId: number,
    type: "like" | "dislike",
    current: "like" | "dislike" | null
  ) => {
    try {
      let updatedReactions: Reaction[] = [];
      if (current === type) {
        // Remove reaction
        await axios.delete("/api/template-comments/reaction", {
          data: { commentId },
        });
        updatedReactions = (
          allComments.find((c) => c.id === commentId)?.reactions ?? []
        ).filter((r) => r.userId !== userId);
      } else {
        // Add or update reaction
        await axios.post("/api/template-comments/reaction", {
          commentId,
          type,
        });
        // Remove previous reaction by this user, add new one
        const otherReactions = (
          allComments.find((c) => c.id === commentId)?.reactions ?? []
        ).filter((r) => r.userId !== userId);
        updatedReactions = [
          ...otherReactions,
          {
            id: "temp",
            type,
            userId: userId!,
            user: { id: userId!, name: session?.user?.name || "" },
          },
        ];
      }

      // Update allComments and topLevel
      setAllComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, reactions: updatedReactions } : c
        )
      );
      setTopLevel((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, reactions: updatedReactions } : c
        )
      );
    } catch (error) {
      toast.error("Failed to update reaction");
    }
  };

  const renderComment = (
    comment: TemplateComment,
    isReply = false,
    parentUser?: string,
    hasReplies = false,
    replyCount = 0,
    isExpanded = false,
    toggleExpanded?: (id: number) => void
  ) => {
    const likeCount = (comment.reactions ?? []).filter(
      (r) => r.type === "like"
    ).length;
    const dislikeCount = (comment.reactions ?? []).filter(
      (r) => r.type === "dislike"
    ).length;
    const userReaction =
      (comment.reactions ?? []).find((r) => r.userId === userId)?.type || null;
    const canDelete = userId === comment.user.id || userRole === "admin";
    const isAdmin = comment.user.role === "admin";

    return (
      <div
        key={comment.id}
        className={`group flex gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 ${
          isReply ? "ml-8 border-l-4 border-primary/30" : ""
        }`}
      >
        <Avatar className={isReply ? "w-8 h-8" : "w-10 h-10"}>
          <AvatarImage src={comment.user.image || undefined} />
          <AvatarFallback>
            {comment.user.name?.charAt(0).toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-zinc-900 dark:text-white truncate">
              {comment.user.name}
            </span>
            {isAdmin && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HiBadgeCheck
                      className="w-4 h-4 text-blue-500"
                      aria-label="Admin"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="px-2 py-1 text-xs">
                    Admin
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <span className="text-xs text-zinc-500">
              {formatShortDistanceToNow(new Date(comment.createdAt))}
            </span>
            {canDelete && (
              <button
                className="text-destructive hover:bg-destructive/10 p-1 rounded"
                aria-label="Delete"
                onClick={() => handleDelete(comment.id)}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
          {isReply && parentUser && (
            <div className="text-xs text-zinc-400 mb-1">
              Replying to <span className="font-semibold">@{parentUser}</span>
            </div>
          )}
          <div
            className="prose prose-sm max-w-none dark:prose-invert text-zinc-800 dark:text-zinc-100 mb-2"
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />
          <div className="flex items-center gap-4 text-zinc-500 text-xs font-medium">
            {!session ? (
              <button
                className="flex items-center gap-1 px-1 py-1 rounded hover:bg-primary/10 transition"
                onClick={() => router.push("/login")}
              >
                <ThumbsUp size={15} /> {likeCount}
              </button>
            ) : (
              <button
                className={`flex items-center gap-1 px-1 py-1 rounded hover:bg-primary/10 transition ${userReaction === "like" ? "text-primary font-bold" : ""}`}
                title="Like"
                onClick={() => handleReaction(comment.id, "like", userReaction)}
              >
                <ThumbsUp size={15} /> {likeCount}
              </button>
            )}
            {!session ? (
              <button
                className="flex items-center gap-1 px-1 py-1 rounded hover:bg-primary/10 transition"
                onClick={() => router.push("/login")}
              >
                <ThumbsDown size={15} /> {dislikeCount}
              </button>
            ) : (
              <button
                className={`flex items-center gap-1 px-1 py-1 rounded hover:bg-primary/10 transition ${userReaction === "dislike" ? "text-red-500 font-bold" : ""}`}
                title="Dislike"
                onClick={() =>
                  handleReaction(comment.id, "dislike", userReaction)
                }
              >
                <ThumbsDown size={15} /> {dislikeCount}
              </button>
            )}
            {session && (
              <button
                className="flex items-center gap-1 px-1 py-1 rounded hover:bg-primary/10 transition"
                title="Reply"
                onClick={() => setReplyingTo(comment.id)}
              >
                <Reply size={15} /> Reply
              </button>
            )}
            {hasReplies && toggleExpanded && (
              <button
                className="flex items-center gap-1 px-1 py-1 rounded hover:bg-primary/10 transition ml-auto"
                onClick={() => toggleExpanded(comment.id)}
              >
                <ChevronDown
                  size={15}
                  className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                />
                {isExpanded
                  ? "Hide replies"
                  : `View ${replyCount} ${replyCount === 1 ? "reply" : "replies"}`}
              </button>
            )}
          </div>
          {replyingTo === comment.id && (
            <div className="mt-3">
              <RichTextEditor
                value={replyContent[comment.id] || ""}
                onChange={(val) =>
                  setReplyContent((prev) => ({ ...prev, [comment.id]: val }))
                }
                placeholder="Write a reply..."
                maxLength={500}
                showCharCount={true}
                className="mb-2"
                onCharCountChange={(count) =>
                  setReplyCharCount((prev) => ({
                    ...prev,
                    [comment.id]: count,
                  }))
                }
              />
              <div className="flex gap-2 items-center">
                <Button
                  size="sm"
                  variant="fancy"
                  onClick={() => handleReply(comment.id)}
                  disabled={isLoading || !replyContent[comment.id]?.trim()}
                >
                  {isLoading ? "Replying..." : "Reply"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Build the tree for infinite nesting
  const byParent = buildTree(allComments);

  return (
    <div className="max-w-6xl mx-auto bg-inherit dark:bg-zinc-950 rounded-2xl p-6 mt-8">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <RichTextEditor
            value={newComment}
            onChange={session && userCanComment ? setNewComment : () => {}}
            placeholder={
              !session
                ? "Sign in to add a comment"
                : !userCanComment
                  ? "You have been blocked from commenting"
                  : "Add comment..."
            }
            maxLength={500}
            showCharCount={true}
            className={`mb-2 bg-white dark:bg-zinc-900 rounded-lg shadow border border-zinc-200 dark:border-zinc-800 ${!session || !userCanComment ? "opacity-50" : ""}`}
          />
          {!session && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-lg">
              <Button
                onClick={() => router.push("/login")}
                className="z-10 mt-10"
                variant="fancy"
              >
                Sign in to comment
              </Button>
            </div>
          )}
          {session && !userCanComment && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-lg">
              <p className="text-destructive font-medium">
                You have been blocked from commenting
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span />
          <Button
            type="submit"
            variant="fancy"
            className="px-6 py-2 rounded-lg"
            disabled={
              isLoading || !newComment.trim() || !session || !userCanComment
            }
          >
            {isLoading ? "Posting..." : "Submit"}
          </Button>
        </div>
      </form>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            Comments
          </h3>
          <span className="inline-flex items-center justify-center text-xs font-semibold bg-primary/10 text-primary rounded-full px-2 py-0.5">
            {allComments.length}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {loading ? (
          <>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 animate-pulse"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-3 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {topLevel.map((comment) => renderNested(comment, byParent))}
            {!loading && topLevel.length === 0 && (
              <div className="text-center py-12 px-4">
                <div className="mx-auto h-20 w-20 text-gray-400 mb-4">
                  <EmptyComment />
                </div>
                <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">
                  No comments yet
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Be the first to comment!
                </p>
              </div>
            )}
            {hasMore && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="ghost"
                  className="text-primary font-semibold"
                  onClick={() => fetchComments(true)}
                >
                  Show more <ChevronRight className="ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

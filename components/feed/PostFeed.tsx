"use client";

import { useEffect, useState } from "react";
import PostBox from "./PostBox";
import CommentSection from "./CommentSection";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Post = {
  id: number;
  content: string;
  createdAt: string;
  author: { firstName: string; lastName: string; roleTitle: string; profile_photo: string | null };
  _count: { likes: number; comments: number };
  isLiked?: boolean;
  comments?: any[];
  mediaUrls?: string[];
};

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
        const res = await fetch("/api/posts");
        if (res.ok) {
        setPosts(await res.json());
        }
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const alreadyLiked = !!post.isLiked;

    // Optimistically update UI
    setPosts(posts.map(p => {
        if (p.id === postId) {
            return {
                ...p,
                isLiked: !alreadyLiked,
                _count: { 
                    ...p._count, 
                    likes: alreadyLiked ? Math.max(0, p._count.likes - 1) : p._count.likes + 1 
                }
            };
        }
        return p;
    }));
    
    await fetch(`/api/posts/${postId}/like`, { method: "POST" });
    // fetchPosts(); // Optional: remove if you want full trust in optimistic UI
  };

  return (
    <div className="w-full">
      <PostBox onPostCreated={fetchPosts} />
      
      <div className="space-y-4">
        {isLoading && posts.length === 0 && (
            <div className="text-center p-10 text-muted-foreground animate-pulse">Loading feed...</div>
        )}
        
        {posts.map((post) => (
          <div key={post.id} className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-3 mb-3">
               <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground shrink-0 border border-border">
                  {post.author.firstName?.charAt(0)}{post.author.lastName?.charAt(0)}
               </div>
               <div>
                 <p className="font-semibold text-foreground text-sm">{post.author.firstName} {post.author.lastName}</p>
                 <p className="text-xs text-muted-foreground">{post.author.roleTitle || "Student"} • {new Date(post.createdAt).toLocaleDateString()}</p>
               </div>
             </div>
             <p className="text-sm text-foreground whitespace-pre-wrap mb-4 leading-relaxed">{post.content}</p>
              
              {post.mediaUrls && post.mediaUrls.length > 0 && (
                <div className={cn(
                  "grid gap-2 mb-4 rounded-xl overflow-hidden border border-border",
                  post.mediaUrls.length === 1 ? "grid-cols-1" : "grid-cols-2"
                )}>
                  {post.mediaUrls.map((url, idx) => (
                    <div key={idx} className="relative aspect-video">
                      <Image 
                        src={url} 
                        alt={`Post media ${idx}`} 
                        fill 
                        className="object-cover"
                        sizes="(max-w-768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              )}
             <div className="flex items-center gap-6 border-t border-border pt-3 mt-4 text-muted-foreground">
               <button 
                 onClick={() => handleLike(post.id)}
                 className={cn(
                   "flex items-center gap-2 hover:text-primary text-xs font-medium transition-colors cursor-pointer",
                   post.isLiked && "text-primary"
                 )}
               >
                 <ThumbsUp className={cn("h-4 w-4", post.isLiked && "fill-primary")} /> {post._count.likes > 0 ? post._count.likes : "Like"}
               </button>
                <button 
                  onClick={() => setActiveCommentPost(activeCommentPost === post.id ? null : post.id)}
                  className={cn(
                    "flex items-center gap-2 hover:text-primary text-xs font-medium transition-colors cursor-pointer",
                    activeCommentPost === post.id && "text-primary font-bold"
                  )}
                >
                  <MessageSquare className={cn("h-4 w-4", activeCommentPost === post.id && "fill-primary/20")} /> {post._count.comments > 0 ? post._count.comments : "Comment"}
                </button>
                <button className="flex items-center gap-2 hover:text-primary text-xs font-medium transition-colors ml-auto cursor-pointer">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>

              {activeCommentPost === post.id && (
                <CommentSection 
                    postId={post.id} 
                    initialComments={post.comments} 
                    onCommentAdded={() => {
                        setPosts(posts.map(p => p.id === post.id ? {
                            ...p,
                            _count: { ...p._count, comments: p._count.comments + 1 }
                        } : p));
                    }}
                />
              )}
          </div>
        ))}
        {!isLoading && posts.length === 0 && (
          <div className="text-center p-10 border border-border border-dashed rounded-xl text-muted-foreground text-sm">
            No posts yet. Be the first to share an update with your university!
          </div>
        )}
      </div>
    </div>
  );
}

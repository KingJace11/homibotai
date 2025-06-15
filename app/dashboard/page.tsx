"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

type Comment = {
  id: string;
  name: string;
  comment: string;
  timestamp: string;
  isInterested: boolean;
  repliedText: string | null;
};

export default function DashboardPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "interested" | "unreplied">("all");

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch("/api/comments");
      if (!res.ok) {
        console.error("Failed to fetch comments:", res.status);
        return;
      }
      const data = await res.json();
      setComments(data);
    };

    fetchComments();
  }, []);

  const handleSendReply = async (commentId: string) => {
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repliedText: replyText }),
      });

      if (!res.ok) throw new Error("Failed to update comment");

      const updated = await res.json();
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, repliedText: updated.repliedText } : comment
        )
      );

      setReplyText("");
      setActiveReplyId(null);
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  const filteredComments = comments.filter((comment) => {
    if (activeFilter === "interested") return comment.isInterested;
    if (activeFilter === "unreplied") return !comment.repliedText;
    return true;
  });

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">👋 Welcome back, Agent</h1>
        <p className="text-lg mt-2 text-gray-600">You’re signed in as someone@example.com</p>
      </header>

      <section className="mb-6">
        <div className="flex gap-4 text-sm">
          <span className="bg-white px-4 py-2 rounded shadow border">Instagram: <span className="text-green-600">Connected</span></span>
          <span className="bg-white px-4 py-2 rounded shadow border">Facebook: <span className="text-green-600">Connected</span></span>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">📬 Recent Comments</h2>

        <div className="flex gap-4 mb-4">
          {["all", "interested", "unreplied"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-4 py-2 rounded ${activeFilter === filter ? "bg-homi-primary text-white" : "bg-gray-200"}`}
            >
              {filter === "all" ? "All" : filter === "interested" ? "Most Interested" : "Unreplied"}
            </button>
          ))}
        </div>

        <ul className="space-y-4">
          {filteredComments.map((comment) => (
            <li key={comment.id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
              <p className="font-semibold">{comment.name}</p>
              <p className="text-gray-700">{comment.comment}</p>
              <p className="text-sm text-gray-400 mb-2">
                {format(new Date(comment.timestamp), "Pp")}
              </p>

              {comment.isInterested && (
                <div className="text-green-600 text-xs font-semibold">✅ Interested</div>
              )}

              {comment.repliedText ? (
                <div className="mt-3 border-l-4 border-homi-primary pl-4 text-gray-700 italic">
                  HomiBot replied: “{comment.repliedText}”
                </div>
              ) : (
                <>
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => setActiveReplyId(comment.id)}
                  >
                    Reply
                  </button>

                  {activeReplyId === comment.id && (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                        className="w-full px-3 py-2 border rounded mt-2"
                      />
                      <button
                        onClick={() => handleSendReply(comment.id)}
                        className="mt-2 bg-homi-primary text-white px-4 py-2 rounded hover:bg-homi-accent"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
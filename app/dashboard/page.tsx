"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

type Comment = {
  id: string;
  name: string;
  comment: string;
  timestamp: string;
  isInterested: boolean;
  repliedText: string | null;
  intent: string | null; // ✅ Add this
};
export default function DashboardPage() {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "interested" | "unreplied">("all");
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");

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

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete comment");

      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleToggleInterested = async (commentId: string, current: boolean) => {
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isInterested: !current }),
      });

      if (!res.ok) throw new Error("Failed to update interest status");

      const updated = await res.json();

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? { ...comment, isInterested: updated.isInterested } : comment
        )
      );
    } catch (err) {
      console.error("Error updating interest status:", err);
    }
  };

  const exportCSV = () => {
    const csv = ["Name,Comment,Interested,Replied"].concat(
      comments.map(
        (c) =>
          `${c.name},"${c.comment.replace(/"/g, '""')}",${c.isInterested},"${c.repliedText || ""}"`
      )
    );
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "comments.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredComments = comments.filter((comment) => {
    if (activeFilter === "interested" && !comment.isInterested) return false;
    if (activeFilter === "unreplied" && comment.repliedText) return false;
    if (
      !comment.name.toLowerCase().includes(search.toLowerCase()) &&
      !comment.comment.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <header className="mb-10 flex items-center gap-4">
        {session?.user?.image && (
          <img
            src={session.user.image}
            alt="User avatar"
            className="w-12 h-12 rounded-full border shadow"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold">👋 Welcome back, {session?.user?.name || "Agent"}</h1>
          <p className="text-lg mt-2 text-gray-600">
            You’re signed in as {session?.user?.email || "someone@example.com"}
          </p>
        </div>
      </header>

      <section className="mb-6">
        <div className="flex gap-4 text-sm">
          <span className="bg-white px-4 py-2 rounded shadow border">
            Instagram: <span className="text-green-600">Connected</span>
          </span>
          <span className="bg-white px-4 py-2 rounded shadow border">
            Facebook: <span className="text-green-600">Connected</span>
          </span>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">📬 Recent Comments</h2>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          <button
            onClick={exportCSV}
            className="bg-homi-primary text-white px-4 py-2 rounded hover:bg-homi-accent"
          >
            📤 Export CSV
          </button>
        </div>

        <div className="flex gap-4 mb-4">
          {["all", "interested", "unreplied"].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() =>
                  setActiveFilter(filter as "all" | "interested" | "unreplied")
                }
                className={`px-4 py-2 rounded ${
                  isActive
                    ? "bg-homi-primary text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {filter === "all"
                  ? "All"
                  : filter === "interested"
                  ? "Most Interested"
                  : "Unreplied"}
              </button>
            );
          })}
        </div>

        <ul className="space-y-4">
          {filteredComments.map((comment) => (
            <li
              key={comment.id}
              className={`border p-4 rounded-lg shadow-sm bg-gray-50 ${
                !comment.repliedText ? "border-yellow-400" : ""
              }`}
            >
              <div className="flex justify-between items-start">
             <div>
  <p className="font-semibold">{comment.name}</p>
  <p className="text-gray-700">{comment.comment}</p>
  <p className="text-xs italic text-gray-500">
    Intent: {comment.intent || "N/A"}
  </p>
  <p className="text-sm text-gray-400 mb-2">
    {format(new Date(comment.timestamp), "Pp")}
  </p>
</div>
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  🗑️ Delete
                </button>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <label className="text-sm text-gray-600">Interested?</label>
                <input
                  type="checkbox"
                  checked={comment.isInterested}
                  onChange={() =>
                    handleToggleInterested(comment.id, comment.isInterested)
                  }
                />
              </div>

              {comment.repliedText ? (
                <div className="mt-3 relative group">
                  <div className="border-l-4 border-homi-primary pl-4 text-gray-700 italic cursor-pointer">
                    HomiBot replied: “{comment.repliedText.slice(0, 40)}...”
                  </div>
                  <div className="absolute z-10 hidden group-hover:block bg-white border border-gray-300 p-2 text-sm text-gray-800 rounded shadow-lg w-72 -top-2 left-full ml-2">
                    Full Reply: “{comment.repliedText}”
                  </div>
                  <button
                    className="mt-2 text-xs text-blue-500 hover:underline"
                    onClick={async () => {
                      if (comment.repliedText) {
                        await navigator.clipboard.writeText(comment.repliedText);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }
                    }}
                  >
                    📋 Copy to Clipboard
                  </button>
                  {copied && (
                    <span className="text-green-500 ml-2 text-xs">Copied!</span>
                  )}
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
                        maxLength={280}
                        className="w-full px-3 py-2 border rounded mt-2"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {replyText.length}/280 characters
                      </div>
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

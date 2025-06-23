"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

// Step 7: Import copy-to-clipboard hook
import { CopyToClipboard } from "react-copy-to-clipboard";

// TypeScript type
type Comment = {
  id: string;
  name: string;
  comment: string;
  timestamp: string;
  isInterested: boolean;
  repliedText: string | null;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "interested" | "unreplied">("all");
  const [copied, setCopied] = useState(false);

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

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-lg font-bold">{comments.length}</p>
            <p className="text-sm text-gray-500">Total Comments</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-lg font-bold">
              {comments.filter((c) => c.isInterested).length}
            </p>
            <p className="text-sm text-gray-500">Marked Interested</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-lg font-bold">
              {comments.filter((c) => !c.repliedText).length}
            </p>
            <p className="text-sm text-gray-500">Unreplied</p>
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          {["all", "interested", "unreplied"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as "all" | "interested" | "unreplied")}
              className={`px-4 py-2 rounded ${
                activeFilter === filter
                  ? "bg-homi-primary text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {filter === "all" ? "All" : filter === "interested" ? "Most Interested" : "Unreplied"}
            </button>
          ))}
        </div>

        <ul className="space-y-4">
          {filteredComments.map((comment) => (
            <li
              key={comment.id}
              className={`border p-4 rounded-lg shadow-sm bg-gray-50 ${
                !comment.repliedText ? "border-yellow-400" : ""
              }`}
            >
              <p className="font-semibold">{comment.name}</p>
              <p className="text-gray-700">{comment.comment}</p>
              <p className="text-sm text-gray-400 mb-2">
                {format(new Date(comment.timestamp), "Pp")}
              </p>

              {comment.isInterested && (
                <div className="text-green-600 text-xs font-semibold">✅ Interested</div>
              )}

              {comment.repliedText ? (
                <div className="mt-3 relative group">
                  <div className="border-l-4 border-homi-primary pl-4 text-gray-700 italic cursor-pointer">
                    HomiBot replied: “{comment.repliedText.slice(0, 40)}...”
                  </div>
                  <div className="absolute z-10 hidden group-hover:block bg-white border border-gray-300 p-2 text-sm text-gray-800 rounded shadow-lg w-72 -top-2 left-full ml-2">
                    Full Reply: “{comment.repliedText}”
                  </div>
                  <CopyToClipboard text={comment.repliedText} onCopy={() => setCopied(true)}>
                    <button className="mt-2 text-xs text-blue-500 hover:underline">
                      📋 Copy to Clipboard
                    </button>
                  </CopyToClipboard>
                  {copied && <span className="text-green-500 ml-2 text-xs">Copied!</span>}
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

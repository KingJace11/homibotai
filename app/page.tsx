'use client';

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-10">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Your AI Assistant for Real Estate Leads — While You Sleep.</h1>
        <p className="text-lg text-gray-600 mb-6">
          Turn Instagram & Facebook comments into conversations, leads, and deals. Automatically.
        </p>
        <div className="space-x-4">
          <Link href="/account" className="bg-homi-primary text-white px-6 py-3 rounded text-lg">Get Started Free</Link>
          <Link href="/account" className="bg-gray-300 text-gray-900 px-6 py-3 rounded text-lg">See How It Works</Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold mb-4 text-center">Stop Missing Leads in Your Comments.</h2>
        <ul className="list-disc space-y-2 text-lg mx-8">
          <li>🔴 People comment “How much?” but never get a DM</li>
          <li>🔴 You forget to follow up, or respond too late</li>
          <li>🔴 Potential clients ghost after no reply</li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold mb-4 text-center">HomiBot Watches. Answers. Converts.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">✅ Detects Buyer Intent</h3>
            <p className="text-gray-600">Understands comments and flags hot leads.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">✅ Sends DMs Instantly</h3>
            <p className="text-gray-600">Links to listings, bookings, or next steps.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">✅ Filters Spam</h3>
            <p className="text-gray-600">Ignores bots, spam, and irrelevant noise.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">✅ Builds Pipeline</h3>
            <p className="text-gray-600">Capture leads automatically 24/7.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold mb-4 text-center">How It Works</h2>
        <ol className="list-decimal space-y-2 text-lg mx-8">
          <li>Connect Instagram & Facebook</li>
          <li>Set Up Auto-Replies & Links</li>
          <li>Watch Leads Roll In</li>
        </ol>
      </section>

      <section className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">What Agents Are Saying</h2>
        <p className="text-lg italic text-gray-600">
          “This saved me 10 hours a week and helped me close two deals from Instagram alone.”<br />– Happy Realtor
        </p>
      </section>

      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold mb-4 text-center">Features at a Glance</h2>
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Feature</th>
              <th className="p-3">What It Does</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">Auto-Reply</td>
              <td className="p-3">Answers comments instantly</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">DM Automation</td>
              <td className="p-3">Sends links & follow-ups</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Lead Capture</td>
              <td className="p-3">Collects names & emails</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">CRM Ready</td>
              <td className="p-3">Sync to your pipeline</td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer className="mt-20 text-center text-sm text-gray-500">
        <p>© 2025 HomiBot.ai — All rights reserved.</p>
        <div className="space-x-4 mt-2">
          <Link href="/account">Account Login</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </footer>
    </main>
  );
}

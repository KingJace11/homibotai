export default function ComingSoon() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-8 relative">
      {/* Top-right login button */}
      <div className="absolute top-6 right-6">
        <a
          href="/dashboard"
          className="bg-homi-primary text-white px-5 py-2 rounded-full shadow hover:bg-homi-accent transition"
        >
          Client Login
        </a>
      </div>

      <h1 className="text-5xl font-bold mb-4 text-center">Coming Soon 🚧</h1>
      <p className="text-xl text-center max-w-2xl mb-6">
        HomiBot.ai is almost ready to automate your real estate DMs and comments.
        Hang tight — we’re putting the final polish on it.
      </p>
      <a
        href="/privacy-policy"
        className="text-blue-600 underline hover:text-blue-800"
      >
        View our Privacy Policy
      </a>
    </main>
  );
}
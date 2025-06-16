export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto bg-white text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy describes how HomiBot.ai ("we", "our", or "us") collects,
        uses, and protects your information.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Email addresses submitted via our waitlist form</li>
        <li>Basic account info from Google sign-in (name, email)</li>
        <li>Instagram comment data (if connected)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Info</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To send you updates about HomiBot</li>
        <li>To provide automated replies and DMs based on your connected accounts</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
      <p className="mb-4">
        We do not sell your data. We only share necessary info with our backend
        systems and service providers (like Formspree or Meta APIs).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Your Rights</h2>
      <p className="mb-4">
        You can request deletion of your data at any time by contacting us at:{" "}
        <a href="mailto:hello@homibotai.com" className="underline text-blue-600">
          hello@homibotai.com
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Updates</h2>
      <p>
        We may update this policy from time to time. Changes will be reflected on this page.
      </p>
    </main>
  );
}

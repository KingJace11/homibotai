export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Auth Error</h1>
      <p className="text-lg">Something went wrong during sign-in.</p>
      <a href="/" className="mt-4 text-blue-600 underline">
        Go back to homepage
      </a>
    </main>
  );
}
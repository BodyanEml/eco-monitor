"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-10">
          <h2 className="text-4xl font-black mb-4 text-red-500">Critical System Failure</h2>
          <p className="opacity-60 mb-8 font-mono">Digest: {error.digest}</p>
          <button 
            onClick={() => reset()}
            className="bg-emerald-500 text-white px-10 py-4 rounded-full font-bold"
          >
            Restart Application
          </button>
        </div>
      </body>
    </html>
  );
}
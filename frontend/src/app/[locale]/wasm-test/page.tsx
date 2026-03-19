'use client';

import { useEffect, useState } from 'react';
import { initWasm } from '@reclamtrack/shared';

export default function WasmTestPage() {
  const [addResult, setAddResult] = useState<number | null>(null);
  const [priorityResult, setPriorityResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Correctly point to the Wasm file using a URL resolution
    // to avoid Webpack's 'module not found env' errors.
    const wasmUrl = new URL(
      '@reclamtrack/shared/build/release.wasm',
      import.meta.url
    ).href;

    initWasm(wasmUrl)
      .then((wasm) => {
        setAddResult(wasm.add_wasm(15, 27)); // Expected: 42
        setPriorityResult(wasm.calculate_priority_wasm(100, 5)); // Expected: 100 + (5 * 10) = 150
      })
      .catch((err) => {
        console.error("Failed to load Wasm module:", err);
        setError(err.message || String(err));
      });
  }, []);

  return (
    <div className="p-10 font-sans max-w-2xl mx-auto mt-10 shadow-lg rounded-lg border bg-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 border-b pb-2">
        🚀 WebAssembly (Wasm) POC
      </h1>

      <p className="mb-6 text-gray-700">
        This page demonstrates executing Rust/AssemblyScript logic compiled to WebAssembly
        and loaded via a manual `initWasm` loader in Next.js.
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          <strong>Error loading Wasm:</strong> {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md border">
          <h2 className="text-lg font-semibold mb-2">Math Test: <code className="text-sm bg-gray-200 px-1 rounded">add_wasm(15, 27)</code></h2>
          <div className="text-2xl font-mono text-green-600">
            {addResult !== null ? addResult : <span className="animate-pulse text-gray-400">Loading...</span>}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md border">
          <h2 className="text-lg font-semibold mb-2">Logic Test: <code className="text-sm bg-gray-200 px-1 rounded">calculate_priority_wasm(100, 5)</code></h2>
          <div className="text-2xl font-mono text-indigo-600">
            {priorityResult !== null ? priorityResult : <span className="animate-pulse text-gray-400">Loading...</span>}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t text-sm text-gray-500">
        Powered by Next.js and AssemblyScript (Manual Init).
      </div>
    </div>
  );
}

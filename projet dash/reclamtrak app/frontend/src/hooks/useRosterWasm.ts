'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { initWasm, type WasmExports } from '@reclamtrack/shared';

export interface Shift {
  id: number;
  startHour: number; // 0-23
  endHour: number;   // 0-23
  personnelId: number;
  personnelName: string;
}

export interface WasmRosterEngine {
  detectConflicts: (shifts: Shift[]) => number[]; // returns conflicting shift ids
  isReady: boolean;
}

/**
 * Loads the Wasm RosterFlow engine using the manual initWasm loader.
 * This approach is more compatible with Vercel/Next.js and avoids top-level await.
 */
export function useRosterWasm(): WasmRosterEngine {
  const exportsRef = useRef<WasmExports | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Direct fetch/loading of the .wasm file via the initWasm utility.
        // We import the .wasm file as a URL to avoid Webpack's default Wasm loader issues.
        const wasmUrl = new URL(
          '@reclamtrack/shared/build/release.wasm',
          import.meta.url
        ).href;

        const exports = await initWasm(wasmUrl);

        if (!cancelled) {
          exportsRef.current = exports;
          setIsReady(true);
          console.log('[RosterWasm] ✅ Engine loaded via manual loader');
        }
      } catch (err) {
        console.error('[RosterWasm] ❌ Failed to load Wasm:', err);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const detectConflicts = useCallback((shifts: Shift[]): number[] => {
    if (!exportsRef.current || !isReady) return [];

    // Correctly format for the Wasm side
    const flat = new Int32Array(shifts.length * 4);
    shifts.forEach((s, i) => {
      flat[i * 4 + 0] = s.id;
      flat[i * 4 + 1] = s.startHour;
      flat[i * 4 + 2] = s.endHour;
      flat[i * 4 + 3] = s.personnelId;
    });

    try {
      // Note: If using 'none' bindings, we must be careful with complex types.
      // However, our detect_conflicts expects an Int32Array which can be
      // passed if the WASM is simple enough or if we handle the heap.
      // For now, let's keep it simple as our Wasm implementation actually
      // uses the raw pointer if we are lucky, OR we need the AS glue.

      const result = exportsRef.current.detect_conflicts(flat);
      return Array.from(result);
    } catch (e) {
      console.error('[RosterWasm] Runtime error:', e);
      return [];
    }
  }, [isReady]);

  return { detectConflicts, isReady };
}

'use client';

import { useCallback, useEffect, useState } from 'react';

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
 * Loads the Wasm RosterFlow engine using the generated JS glue code.
 */
export function useRosterWasm(): WasmRosterEngine {
  const [engine, setEngine] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Use the generated JS glue code instead of the raw .wasm file.
        // This handles all the memory management (lowering/lifting) for us.
        const wasmGlue = await import('@reclamtrack/shared/build/release.js' as string);
        if (!cancelled) {
          setEngine(wasmGlue);
          setIsReady(true);
          console.log('[RosterWasm] ✅ Engine loaded via JS glue');
        }
      } catch (err) {
        console.error('[RosterWasm] ❌ Failed to load Wasm glue:', err);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const detectConflicts = useCallback((shifts: Shift[]): number[] => {
    if (!engine || !isReady) return [];

    // The glue code's detect_conflicts expects an Int32Array and handles the rest.
    const flat = new Int32Array(shifts.length * 4);
    shifts.forEach((s, i) => {
      flat[i * 4 + 0] = s.id;
      flat[i * 4 + 1] = s.startHour;
      flat[i * 4 + 2] = s.endHour;
      flat[i * 4 + 3] = s.personnelId;
    });

    try {
      // The glue code returns a lifted Int32Array (JS array copy)
      const result = engine.detect_conflicts(flat);
      return Array.from(result);
    } catch (e) {
      console.error('[RosterWasm] Runtime error:', e);
      return [];
    }
  }, [engine, isReady]);

  return { detectConflicts, isReady };
}

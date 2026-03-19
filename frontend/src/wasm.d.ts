declare module '*.wasm' {
  export function add_wasm(a: number, b: number): number;
  export function calculate_priority_wasm(baseScore: number, urgencyLevel: number): number;
  export const memory: WebAssembly.Memory;
}

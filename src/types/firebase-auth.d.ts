// Firebase's React Native entry exports this function at runtime, but the
// public `firebase/auth` declaration currently resolves to its web API types.
import 'firebase/auth';
declare module 'firebase/auth' {
  export function getReactNativePersistence(storage: {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
  }): Persistence;
}

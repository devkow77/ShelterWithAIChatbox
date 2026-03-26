export {};

declare const google: any;

declare global {
  interface Window {
    google: typeof google;
  }
}

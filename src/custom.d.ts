// tslint:disable

declare const PRODUCTION: boolean;
declare const VERSION: string;
declare const COMMIT_HASH: string;
declare const COMMIT_HASH_LONG: string;

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*build.json" {
  const content: Record<string, any>;
  export default content;
}

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 * @deprecated Only supported on Chrome and Android Webview.
 * from: https://stackoverflow.com/questions/51503754/typescript-type-beforeinstallpromptevent/51847335
 */
interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;
}

import { KiteCursor } from "../src";

declare var browser: any;
declare var chrome: any;

let ext: any;

if (typeof browser === "undefined") {
  ext = chrome;
} else {
  ext = browser;
}

(async () => {
  let disabled = false;
  try {
    disabled = (await ext.storage.sync.get("disabled")).disabled;
  } catch {
    // Do nothing, extension lacks permissions
  }

  const kiteCursor = new KiteCursor();

  if (disabled) {
    kiteCursor.hide();
  }

  ext.runtime.onMessage.addListener(
    (message: { disabled: any }, sendResponse: (_: any) => void) => {
      if (message?.disabled) {
        kiteCursor.hide();
      } else {
        kiteCursor.show();
      }

      sendResponse(true); // Fixes Chrome bug
    }
  );
})();

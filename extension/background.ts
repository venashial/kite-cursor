declare var browser: any;
declare var chrome: any;

let ext: any;
if (typeof browser === "undefined") {
  ext = chrome;
} else {
  ext = browser;
}

let browserAction = ext.action ?? ext.browserAction;

browserAction.onClicked.addListener(async () => {
  let disabled = false;

  try {
    disabled = !(await ext.storage.sync.get("disabled")).disabled;
  } catch (error) {
    // Do nothing
  }

  const tabs = await ext.tabs.query({
    currentWindow: true,
    active: true,
  });

  for (const tab of tabs) {
    await ext.tabs.sendMessage(tab.id, { disabled });
  }

  try {
    // @ts-ignore: `browser` in global namespace
    await browserAction.setIcon({
      path: {
        16: `icons/16${disabled ? "-gray" : ""}.png`,
        32: `icons/32${disabled ? "-gray" : ""}.png`,
      },
    });
  } catch {
    // Do nothing
  }

  await ext.storage.sync.set({
    disabled,
  });

  console.log(`Extension is ${disabled ? "disabled" : "enabled"}`);
});

export {};

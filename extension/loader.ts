import "webextension-polyfill";

(async () => {
  let disabled = false;
  try {
    // @ts-ignore: `browser` in global namespace
    disabled = (await browser.storage.sync.get("disabled")).disabled;
  } catch {
    // Do nothing, extension lacks permissions
  }
  console.log((await browser.storage.sync.get("disabled")).disabled)
  console.log({disabled})

  if (!disabled) {
    console.log('not disabled')
    await import("../src/index");
  }
})();

/*
 * TODO: Make module export some `start()` function
 * TODO: Make minified version run `start()` be default
 */

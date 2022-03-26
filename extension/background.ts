import 'webextension-polyfill'

// @ts-ignore: `browser` in global namespace
(browser.browserAction ?? chrome.action).onClicked.addListener(async () => {
    let disabled = false

    try {
        // @ts-ignore: `browser` in global namespace
        disabled = !(await browser.storage.sync.get('disabled')).disabled
    } catch {
        // Do nothing
    }

    // try {
    //     // @ts-ignore: `browser` in global namespace
    //     await (browser.browserAction ?? chrome.action).setIcon({
    //         path: {
    //             16: `icons/${disabled ? 'gray-' : ''}16.png`,
    //             32: `icons/${disabled ? 'gray-' : ''}32.png`,
    //         },
    //     })
    // } catch {
    //     // Do nothing
    // }

    // @ts-ignore: `browser` in global namespace
    await browser.storage.sync.set({
        disabled,
    });

    console.log(`Extension ${disabled}`);

    if (disabled) {
        (browser.browserAction ?? chrome.action).setBadgeText({text: 'Disabled'});
        (browser.browserAction ?? chrome.action).setBadgeBackgroundColor({color: "red"});
    } else {
        (browser.browserAction ?? chrome.action).setBadgeText({text: ''});
    }
})

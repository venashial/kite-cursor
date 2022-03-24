browser.browserAction.onClicked.addListener(async () => {
    try {
        const disabled = (await browser.storage.sync.get('disabled'));

        await browser.browserAction.setIcon({
            path: {
                16: `icons/${disabled ? 'gray-' : ''}16.png`,
                32: `icons/${disabled ? 'gray-': ''}32.png`
            }
        })

        await browser.storage.sync.set({
            disabled,
        });
    }
});

// start function
const startSakura = () => {
    // refrain from repeated startup
    if (window.hasSakuraRainStarted) return;
    window.hasSakuraRainStarted = true;
    const manager = new SakuraManager();
    manager.init();
    console.log('Extension started successfully. ');
};

if (document.readyState === 'complete') {
    startSakura();
} else {
    window.addEventListener('load', startSakura);
}
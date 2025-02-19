// put some code here
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const slider = document.getElementById('slider');
    let animationFrameId;
    let lastTimestamp;

    function moveSlider(timestamp) {
        if (lastTimestamp !== undefined) {
            const delta = (timestamp - lastTimestamp) / 10.0;
            slider.value = (parseInt(slider.value, 10) + delta) % 100;
        }
        lastTimestamp = timestamp;
        animationFrameId = window.requestAnimationFrame(moveSlider);
    }

    startButton.addEventListener('click', () => {
        if (!animationFrameId) {
            lastTimestamp = undefined;
            animationFrameId = window.requestAnimationFrame(moveSlider);
        }
    });

    stopButton.addEventListener('click', () => {
        if (animationFrameId) {
            window.cancelAnimationFrame(animationFrameId);
            animationFrameId = undefined;
        }
    });
});
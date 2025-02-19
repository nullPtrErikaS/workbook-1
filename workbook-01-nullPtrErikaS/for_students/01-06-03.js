// put some code here
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    let animationFrameId;
    let lastTimestamp;
    let direction = 1; // 1 for right, -1 for left

    function moveSlider(timestamp) {
        if (lastTimestamp !== undefined) {
            const delta = (timestamp - lastTimestamp) / 10.0;
            let newValue = parseInt(slider.value, 10) + delta * direction;

            if (newValue >= 100) {
                newValue = 100;
                direction = -1;
            } else if (newValue <= 0) {
                newValue = 0;
                direction = 1;
            }

            slider.value = newValue;
        }
        lastTimestamp = timestamp;
        animationFrameId = window.requestAnimationFrame(moveSlider);
    }

    animationFrameId = window.requestAnimationFrame(moveSlider);
});
document.addEventListener('DOMContentLoaded', () => {
    const span = document.getElementById('ex3-span');
    let animationFrameId;
    let lastTimestamp;
    let direction = 1; // 1 for increasing red, -1 for decreasing red
    let t = 0; // interpolation parameter

    function updateColor(timestamp) {
        if (lastTimestamp !== undefined) {
            const delta = (timestamp - lastTimestamp) / 1000; // convert to seconds
            t += delta * direction;

            if (t >= 1) {
                t = 1;
                direction = -1;
            } else if (t <= 0) {
                t = 0;
                direction = 1;
            }

            const redValue = Math.round(t * 255);
            const color = `rgb(${redValue}, ${255 - redValue}, ${255 - redValue})`;
            span.style.backgroundColor = color;
        }
        lastTimestamp = timestamp;
        animationFrameId = window.requestAnimationFrame(updateColor);
    }

    animationFrameId = window.requestAnimationFrame(updateColor);
});
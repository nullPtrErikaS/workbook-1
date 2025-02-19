// put some code here
document.addEventListener('DOMContentLoaded', () => {
    const span = document.getElementById('ex3-span');
    let animationFrameId;
    let lastTimestamp;
    let t = 0; // interpolation parameter
    let phase = 0; // 0: red to yellow, 1: yellow to green, 2: green to red

    function updateColor(timestamp) {
        if (lastTimestamp !== undefined) {
            const delta = (timestamp - lastTimestamp) / 1000; // convert to seconds
            t += delta;

            if (t >= 1) {
                t = 0;
                phase = (phase + 1) % 3;
            }

            let color;
            if (phase === 0) {
                // Red to Yellow
                const redValue = 255;
                const greenValue = Math.round(t * 255);
                color = `rgb(${redValue}, ${greenValue}, 0)`;
            } else if (phase === 1) {
                // Yellow to Green
                const redValue = Math.round((1 - t) * 255);
                const greenValue = 255;
                color = `rgb(${redValue}, ${greenValue}, 0)`;
            } else {
                // Green to Red
                const redValue = Math.round(t * 255);
                const greenValue = Math.round((1 - t) * 255);
                color = `rgb(${redValue}, ${greenValue}, 0)`;
            }

            span.style.backgroundColor = color;
        }
        lastTimestamp = timestamp;
        animationFrameId = window.requestAnimationFrame(updateColor);
    }

    animationFrameId = window.requestAnimationFrame(updateColor);
});
// put some code here
document.addEventListener('DOMContentLoaded', () => {
    const span = document.getElementById('ex3-span');
    const redButton = document.getElementById('red-button');
    const yellowButton = document.getElementById('yellow-button');
    const greenButton = document.getElementById('green-button');
    let animationFrameId;
    let lastTimestamp;
    let t = 0; // interpolation parameter
    let targetColor = [255, 255, 255]; // default white
    let startColor = [255, 255, 255]; // default white

    function updateColor(timestamp) {
        if (lastTimestamp !== undefined) {
            const delta = (timestamp - lastTimestamp) / 2000; // convert to seconds, 2 seconds duration
            t += delta;

            if (t >= 1) {
                t = 1;
            }

            const currentColor = startColor.map((start, index) => {
                return Math.round(start + t * (targetColor[index] - start));
            });

            const color = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
            document.body.style.backgroundColor = color;

            if (t < 1) {
                animationFrameId = window.requestAnimationFrame(updateColor);
            }
        }
        lastTimestamp = timestamp;
    }

    function startTransition(color, colorName) {
        span.textContent = ` some text that will become ${colorName}`;
        const computedStyle = getComputedStyle(document.body);
        const rgb = computedStyle.backgroundColor.match(/\d+/g);
        startColor = rgb ? rgb.map(Number) : [255, 255, 255];
        targetColor = color;
        t = 0;
        lastTimestamp = undefined;
        if (animationFrameId) {
            window.cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = window.requestAnimationFrame(updateColor);
    }

    redButton.addEventListener('click', () => startTransition([255, 0, 0], 'red'));
    yellowButton.addEventListener('click', () => startTransition([255, 255, 0], 'yellow'));
    greenButton.addEventListener('click', () => startTransition([0, 255, 0], 'green'));
});
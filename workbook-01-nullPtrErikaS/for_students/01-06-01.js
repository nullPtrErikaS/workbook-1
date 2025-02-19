// put some code here
document.addEventListener('DOMContentLoaded', () => {
    const slider1 = document.getElementById('slider1');
    const slider2 = document.getElementById('slider2');
    const slider3 = document.getElementById('slider3');

    function updateSlider3() {
        slider3.value = slider2.value - slider1.value;
    }

    function updateSlidersFromSlider3() {
        const diff = parseInt(slider3.value, 10);
        const avg = (parseInt(slider1.value, 10) + parseInt(slider2.value, 10)) / 2;
        slider1.value = avg - diff / 2;
        slider2.value = avg + diff / 2;
    }

    slider1.addEventListener('input', updateSlider3);
    slider2.addEventListener('input', updateSlider3);
    slider3.addEventListener('input', updateSlidersFromSlider3);

    // Initialize slider3 value
    updateSlider3();
});
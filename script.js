document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 700; // Adjust the width for mobile devices
    const generateButton = document.querySelector('.generate-button');
    const lines = document.querySelectorAll('.line');

    // Initialize locked state for each line
    const lockedLines = Array.from(lines).map(() => false);

    // Set default colors and add lock icon on page load
    setDefaultColors();

    // Add event listener for space bar press on desktop
    if (!isMobile) {
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space') {
                generateColors();
            }
        });
    } else {
        // Show the generate button only on mobile
        generateButton.style.display = 'flex';
        generateButton.addEventListener('click', function() {
            generateColors();
        });
    }

    function setDefaultColors() {
        lines.forEach((line, index) => {
            line.style.backgroundColor = generateRandomColor();
            addLockIcon(line, index);
        });
    }

    function generateColors() {
        lines.forEach((line, index) => {
            // Check if the line is not locked before changing the color
            if (!lockedLines[index]) {
                line.style.backgroundColor = generateRandomColor();
            }
        });
    }

    function generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function addLockIcon(line, index) {
        const lockIcon = document.createElement('i');
        lockIcon.className = 'fa-solid fa-lock additional-icon';
        lockIcon.onclick = function() {
            toggleLock(index, lockIcon);
        };
        line.appendChild(lockIcon);
    }

    function toggleLock(index, lockIcon) {
        lockedLines[index] = !lockedLines[index];
        const newColor = lockedLines[index] ? 'red' : 'white';
        lockIcon.style.color = newColor;
    }
});

function copyColorCode(icon) {
    const line = icon.parentElement;
    const rgbColorCode = line.style.backgroundColor;

    // Convert RGB to HEX
    const hexColorCode = rgbToHex(rgbColorCode);

    // Create a temporary input element to copy the color code
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = hexColorCode;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Provide visual feedback to the user (optional)
    icon.style.color = 'red';
    setTimeout(() => {
        icon.style.color = 'white';
    }, 1000);
}

// Function to convert RGB to HEX
function rgbToHex(rgb) {
    // Extract the RGB values from the string
    const rgbArray = rgb.match(/\d+/g);
    
    // Convert each value to HEX and concatenate
    const hexCode = rgbArray.map(value => {
        const hexValue = parseInt(value).toString(16);
        return hexValue.length === 1 ? "0" + hexValue : hexValue;
    }).join('');

    return "#" + hexCode.toUpperCase();
}

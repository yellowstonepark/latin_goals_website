document.addEventListener('DOMContentLoaded', () => {
    const paragraphs = document.querySelectorAll('.paragraph');

    paragraphs.forEach((paragraph, index) => {
        const duration = 5 + Math.random() * 5; // Random duration between 5 and 10 seconds
        const delay = Math.random() * 5; // Random delay between 0 and 5 seconds
        const direction = Math.random() > 0.5 ? 'alternate' : 'alternate-reverse'; // Random direction

        // Set the animation properties
        paragraph.style.animation = `moveBackAndForth ${duration}s ${direction} infinite ${delay}s`;

        // Dynamically create and add keyframes for each paragraph
        const keyframes = `
            @keyframes moveBackAndForth-${index} {
                0% { transform: translateX(0); }
                50% { transform: translateX(${window.innerWidth - paragraph.clientWidth}px); }
                100% { transform: translateX(0); }
            }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = keyframes;
        document.head.appendChild(styleSheet);

        // Apply the custom keyframes to the paragraph
        paragraph.style.animationName = `moveBackAndForth-${index}`;
    });
});
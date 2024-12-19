document.addEventListener('DOMContentLoaded', function () {
    // Get all the share buttons
    const shareButtons = document.querySelectorAll('.sl-share-button');

    // Add click event to each button
    shareButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Determine the platform to share on
            const platform = this.getAttribute('sl-share');
            const shareURL = window.location.href; // Current page URL
            const shareText = document.title; // Page title or custom text
            let url = '';

            // Check if there is an image with id="cover"
            const coverImage = document.getElementById('cover');
            const coverImageUrl = coverImage ? coverImage.src : ''; // Get the src of the cover image

            // Build the share URL based on the platform
            switch (platform) {
                case 'facebook':
                    url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`;
                    break;
                case 'whatsapp':
                    url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareURL)}`;
                    break;
                case 'email':
                    url = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareText + ' ' + shareURL)}`;
                    break;
                case 'pinterest':
                    if (coverImageUrl) {
                        url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareURL)}&media=${encodeURIComponent(coverImageUrl)}&description=${encodeURIComponent(shareText)}`;
                    } else {
                        console.error('Cover image not found for Pinterest sharing.');
                        return;
                    }
                    break;
                default:
                    console.error(`Unsupported share platform: ${platform}`);
                    return; // Exit if the platform is not recognized
            }

            // Open the share URL in a new window
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
});

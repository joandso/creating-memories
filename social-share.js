document.addEventListener('DOMContentLoaded', function() {
    // Get all the share buttons
    const shareButtons = document.querySelectorAll('.sl-share-button');

    // Add click event to each button
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Determine the platform to share on
            const platform = this.getAttribute('sl-share');
            const shareURL = window.location.href; // Current page URL
            const shareText = document.title; // Page title or custom text

            let url = '';

            // Build the share URL based on the platform
            switch(platform) {
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
                    url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareURL)}`;
                    break;
                default:
                    return;
            }

            // Open the share URL in a new window
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    });
});

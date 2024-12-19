document.addEventListener('DOMContentLoaded', function () {
    // Get all the share buttons
    const shareButtons = document.querySelectorAll('.sl-share-button');

    shareButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Determine the platform to share on
            const platform = this.getAttribute('sl-share');
            const shareURL = window.location.href; // Current page URL
            const shareText = document.title; // Page title or custom text

            let url = '';

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
                    const coverImage = document.getElementById('cover');
                    if (coverImage) {
                        const srcset = coverImage.getAttribute('srcset');
                        let largestImageURL = coverImage.getAttribute('src');

                        if (srcset) {
                            const sources = srcset.split(',').map(source => {
                                const [url, size] = source.trim().split(' ');
                                return { url, size: parseInt(size.replace('w', ''), 10) };
                            });
                            const largestImage = sources.reduce((largest, current) => current.size > largest.size ? current : largest);
                            largestImageURL = largestImage.url;
                        }

                        url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareURL)}&media=${encodeURIComponent(largestImageURL)}&description=${encodeURIComponent(shareText)}`;
                    }
                    break;
                default:
                    console.error(`Unsupported share platform: ${platform}`);
                    return;
            }

            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
});

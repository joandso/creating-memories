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
                    // Get the cover image element
                    const coverImage = document.getElementById('cover');
                    if (coverImage) {
                        const srcset = coverImage.getAttribute('srcset');
                        let largestImageURL = coverImage.getAttribute('src'); // Default to src if srcset is unavailable

                        if (srcset) {
                            // Split the `srcset` string into individual image entries
                            const sources = srcset.split(',').map(source => {
                                const [url, size] = source.trim().split(' ');
                                return { url, size: parseInt(size.replace('w', ''), 10) }; // Parse size as a number
                            });

                            // Find the largest resolution URL
                            const largestImage = sources.reduce((largest, current) => {
                                return current.size > largest.size ? current : largest;
                            });

                            largestImageURL = largestImage.url;
                        }

                        // Construct Pinterest share URL
                        url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareURL)}&media=${encodeURIComponent(largestImageURL)}&description=${encodeURIComponent(shareText)}`;
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

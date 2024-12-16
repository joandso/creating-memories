document.addEventListener('DOMContentLoaded', function () {
    const shareButtons = document.querySelectorAll('.sl-share-button');

    shareButtons.forEach(button => {
        button.addEventListener('click', function () {
            const platform = this.getAttribute('sl-share');
            const shareURL = window.location.href; // Current page URL
            const shareText = document.title; // Page title or custom text

            let url = '';

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
                    // Collect all images on the page
                    const images = Array.from(document.querySelectorAll('img'))
                        .filter(img => img.width > 100 && img.height > 100); // Exclude small icons

                    if (images.length === 0) {
                        console.error('No suitable images found on the page.');
                        return;
                    }

                    // Display image picker
                    const picker = document.createElement('div');
                    picker.style.position = 'fixed';
                    picker.style.top = '0';
                    picker.style.left = '0';
                    picker.style.width = '100%';
                    picker.style.height = '100%';
                    picker.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    picker.style.zIndex = '1000';
                    picker.style.display = 'flex';
                    picker.style.flexWrap = 'wrap';
                    picker.style.justifyContent = 'center';
                    picker.style.alignItems = 'center';

                    images.forEach(img => {
                        const imgOption = document.createElement('img');
                        imgOption.src = img.src;
                        imgOption.style.width = '100px';
                        imgOption.style.height = 'auto';
                        imgOption.style.margin = '10px';
                        imgOption.style.cursor = 'pointer';
                        imgOption.style.border = '2px solid transparent';

                        imgOption.addEventListener('click', function () {
                            // Highlight the selected image
                            images.forEach(option => (option.style.border = '2px solid transparent'));
                            this.style.border = '2px solid #fff';

                            // Generate the Pinterest URL with the selected image
                            const selectedImage = this.src;
                            url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareURL)}&media=${encodeURIComponent(selectedImage)}&description=${encodeURIComponent(shareText)}`;
                            console.log('Generated Pinterest URL:', url); // Debug

                            // Open the Pinterest share dialog
                            window.open(url, '_blank', 'noopener,noreferrer');

                            // Remove the picker
                            picker.remove();
                        });

                        picker.appendChild(imgOption);
                    });

                    document.body.appendChild(picker);

                    return; // Exit to prevent immediate Pinterest sharing
                default:
                    console.error(`Unsupported share platform: ${platform}`);
                    return;
            }

            // Open the share URL in a new window
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
});

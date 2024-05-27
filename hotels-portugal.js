// Close Modal on Show Results button
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.querySelector('.fs_modal-1_popup').style.display = 'none';
    });
});

// Schema Collection
document.addEventListener('DOMContentLoaded', function() {
    let hotels = document.querySelectorAll('.c-cards-item');
    let schemaList = {
        "@context": "https://schema.org/",
        "@type": "ItemList",
        "name": "Best Hotels in Portugal by JO&SO",
        "description": "An online guide to the best hotels in Portugal by JO&SO.",
        "url": "https://www.joandso.com/best-hotels-portugal",
        "itemListElement": []
    };

    hotels.forEach((hotel, index) => {
        let name = hotel.querySelector('.heading-medium').innerText;
        let url = hotel.querySelector('.sl-url').href;
        let imageUrl = hotel.querySelector('.c-card-slider__image').src;

        schemaList.itemListElement.push({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Hotel",
                "name": name,
                "url": url,
                "image": imageUrl
            }
        });
    });

    let scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.innerHTML = JSON.stringify(schemaList);
    document.body.appendChild(scriptTag);
});

// Schema FAQs
document.addEventListener('DOMContentLoaded', function() {
    const accordionWrapper = document.querySelector('.accordion-wrapper');
    if (!accordionWrapper) return;

    const accordionItems = accordionWrapper.querySelectorAll('.accordion-item');
    const faqPage = document.createElement('script');
    faqPage.type = 'application/ld+json';
    faqPage.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [...accordionItems].map((item, index) => {
            const question = item.querySelector('.accordion-heading');
            const answer = item.querySelector('.accordion-item-answer');

            return {
                "@type": "Question",
                "name": question.textContent.trim(),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": answer.textContent.trim()
                }
            };
        })
    });

    accordionWrapper.parentNode.insertBefore(faqPage, accordionWrapper);
});

// Move Region Tags
document.addEventListener('DOMContentLoaded', function() {
    function moveRegionTags() {
        let moved = false;

        document.querySelectorAll('.sl-cards_info').forEach(function(card) {
            const tagsStatic = card.querySelector('.sl-tags_static');
            const tagsGrid = card.querySelector('.sl-tags-grid.w-dyn-items');

            if (tagsStatic && tagsGrid) {
                const regionTagLinks = tagsStatic.querySelectorAll('.sl-tag_link');

                if (regionTagLinks.length > 0) {
                    moved = true;
                }

                Array.from(regionTagLinks).reverse().forEach(function(tagLink) {
                    const listItemWrapper = document.createElement('div');
                    listItemWrapper.setAttribute('role', 'listitem');
                    listItemWrapper.setAttribute('class', 'sl-tag_link w-dyn-item');
                    
                    listItemWrapper.appendChild(tagLink);
                    tagsGrid.prepend(listItemWrapper);
                });
            }
        });

        if (moved) {
            clearInterval(intervalId);
        }
    }

    let intervalId = setInterval(moveRegionTags, 500);
});

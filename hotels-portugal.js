// Close Modal on Show Results button
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.querySelector('.fs_modal-1_popup').style.display = 'none';
    });
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

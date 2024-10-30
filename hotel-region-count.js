document.addEventListener("DOMContentLoaded", function () {
    console.log("Region Count Script Running");

    const hotels = document.querySelectorAll("[sl='item']");
    const regionHotels = {};

    hotels.forEach((hotel) => {
        const regionElement = hotel.querySelector("[sl-region]");
        if (regionElement) {
            const region = regionElement.getAttribute("sl-region").trim();
            const hotelName = regionElement.textContent.trim();

            if (!regionHotels[region]) {
                regionHotels[region] = [];
            }
            regionHotels[region].push(hotelName);
        } else {
            console.warn("Missing region for a hotel item.");
        }
    });

    // Display the grouped hotels by region
    console.log("Hotels grouped by region:", regionHotels);

    // Calculate and display counts by region
    const regionCounts = {};
    for (const region in regionHotels) {
        regionCounts[region] = regionHotels[region].length;
    }

    console.log("Accurate Hotel Counts by Region:", regionCounts);
});

document.addEventListener("DOMContentLoaded", function () {
    const hotels = document.querySelectorAll("[sl='item']");
    const validRegions = [
        "Alentejo",
        "Algarve",
        "Azores",
        "Central",
        "Lisbon",
        "Madeira",
        "North & Douro",
        "Porto"
    ];
    const regionHotels = {};

    hotels.forEach((hotel) => {
        const regionElement = hotel.querySelector("[sl-type='region']");
        const hotelName = hotel.querySelector("div:first-child").textContent.trim();

        if (regionElement && hotelName) {
            const region = regionElement.textContent.trim();

            if (validRegions.includes(region)) {
                if (!regionHotels[region]) {
                    regionHotels[region] = [];
                }
                regionHotels[region].push(hotelName);
            } else {
                console.warn(`Unrecognized region found: ${region}`);
            }
        } else {
            console.warn("Missing region or hotel name for an item.");
        }
    });

    // Display hotels by region
    console.log("Hotels grouped by region:", regionHotels);

    // Calculate and display counts
    const regionCounts = {};
    for (const region in regionHotels) {
        regionCounts[region] = regionHotels[region].length;
    }

    console.log("Accurate Hotel Counts by Region:", regionCounts);
});

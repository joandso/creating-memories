// Search Focus
$("#search-toggle").click(function() {
  document.getElementById("search-input").focus();
});

$("#search-toggle-2").click(function() {
  document.getElementById("search-input").focus();
});

$("#news-toggle").click(function() {
  document.getElementById("news-input").focus();
});

// Subscribe Form Refresh
var Webflow = Webflow || [];
Webflow.push(function () {
    $("#wf-form-Mailing-List").submit(function (event) {
        setTimeout(function () { location.reload(true); }, 4000);
    });
});

// Links Labels
document.addEventListener('DOMContentLoaded', function() {
    let localStorageSupported = checkLocalStorageSupport();
    const urlParams = new URLSearchParams(window.location.search);
    const labelsToCheck =  ['utm_campaign', 'utm_adgroup', 'utm_medium', 'utm_id', 'gclid', 'gbraid'];
    let marketingLabels = captureMarketingLabels(urlParams, labelsToCheck, localStorageSupported);

    if (!localStorageSupported) {
        appendLabelsToInternalLinks(marketingLabels, labelsToCheck);
    }

    console.log('labels found:', marketingLabels);
    let hasMarketingLabels = labelsToCheck.some(label => marketingLabels[label]);

    // Only run modifyBookingLinks if not on the homepage
    if (window.location.pathname !== '/') {
        modifyBookingLinks(marketingLabels, hasMarketingLabels, labelsToCheck);
    }
});

function checkLocalStorageSupport() {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch (e) {
        console.log('localStorage is not supported:', e);
        return false;
    }
}

function captureMarketingLabels(urlParams, labelsToCheck, localStorageSupported) {
    let marketingLabels = {};
    labelsToCheck.forEach(label => {
        const value = urlParams.get(label);
        if (value) {
            marketingLabels[label] = value;
            if (localStorageSupported) {
                localStorage.setItem(label, value);
            }
        } else if (localStorageSupported && localStorage.getItem(label)) {
            marketingLabels[label] = localStorage.getItem(label);
        }
    });
    return marketingLabels;
}

function appendLabelsToInternalLinks(marketingLabels, labelsToCheck) {
    document.querySelectorAll('a[href]').forEach(link => {
        const linkUrl = new URL(link.href, window.location.origin);
        if (linkUrl.origin === window.location.origin) {
            labelsToCheck.forEach(key => {
                if (marketingLabels[key]) {
                    linkUrl.searchParams.set(key, marketingLabels[key]);
                }
            });
            link.href = linkUrl.toString();
        }
    });
}

function modifyBookingLinks(marketingLabels, hasMarketingLabels, labelsToCheck) {
    document.querySelectorAll('a[href*="booking.com"]').forEach(link => {
        const linkUrl = new URL(link.href);
        if (hasMarketingLabels) {
            const labelsString = labelsToCheck
                .filter(key => marketingLabels[key])
                .map(key => `${key}:${marketingLabels[key]}`)
                .join('|');
            linkUrl.searchParams.set('label', labelsString);
        }
        linkUrl.searchParams.set('aid', hasMarketingLabels ? '2413204' : '322494');
        link.href = linkUrl.toString();
    });
}

let map, directionsService, directionsRenderer;
let destination = { lat: 28.6285, lng: 77.2154 }; // Example coordinates for safe spot
let currentLocation;

// Page Navigation
document.getElementById("start-running").addEventListener("click", () => {
    document.getElementById("page-1").classList.add("hidden");
    document.getElementById("page-2").classList.remove("hidden");
    initializeMap();
});

document.getElementById("reached-safe-spot").addEventListener("click", () => {
    if (confirm("Have you reached the safe spot?")) {
        document.getElementById("page-2").classList.add("hidden");
        document.getElementById("page-3").classList.remove("hidden");
    }
});

document.getElementById("not-reached-safe-spot").addEventListener("click", () => {
    alert("Stay safe and follow the directions!");
});

// Initialize Map
// Ensure this function is in the global scope
function initializeMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    // Initialize the map centered at a default location
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 28.6139, lng: 77.2090 }, // Default location (New Delhi)
        zoom: 14,
    });

    // Set the directions renderer to use the initialized map
    directionsRenderer.setMap(map);

    // Attempt to get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                calculateAndDisplayRoute(); // Calculate route after getting current location
            },
            () => {
                alert("Unable to fetch your location.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}


// Calculate Route
function calculateAndDisplayRoute() {
    directionsService.route(
        {
            origin: currentLocation,
            destination: destination,
            travelMode: google.maps.TravelMode.WALKING,
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
                speakDirections(response.routes[0].legs[0].steps);
            } else {
                alert("Directions request failed due to " + status);
            }
        }
    );
}

// Voice Navigation
function speakDirections(steps) {
    const speechSynthesis = window.speechSynthesis;
    steps.forEach((step, index) => {
        setTimeout(() => {
            const message = new SpeechSynthesisUtterance(step.instructions.replace(/<[^>]*>?/gm, ""));
            speechSynthesis.speak(message);
        }, index * 5000); // 5-second interval between instructions
    });
}
let reservedSlot = null;

function reserveSlot(slotId) {
    if (reservedSlot) {
        alert("You already have a reservation. Please dismiss it before making a new one.");
        return; // Prevent further action if a reservation is already made
    }

    reservedSlot = slotId; // Set the reserved slot

    // Hide all reservation buttons, regardless of slot availability
    document.querySelectorAll(".reserve-button").forEach(button => {
        button.style.display = "none"; // Hide all buttons
    });

    // Change the color of the reserved slot
    document.getElementById(slotId).style.backgroundColor = "orange"; // Orange for reserved

    // Show dismiss button
    document.getElementById("dismiss-button").style.display = "block";
}

function dismissReservation() {
    if (!reservedSlot) return; // Do nothing if no slot is reserved

    reservedSlot = null; // Clear the reserved slot

    // Show all reservation buttons
    document.querySelectorAll(".reserve-button").forEach(button => {
        button.style.display = "inline-block"; // Show all buttons
    });

    // Restore the color of all slots based on sensor data
    document.querySelectorAll(".parking-slot").forEach(slot => {
        slot.style.backgroundColor = "#545454"; // Default color for available slots
    });

    // Hide dismiss button
    document.getElementById("dismiss-button").style.display = "none";
}

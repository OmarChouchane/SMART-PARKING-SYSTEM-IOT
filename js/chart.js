function updateSlotColor(distance, slotId) {
    const slotElement = document.getElementById(slotId);
    const reserveButton = document.getElementById(`${slotId}-reserve`);

    // If a slot is reserved, show the reserved color and hide the button
    if (reservedSlot === slotId) {
        slotElement.style.backgroundColor = "orange"; // Reserved color
        if (reserveButton) {
            reserveButton.style.display = "none"; // Hide the reserve button when reserved
        }
    } else {
        // If no slot is reserved, manage the button visibility based on distance
        if (distance > 7) {
            slotElement.style.backgroundColor = "#4CAF50"; // Green (available)
            if (reserveButton) {
                reserveButton.style.display = "inline-block"; // Show reserve button for available slot
            }
        } else {
            slotElement.style.backgroundColor = "#F44336"; // Red (occupied)
            if (reserveButton) {
                reserveButton.style.display = "none"; // Hide reserve button for occupied slot
            }
        }
    }
}

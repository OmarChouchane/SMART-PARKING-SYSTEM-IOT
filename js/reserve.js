let reservedSlot = null;

// Function to check if there are available slots
function checkAvailableSlots() {
    const slots = document.querySelectorAll(".parking-slot");
    let availableSlots = [];

    slots.forEach(slot => {
        // Check if the slot is not reserved or occupied (e.g., green for available)
        if (slot.style.backgroundColor === "rgb(76, 175, 80)") { // Green color for available slots
            availableSlots.push(slot.id); // Push the slot ID to the availableSlots array
        }
    });

    if (availableSlots.length > 0) {
        return `Available slots are: ${availableSlots.join(", ")}.`; // Join the IDs into a string
    } else {
        return "No slots available.";
    }
}


function reserveSlot(slotId) {
    const slot = document.getElementById(slotId);

    // Check if the slot is available (e.g., green for available)
    if (slot.style.backgroundColor !== "rgb(76, 175, 80)") { // Green color for available slots
        return `${slotId} is not available.`;
    }

    if (reservedSlot) {
        return "You already have a reservation.";
    }

    reservedSlot = slotId; // Set the reserved slot

    // Hide all reservation buttons, regardless of slot availability
    document.querySelectorAll(".reserve-button").forEach(button => {
        button.style.display = "none"; // Hide all buttons
    });

    // Change the color of the reserved slot
    slot.style.backgroundColor = "orange"; // Orange for reserved

    // Show dismiss button
    document.getElementById("dismiss-button").style.display = "block";
    return `${slotId} has been reserved.`;
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

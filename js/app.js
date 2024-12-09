let currentTime = 0; // Current time in milliseconds
let interval = 500; // Interval in milliseconds

// Initial data and configurations for Chart.js
const ctx = document.getElementById('sensorGraph').getContext('2d');
const sensorGraph = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Time labels (e.g., seconds)
        datasets: [
            {
                label: 'Sensor 1',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
            },
            {
                label: 'Sensor 2',
                data: [],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: false,
            },
            {
                label: 'Sensor 3',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
            }
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: false,
                    text: 'Time (seconds)',
                },
            },
            y: {
                beginAtZero: true,
                min: 0,       // Minimum y-axis value
                max: 30,      // Maximum y-axis value
                title: {
                    display: true,
                    text: 'Distance (cm)',
                },
            },
        },
    },
});

// Fetch and update the graph every second
async function fetchSensorData() {
    try {
        const response = await fetch("http://127.0.0.1:8000/sensors");
        const data = await response.json();
        
        // Check if the data is valid (i.e., not all -1 values)
        if (!data || (data.sensor_1 === -1 && data.sensor_2 === -1 && data.sensor_3 === -1)) {
            console.error("No valid data received. Skipping update.");
            return;
        }

        currentTime += interval; // Increment time by interval
        sensorGraph.data.labels.push('');
        sensorGraph.data.datasets[0].data.push(data.sensor_1);
        sensorGraph.data.datasets[1].data.push(data.sensor_2);
        sensorGraph.data.datasets[2].data.push(data.sensor_3);

        sensorGraph.update(); // Redraw the graph

        // Update slot colors based on distance data
        updateSlotColor(data.sensor_1, "slot1");
        updateSlotColor(data.sensor_2, "slot2");
        updateSlotColor(data.sensor_3, "slot3");

    } catch (error) {
        console.error("Error fetching sensor data:", error);
    }
}

// Fetch data at a regular interval
const dataFetchInterval = setInterval(fetchSensorData, interval);

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    console.error("Speech recognition is not supported in this browser.");
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set the language to English
    recognition.interimResults = false; // Only final results
    recognition.maxAlternatives = 1; // Max alternative results
    
    recognition.onstart = () => {
        console.log("Voice recognition started.");
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        speak("There was an error with the voice recognition.");
    };

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase().trim(); // Get the recognized text
        console.log("Voice Command:", command);

        // Process the command
        processVoiceCommand(command);
    };

    // Start the voice recognition
    function startListening() {
        recognition.start();
    }

    // Call startListening to begin voice recognition (e.g., when user clicks a button)
    document.getElementById("start-voice-button").addEventListener("click", startListening);
}

function processVoiceCommand(command) {
    // Normalize the command to handle variations
    let responseText = '';

    if (command.includes("reserve slot 1")) {
        responseText = reserveSlot("slot1");
    } else if (command.includes("reserve slot 2")) {
        responseText = reserveSlot("slot2");
    } else if (command.includes("reserve slot 3")) {
        responseText = reserveSlot("slot3");
    } else if (command.includes("dismiss reservation")) {
        dismissReservation();
        responseText = "Reservation has been dismissed.";
    }else if (command.includes("available slots")) {
        // Check available slots and respond
        responseText = checkAvailableSlots();
    } else {
        responseText = "Command not recognized.";
    }

    // Speak and alert the response
    speak(responseText);
    alert(responseText); // Display as an alert
}

function speak(text) {
    const voiceResponse = document.getElementById('voiceResponse');
    //voiceResponse.innerHTML = text; // Display the voice response on the page

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // Set language to English
    window.speechSynthesis.speak(speech); // Speak the text
}

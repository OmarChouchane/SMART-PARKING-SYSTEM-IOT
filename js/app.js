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

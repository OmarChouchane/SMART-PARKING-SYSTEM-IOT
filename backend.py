from fastapi import FastAPI
import paho.mqtt.client as mqtt
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for local testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dictionary to store the latest sensor data
sensor_data: Dict[str, float] = {
    "sensor_1": -1,
    "sensor_2": -1,
    "sensor_3": -1,
}

# MQTT Callbacks
def on_message(client, userdata, message):
    topic = message.topic
    payload = message.payload.decode()
    if topic == "sensors/ultrasonic/1":
        sensor_data["sensor_1"] = float(payload)
    elif topic == "sensors/ultrasonic/2":
        sensor_data["sensor_2"] = float(payload)
    elif topic == "sensors/ultrasonic/3":
        sensor_data["sensor_3"] = float(payload)

mqtt_client = mqtt.Client()
mqtt_client.on_message = on_message
mqtt_client.connect("broker.hivemq.com", 1883)
mqtt_client.subscribe("sensors/ultrasonic/#")
mqtt_client.loop_start()

@app.get("/sensors")
def get_sensor_data():
    return sensor_data

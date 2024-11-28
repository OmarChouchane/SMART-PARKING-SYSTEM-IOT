#include "config.h"
#include "../wifiHandler.h"
#include "../mqttHandler.h"
#include "../sensorHandler.h"
#include <Arduino.h>

void setup() {
    Serial.begin(115200);
    connectToWiFi();
    setupMQTT();
    setupSensors();
}

void loop() {
    readSensorData();
    publishDataToMQTT();
    handleMQTTClient(); // Ensures MQTT connection is alive
    delay(1000);        // Adjust based on data publishing frequency
}

#include <PubSubClient.h>
#include "config.h"

WiFiClient espClient;
PubSubClient mqttClient(espClient);

void setupMQTT() {
    mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
}

void publishDataToMQTT(String message) {
    if (!mqttClient.connected()) {
        while (!mqttClient.connect("ESP32Client")) {
            delay(500);
            Serial.print(".");
        }
        Serial.println("MQTT connected!");
    }
    mqttClient.publish(MQTT_TOPIC, message.c_str());
}

void handleMQTTClient() {
    mqttClient.loop();
}

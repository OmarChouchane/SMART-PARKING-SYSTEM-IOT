#include "mqttHandler.h"
#include <WiFi.h>
#include <PubSubClient.h>

// MQTT Client object
WiFiClient wifiClient;
PubSubClient client(wifiClient);

// MQTT setup function
void connectWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi!");
}

// MQTT connection setup
void connectMQTT() {
  client.setServer(mqttServer, mqttPort);
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    if (client.connect("ESP32Client")) {
      Serial.println("Connected to MQTT!");
    } else {
      delay(5000);
    }
  }
}

// Publish parking data to MQTT
void publishParkingData(int distance) {
  String payload = String(distance);
  client.publish("parking/spaces", payload.c_str());
}

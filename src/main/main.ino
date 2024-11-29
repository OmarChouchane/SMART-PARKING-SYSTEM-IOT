/*
  FOR WOKWI ONLINE SIMULATOR
  WITH HIVEMQ BROKER
  USING MYMQTT MOBILE APP
*/

#include <WiFi.h>
#include <PubSubClient.h>

// WiFi credentials
const char* ssid = "Wokwi-GUEST";
const char* password = "";

// MQTT settings
const char* mqttServer = "broker.hivemq.com";
const int mqttPort = 1883;
const char* mqttClient = "esp32_mqtt_client";
const char* mqttTopic = "sensors/ultrasonic";

// Ultrasonic sensor pins
const int trigPin = 5;
const int echoPin = 18;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  
  // Setup Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");

  // Setup MQTT
  client.setServer(mqttServer, mqttPort);

  // Setup Ultrasonic sensor
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Ensure MQTT is connected
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();

  // Measure distance using ultrasonic sensor
  long duration, distance;
  
  // Send pulse to trigger pin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read pulse duration from echo pin
  duration = pulseIn(echoPin, HIGH);

  // Calculate distance
  distance = (duration / 2) / 29.1;  // Distance in cm

  // Print the measured distance to the Serial Monitor
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Publish distance to MQTT
  char distanceStr[10];
  itoa(distance, distanceStr, 10);
  client.publish(mqttTopic, distanceStr);

  delay(500);  // Wait for 2 seconds before the next reading
}

void reconnectMQTT() {
  // Loop until connected to MQTT server
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect(mqttClient)) {
      Serial.println("connected");
      client.subscribe(mqttTopic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      delay(5000);
    }
  }
}

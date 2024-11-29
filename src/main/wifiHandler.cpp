#include "wifiHandler.h"
#include <WiFi.h>

// Define Wi-Fi credentials
const char* ssid = "your-SSID";     // Replace with your Wi-Fi network name
const char* password = "your-PASSWORD"; // Replace with your Wi-Fi network password

// Wi-Fi connection setup
void connectWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  
  // Wait for connection
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
    attempts++;
    if (attempts > 30) {
      Serial.println("Failed to connect to WiFi after several attempts.");
      return;  // Exit function if Wi-Fi connection fails after 30 attempts
    }
  }

  // If connected, print the IP address
  Serial.println("Connected to WiFi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

#include <Arduino.h>

const int TRIG_PIN = 5; // Example GPIO pin
const int ECHO_PIN = 18;

void setupSensors() {
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
}

int readSensorData() {
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);
    
    long duration = pulseIn(ECHO_PIN, HIGH);
    int distance = duration * 0.034 / 2; // Convert to cm
    
    Serial.print("Distance: ");
    Serial.println(distance);
    
    return distance;
}

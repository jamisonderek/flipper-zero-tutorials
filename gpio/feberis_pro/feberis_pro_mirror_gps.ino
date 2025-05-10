#define GPS_TX 4
#define GPS_RX 13

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ;  // Needed for "Serial" only?
  }
  Serial.println("SERIAL PORT ECHO");
  Serial2.begin(9600, SERIAL_8N1, GPS_TX, GPS_RX);
  while (!Serial2) {
    ;  // Does this do anything for Serial2?
  }
  Serial.print("SERIAL MIRROR. TX:");
  Serial.print(GPS_TX, DEC);
  Serial.print(" RX:");
  Serial.println(GPS_RX, DEC);
}

void loop() {
  while (Serial2.available()) {
    Serial.print(char(Serial2.read()));
  }
  delay(1);
}

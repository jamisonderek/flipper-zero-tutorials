// Drives a 3-digit 7-segment display connected to a MAX7219.
// The MAX7219 is connected to the ATtiny85 via MOSI, SCK, CS, VCC, GND.

// An external temperature sensor is used for measuring the temperature.
// NTC Thermistors Resistors - MF58-2K is connected to VCC.
// Other side of thermistor is connected to pin 2.
// Resistor - maybe 1K ohm? - connected to GND and NTC Thermistor.

// Pin 1 (RESET) is not connected.
// Temperature is pin 2
#define TEMPERATURE_ADC_IN 3
// CS is pin 3
#define MAX7219_CS PB4
// GND is pin 4
// MOSI is pin 5 (We are the master for this app)
#define MAX7219_MOSI PB0
// Pushbutton switch (input) is pin 6
#define USER_SWITCH PB1
// SCK serial clock is pin 7
#define MAX7219_SCK PB2
// VCC (3.3 - 5.0 volts) is pin 8

// Order of the MAX7219 digits (left to right).
int digits[] = { 1, 3, 2 };

// The LED segments to display (Decimal,Top,RightTop,RightBotton,Bottom,LeftBottom,LeftTop,Mid)
int nums[] = {
  0b01111110,  // 0
  0b00110000,  // 1
  0b01101101,  // 2
  0b01111001,  // 3
  0b00110011,  // 4
  0b01011011,  // 5
  0b01011111,  // 6
  0b01110000,  // 7
  0b01111111,  // 8
  0b01111011,  // 9
};

void pulse(bool state) {
  for (int i = 0; i < 1000; i++)
    __asm("NOP");
}

void leds(int addr, int data) {
  digitalWrite(MAX7219_MOSI, false);
  digitalWrite(MAX7219_SCK, false);
  digitalWrite(MAX7219_CS, false);
  pulse(false);

  int mask = 0x80;
  for (int i = 0; i < 8; i++) {
    digitalWrite(MAX7219_MOSI, (addr & mask) != 0);
    digitalWrite(MAX7219_SCK, true);
    pulse(true);
    digitalWrite(MAX7219_SCK, false);
    pulse(false);
    mask >>= 1;
  }

  mask = 0x80;
  for (int i = 0; i < 8; i++) {
    digitalWrite(MAX7219_MOSI, (data & mask) != 0);
    digitalWrite(MAX7219_SCK, true);
    pulse(true);
    digitalWrite(MAX7219_SCK, false);
    pulse(false);
    mask >>= 1;
  }

  digitalWrite(MAX7219_CS, true);
  pulse(false);
  digitalWrite(MAX7219_MOSI, true);
  pulse(false);
  digitalWrite(MAX7219_SCK, true);
}

void init_max7219() {
  for (int i = 0; i < 100; i++) {
    pulse(true);
  }
  leds(0xFF, 0b00000000);
  leds(0x0C, 0b00000001);
  leds(0x09, 0b00000000);
  leds(0x0A, 0b00000111);
  leds(0x0B, 0b00000111);
}

void setup_adc() {
  // https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7598_Automotive-Microcontrollers-ATtiny25-45-85_Datasheet.pdf
  // 10-bit ADC. 17.7.7. ADLAR=0.
  // Ref voltage is VCC. Table 17-3. REFS2=Any. REFS1=0, REFS0=0.
  // ADC3 (pin 2) for single ended input voltage. Table 17-4.  MUX3=0, MUX2=0, MUX1=1, MUX0=1.
  // Prescaler 64. Table 17-5. ADPS2=1, ADPS1=1, ADPS0=0.

  ADMUX =
    (0 << ADLAR) |  //10-bit values
    (0 << REFS2) |  // Sets ref. voltage to VCC, bit 2 (can be 0 or 1)
    (0 << REFS1) |  // Sets ref. voltage to VCC, bit 1
    (0 << REFS0) |  // Sets ref. voltage to VCC, bit 0
    (0 << MUX3) |   // use ADC3 for input (PB3), MUX bit 3
    (0 << MUX2) |   // use ADC3 for input (PB3), MUX bit 2
    (1 << MUX1) |   // use ADC3 for input (PB3), MUX bit 1
    (1 << MUX0);    // use ADC3 for input (PB3), MUX bit 0
  ADCSRA =
    (1 << ADEN) |   // Enable ADC
    (1 << ADPS2) |  // set prescaler to 64, bit 2
    (1 << ADPS1) |  // set prescaler to 64, bit 1
    (0 << ADPS0);   // set prescaler to 64, bit 0
}

void setup() {
  pinMode(TEMPERATURE_ADC_IN, INPUT_PULLUP);
  pinMode(USER_SWITCH, INPUT_PULLUP);
  pinMode(MAX7219_CS, OUTPUT);
  pinMode(MAX7219_MOSI, OUTPUT);
  pinMode(MAX7219_SCK, OUTPUT);

  digitalWrite(MAX7219_CS, false);
  digitalWrite(MAX7219_MOSI, false);
  digitalWrite(MAX7219_SCK, false);

  init_max7219();

  setup_adc();
}

int read_adc() {
  int samples[10];
  int sample_count = 10;
  int min = 0;
  int max = 0;
  int sample_total = 0;
  for (int i = 0; i < sample_count; i++) {
    // Start conversion
    ADCSRA |= (1 << ADSC);
    // Wait for completion
    while (ADCSRA & (1 << ADSC)) {
      __asm("nop");
    }
    // Read low part
    int reading = ADCL;
    // Read high part
    reading = reading | (ADCH << 8);
    samples[i] = map(reading, 0, 1023, 0, 999);
    sample_total += samples[i];
    if (samples[max] < samples[i]) { max = i; }
    if (samples[min] > samples[i]) { min = i; }
  }
  // Discard min & max value.
  sample_total -= samples[min];
  sample_total -= samples[max];
  return sample_total / (sample_count - 2);
}

void loop() {
  for (int i = 0; i < 1000; i++) {
    // You can set v to i, if you just want a counter instead of seeing mapped ADC value.
    int v = read_adc(); 
    // int v = i;
    leds(digits[0], nums[v / 100]);
    leds(digits[1], nums[(v % 100) / 10]);
    leds(digits[2], nums[v % 10]);
    // Delay before showing next number
    for (int j = 0; j < 100; j++) {
      pulse(true);
    }
    // Reinitialize every so often, in case display got reset.
    if (i % 70 == 0) {
      init_max7219();
    }
  }
}

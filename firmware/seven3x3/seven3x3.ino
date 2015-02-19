int counter = 0, c2 = 0;
#include <TimerOne.h>

byte numbers[] = { 63, 6, 91, 79, 102, 109, 125, 7, 127, 111, 63 }; //252, 96, 218, 242, 102, 182, 190, 224, 254, 246 };

int clocks[] = { A5, A4, A3 };
int clearPin = 12;

void setup() {
//  pinMode(8, OUTPUT);
//  pinMode(9, OUTPUT);
  
  digitalWrite(9, LOW);
  
  for(int i = 2; i < 13; i++) {
    pinMode(i, OUTPUT);
    digitalWrite(i, LOW);
  }
  
  for (int i = 0; i < 3; i++) {
    pinMode(clocks[i], OUTPUT);
    digitalWrite(clocks[i], LOW);
    digitalWrite(clocks[i], HIGH);
  }
  
  PORTC = 0;
  PORTD = 0;
  pinMode(A0, OUTPUT);
  pinMode(A1, OUTPUT);
//  pinMode(A2, OUTPUT);
  
  Timer1.initialize(1000);
  Timer1.attachInterrupt( timerIsr );
}

void loop() {
  
//  digitalWrite(8, (counter++ % 2) ? HIGH : LOW);
  
//  PORTB = 2; //3 & (counter++ % 4);
  
//  delay(1);
  
}

//void writeByte(byte b) {
//  digitalWrite(

void timerIsr()
{
//    digitalWrite(10 + counter, HIGH);
//    counter++;
//    counter %= 4;
//    int n = 1;
//    for(int i = 0; i < (3-(counter)); i++) {
//      n*= 10;
//    }
//    int v = c2 / n;
//    
//    PORTD = digits[v%10];
//    digitalWrite(10 + counter, LOW);



  int col = (counter++ % 12);
  PORTB = 15 & col;

  for (int row = 0; row < 3; row++) {
    digitalWrite(clocks[row], LOW);
//    int val = 2;
    
    int val = numbers[(row * 12 + col) % 10]; ////(c2 + row * 4)  % 10];//abs(c2 - col - row*2) % 10];
    PORTD = (PORTD & 3) | (252 & val);
    PORTC = (PORTC & 252) | (3  & val);
    
    digitalWrite(clocks[row], HIGH);
  }

//  digitalWrite(A4, LOW); 
//
//  digitalWrite(A4, HIGH);


  // send all outputs low
  digitalWrite(clearPin, HIGH);


  if (counter % 12*20 == 0) {
    c2++;
    counter = 0;
  }
}

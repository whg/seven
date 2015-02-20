int counter = 0, c2 = 0;
#include <TimerOne.h>

byte numbers[] = { 63, 6, 91, 79, 102, 109, 125, 7, 127, 111, 63 }; //252, 96, 218, 242, 102, 182, 190, 224, 254, 246 };
byte tbtNumbers[][9] = {
  { 78, 35, 124, 120, 0, 199, 231, 156, 113 },
  { 66, 109, 0, 0, 109, 0, 136, 237, 136 },
  { 110, 35, 124, 0, 140, 49, 222, 168, 206 },
  { 71, 35, 108, 0, 98, 56, 196, 156, 83 },
  { 0, 218, 16, 222, 138, 152, 0, 158, 156 },
  { 79, 1, 1, 67, 35, 236, 212, 156, 115 },
  { 132, 99, 33, 125, 98, 252, 229, 156, 83 },
  { 113, 1, 123, 0, 134, 0, 0, 113, 0 },
  { 78, 35, 108, 15, 98, 56, 229, 156, 115 },
  { 90, 35, 108, 103, 84, 111, 140, 92, 32 },
};
byte segs[] = { 1, 2, 4, 8, 16, 32, 64, 128 };

byte six[] = { 132, 99, 33, 125, 98, 252, 229, 156, 83 };
int clocks[] = { A5, A4, A3 };
int clearPin = 13;

void setup() {
//  pinMode(8, OUTPUT);
//  pinMode(9, OUTPUT);
  
  digitalWrite(9, LOW);
  
  for(int i = 2; i < 14; i++) {
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
  
 digitalWrite(clearPin, LOW);

}
int q = 0;

void loop() {
  
//  digitalWrite(8, (counter++ % 2) ? HIGH : LOW);
  
//  PORTB = 2; //3 & (counter++ % 4);
  
//  delay(1);
  
}

//void writeByte(byte b) {
//  digitalWrite(
int c3 = 1;
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

//    digitalWrite(clearPin, LOW);


  int col = (counter++) % 12;
//  counter++;
//      digitalWrite(clearPin, HIGH);
 digitalWrite(clearPin, HIGH);


//      digitalWrite(clearPin, LOW);
  for (int row = 0; row < 3; row++) {
    digitalWrite(clocks[row], LOW);
//    int val = 2;
      int k = ((row) * 12 + col);
//    int val = numbers[(row * 12 + col) % 10]; ////(c2 + row * 4)  % 10];//abs(c2 - col - row*2) % 10];
    int numberIndex = ((row) * 3 + col) % 3 + row * 3 ; //numbers[(row * 3 + col) % 10];
//    int val = tbtNumbers[(c2 + col / 3) %10][numberIndex]; //six[numberIndex];
    int val = tbtNumbers[(c2+ col  / 3) %10][numberIndex]; //six[numberIndex];
//    val = numbers[k%10]; //(numberIndex + c2 ) % 10];
//    val = six[numberIndex];
//val = segs[(k*3 + c2*c3) % 8];
val = numbers[col % 10];
//val = numbers[(k*3 + c2*c3) % 10];
//val = numbers[numberIndex % 10];
//val = (int) pow(2, 7);
    PORTD = (PORTD & 3) | (252 & val);
    PORTC = (PORTC & 252) | (3  & val);
    
    digitalWrite(clocks[row], HIGH);
  }

//  digitalWrite(A4, LOW); 
//
//  digitalWrite(A4, HIGH);


//
  // send all outputs low
 
   digitalWrite(clearPin, LOW);
  PORTB = 15 & col;
//  digitalWrite(clearPin, HIGH);
  
  if (counter % (12*100) == 0) {
    c2++;
    if (c2 > 50) {
      c3++;
      c2 = 0;
    }
//    q = (int) ceil(pow(2.0, (c2 % 10)));
    counter = 0;
  }
}

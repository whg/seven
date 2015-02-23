int counter = 0, c2 = 0;
#include <TimerOne.h>
#include "data.h"

const unsigned int NUM_COLS = 12;

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
int clocks[] = {  8, 9, 10 };
int clearPin = A4;
int shift = 0;
char *message = "HELO";

void columnTimer();

void setup() {
//  pinMode(8, OUTPUT);
//  pinMode(9, OUTPUT);
  
  digitalWrite(9, LOW);
  
  for(int i = 0; i < 14; i++) {
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
  pinMode(A2, OUTPUT);
  pinMode(A3, OUTPUT);
  
  
  Timer1.initialize(1000);
  Timer1.attachInterrupt(columnTimer);
  
  pinMode(clearPin, OUTPUT);
 digitalWrite(clearPin, LOW);

}

void loop() {

}

void columnTimer() {

  int col = (counter++) % NUM_COLS;

  digitalWrite(clearPin, HIGH);

  int characterCol = col / 3;

  int val = 0;
  for (int row = 0; row < 3; row++) {

      digitalWrite(clocks[row], LOW);
      int k = ((row) * 12 + col);

      int numberIndex = ((row) * 3 + col) % 3 + row * 3 ; //numbers[(row * 3 + col) % 10];
//     val = tbtNumbers[(c2 + col / 3) %10][numberIndex]; //six[numberIndex];
//     val = tbtNumbers[(c2+ col  / 3) %10][numberIndex]; //six[numberIndex];
// val = stuff[0][c2 % 90][numberIndex];
//    val = numbers[k%10]; //(numberIndex + c2 ) % 10];
//    val = six[numberIndex];
//val = segs[(k*3 + c2*c3) % 8];

//val = numbers[col%10];//col % 10];
//val = numbers[k%10];// (k+c2/10) % 10];
//val = numbers[(col % 2) * 7 + 1];
    val  = 255;

 //// eights and tops
/* val = ((col) % 2) * 254 + 1; */
val = ((col + c2 % 2) % 2) * 254 + 1;


//val = numbers[(k*3 + c2*c3) % 10];
//val = numbers[numberIndex % 10];
//val = (int) pow(2, 7);

  //// parts of digit showing
   /* val = (k + c2 - row) % 3 == 0 ? 2 : 0; */
   /* val = ((k + c2 - row) % 3) != 0 ? q : 0; */


//    val = tbtNumbers[( c3 + col  / 3 + 1) %10][numberIndex]; //six[numberIndex];
//    val = 255;
//    val&= ((1 << (c2%9)) - 1);// | (q << (qq%8));
    
    //// horizontal - vertical
//    val &= (c3 % 2 == 0) ? 73 : 54;
    
//  val&= 127; //get rid of dot

//    int q1 = (k+c2) % 8;
//    int q2 = (q1+4) % 8;
//    val = ((c2/2) % 2 == 0) ? (1<<q1) : (1<<q2);//col % 10];

    
  //// going through characters
//    val = characters[( c2 + col  / 3 + 1) %43][numberIndex]; //six[numberIndex];


//    char c = message[characterCol];
//    val = characters[c - '0'][numberIndex];

//    PORTD = (PORTD & 3) | (252 & val);
//    PORTC = (PORTC & 252) | (3  & val);
    
    PORTD = (val & 255);
    digitalWrite(clocks[row], HIGH);
  }

  // send all outputs low
  digitalWrite(clearPin, LOW);
  PORTC = 15 & col;
  if (col >= 12) {
      digitalWrite(clearPin, HIGH);
  }
  
  if (counter % (NUM_COLS*20) == 0) {
    c2++;
    
    if (c2 > 43) {
      q = q << 1;
      if(q > 255) {
        qq++;

//        q = 2*qq;
        q = (1 << qq) -1;
        
        if (qq > 8) qq = 0;
      }


      c3++;
      c2 = 0;
    }
//    q = (int) ceil(pow(2.0, (c2 % 10)));
    counter = 0;
  }
}

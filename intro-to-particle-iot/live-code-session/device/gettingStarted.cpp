// This #include statement was automatically added by the Particle IDE.
#include <InternetButton.h>

InternetButton b = InternetButton();

void setup()
{
    b.begin();
}

void loop()
{
    // Flash an LED
    b.ledOn(6, 0, 0, 255);
    delay(1000);
    b.ledOff(6);
    delay(1000);

    // Process individual buttons and LED response
    if (b.buttonOn(1))
    {
        b.ledOn(12, 255, 0, 0); // Red
        delay(500);
    }
    else
    {
        b.ledOn(12, 0, 0, 0);
    }
    if (b.buttonOn(1))
    {
        b.ledOn(12, 255, 0, 0); // Red
        delay(500);
    }
    else
    {
        b.ledOn(12, 0, 0, 0);
    }
    if (b.buttonOn(1))
    {
        b.ledOn(12, 255, 0, 0); // Red
        delay(500);
    }
    else
    {
        b.ledOn(12, 0, 0, 0);
    }
    if (b.buttonOn(2))
    {
        b.ledOn(3, 0, 255, 0); // Green
        delay(500);
    }
    else
    {
        b.ledOn(3, 0, 0, 0);
    }

    if (b.buttonOn(3))
    {
        b.ledOn(6, 0, 0, 255); // Blue
        delay(500);
    }
    else
    {
        b.ledOn(6, 0, 0, 0);
    }

    if (b.buttonOn(4))
    {
        b.ledOn(9, 255, 0, 255); // Magenta
        delay(500);
    }
    else
    {
        b.ledOn(9, 0, 0, 0);
    }
}
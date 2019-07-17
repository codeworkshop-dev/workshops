// This #include statement was automatically added by the Particle IDE.
#include <InternetButton.h>

InternetButton b = InternetButton();

// Declare the state of a button and an LED
int button1 = false;
bool led = false;

int toggleLED(String extra)
{
    led = !led;
    return 0;
};

void setup()
{
    // Register button state to Particle.io platform.
    Particle.variable("button", button1);
    // Register toggleLED to Particle.io platform
    Particle.function("toggleLED", toggleLED);

    // This initializes the button, it is a part of the InternetButton Library we imported.
    b.begin();
}

void loop()
{

    // Process individual buttons and LED response
    if (b.buttonOn(1))
    {
        b.ledOn(12, 255, 0, 0); // Red
        // Publish the event "button1" for other services like IFTTT to use
        if (!button1)
        {
            Particle.publish("button1", "true", 60, PRIVATE);
        }
        button1 = true;
        delay(500);
    }
    else
    {
        b.ledOn(12, 0, 0, 0);
        // Publish an event when the button push ends.
        if (button1)
        {
            Particle.publish("button1", "false", 60, PRIVATE);
        }
        button1 = false;
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

    if (led)
    {
        b.ledOn(9, 255, 0, 255); // Magenta
        delay(500);
    }
    else
    {
        b.ledOn(9, 0, 0, 0);
    }
}
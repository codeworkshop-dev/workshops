#include "InternetButton/InternetButton.h"

/* Here's a nice combination of features that I like to use.
Note the use of the allButtons function. */

InternetButton b = InternetButton();

// Create state variables to access via API
// Supported types are String, int, or double
char *buttons = "0110";

char *lights = "00001";


void setup() {
    Particle.variable("buttons", buttons);
    Particle.variable("lights", lights);
    // Tell b to get everything ready to go
    // Use b.begin(1); if you have the original SparkButton, which does not have a buzzer or a plastic enclosure
    // to use, just add a '1' between the parentheses in the code above.
    b.begin();
}

void loop(){
    // Process individual buttons and LED response
    if (b.buttonOn(1)) {
        b.ledOn(12, 255, 0, 0); // Red
        // Publish the event "button1" for other services like IFTTT to use
        Particle.publish("button1",NULL, 60, PRIVATE);
        delay(500);
    }

    if (b.buttonOn(2)) {
        b.ledOn(3, 0, 255, 0); // Green
        // Publish the event "button2" for other services like IFTTT to use
        Particle.publish("button2",NULL, 60, PRIVATE);
        delay(500);
    }

    if (b.buttonOn(3)) {
        b.ledOn(6, 0, 0, 255); // Blue
        // Publish the event "button3" for other services like IFTTT to use
        Particle.publish("button3",NULL, 60, PRIVATE);
        delay(500);
    }

    if (b.buttonOn(4)) {
        b.ledOn(9, 255, 0, 255); // Magenta
        // Publish the event "button4" for other services like IFTTT to use
        Particle.publish("button4",NULL, 60, PRIVATE);
        delay(500);
    }

    if(b.allButtonsOff()) {
        b.allLedsOff();
    }
}
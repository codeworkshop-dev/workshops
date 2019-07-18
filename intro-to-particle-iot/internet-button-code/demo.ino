// This #include statement was automatically added by the Particle IDE.
#include <InternetButton.h>
InternetButton button = InternetButton();

int MAX_INPUT_SIZE = 300;
u8 MAX_BRIGHTNESS = 100;
u8 brightness = MAX_BRIGHTNESS;
String lights[11];
unsigned long lastTime = 0;
bool publishStatus = false;
String status;


// The code in setup() runs once when the device is powered on or reset. Used for setting up states, modes, etc
void setup() {
    button.begin();
    Particle.function("setLights", setLights);
    Particle.function("emitStatus", emitStatus);
    Particle.variable("status", status);
    
    for (int i = 0; i < 11; i++) {
        lights[i] = "0,0,0";
    }
}

/* loop(), in contrast to setup(), runs all the time. Over and over again.
Remember this particularly if there are things you DON'T want to run a lot. Like Particle.publish() */
void loop() {
    status = createStatus();
}

String createStatus() {
  String response = "{\"lights\":[";

  for (int i = 0; i < sizeof(lights)/sizeof(*lights); i++) {
    if(i != 0) {
      response += ",";
    }
    response += "\"" + lights[i] + "\"";
  }

  response += "]";
  response += ", \"brightness\":" + String(brightness);
  response += ", \"orientation\":";
  response += "{\"x\":" + String(button.readX()) + ",";
  response += "\"y\":" + String(button.readY()) + ",";
  response += "\"z\":" + String(button.readZ()) + "}";

  return response + "}";
}

int emitStatus(String command) {
    if(command == "true") {
        publishStatus = true;
    } else {
        publishStatus = false;
    }
    
    return 1;
}

/*
 * Changes the LEDs that are lit on the button.
 */
int setLights(String command) {
    //parse the string into commands for lights
    u8 r;
    u8 g;
    u8 b;
    int lightIdInt;
    char* lightId;
    char charSeq[170];
    command.toCharArray(charSeq,170);
    char* brightnessChar = strtok(charSeq, "%");
    char* lightstr = strtok(0, "%");
    
    if(lightstr == 0) {
        lightstr = brightnessChar;
    } else {
        brightness = atoi(brightnessChar);
    }
    
    lightId = strtok(lightstr, ",");
    
    while (lightId != 0) {
        lightIdInt = atoi(lightId);
        r = atoi(strtok(0, ","));
        g = atoi(strtok(0, ","));
        b = atoi(strtok(0, ";"));
        
        // Dpn't try to set a LED that doesn't exist,
        // the button will crash.
        if(
            lightIdInt > 0 && lightIdInt <= 11 &&
            r >= 0 && r <= 255 &&
            g >= 0 && g <= 255 &&
            b >= 0 && b <= 255
        ) {
            // Store status. Must have the first type be a String to concatenate.
            lights[lightIdInt - 1] = String(r) + "," + g + "," + b;
            // Update button LEDs
            button.ledOn(lightIdInt, r, g, b);
        }
        // Move to next light
        lightId = strtok(0, ",");
    }
    
    button.setBrightness(brightness);
    
    return 1;
}
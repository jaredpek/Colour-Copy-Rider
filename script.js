
let video;
let detector;
let detections = [];
let colorAnalysisDone = false;
let lastDetectionTime = 0;



function preload() {
    detector = ml5.objectDetector('cocossd', modelLoaded); 
}


function setup() {
  createCanvas(1000, 1000);
  
  video = createCapture(VIDEO, () => {
    video.size(1000, 1000);
    video.hide();
  });

  video.elt.addEventListener('loadeddata', () => {
    console.log("Video data loaded");
    detector = ml5.objectDetector('cocossd', modelLoaded); // Initialize the object detector here
  });

  frameRate(10); // Reduce frame rate to ease processing
}

function modelLoaded() {
  console.log('Model Loaded!');
  detector.detect(video, gotDetections);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  detections = results;
  colorAnalysisDone = false;
  detector.detect(video, gotDetections);
}



function draw() {
  if (video.elt.readyState === 4) { // Check if video is ready
    background(255);
    image(video, 0, 0);

    detections.forEach(object => {
      drawDetection(object);
      if (!colorAnalysisDone) {
        analyzeColors(object);
      }
    });
  } else {
    console.log("Waiting for video to be ready");
  }
}


function drawDetection(object) {
  stroke(50, 0, 50);
  strokeWeight(5);
  noFill();
  rect(object.x, object.y, object.width, object.height);
  noStroke();
  fill(80);
  textSize(27);
  text(object.label, object.x + 15, object.y - 15);

  //Display confidence level
  fill(255, 0, 0); // Set the fill color for the confidence score (e.g., red)
  textSize(20); // Adjust text size if necessary
  text(`Confidence: ${(object.confidence * 100).toFixed(2)}%`, object.x + 15, object.y + object.height + 30);
}


function analyzeColors(object) {
  video.loadPixels();
  console.log(video.pixels);

  if (video.pixels.length === 0) {
    console.log("Video pixels are not ready");
    return;
  }
  
  let total = { r: 0, g: 0, b: 0, count: 0 };
  
   //Iterate through the pixels array
  for (let i = 0; i < video.pixels.length; i += 4) {
    // Each group of 4 values represents the red, green, blue, and alpha channels
    total.r += video.pixels[i];
    total.g += video.pixels[i + 1];
    total.b += video.pixels[i + 2];
    total.count++;
  }
  

  /* let xStart = Math.max(0, object.x);
  let yStart = Math.max(0, object.y);
  let xEnd = Math.min(object.x + object.width, video.width);
  let yEnd = Math.min(object.y + object.height, video.height);

  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      const index = (x + y * video.width) * 4;
      total.r += video.pixels[index];
      total.g += video.pixels[index + 1];
      total.b += video.pixels[index + 2];
      total.count++;
    }
  }
  
  */

  if (total.count > 0) {
    let avgColor = {
      r: Math.round(total.r / total.count),
      g: Math.round(total.g / total.count),
      b: Math.round(total.b / total.count)
    };

    /* let colorName = getColorName(avgColor); // Get the name of the color */
    let objectLabel = object.label;

    fill(avgColor.r, avgColor.g, avgColor.b);
        rect(object.x + object.width + 10, object.y, 50, 50); // Display a rectangle filled with the average color
        fill(0);
        textSize(20);
        text(`Detected Object: ${objectLabel}`, 10, height - 50);
        text(`Average Color (RGB): ${avgColor.r}, ${avgColor.g}, ${avgColor.b}`, 10, height - 20);
    } else {
        console.log("No pixels analyzed for color.");
    }
    
    /* console.log(`Average color: R=${avgColor.r}, G=${avgColor.g}, B=${avgColor.b}`);
  } else {
    console.log("No pixels analyzed for color.");
  } */


  colorAnalysisDone = true; // Set flag to true after analysis
 
}

/* function getColorName(color) {
  // Add your logic to determine the color name based on RGB values
  // You can use libraries like "color-thief" for color analysis
  // For simplicity, this example returns a generic name based on a simple condition
  if (color.r > 200 && color.g < 100 && color.b < 100) {
      return "Red";
  } else if (color.r < 100 && color.g > 200 && color.b < 100) {
      return "Green";
  } else if (color.r < 100 && color.g < 100 && color.b > 200) {
      return "Blue";
  } else {
      return "Unknown";
  } 
} */
  







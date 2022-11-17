object_status = "";
value = "";
objects = [];
function setup() {
    canvas = createCanvas(480, 480);
    video = createCapture(VIDEO);
    video.hide();
    canvas.center();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    value = document.getElementById("input").value;
}
function modelLoaded() {
    console.log("Model loaded");
    object_status = true;
}
function draw() {
    image(video, 0, 0, 480, 480);
    if(object_status != "") {
        objectDetector.detect(video, gotResults);
        document.getElementById("status").innerHTML = "Status: Objects detected";
        for(i = 0; i < objects.length; i++) {
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(value == objects[i].label) {
               document.getElementById("object").innerHTML = "Object Found" 
            }
            else {
                document.getElementById("object").innerHTML = "Object not Found"  
            }
        }
    }
}
function gotResults(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}
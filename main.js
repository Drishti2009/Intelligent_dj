song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreLeftWrist = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialised");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftwristX+" Left Wrist Y = "+leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightwristX+" Right Wrist Y = "+rightwristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#ff000d");
    storke("#ff000d");

    if(scoreLeftWrist > 0.2){
        circle(leftwristX, leftwristY, 20);
        InNumberLeftWristY = Number(leftwristY);
        removed_decimals = floor(InNumberLeftWristY);
        volume = removed_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = "+volume;
        song.setVolume(volume);
    }
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause(){
    song.pause();
}
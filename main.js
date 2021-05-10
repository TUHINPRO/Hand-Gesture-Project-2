prediction_1="";
prediction_2="";

Webcam.set({
  width:350,
  height:300,
  image_format:'png',
  png_quality:100

});

camera=document.getElementById('camera');

Webcam.attach('#camera');

function take_snapshot() {
   Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML='<img id="data" src=" '+data_uri+' ">';
   }
   );
}

console.log("ml5version",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/INiCm9vBr/model.json",modelLoaded);

function modelLoaded() {
    console.log("modelLoaded");
}
function check() {
  img=document.getElementById('data');
  classifier.classify(img, gotResult);}


function speak() {
var speaks=window.speechSynthesis;
speaks1="prediction 1 is " + prediction_1;
speaks2="prediction 2 is"  + prediction_2;
var speaks3=new SpeechSynthesisUtterance(speaks1+speaks2);
speaks.speak(speaks3);
}
function gotResult(error,results) {
    if(error) {
    console.error(error);
    }
    else{
      console.log(results);
      document.getElementById("result_emotion_name").innerHTML=results[0].label;
      document.getElementById("result_emotion_name1").innerHTML=results[1].label;
      prediction_1=results[0].label;
      prediction_2=results[1].label;
      speak();
     if(prediction_1=="Hi-Five"){
       document.getElementById("update_emoji").innerHTML="&#128400;";
     }
     if(prediction_1=="Yo"){
      document.getElementById("update_emoji").innerHTML="&#129304;";
  }
  if(prediction_1=="Victory"){
    document.getElementById("update_emoji").innerHTML="&#9996;";
  }
  if(prediction_2=="Hi-Five"){
    document.getElementById("1_emoji_updated").innerHTML="&#128400;";
  }
  if(prediction_2=="Yo"){
    document.getElementById("1_emoji_updated").innerHTML="&#129304;";
  }
  if(prediction_2=="Victory"){
    document.getElementById("1_emoji_updated").innerHTML="&#9996;";
  }
  
    }
  }
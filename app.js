let video = document.querySelector("video");

let captureBtnCont = document.querySelector(".capture-btn");
let captureBtn = document.querySelector(".capture");
let recordBtnCont = document.querySelector(".record-btn");
let recordBtn = document.querySelector(".record");
let recordFlag = false;

let recorder;
let constraints ={
    video: true,
    audio:true
}
let chunks =[]// media data in chunks
// navigator => global object which gives browser info 
navigator.mediaDevices.getUserMedia(constraints).then((stream)=>
{
    video.srcObject = stream;
    recorder = new MediaRecorder(stream);
    // whenever u start recording first empty the last
    recorder.addEventListener("start",(e)=>{
        chunks=[];
    })
    recorder.addEventListener("dataavailable", (e)=>{
        chunks.push(e.data);
    })
    //on stopping the recording,the chunks should be converted to media
    recorder.addEventListener("stop",(e)=>{
        let blob = new Blob(chunks,{type: "video/mp4"})
        let videoURL = URL.createObjectURL(blob);
        
        let a= document.createElement("a");
        a.href = videoURL;
        a.download = "FaceCam.mp4";
        a.click();
    })
}) 

//on starting the record button
recordBtnCont.addEventListener("click",(e)=>{
    recordFlag = !recordFlag;
    if(recordFlag) // start
    {
        recorder.start();
        recordBtn.classList.add("ani-record");
    }
    else{ //stop
        recorder.stop();
        recordBtn.classList.remove("ani-record");
    }
    })
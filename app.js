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
        startTimer();
        recordBtn.classList.add("ani-record");
    }
    else{ //stop
        recorder.stop();
        stopTimer();
        recordBtn.classList.remove("ani-record");
    }
    })

    //capturing images using CANVAS API
    captureBtnCont.addEventListener("click",(e)=>{
        captureBtn.classList.add("ani-capture");
        let canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        let tool = canvas.getContext("2d");
        tool.drawImage(video,0,0,canvas.width,canvas.height);

        let a =document.createElement("a");
         a.href = canvas.toDataURL();
         a.download="image.jpg"; 
         a.click();
         
    })

    // TIMER FUNCTIONS
    let timer = document.querySelector(".timer");
    let timerId,counter=0;
    function startTimer()
    {
        function displayTimer(){
            let hrs=Number.parseInt(counter/3600);
            counter=counter%3600;
            let min=Number.parseInt(counter/60);
            let sec=counter%60;
            timer.innerHTML =`${hrs}:${min}:${sec}`
            counter++;
            
        }
        timerId=setInterval(displayTimer,1000)
    }
    function stopTimer()
    {
        clearInterval(timerId);
        timer.innerHTML="00:00:00";
    }
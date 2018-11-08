/**
 *
 * @authors Wang Yuanyuan
 * @date    2018-11-08
 * @version 1.0
 *
 **/



var audio;
var duration;  //总时长
var current;
var currentTime;     //$对象
var fullTime;      //$对象
$(document).ready(function(){
    currentTime=$('#currentTime');
    fullTime=$('#totalTime');
    audio=document.getElementById('music');
    audio.autoplay=true;
    $('#controlBtn').click(function(){
        audio.play();
        $(this).css("background-image", "url(../res/pause.png)");
        console.log(11111);
    });
   audio.ondurationchange=function(){ getFullTime()}; // 获得总时长
   audio.ontimeupdate=function(){ getCurrentTime()}; // 获得现时长

})
function getFullTime(){
    duration=audio.duration;
    let m;
    let s;
console.log(duration);
    m=parseInt(duration/60);
    s=parseInt(duration%60);
    s = s < 10 ? "0" + s : s;
    m = m < 10 ? "0" + m : m;
    console.log(m,s);
    fullTime.text(m+":"+s).show();

}

function getCurrentTime(){
    current=audio.currentTime;
    let m;
    let s;
    console.log(current);
    m=parseInt(current/60);
    s=parseInt(current%60);
    s = s < 10 ? "0" + s : s;
    m = m < 10 ? "0" + m : m;
    console.log(m,s);
    currentTime.text(m+":"+s).show();
    //进度条
    let currentBar = ($('#totalBar').width() / duration) * current;

    $('#currentBar').css({
            'width': currentBar + "px",
        }
    );
if(current==duration){
    document.getElementById('songPic').style.animationPlayState='paused';       //音乐停止 封面暂停转动
}
}


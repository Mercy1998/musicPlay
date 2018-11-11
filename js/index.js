/**
 *
 * @authors Wang Yuanyuan
 * @date    2018-11-09
 * @version 1.1
 *
 **/



var audio;
var audioJq;
var duration;  //总时长
var current;
var currentTime;     //$对象
var fullTime;      //$对象
var totalBar;
var progressBar;
// var musicList=[
//     {
//         "sing":"太早",
//         "singer":"刘允乐",
//        // "songPic":""  专辑封面
//         "src":"res/audio/testSong.mp3"
//     },{
//         "sing":"我的梦",
//         "singer":"张靓颖",
//         "src":"res/audio/testSong2.mp3"
//     },
//     {
//         "sing":"Mercy",
//         "singer":"未知",
//         "src":"res/audio/Mercy.mp3"
//     }
// ];
var songName;
var singerName;
var songIndex=0;
var total=null;
var musicLists=null;

//加载JSON数据
$.getJSON('musicLists.json',function(data){
    total=data.data.length;
    console.log(total);
    musicLists=data.data;
    console.log(musicLists[songIndex].sing);
    $(document).ready();
})


$(document).ready(function(){

/*歌手、歌名*/

       songName=$('#sing');
    singerName=$('#singer');

    /*歌曲列表*/
    createMusicList();
    $('#listTitle').text("播放列表 ("+total+")");
    /*时间*/
    currentTime=$('#currentTime');
    fullTime=$('#totalTime');

    totalBar=$('#totalBar');
    progressBar=document.getElementById('totalBar');


    audio=document.getElementById('music');
    audioJq=$('#music');
    audio.autoplay=true;

    /*打开页面播放第一首歌*/
   loadSong();

    //音乐控制播放
    $('#controlBtn').click(function(){
      if(audio.paused){
          audio.play();
          $(this).css("background-image","url(res/image/pause.png)");
          $(this).attr("title", "暂停播放");
          document.getElementById('songPic').style.animationPlayState='running';       //音乐开始

      }else{
          audio.pause();
          $(this).attr("title", "开始播放");
          $(this).css("background-image","url(res/image/play.png)");
          document.getElementById('songPic').style.animationPlayState='paused';       //音乐停止 封面暂停转动
      }
    });

    //下一首
    $('#nextBtn').click(function(){
            if(songIndex==total-1){
               songIndex=0;

            }
        else {
                songIndex++;
            }
                console.log(songIndex);
                songEnded();
                loadSong();
                audio.load();
                audio.play();
                document.getElementById('songPic').style.animationPlayState='running';       //音乐开始
            }
    );
    //上一首
        $('#preBtn').click(function(){
            if(songIndex==0){
               songIndex=total-1;

            }
            else{
                songIndex--;
            }
                console.log(songIndex);
                songEnded();
                loadSong();
                audio.load();
                audio.play();
                document.getElementById('songPic').style.animationPlayState='running';       //音乐开始
        });

//键盘事件
    $(document).keydown(function(e){
        var e = event || window.event;
        var k = e.keyCode || e.which;
        switch(k) {
            case 13:
                $('#controlBtn').click();
                console.log("break");

                break;
            case 39:    //下一首
                $('#nextBtn').click();
                console.log("next");
                break;
            case 37:    //上一首
                $('#preBtn').click();
                console.log("next");
                break;
        }
        return false;

    });
    //歌曲列表
    var flag=false;
    $('#btnMore').click(function(){

        if(flag==false) {
            $('#more').css("display","block")
            flag=true;
        }else{
            $('#more').css("display","none")
            flag=false;
        }
    });
    $('#list li').click(function(){
        songIndex=$(this).val();
        console.log(songIndex);
        songEnded();
        loadSong();
        audio.load();
        audio.play();
        document.getElementById('songPic').style.animationPlayState='running';       //音乐开始
    });
    //滑块拖动


})


function getFullTime(){
    duration=audio.duration;
    let m;
    let s;
//console.log(duration);
    m=parseInt(duration/60);
    s=parseInt(duration%60);
    s = s < 10 ? "0" + s : s;
    m = m < 10 ? "0" + m : m;
  //  console.log(m,s);
    fullTime.text(m+":"+s).show();

}

function getCurrentTime(){
    current=audio.currentTime;
    let m;

    let s;
   // console.log(current);
    m=parseInt(current/60);
    s=parseInt(current%60);
    s = s < 10 ? "0" + s : s;
    m = m < 10 ? "0" + m : m;
    //console.log(m,s);
    currentTime.text(m+":"+s).show();
    //进度条
    let currentBar =Math.round(current/duration * 10000) / 100.00 + "%";

    updateProgress(duration,current,currentBar);



if(current==duration){
   songEnded();
   $('#nextBtn').click();
}
}
//第一首歌曲载入
function loadSong(){
    songName.text(musicLists[songIndex].sing).show();
    singerName.text(musicLists[songIndex].singer).show();
    audioJq.append("<source src='"+ musicLists[songIndex].src+"' type='audio/mp3' />");
    console.log(songName.text());
    audio.ondurationchange=function(){ getFullTime()}; // 获得总时长
    audio.ontimeupdate=function(){ getCurrentTime()}; // 获得现时长
}
//下一首
// function loadNextSong(){
//     songName.text(musicList[songIndex].sing).show();
//     singerName.text(musicList[songIndex].singer).show();
//     audioJq.append("<source src='"+ musicList[songIndex].src+"' type='audio/mp3' />");
//     console.log(songName.text());
//     audio.ondurationchange=function(){ getFullTime()}; // 获得总时长
//     audio.ontimeupdate=function(){ getCurrentTime()}; // 获得现时长
// }
//歌曲结束
function songEnded(){
    audioJq.empty();
    audio.pause();
    currentTime.text("00:00");
    $('#currentBar').css("width","0px");
    document.getElementById('songPic').style.animationPlayState='paused';       //音乐停止 封面暂停转动
}

//歌曲列表
function createMusicList(){
for(var i=0;i<total;i++) {
    $('#list').append("<li value='" + i + "'>" + musicLists[i].sing + "</li>");
    console.log(i);
}
}

function updateProgress(duration,newValue,currentBar){
    $('#totalBar').attr("max",duration);
    totalBar.val(newValue);
  totalBar.css('background', 'linear-gradient(to right, #ffffff, #ffffff ' + currentBar+ ', #707070)');
}


function slideChange(value){
    audio.currentTime=value;

}


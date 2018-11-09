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
var musicList=[
    {
        "sing":"太早",
        "singer":"刘允乐",
       // "songPic":""  专辑封面
        "src":"res/audio/testSong.mp3"
    },{
        "sing":"我的梦",
        "singer":"张靓颖",
        "src":"res/audio/testSong2.mp3"
    },
    {
        "sing":"Mercy",
        "singer":"未知",
        "src":"res/audio/Mercy.mp3"
    }
];
var songName;
var singerName;
var songIndex=0;


$(document).ready(function(){

/*歌手、歌名*/
       songName=$('#sing');
    singerName=$('#singer');

    /*时间*/
    currentTime=$('#currentTime');
    fullTime=$('#totalTime');

    audio=document.getElementById('music');
    audioJq=$('#music');
    audio.autoplay=true;

    /*打开页面播放第一首歌*/
    loadFirstSong();

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
            if(songIndex==musicList.length-1){
                alert("当前是最后一首歌曲");

            }
        else {
                songIndex++;
                console.log(songIndex);
                songEnded();
                changeSong();
                audio.load();
                audio.play();
                document.getElementById('songPic').style.animationPlayState='running';       //音乐开始
            }
    }
    )
    //上一首
        $('#preBtn').click(function(){
            if(songIndex==0){
                alert("当前是第一首歌曲");

            }
            else {
                songIndex--;
                console.log(songIndex);
                songEnded();
                changeSong();
                audio.load();
                audio.play();
                document.getElementById('songPic').style.animationPlayState='running';       //音乐开始
            }
        })

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

    })
    //歌曲列表
    var flag=false;
    $('#btnMore').click(function(){
        if(flag==false) {
            createMusicList();
            flag=true;
        }else{
            $('#list').empty();
            flag=false;
        }
    })

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
    let currentBar = ($('#totalBar').width() / duration) * current;

    $('#currentBar').css({
            'width': currentBar + "px",
        }
    );
if(current==duration){
   songEnded();
   $('#nextBtn').click();
}
}
//第一首歌曲载入
function loadFirstSong(){
    songName.text(musicList[songIndex].sing).show();
    singerName.text(musicList[songIndex].singer).show();
    audioJq.append("<source src='"+ musicList[songIndex].src+"' type='audio/mp3' />");
    console.log(songName.text());
    audio.ondurationchange=function(){ getFullTime()}; // 获得总时长
    audio.ontimeupdate=function(){ getCurrentTime()}; // 获得现时长
}
//下一首
function changeSong(){
    songName.text(musicList[songIndex].sing).show();
    singerName.text(musicList[songIndex].singer).show();
    audioJq.append("<source src='"+ musicList[songIndex].src+"' type='audio/mp3' />");
    console.log(songName.text());
    audio.ondurationchange=function(){ getFullTime()}; // 获得总时长
    audio.ontimeupdate=function(){ getCurrentTime()}; // 获得现时长
}
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
for(let i=0;i<musicList.length;i++){
    $('#list').append("<li value='"+i+"'>"+musicList[i].sing+"</li>");
}
}
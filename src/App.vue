
<template>
  <div id="app">
    <!--页头-->

    <div class="tou" id="tousr">
      <img src="/img/logo枪.png" alt="" class="logo" />
      <ul>
        <!-- <router-link tag="li" to="/shouye" active-class="daohang"
          ><a>首页</a></router-link
        > -->
       
        <router-link tag="li" to="/fa" active-class="daohang"
          ><a>发现</a></router-link
        >
        <router-link tag="li" to="/ge" active-class="daohang"
          ><a>歌单</a></router-link
        >
        <router-link tag="li" to="/yi" active-class="daohang"
          ><a>新歌速递</a></router-link
        >
        <router-link tag="li" to="/mv" active-class="daohang"
          ><a>MV视听</a></router-link
        >
         <router-link tag="li" to="/wode" active-class="daohang"
          ><a>我的</a></router-link
        >
    
      </ul>
      <!--搜索框-->
      <div class="sousu">
        <input
          type="text"
          class="shuru"
          v-model="sstext"
          @keyup.enter="sousuye"
          placeholder="搜索你的音乐吧"
        />
      </div>
      <div class="kuan" id="kuansr"></div>
      <div class="kuan2" id="kuansr2"></div>
      <img :src="namexq.avatarUrl" alt="" class="tx" v-if="dlshow==true" />
      <img src="/img/tx.jpg" alt="" class="tx"  v-else/>
      <span class="name" v-if="dlshow==true">{{namexq.nickname}}</span>
       <span class="name" v-else>未登录</span>
    </div>

 <!-- 歌曲详情信息 -->
           <div class="mius-xq" v-show="isshow" @click.self="isshow=false">
                <div class="xqnr">

                  <div class="xqtop">
                    <div class="dh" :class="{playing:donghua}">
                       <!-- 动画 -->
            <img src="/img/根条.png" class="bang" />
            <!-- 黑胶碟片 -->
            <img src="/img/黑碟.png" class="die autoRotate" />
            <img :src="appimg" class="yuan autoRotate" />
            
          </div>
                       <div class="nr">
                          <div class="text4">歌名:<h3>{{gege2.name}}</h3></div>
                         <div class="text5"> <p>歌手：<span>{{gege.name}}</span></p><p>所属专辑：<span>《不明专辑》</span></p></div>
                    </div>
                 <div class="xs">
                   <h2>相关音乐推荐</h2>

                   <div class="tj" v-for="(item,index) in limit" :key="index" @click="bofa(item.id)"> 
                   <div class="tj-img"><img :src="item.album.picUrl" alt=""></div>
                   <div class="tj-text"><p>{{item.name}}</p><p>《{{ item.album.name }}》</p></div>
                   </div>
                 </div>
                  </div>

                  <!-- 歌曲评论 -->
                  <div class="xqbut">

                   <div class="pl-da"  v-for="(item,index) in hotComments" :key="index">
                     <div class="pl-da2">
                     <div class="pl-img"><div class="pl-img2"><img :src="item.user.avatarUrl" alt=""></div></div>
                     <div class="pl-id"><b>{{item.user.nickname}}</b> <span>12:50</span></div>
                     <div class="pl van-multi-ellipsis--l2">{{item.content}}</div>
                     </div>
                  </div>
                      
                 
                  </div>



                </div>

           </div>

    <!--内容-->
    <!-- <div class="ban"></div> -->
    <div class="mius-neiron" v-show="isshow==false">
      <router-view></router-view>
    </div>
    <!--播放器-->
    <div class="bfq" v-if="boshow">
      <div class="bfq-img" :class="{playing:donghua}">
        <img :src="appimg" alt="" class="autoRotate yuan2" @click="isshow=true" />
      </div>
      <audio :src="yinyue" controls autoplay id="bfq" @play="play()" @pause="pause()" ></audio>
    </div>
  
  </div>
</template>

<style scoped>
.name{
  float:right;
  position:absolute;
  right: 487px;
  bottom: 12px;
  color: rgb(255, 255, 255);
  font-size: 13px;
}
.tx{
  border-radius: 50%;
  width: 50px;
  height: 50px;
  float: right;
position: absolute;
right: 480px;
top: 3px;
}
.pl{
  width: 590px;
  height: 50px;

  float: left;
font-size: 15px;
line-height: 23px;
  background-color: rgb(248, 247, 239);
  
}
.pl-id span{
  font-size: 13px;
  color: rgb(145, 145, 145);
}
.pl-id b{
  font-size: 14px;
}
.pl-id{
  width: 620px;
  height: 30px;

  float: left;
}
.pl-img2 img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.pl-img2{
  width: 50px;
  height: 50px;

}
.pl-img{
  width: 60px;
  height: 80px;

   float: left;
}
.pl-da2{
  width: 100%;
  height: 95px;
  position: absolute;
}
.pl-da{
  width: 100%;
  height: 100px;
  border-bottom: 1px solid rgb(221, 221, 221);
  position: relative;
  margin: 20px auto;
 
}
/* 上面评论 */

.tj-img img{
  cursor: pointer;
}

.xqbut{
  width: 680px;



}
.tj-text p{
  margin: 10px 0px;
}
.tj-text{
  width: 160px;
  height: 100px;
 
  float: left;
}
.tj-img img{
 width: 100px;
  height: 100px;
}
.tj-img{
  width: 120px;
  height: 100px;
  float: left;
}
.tj{
  width: 280px;
  height: 100px;
  
  margin: 20px 0px;
}
.text5{
   width: 200px;
      height: 80px;
      
      position: absolute;
      right: 300px;
      top: 240px;
}
.text4{
      width: 200px;
      height: 80px;
   
      position: absolute;
      right: 300px;
      top: 90px;
}
.gm{
  width: 200px;
  height: 40px;
 
}

/*黑碟*/
.die {
    position: absolute;
    z-index: 9;
    top: 80px;
    left: 80px;
    width: 300px;
     height: 300px;
  
  }
/*音乐图片*/
 .yuan {
    position: absolute;
    left: 138px;
    top: 140px;
    width: 180px;
    height: 180px;
    border-radius: 75px;
    z-index: 8;
  }
  /*播放棒*/  
.bang{
    position: absolute;
    left: 200px;
    top: 0px;
    z-index: 10;
    
    transform: rotate(-20deg);
    transform-origin: 12px 12px;
    transition: 1s;
}
/* 播放杆（返回原来位置）*/
.playing .bang {
    transform: rotate(10deg);
  }
.playing .yuan{
  animation-play-state: running; /*running播放*/
}
.xs{
  width: 280px;
  
 
  float: left;
}
.nr{
  width: 230px;
  height: 400px;

  float: left;
}
.dh{
  width: 450px;
  height: 400px;
 
  float: left;
}
.xqtop{
  width: 960px;
  height: 400px;

  position: relative;
}

.xqnr{
  width: 960px;
  background-color: rgb(255, 255, 255);
  margin: 0 auto;

}
input{width: 200px;
height: 30px;
border:none;
border-radius: 30px;
text-align: center;
}
.mius-xq{
  width: 100%;

  position: relative;
  z-index: 48;
  background-color: rgb(46, 46, 46);
}
.yuan2 {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.bfq-img {
  width: 70px;
  height: 70px;

  position: absolute;
  left: 280px;
}

.ban {
  width: 100%;
  height: 20px;
  background-color: rgb(216, 216, 216);
}
/* 播放器 */
.bfq {
  width: 100%;
  height: 70px;
  background-color: #181515;
  position: fixed;
  bottom: 0;
  z-index: 50;
}

.sousu {
  width: 250px;
  position: absolute;
  right: 200px;
  top: 20px;
}
audio {
  position: fixed;
  bottom: 15px;
  left: 30%;

  width: 50%;
  z-index: 79;
}
.mius-neiron {
  left: 0%;
  top: 0%;
  position: relative;
  width: 100%;
  max-height: 100%;
  overflow: auto; /*高读随内容自动改变*/

  z-index: 1;
}

.tou {
  height: 85px;
  width: 100%;
  opacity: 1;
  position: fixed;
  z-index: 2;
  top: 0;
}

ul {
 margin-left: 150px;
  list-style: none;

}
ul li {
  float: left;
  width: 100px;
  line-height: 80px;
  text-align: center;
  transition: 0.5s;
}
a {
  text-decoration: none;
  color: rgb(229, 225, 225);
  font-weight: bold;
  font-size: 20px;
  border-bottom: 0px solid rgb(20, 154, 207);
  transition: 0.2s;
}

.tou > .logo {
  height: 100%;
  float: left;
  margin-left: 200px;
  opacity: 0.5;
  transition: 0.5s;
}

li:hover a {
  border-bottom: 4px solid rgb(20, 154, 207);
  color: rgb(233, 233, 233);
}
.kuan {
  height: 75px;
  width: 100%;
  background-color: rgb(32, 32, 32);
  position: fixed;
  z-index: -1;
  box-shadow: 5px 5px 30px #000;
  transition: height 0.2s, border 0.2s linear;
}
/* .kuan2 {
  height: 100px;
  width: 100%;
  background-color: rgb(37, 37, 37);
  position: absolute;
  z-index: -2;
  box-shadow: 5px 5px 30px #000;
} */
ul:hover li {
  width: 120px;
}
.tou:hover .kuan {
  height: 75px;
}
.tou:hover .logo {
  opacity: 1;
}
.tou:hover a {
  color: rgb(231, 231, 231)
}
.daohang a {
  color: rgb(161, 30, 30);
}
/* 动画 */
/* 旋转的动画 */
@keyframes Rotate {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}
/* 播放旋转 */
.autoRotate {
  animation-name: Rotate;

  animation-iteration-count: infinite; /*播放动画次数：无限*/
  animation-play-state: paused; /*paused暂停*/
  animation-timing-function: linear; /*动画头到尾的速度*/
  animation-duration: 4s; /*完成周期动画的所用时间*/
}

.playing .yuan2{
  animation-play-state: running; /*running播放*/
}

</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      //搜索内容
      sstext: "",
      //父亲音乐地址
      yinyue: "lijunkang",
      //音乐封面
      appimg: "/img/功能2.jpg",
      //动画
      donghua: false,
      //歌单详情页
      isshow:false,
      //播放器判断
      boshow:false,
      //歌曲详情
      gege2:{},
       //歌曲作者详情
      gege:"",
 
      //歌曲id
      geid:"",
      //相似歌曲
      limit:[],
       //歌曲评论
          hotComments:[],
      // 个人ID
        nameid:"",
        //个人详情
        namexq:{},
        //登录刷新判断
        dlshow:false
    };
  },


  methods: {
      bofa(id){
            this.yinyue="https://music.163.com/song/media/outer/url?id="+id;
  //歌曲详细信息（专辑图片）
           axios.get("http://musicapi.leanapp.cn/song/detail?ids="+id) 
         .then(res =>{
              // console.log(res);
             this.appimg=res.data.songs[0].al.picUrl;
          
          });
      },

    sousuye() {
      //非空判断
      if (this.sstext == "") {
        alert("请输入内容");
      } else {
        //带数据，跳转到搜索页
        // console.log("cdessssss");
        this.$router.push("/ss/" + this.sstext);
      }
    }, 
    //播放
       play(){
        console.log("播放");
        this.donghua=true;
        
       },
       //暂停
       pause(){console.log("暂停"); 
       this.donghua=false;
       }
  },
 
  watch: {
    nameid(){
      console.log(this.nameid);
         axios.get("http://musicapi.leanapp.cn/user/detail?uid="+this.nameid)
         .then(res =>{
               
              this.namexq=res.data.profile;
              this.dlshow=true;
            this.$router.push("/fa");
          });
      
    },
  
    geid(){
      //获取相似歌曲
           axios.get("http://musicapi.leanapp.cn/simi/song?id="+this.geid) 
         .then(res =>{
          //  console.log(res)
             
            this.limit=res.data.songs;
          });
    

               //歌曲详细信息
           axios.get("http://musicapi.leanapp.cn/song/detail?ids="+this.geid) 
         .then(res =>{
            // console.log(res.data.songs[0])

              this.gege=res.data.songs[0].ar[0];//歌手
                this.appimg=res.data.songs[0].al.picUrl;//歌曲照片
               this.gege2=res.data.songs[0];//歌名
          });
              
                  //歌曲评论获取
          axios.get("http://musicapi.leanapp.cn/comment/music?id="+this.geid)
          .then(res =>{
              console.log(res.data.hotComments);
              this.hotComments = res.data.hotComments;
          }) ; 
          
    }
  },

};
</script>
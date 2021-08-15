<template>
   <div id="sy">

   <div class="lbt">
    <video class="shipi"  autoplay muted="" loop>
        <source  src="/img/mv2.mp4" type="video/mp4">
    </video>
    <!--广告语-->
<div class="guanggou">
    <p class="text1">康康音乐，聆听</p>
</div>
 <!--变化的广告语-->
 
<div class="guanggou2">
    <p class="text1" style="color: rgb(207, 25, 25); font-size: 63px;">{{wenzi}}</p>
</div>

</div>

 <!--企业宣传语-->
<div class="xuanchuan">
    
    <p><span>———</span>康康音乐是以音乐运营的公司<span>———</span>
      <span class="pc"></span>
      通过互联网音乐获取在线收听及下载。
       <span class="pc"></span>
       我们以用户体验核心，共创优秀网站。
    </p>
    
</div>
<!--功能介绍-->
<div class="gongneng">
 <ul class="gnimg">
     <li @click="faxian"><p>发现音乐</p><img src="/img/功能1.jpg" alt="#"><div class="se"></div></li>
     <li @click="gedan"><p>推荐歌单</p><img src="/img/功能2.jpg" alt="#"><div class="se"></div></li>
     <li @click="mv"><p>最新MV</p><img src="/img/功能3.jpg" alt="#"><div class="se"></div></li>
 </ul>

</div>



</div> 

</template>

<style scoped>
.lbt{
    width: 100%;
    height: 700px;
    background-color: darkcyan;
    position: relative;
    
}
.lbt>img{
width: 100%;
height: 600px;
position: absolute;
z-index: 1;
}

.shipi{
    position: absolute;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
}
.guanggou{
    position: absolute;
   bottom: 50%;
   left: 35%;
    
}
.guanggou2{
    position: absolute;
   bottom: 50%;
   margin-left: 1000px;
    
}
.text1{
    display: inline-block;
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-size: 45px;
    letter-spacing:20px

}
.xuanchuan{
    height: 300px;
    background-color: rgb(241, 238, 237);
    position: relative;
}
.pc{
    display: block;
}

.xuanchuan>p{
    line-height: 60px;
    font-size: 25px;
    font-style: italic; /*文字倾斜*/
    position: absolute;
  left:40%;   
  top:90px;   
    
}
.gongneng{
     height: 300px;
     width: 100%;
    background-color: rgb(241, 238, 237);
    position: relative;
}

.gnimg{
    list-style: none;
    height: 300px;
   width: 1350px;
   text-align: center;
   margin: 0 auto;
   cursor: pointer;  
}
.gnimg>li{
    position: relative;
   margin: auto 25px;
float: left;
z-index: 1;
  
}

.gnimg>li>img{
   width: 400px;
   height: 250px;
    transition:0.3s;
    z-index: 2;
}

.gnimg>li>p{
    position: absolute;
    display: block;
   text-align: center;
   font-weight: bold;
   font-size: 30px;
   color: rgb(241, 241, 241);
   left: 33%;
   top: 40%;
  border-left: 0px solid rgb(250, 250, 250);
  border-right: 0px solid rgb(250, 250, 250);
  width: 150px;
  transition: 0.3s;
 z-index: 4;
}

.se{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 149, 255);
    opacity: 0;
    z-index: 3;
     transition:0.4s;
}

.gnimg li:hover img{
   transform: scale(1.07);
    
}
.gnimg li:hover p{
 border-left: 5px solid rgb(250, 250, 250);
 border-right: 5px solid rgb(250, 250, 250);

}
.gnimg li:hover .se{
   opacity: 0.7;
    
}

</style>

<script>

export default {
     data(){
         return{
        wenzi:"世界",
       list:['世界','情感','星辰','未来','远方'],
       dingshiqi:null,
       ac:0
         }
     },

    methods:{
       bofa(){
           this.wenzi=this.list[this.ac];
           this.ac++
           if(this.ac>4){
               this.ac=0
           }
       },
       dsq(){
          setInterval(this.bofa, 1500);
       },
       //发现音乐
       faxian(){
           //跳转整个路由中的某个网址
          this.$router.push("/yinyue2/fa")  
       },
       //推荐歌单
       gedan(){
           this.$router.push("/yinyue2/ge")  
       },
      //MV推荐
      mv(){
          this.$router.push("/yinyue2/mv")
      }
   },

   mounted:function(){               //vue自动触发的函数
      this.dsq();//需要触发的函数
    }


}
</script>
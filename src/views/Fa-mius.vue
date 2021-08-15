<template>
<div id="faxian">
  <div class="nr">
   <!-- 轮播图-->
    <div class="lubotu">
 

   <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="(lb,index) in banners" :key="index">
      <img :src="lb.imageUrl" alt="#" class="ban-img">
      </van-swipe-item>
</van-swipe>
</div>
<!-- 剧中定位 -->




<!--歌单-->
<div class="gedan">
  <!-- 推荐歌单文字-->
<div class="gedan-text"><h2>推荐歌单</h2></div>
  <div class="dan" v-for="(item,index) in list" :key="index" @click="gdid(item.id)">
    <div class="dan-img">
      <img src="/img/gdsr.png" class="img2">
      <img :src="item.picUrl" alt="#">
    <div class="fu"><div class="van-multi-ellipsis--l2 fu-text">
  {{item.copywriter}}
</div></div>
    </div>
  <p>{{item.name}}</p></div>
 
</div>

<!--最新音乐文字-->


<!--最新音乐-->
<div class="x-yinyue">
  <div class="gedan-text"><h2>最新音乐</h2></div>
<div class="yinyue" v-for="(item,index) in songs" :key="index ">
    <div class="imgsr"><div class="yinyue-img"><img :src="item.picUrl" alt="#" ><span><img src="/img/bf2.png" alt="" @click="bf(item.id)"></span></div><div class="wen">{{item.name}}</div><div class="ca">{{item.song.artists[0].name}}</div></div>
    
</div>
</div>


<!--推荐MV-->
<div class="x-mv">
  <!--推荐MV文字-->
<div class="gedan-text"><h2>推荐MV</h2></div>
    <div class="mv-kuai" v-for="(item,index) in mvs" :key="index " >
        <div class="mv-img"><img :src="item.picUrl" alt=""><span><img src="/img/bf2.png" alt="#" @click="mvsr(item.id)" ></span></div>
        <p>{{item.name}}</p>
        <b style=" color: rgb(150, 150, 150);">{{item.artistName}}</b>
    </div>
</div>

</div>


<div class="di"><div class="wenzi">
  <div class="wenzida">
  <div class="wenzi-1"><span> 李俊康的音乐网站-Ljksqlgaet</span></div>
   <div class="wenzi-2"><span> 感受音乐的聆听</span></div>
  </div>
  </div></div>




</div>


</template>

<script>
import Swiper from '../util/swiper.min.js'

import axios from 'axios'
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
export default {

       data(){
           return{
               //轮播图
               banners:[],
               //推荐歌单
               list:[] ,
               //最新音乐
               songs:[],
               //最新MV
              mvs:[],
           }
       },


    created(){
        //轮播图接口
          axios.get("https://autumnfish.cn/banner")
          .then(res =>{
             
              this.banners = res.data.banners
          });
          //推荐歌单
       axios({
           url:'https://autumnfish.cn/personalized',
           method:'get',
           params:{
               limit:18
           }
       }).then(res =>{ this.list =res.data.result 
                //  console.log(res)
       });

            //最新音乐
       axios({
           url:'https://autumnfish.cn/personalized/newsong',
           method:'get',
           params:{
               limit:10
           }
       }).then(res =>{ 
       //  console.log(res)
         
         this.songs =res.data.result });

       //最新MV
       axios({
           url:'https://autumnfish.cn/personalized/mv',
           method:'get',
           params:{
               limit:4
           }
       }).then(res =>{ this.mvs =res.data.result });

    //  个人头像
    

    },
    methods:{
        bf(id){
               //播放音乐,传给父组件地址
        this.$parent.yinyue="https://music.163.com/song/media/outer/url?id="+id;
               this.$parent.boshow="true";
                this.$parent.geid=id;
        
         },
        //去歌单详情页
        gdid(id){
          this.$router.push("/ges/"+id);
        },
        mvsr(id){
           this.$router.push("/mvs/"+id);
           this.$parent.boshow=false;
        },
    },
  

      mounted() {
    new Swiper("#certify .swiper-container", {
      watchSlidesProgress: true,
      slidesPerView: "auto",
      centeredSlides: true,
      loop: true,
      loopedSlides: 5,
      autoplay: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        //clickable :true,
      },
      on: {
        progress: function (progress) {
          for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i);
            var slideProgress = this.slides[i].progress;
            var modify = 1;
            if (Math.abs(slideProgress) > 1) {
              modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
            }
            var translate = slideProgress * modify * 260 + "px";
            var scale = 1 - Math.abs(slideProgress) / 5;
            var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
            slide.transform(
              "translateX(" + translate + ") scale(" + scale + ")"
            );
            slide.css("zIndex", zIndex);
            slide.css("opacity", 1);
            if (Math.abs(slideProgress) > 3) {
              slide.css("opacity", 0);
            }
          }
        },
        setTransition: function (transition) {
          for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i);
            slide.transition(transition);
          }
        },
      },
    });
  }


}
</script>

<style scoped>
@import "/css/certify.css";
@import "/css/swiper.min.css";
.nr{
  width: 1100px;
  /*  max-height: 100%;
  overflow: auto; 高读随内容自动改变 */
  margin: 80px  auto;

}
.wenzida{
  width: 1100px;
  height: 130px;
 
  border-bottom: 2px solid rgb(135, 135, 135);
}
.wenzi-2 span{
  color: rgb(125, 125, 125);
  font-size: 13px;
}
.wenzi-1 span{
  margin-left: 20px;
  color: rgb(255, 255, 255);
}
.wenzi-2{
  width: 1100px;
  height: 30px;
 
 position: absolute;
 top: 50px;

}
.wenzi-1{
  width: 1100px;
  height: 30px;
 
 position: absolute;
 top: 20px;
 border-left: 4px solid rgb(21, 226, 245);
}
.wenzi{
width: 1100px;
height: 250px;
margin: 0 auto;

position: relative;
}

.di{
  width: 100%;
  height: 250px;
  background-color: rgb(41, 41, 41);
  position: relative;
  bottom: 0px;
}
#faxian{
  width: 100%;
  max-height: 100%;
  overflow: auto; /*高读随内容自动改变*/
   background: url(/img/背景3.jpg);
  background-size: cover;
}
.lubotu{
    position: relative;
    width:97%;
    height: 300px;
    margin: 0 auto;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 300px;
    text-align: center;
   
  }

.ban-img{
    display: block;
    width: 100%;
    height: 300px;
    line-height: 300px;
}
  .gedan-text{
      width: 100%;
      height: 40px;
      margin: 10px auto;
      margin-left: 20px;
      border-left: 4px solid rgb(17, 224, 251);
  }
  .gedan{
      width: 1100px;
      height: 650px;
      margin: 0  auto;
      /* background-color: rgb(251, 251, 251);
      box-shadow: 10px 10px 10px 10px rgb(104, 104, 104); */
  }
  .dan{
      width: 150px;
      height: 140px;
      float: left;
      margin: 26px 16px;
    
      
  }
.dan-img{
  width: 150px;
  height: 140px;
 
  position: relative;
}
.img2{
  position: absolute;
  right: 2px;
  width: 100px;
  height: 80px;
  top: 3px;
}
  .dan-img>img{
      width: 140px;
      height: 140px;
      cursor:pointer; 
      position: absolute;
      border-radius: 5px;
  }
  .fu{
    background-color: rgb(0, 0, 0);
    width: 100%;
    height: 0px;
    position: absolute;
    top: 0;
    transition:0.4s;
    opacity: 0.7;
  }
  .fu-text{
      position: absolute;
    opacity: 0;
     overflow:hidden;  /*实现文字超过宽度时隐藏*/
    text-overflow:ellipsis; /*以省略号显示*/
      transition:0.6s;
      font-size: 12px;
      color: rgb(255, 255, 255);
  }
.dan-img:hover .fu{
   height: 40px;
}
.dan-img:hover .fu-text{
 opacity: 1;

}
  .dan>p{
         overflow:hidden;  /*实现文字超过宽度时隐藏*/
    white-space:nowrap; /*设置文字超过宽度隐藏*/
    text-overflow:ellipsis /*以省略号显示*/
  }
  .x-mv{
    width: 1100px;
    height: 260px;
    /* background-color: rgb(251, 251, 251);
      box-shadow: 10px 10px 10px 10px rgb(104, 104, 104); */
  }
  .x-yinyue{
       width: 1100px;
      height: 690px;
      margin-top: 30px;
        /* background-color: rgb(251, 251, 251);
      box-shadow: 10px 10px 10px 10px rgb(104, 104, 104); */
  }
  .yinyue{
      width: 500px;
      height: 100px;
      margin: 10px 20px;
      float: left;
      background-color: rgb(253, 253, 253);
      box-shadow: 0 0 15px #4E4E4E;
     
   
  }

  .yinyue-img{
        width: 120px;
     height: 100px;
      float: left;
      position: relative;
  }
  .yinyue-img>img{
      width: 100px;
     height: 100px;
      position: absolute;
    
    z-index: 3;
  }
  .yinyue-img>span{
        position: absolute;
      z-index: 4;
  }
  .yinyue-img>span>img{
      position: absolute;
      width: 38px;
      height: 38px;
      top: 35px;
      left: 35px;
      z-index: 4;
      opacity: 0;
       transition: 0.3s;
       cursor:pointer; 
       
  }
.yinyue:hover{
    background-color: rgb(246, 245, 228);
}
  .yinyue-img:hover span img{
      opacity: 0.8;
  }

.wen{
    

  font-size: 15px;
  font-weight:bold
      
}
  .ca{
      margin-top: 40px;
    
    color: rgb(152, 152, 152);
  }

  .mv-kuai{
      width: 230px;
      height: 240px;
  
      float: left;
      margin: 10px 20px;
  }
  .mv-img{
      width:220px;
      height: 120px;
  
      position: relative;
  }
  .mv-img>img{
      width:220px;
      height: 120px;
      position: absolute;
      z-index: 3;
  }
  .mv-img>span{
      position: absolute;
      z-index: 4;
      
  }
  .mv-img>span>img{
      width: 40px;
      height: 40px;
      position: absolute;
      left: 90px;
      top: 40px;
      opacity: 0;
       transition: 0.3s;
       cursor:pointer; 
  }
  .mv-img:hover span>img{
      opacity: 0.8;
  }
  .mv-kuai>p{
    overflow:hidden;  /*实现文字超过宽度时隐藏*/
    white-space:nowrap; /*设置文字超过宽度隐藏*/
    text-overflow:ellipsis /*以省略号显示*/
  }

</style>
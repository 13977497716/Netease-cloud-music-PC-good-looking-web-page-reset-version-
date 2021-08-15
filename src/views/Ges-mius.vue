<template>
<div class="gess">
  <div id="gds">
    <div class="xx">
      <!-- 图片 -->
      <div class="xx-img"><img :src="list.coverImgUrl" alt="" /></div>
      <h1>{{list.name}}</h1>
      <div class="name">
        <img :src="list.creator.avatarUrl" alt="" /><span>{{list.creator.nickname}}</span>
      </div>
      <div>
        分类：<span><a href="#">{{list.tags[0]}}</a></span> /<span
          ><a href="#">{{list.tags[1]}}</a></span
        >
      </div>
      <div class="jj">
          <div class="van-multi-ellipsis--l2 fu-text">
  简介：{{list.description}}
</div>
      </div>
      <div class="btn">
        <button class="btn1">播放</button><button class="btn2">收藏</button>
      </div>
    </div>

    <!-- 多选 -->
    <div class="ss-duoxuan">
      <ul class="ss-daoan">
        <li @click="isshow = 'yy'">歌曲</li>
        <li @click="isshow = 'gg'">评论</li>
      </ul>
    </div>
    <!-- 歌曲 -->
    <div class="ss-yy" v-show="isshow == 'yy'">
      <!--标题列-->
      <div class="lie1">
        <table>
          <tr>
            <td style="width: 60px"></td>
            <td style="width: 520px">音乐标题</td>
            <td style="width: 320px">歌手</td>
            <td style="width: 440px">专辑</td>
            <td style="width: 60px">时长</td>
          </tr>
        </table>
      </div>
      <!-- 音乐列 -->
      <table>
        <div class="yi-div" v-for="(item,index) in list.tracks" :key="index" >
          <tr class="liebiao" @dblclick="bf(item.id)">
            <td style="width: 60px; text-align: center">{{index+1}}</td>
            <td style="width: 520px">
              <div>{{item.name}} <img src="/img/mvbf.png" alt="" class="yi-img3"  v-if="item.mv!=0"  @click="mvsr(item.mv)" /></div>
            </td>
            <td style="width: 320px">{{item.ar[0].name}}</td>
            <td style="width: 440px">《{{item.al.name}}》</td>
            <!--时间-->
            <td style="width: 60px">{{item.dt}}</td>
          </tr>
        </div>
      </table>

    </div>

    <!-- 评论 -->
    <div class="pl" v-show="isshow == 'gg'">
      <!-- 精彩 -->
      <h3>精彩评论({{jcpls}})</h3>
      <div class="pl-jc" v-if="jcpl.length!=0">
        <ul>
          <li v-for="(item,index) in jcpl" :key="index" >
            <div class="jc-img"><img :src="item.user.avatarUrl" alt="" /></div>
            <div>
              <div class="pinglenid">
             {{item.user.nickname}}
               <span>·{{item.time}}</span>
              </div>
              
              <div class="pinglen">
              <div class="van-multi-ellipsis--l2">
                {{item.content}}
              </div>
              </div>
            </div>
          </li>
        </ul>
      </div>


      <!-- 最新 -->
      <h3>最新评论({{zxpls}})</h3>
<div class="pl-jc" v-if="zxpl.length!=0">
        <ul>
          <li  v-for="(item,index) in zxpl" :key="index">
            <div class="jc-img"><img :src="item.user.avatarUrl" alt="" /></div>
            <div>
              <div class="pinglenid">
             {{item.user.nickname}}
               <span>·{{item.time}}</span>
              </div>
              
              <div class="pinglen">
              <div class="van-multi-ellipsis--l2">
                {{item.content}}
              </div>
              </div>
            </div>
          
          </li>

        
        </ul>
      </div>

    </div>
  </div>
  </div>
</template>




<script>



import axios from "axios";


export default {
  data() {
    return {
      isshow: "yy",
      //歌单内容
     list:{},
     //精彩评论
     jcpl:[],
     //精彩评论数量
     jcpls:0,
 
     //最新评论
     zxpl:[],
     //最新评论数
     zxpls:0,
    }
  },

  created(){
     //热门评论
     axios({
           url:'https://autumnfish.cn/comment/hot',
           method:'get',
           params:{
               id:this.$route.params.id,
               //传递类型
               type: 2,
               limit:4
           }
       }).then(res =>{ 
             //console.log(res)
             this.jcpl=res.data.hotComments
             this.jcpls=res.data.total

       for(let i=0;i<this.jcpl.length;i++){
          var unixTimestamp = new Date(this.jcpl[i].time) ;
          //重载方法
          Date.prototype.toLocaleString = function() {
                this.hour = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
                this.minute = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
                this.second = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
                return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.hour  + ":" + this.minute + ":" + this.second;
          };
          this.jcpl[i].time = unixTimestamp.toLocaleString();
        }
      
           });

             //最新评论
     axios({
           url:'https://autumnfish.cn/comment/playlist',
           method:'get',
           params:{
               id:this. $route.params.id,
               //传递类型
               type: 2,
               limit:20
               
           }
       }).then(res =>{ 
             //console.log(res)
             this.zxpl=res.data.comments
             this.zxpls=res.data.total

       for(let i=0;i<this.zxpl.length;i++){
          var unixTimestamp = new Date(this.zxpl[i].time) ;
          //重载方法
          Date.prototype.toLocaleString = function() {
                this.hour = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
                this.minute = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
                this.second = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
                return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.hour  + ":" + this.minute + ":" + this.second;
          };
          this.zxpl[i].time = unixTimestamp.toLocaleString();
        }

           });




       //歌单内容
       axios({
           url:'https://autumnfish.cn/playlist/detail',
           method:'get',
           params:{
               id:this. $route.params.id 
           }
       }).then(res =>{ 
              console.log(res)
           this.list =res.data.playlist 
           
             //处理时间
        for(var i =0;i<this.list.tracks.length;i++){
            var haomiao = this.list.tracks[i].dt
            var fen = parseInt(haomiao/1000/60);
             var miao = parseInt(haomiao/1000%60);
              if(miao<10){
                 this.list.tracks[i].dt=  fen+":0"+miao;

               }else{
                   this.list.tracks[i].dt= fen+":"+miao;
               }
        }
           
           });


             //歌单歌曲
    //  axios({
    //        url:'https://autumnfish.cn/song/detail',
    //        method:'get',
    //        params:{
    //            id:this. $route.params.id,
    //            //传递类型
    //           //  type: 2,
    //            limit:15
    //        }
    //    }).then(res =>{ 
    //          console.log(res)
            
      
    //        });


  },
  //时间处理
  
  methods:{
      mvsr(id){
         this.$parent.boshow=false;
        this.$router.push("/mvs/"+id);
        
        },
      bf(id){
          this.$parent.geid=id;
               //播放音乐,传给父组件地址
        this.$parent.yinyue="https://music.163.com/song/media/outer/url?id="+id;
 this.$parent.boshow="true";
                 //歌曲详细信息（专辑图片）
           axios.get("http://musicapi.leanapp.cn/song/detail?ids="+id) 
         .then(res =>{
              console.log(res);
             this.$parent.appimg=res.data.songs[0].al.picUrl;
             this.$parent.gege=res.data.songs[0];
          });
  }}
};
</script>


<style scoped>

/* 评论 */
.pinglenid span{
  font-size: 12px;
  color: rgb(173, 173, 173);
}
.pinglenid{
  width: 800px;
  height: 30px;

  float: left;
}
.pinglen{
  width: 800px;
  height: 50px;
   background-color: rgb(234, 234, 234);
  float: left;
  border:1px solid rgb(195, 195, 195);
  font-size: 13px;
}

.gess{
  background-color: snow;
}

#gds {
   
  width: 1100px;
  max-height: 100%;
  overflow: auto; /*高读随内容自动改变*/
  margin: 80px auto;
}
.xx {
  width: 1000px;
  height: 220px;
  box-shadow: 0px 0px 10px slategray;
  margin: 30px auto;
  border-radius: 10px;
 
}
.xx-img {
  width: 230px;
  height: 200px;

  float: left;
}
.xx-img > img {
  width: 200px;
  height: 220px;
  border-radius: 10px;
}
.name {
  width: 100%;
  height: 40px;
}
.name > img {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.jj {

  height: 60px;
  margin-top: 10px;
}

.btn > button {
  width: 110px;
  height: 35px;
  border-radius: 20px;
  border: none;
  margin: 0 20px;
  color: rgb(255, 255, 255);
}
.btn1 {
  background-color: rgb(10, 170, 233);
}
.btn2 {
  background-color: rgb(236, 33, 33);
}

/* 导航 */
.ss-duoxuan {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgb(132, 132, 132);
}
.ss-daoan {
  width: 500px;
  height: 50px;
  list-style: none;
}
.ss-daoan > li {
  float: left;
  width: 100px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.ss-daoan > li:hover {
  color: rgb(233, 56, 56);
}
/* 歌曲 */
.ss-yy {
  width: 100%;
}
.lie1 {
  width: 100%;
  height: 60px;
}
.yi-div:nth-child(2n) {
  background-color: rgb(243, 243, 243);
}
.yi-div {
  width: 100%;

  line-height: 60px;
  cursor: pointer;
}
.yi-div:hover {
  background-color: rgb(250, 241, 224);
}

.lie1 tr {
  width: 200px;
  height: 50px;
  font-size: 15px;
  color: rgb(113, 113, 113);
}
tr {
  height: 50px;
  font-size: 15px;
  color: rgb(46, 46, 46);
}

.yi-img3 {
  width: 30px;
  height: 20px;
  vertical-align: middle;
}

.fenyeqi {
  width: 400px;
  height: 100px;

  margin: 20px auto;
}
/* 音乐 */
.lie1 {
  width: 100%;
  height: 60px;
}
/* 评论 */
.pl {
  width: 100%;
  margin-top: 30px;
}
.pl-jc {
  width: 100%;

  margin-top: 20px;
}
.pl-jc  ul {
  width: 100%;


  list-style: none;

}
.pl-jc  ul li {
  width: 100%;
  height: 100px;
 margin: 30px 0px;
    border-bottom: 0.7px solid rgb(194, 194, 194);
}
.jc-img {
  width: 70px;
  height: 70px;
  float: left;
}
.jc-img > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

</style>
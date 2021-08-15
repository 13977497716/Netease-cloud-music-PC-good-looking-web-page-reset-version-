<template>
<div class="mvda">
  <div id="mvs">
    <!-- 视频块 -->
    <div class="mvs-kuai">
      <div class="xq"> <h2>MV详情</h2></div>
     
      <!-- 视频 -->
      <div class="sp">
        <!--视频-->
        <video :src="mvshow" controls autoplay></video>
      </div>

      <!-- 作者 -->
      <div class="zuoze">
        <img :src="mvsr.cover" alt="#" /><span>{{mvsr.artistName}}</span>
      </div>
      <!-- 标题 -->
      <div class="bt">
        <h1>{{mvsr.name}}</h1>
        <div class="time1">
          <span>发布：2019-10-22</span> <span>播放：{{mvsr.playCount}}次</span>
         
        </div>
      </div>
        <div class="van-multi-ellipsis--l3 ms">
                  {{mvsr.disc}}
                </div>

      <!-- 评论 -->
      <div class="pl">
        <!-- 精彩 -->
        <h3>精彩评论({{mvjcs}})</h3>
        <div class="pl-jc">
          <ul>
            <li  v-for="(item,index) in mvjc" :key="index">
            <div class="jc-img"><img :src="item.user.avatarUrl" alt="" /></div>
            <div>
              <div class="pinglenid">
             {{item.user.nickname}}
               <span>·12:50</span>
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
        <h3>最新评论({{ mvzxs }})</h3>
        <div class="pl-jc">
          <ul>
           <li  v-for="(item,index) in mvzx" :key="index">
            <div class="jc-img"><img :src="item.user.avatarUrl" alt="" /></div>
            <div>
              <div class="pinglenid">
             {{item.user.nickname}}
             <!-- {{item.time}} -->
               <span>·22:41</span>
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

    <div class="mvs-tj">
      <div class="xq"> <h2>相关推荐</h2></div>

      <div class="mvtj" v-for="(item, index) in mvx" :key="index">
        <div class="mv-kuai">
          <div class="mv-img">
            <img :src="item.cover" alt="" /><span
              ><img src="/img/bf2.png" alt="" @click="mvtz(item.id)"
            /></span>
          </div>
        </div>
        <div class="text van-multi-ellipsis--l2">
          {{ item.name }} <br />
          <div class="text-2">{{ item.artistsName }}</div>
        </div>
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
      // mv
      mvshow: "",
      //相关MV
      mvx: "",
      //mvx信息
      mvsr:{},
      //MV精彩评论
      mvjc:[],
      mvjcs:0,
      //MV最新评论
      mvzx:[],
       mvzxs:0
    };
  },

  watch:{
   
  },
  created() {
   this.mvbf();
 
  },
  methods:{
          mvbf(){
   //MV
    axios({
      url: "https://autumnfish.cn/mv/url",
      method: "get",
      params: {
        id: this.$route.params.id,
      },
    }).then((res) => {
     // console.log(res);
      this.mvshow = res.data.data.url;
    });
    //相关MV
    axios({
      url: "https://autumnfish.cn/simi/mv",
      method: "get",
      params: {
        mvid: this.$route.params.id,
      },
    }).then((res) => {
     // console.log(res);
      this.mvx = res.data.mvs;
    });
    //获取MV信息
     axios({
      url: "https://autumnfish.cn/mv/detail",
      method: "get",
      params: {
        mvid: this.$route.params.id,
      },
    }).then((res) => {
      // console.log(res);
       this.mvsr=res.data.data
    });

     //mv精彩评论
     axios({
           url:'https://autumnfish.cn/comment/hot',
           method:'get',
           params:{
               id:this. $route.params.id,
               //传递类型
               type: 1,
               limit:4
           }
       }).then(res =>{ 
            //  console.log(res)
             this.mvjc=res.data.hotComments
             this.mvjcs=res.data.total
      
           });

                      //最新评论
     axios({
           url:'https://autumnfish.cn/comment/mv',
           method:'get',
           params:{
               id:this. $route.params.id,
               //传递类型
              
               limit:20
               
           }
       }).then(res =>{ 
            //  console.log(res)
             this.mvzx=res.data.comments
             this.mvzxs=res.data.total
           });
          },




     mvtz(id){
       //刷新MV详情页
        
           this.$router.push("/mvs/"+id);
           this.mvbf();
     }
  }
};
</script>


<style scoped>
.xq h2{
  margin-left: 20px;
}
.xq{
  width: 700px;
  border-left: 5px solid rgb(239, 6, 6);
}
/* 评论 */
.pinglenid span{
  font-size: 12px;
  color: rgb(173, 173, 173);
}
.pinglenid{
  width: 500px;
  height: 30px;

  float: left;
}
.pinglen{
  width: 600px;
  height: 50px;
   background-color: rgb(234, 234, 234);
  float: left;
  border:1px solid rgb(195, 195, 195);
  font-size: 13px;
}

.ms{
  /* margin-top: 30px; */
  width: 100%;
  height: 30px;

}
.text-2 {
  margin-top: 20px;
  color: rgb(134, 134, 134);
}
.text {
  float: left;
  position: absolute;
  top: 50px;
  right: 0px;
  width: 170px;
  font-size: 15px;
  height: 100px;
}
.mv-kuai {
  width: 150px;
  height: 110px;

  float: left;
  margin: 10px 13px;
}
.mv-img {
 width: 150px;
  height: 110px;

  position: relative;
}
.mv-img > img {
 width: 150px;
  height: 110px;
  position: absolute;
  z-index: 3;
}
.mv-img > span {
  position: absolute;
  z-index: 4;
}
.mv-img > span > img {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 60px;
  top: 40px;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;
}
.mv-img:hover span > img {
  opacity: 0.8;
}
.mvtj {
  width: 350px;
  height: 130px;

  position: relative;
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
.pl-jc ul {
  width: 100%;

  list-style: none;
}
.pl-jc ul li {
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
.time {
  margin-top: 20px;
}

.time1 {
  margin-top: 20px;
}
.time1 span {
  margin: 0 10px;
}
.bt {
  width: 700px;
  height: 100px;
}
.zuoze {
  width: 800px;
  height: 120px;
}
.zuoze img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  vertical-align: middle;
}

video {
  width: 670px;
  height: 450px;
  margin-left: 13px;
}
.mvda{
  width: 100%;
  
}
#mvs {
  width: 1100px;
  max-height: 100%;
  overflow: auto; /*高读随内容自动改变*/
  margin: 80px auto;
}

.mvs-kuai {
  width: 700px;
 box-shadow: 0px 0px 13px rgb(89, 90, 91);
  float: left;
  margin: 20px auto;
   margin-left: 20px;
}
.mvs-tj {
  width: 350px;
  box-shadow: 0px 0px 13px rgb(104, 105, 106);
  float: left;
  margin: 20px auto;
  margin-left: 20px;
  
}
.sp {
  width: 700px;
  height: 470px;
}
</style>
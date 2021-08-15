<template>
  <div id="sousip">
    <!-- 标题 -->
    <div class="ss-top">
      <h1>{{ $route.params.name }}</h1>
      <span class="biaoqian">找到{{sum}}结果</span>
    </div>
    <!-- 多选 -->
    <div class="ss-duoxuan">
      <ul class="ss-daoan">
        <li @click="xs(),isshow ='yy'" class="lisr">歌曲</li>
        <li @click="xs(),isshow ='gg'" class="lis">歌单</li>
        <li @click="xs(),isshow ='mm'" class="lis">MV</li>
      </ul>
    </div>
    <!-- 音乐界面 -->
    <div class="ss-yy" v-show="isshow == 'yy'">
      <!--标题列-->
      <div class="lie1">
        <table>
          <tr>
            <td style="width: 60px"></td>
            <td style="width: 320px">音乐标题</td>
            <td style="width: 220px">歌手</td>
            <td style="width: 440px">专辑</td>
            <td style="width: 60px">时长</td>
          </tr>
        </table>
      </div>
      <!-- 音乐列 -->
      <table>
        <div class="yi-div"  v-for="(item,index) in songs" :key="index" @click="bofa(item.id)">
        <tr class="liebiao">
          <td style="width: 60px; text-align: center">{{index+1}}</td>
          <td style="width: 320px">
            <div>
             {{item.name}} <img src="/img/mvbf.png" alt="" class="yi-img3" v-if="item.mvid!=0"  @click="mvsr(item.mvid)"/>
            </div>
          </td>
          <td style="width: 220px">{{item.artists[0].name}}</td>
          <td style="width: 440px">《{{item.album.name}}》</td>
          <!--时间-->
          <td style="width: 60px">{{item.duration}}</td>
        </tr>
        </div>
      </table>
       <!--分页器
page-count 总页数
show-page-size 显示的页数
items-per-page 每页显示的内容数量
change 页码改变事件
-->
<div class="fenyeqi">
<van-pagination 
  @change="yemagaibian"
  v-model="page"
  :page-count="total"
  :show-page-size="5"
  :items-per-page="10" 
  force-ellipses
/>

</div>
    </div>
    <!-- 歌单页面 -->
      <div class="ge-gedansr" v-show="isshow == 'gg'">

        <div class="ge-gedan" v-for="(item,index) in list" :key="index"  @click="gdid(item.id)">
          <div class="ge-gedanimg">
            <img :src="item.coverImgUrl" alt="" />
            <p style="font-size: 13px">{{item.name}}</p>
          </div>
        </div>
  
      </div>
    

    <!-- MV页面 -->
   
      
     
<div class="x-mv" v-show="isshow == 'mm'">
  
    <div class="mv-kuai"  v-for="(item,index) in mvlist" :key="index" @click="mvid(item.id)">
        <div class="mv-img"><img :src="item.cover" alt=""><span><img src="/img/bf2.png" alt=""></span></div>
        <p>{{item.name}}</p>
        <b style=" color: rgb(150, 150, 150); font-size: 14px;">{{item.artistName}}</b>

</div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from 'vue';
import { Pagination } from 'vant';

Vue.use(Pagination);


// var lis=document.querySelectorAll('li');
// for(var i =0;i<lis.length;i++){
//   lis[i].onclick=function(){
//     // 排他思想
//     for(var y=0;y<lis.length;y++){
//       lis[y].className ="lis"
//     }
//     this.className="lisr"
//   }
// }


export default {
  data() {
    return {
      isshow: 'yy',
      
      //音乐
      songs:[],
      //歌单
      list:[],
      //MV
      mvlist:[],
      //搜索的结果数量
      sum:'',
      //当前页
      page:1,
      //总页数
      total:50
    };
  },

  watch:{
    isshow(){
    this.yinyue();
    },
    //音乐分页
    songs(){
      this.yinyue();
    }
  },
    created(){
         this.yinyue();
        

    },
    methods:{
         xs(){
var lis=document.querySelectorAll('li');
for(var i =0;i<lis.length;i++){
  lis[i].onclick=function(){
    // 排他思想
    for(var y=0;y<lis.length;y++){
      lis[y].className ="lis"
    }
    this.className="lisr"
  }
}

         },


        mvsr(id) {
    console.log(id);
    this.$router.push("/mvs/" + id);
  },
      //音乐获取
      yinyue(){
      
        var limit=10;
       var type=1;
      switch(this.isshow){
        case 'yy':
        type=1;
        limit=10;
        break;
        case 'gg':
        type=1000;
        limit=20;
        break;
        case 'mm':
        type=1004;
        limit=8;
        break;
        default:
          break;
      }
   axios({
             url:'https://autumnfish.cn/search',
             method:'get',
             params:{
               keywords: this.$route.params.name,
                 limit:limit,
                 //搜索类型
                 type:type,
                  //分页参数（页码-1）*每页显示m条数据
               offset:(this.page-1)*10,
                     
             }
         }).then(res =>{ 
                 //  console.log(res)
                   //获取歌曲
                   if(type==1){
                  
                         this.songs =res.data.result.songs 
                 
           //计算歌曲时间
           for(var i =0;i<this.songs.length;i++){
            var haomiao = this.songs[i].duration
            var fen = parseInt(haomiao/1000/60);
             var miao = parseInt(haomiao/1000%60);
              if(miao<10){
                 this.songs[i].duration=  fen+":0"+miao;

               }else{
                   this.songs[i].duration= fen+":"+miao;
               }
        };
          //搜索歌曲的总数
          this.sum=res.data.result.songCount
                   }
                   //获取歌单
                   else if(type==1000){
                      
                           //歌单逻辑
                           this.list=res.data.result.playlists
                           //总数 
                           this.sum=res.data.result.playlistCount
                    
                   }//获取MV
                   else{ 
                      this.mvlist=res.data.result.mvs
                      //总数
                      this.sum=res.data.result.mvCount

                   }
        
         });
         
      },
   
   //分页方法
       yemagaibian(a){
       console.log('当前页是'+a)
       //保存页码
       this.page=a;
       //重新获取数据
       this.yinyue();
       },

      //音乐播放
    bofa(id){
       this.$parent.boshow="true";
          //播放音乐,传给父组件地址
        this.$parent.yinyue="https://music.163.com/song/media/outer/url?id="+id;
          this.$parent.geid=id;

                   //歌曲详细信息（专辑图片）
           axios.get("http://musicapi.leanapp.cn/song/detail?ids="+id) 
         .then(res =>{
              // console.log(res);
             this.$parent.appimg=res.data.songs[0].al.picUrl;
               this.$parent.gege=res.data.songs[0];
          });
        
    },
      //去歌单详情页
        gdid(id){
          this.$router.push("/ges/"+id);
        },
      //去MV详情页
        mvid(id){
          this.$router.push("/mvs/"+id);
           this.$parent.boshow=false;
        }


    }

    
};
</script>



<style  scoped>
#sousip{
     width: 1100px;
  max-height: 100%;
  overflow: auto; /*高读随内容自动改变*/
  margin: 80px  auto;
}
.ss-yy {
  width: 100%;
  
}
.ss-gd {
  width: 100%;
 

}
.ss-mv {
  width: 100%;
  height: 300px;
 
}
.ss-top {
  width: 100%;
  height: 70px;
 
}
h1 {
  display: inline-block;
}
.biaoqian {
  color: rgb(181, 181, 181);
  font-size: 15px;
  margin-left: 20px;
}
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
.lis {
  float: left;
  width: 100px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  color: rgb(2, 2, 2);
}
 .lis:hover {
  color: rgb(233, 56, 56);
}
.lisr{
    float: left;
  width: 100px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  background-color: rgb(56, 56, 56);
  color: rgb(255, 255, 255);
}
/* 音乐 */
.lie1 {
  width: 100%;
  height: 60px;
  
}

.yi-div:nth-child(2n){  
    background-color: rgb(243, 243, 243);
   
}
.yi-div{
  width: 100%;
  height:65px;
line-height: 60px;
 cursor: pointer;
}
.yi-div:hover{
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

.fenyeqi{
    width: 400px;
    height: 100px;
  
    margin: 20px auto;
}
/* 歌单 */
.ge-gedansr{
    width: 100%;
    height: 570px;
  
 
}

.ge-gedan{
    width: 170px;
    height: 200px;
  
   float: left;
   margin: 10px 25px;
}
.ge-gedanimg{
    width: 170px;
    height: 150px;
}
.ge-gedanimg>img{
    width: 170px;
    height: 150px;
    border-radius: 10px;
    cursor: pointer;}
    /* MV */
    .x-mv{
    width: 100%;
    height: 500px;
 
}

/* mv */

 .mv-kuai{
      width: 240px;
      height: 225px;
  
      float: left;
      margin: 10px 13px;
  }
  .mv-img{
      width: 240px;
      height: 150px;
  
      position: relative;
  }
  .mv-img>img{
        width: 240px;
      height: 150px;
      position: absolute;
      z-index: 3;
  }
  .mv-img>span{
      position: absolute;
      z-index: 4;
      
  }
  .mv-img>span>img{
      width: 50px;
      height: 50px;
      position: absolute;
      left: 100px;
      top: 50px;
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
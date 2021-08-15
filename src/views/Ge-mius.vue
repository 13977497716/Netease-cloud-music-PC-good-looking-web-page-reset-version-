<template>
 <div id="ge">
     <div class="geda">
  <div class="ge-top">
      <img :src="toplist.coverImgUrl" alt="">
      <div class="ge-img"><img :src="toplist.coverImgUrl" alt="">
       <div class="jp">精品歌单</div>
       <p class="wen1">{{toplist.name}}</p>
       <div class="wen2">{{toplist.description}}</div>
      </div>
     
  </div>

<!--导航栏-->
<div class="ge-daoan">
    <div class="ge-daoan2">
                      <!--添加类名，条件为：ture,点击时tag改为本身-->
  <span class="item" :class="{red:tag=='全部'}" @click="tag='全部'">全部</span>
  <span class="item" :class="{red:tag=='欧美'}" @click="tag='欧美'">欧美</span>
  <span class="item" :class="{red:tag=='华语'}" @click="tag='华语'">华语</span>
  <span class="item" :class="{red:tag=='流行'}" @click="tag='流行'">流行</span>
  <span class="item" :class="{red:tag=='说唱'}" @click="tag='说唱'">说唱</span>
  <span class="item" :class="{red:tag=='摇滚'}" @click="tag='摇滚'">摇滚</span>
  <span class="item" :class="{red:tag=='民谣'}" @click="tag='民谣'">民谣</span>
  <span class="item" :class="{red:tag=='电子'}" @click="tag='电子'">电子</span>
  <span class="item" :class="{red:tag=='治愈'}" @click="tag='治愈'">治愈</span>
  <span class="item" :class="{red:tag=='旅行'}" @click="tag='旅行'">旅行</span>

    </div>
</div>


<!--歌单-->
<div class="ge-gedansr">

<div class="ge-gedan" v-for="(item,index) in list" :key="index" @click="gdid(item.id)">
    <img src="/img/gdsr.png" alt="" class="ge-di">
<div class="ge-gedanimg"><img :src="item.coverImgUrl" alt="">
<p style="font-size:13px ;">{{item.name}}</p>
 </div>
</div>
</div>
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


<div class="di"><div class="wenzi">
  <div class="wenzida">
  <div class="wenzi-1"><span> 李俊康的音乐网站-Ljksqlgaet</span></div>
   <div class="wenzi-2"><span> 感受音乐的聆听</span></div>
  </div>
  </div></div>

 </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import { Pagination } from 'vant';

Vue.use(Pagination);
export default {
 data(){
     return{
     //总条数
     total:0,
     //页码
     page:1,
     //顶部的推荐歌单
     toplist:{},
     //歌单列表
     list:[],
     //当前选择的数据
     tag:"全部"
     }
 },
 //侦听器(侦听data中变量的改变，改变就运行此变量函数代码)
 watch:{
    tag(){
      //顶部的 精品歌单
  this.topData()
   //歌单列表
   this.listData()
   this.page=1
    }
 },

 created(){
  //顶部的 精品歌单
  this.topData()
   //歌单列表
   this.listData()
 },
 methods:{
         //抽取的方法1 顶部的数据
         topData(){
             //顶部的 精品歌单
   axios({
           url:'https://autumnfish.cn/top/playlist/highquality',
           method:'get',
           params:{
               limit:1,
               //歌单标签参数cat
               cat:this.tag
           }
       }).then(res =>{ 
         console.log(res)
         this.toplist =res.data.playlists[0] });
         },

         //抽取的方法2 列表的数据
         listData(){
 axios({
           url:'https://autumnfish.cn/top/playlist/',
           method:'get',
           params:{
               limit:24,
                //分页参数（页码-1）*每页显示m条数据
               offset:(this.page-1)*24,
                //歌单标签参数cat
               cat:this.tag
           }
       }).then(res =>{ 
           //保存总条数
           this.total =res.data.total
           this.list =res.data.playlists });

         },

       yemagaibian(a){
       console.log('当前页是'+a)
       //保存页码
       this.page=a;
       //重新获取数据
       this.listData();
       },
         //去歌单详情页
        gdid(id){
          this.$router.push("/ges/"+id);
        }



        
 }

}
</script>


<style scoped>
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


.ge-di{
    position: absolute;
    z-index: -1;
    top: 7px;
    width: 143px;
    height: 135px;
}
.geda{
    width: 1100px;
  max-height: 100%;
  overflow: auto; /*高读随内容自动改变*/
  margin: 80px  auto;
}
#ge{
  width: 100%;
 
background-color: rgb(233, 233, 233);
position: relative;
z-index: -2;
}

/*分页器设置*/
.van-pagination__item{
    background-color: rgb(231, 231, 231);
    min-width: 80px;
    color: #000;
}

.ge-top{
    width: 100%;
    height: 220px;
    border-radius: 10px;
    position: relative;
    border-radius: 20px;
    
}
.ge-top>img{
    width: 100%;
    height: 200px;
    position: absolute;
    filter: blur(7px);
    border-radius: 10px;
    
}
.ge-img{
    width: 95%;
    height: 160px;
   
    float: left;
    margin: 20px 20px;
    position: absolute;
    z-index: 5;
}
.ge-img>img{
    width: 150px;
    height: 160px;
    
}
.jp{
    width: 100px;
    height: 30px;
    border:2px solid rgb(246, 214, 50);
    border-radius: 5px;
   position: absolute;
   top: 0px;
   left: 170px;
color:  rgb(246, 214, 50);
   text-align: center;
}
.wen1{
    position: absolute;
    top: 45px;
    left: 170px;
    color: rgb(255, 255, 255);
}
.wen2{
    position: absolute;
    height: 82px;
    width: 81%;
    top: 73px;
    left: 170px;
    font-size: 15px;
    color: rgb(197, 197, 197);
  overflow: hidden;
  display: -webkit-box;
 
    text-overflow:ellipsis /*以省略号显示*/
}
.ge-daoan{
    width: 1100px;
    height: 80px;
     
    position: relative;
}
.ge-daoan2{
    width: 1100px;
    height: 30px;
    cursor: pointer;
    position: absolute;
    top: 30%;
    right: 0px;
    text-align: right;
    background-color: rgb(255, 255, 255);
     border-radius: 20px;
}
.item{
    padding: 0px 15px;
}
.red{
    color: rgb(188, 57, 57);
}
.ge-gedansr{
    width: 1100px;
    height: 900px;
   
  
}

.ge-gedan{
    width: 155px;
    height: 200px;
 
   float: left;
   margin: 10px 14px;
   position: relative;
}
.ge-gedanimg{
     width: 135px;
    height: 140px;
}
.ge-gedanimg>img{
    width: 135px;
    height: 140px;
    border-radius: 10px;
    cursor: pointer;
   
}
.fenyeqi{
    width: 400px;
    height: 100px;
  
    margin: 0 auto;
}
</style>
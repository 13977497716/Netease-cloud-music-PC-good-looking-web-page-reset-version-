<template>
    <div id="mv-kuai">
        <div class="gedanda">
<!--导航栏1-->
<div class="ge-daoan">
    <div class="ge-daoan2">
                      <!--添加类名，条件为：ture,点击时tag改为本身-->
    地区：
  <span class="item" :class="{red:area=='全部'}" @click="area='全部'">全部</span>
  <span class="item" :class="{red:area=='内地'}" @click="area='内地'">内地</span>
  <span class="item" :class="{red:area=='港台'}" @click="area='港台'">港台</span>
  <span class="item" :class="{red:area=='欧美'}" @click="area='欧美'">欧美</span>
  <span class="item" :class="{red:area=='日本'}" @click="area='日本'">日本</span>
  <span class="item" :class="{red:area=='韩国'}" @click="area='韩国'">韩国</span>
 

    </div>
</div>

<!--导航栏2-->
<div class="ge-daoan">
    <div class="ge-daoan2">
                      <!--添加类名，条件为：ture,点击时tag改为本身-->
    类型：
  <span class="item" :class="{red:type=='全部'}" @click="type='全部'">全部</span>
  <span class="item" :class="{red:type=='官方版'}" @click="type='官方版'">官方版</span>
  <span class="item" :class="{red:type=='原声'}" @click="type='原声'">原声</span>
  <span class="item" :class="{red:type=='现场版'}" @click="type='现场版'">现场版</span>
  <span class="item" :class="{red:type=='网易出品'}" @click="type='网易出品'">网易出品</span>
    </div>
</div>

<!--导航栏3-->
<div class="ge-daoan">
    <div class="ge-daoan2">
                      <!--添加类名，条件为：ture,点击时tag改为本身-->
    排序：
  <span class="item" :class="{red: order=='上升最快'}" @click=" order='上升最快'">上升最快</span>
  <span class="item" :class="{red: order=='最热'}" @click=" order='最热'">最热</span>
  <span class="item" :class="{red: order=='最新'}" @click=" order='最新'">最新</span>
    </div>
</div>

</div>
<!--推荐MV-->
<div class="x-mv">
    <div class="mv-kuai" v-for="(item,index) in list" :key="index">
        <div class="mv-img" @click="mvsr(item.id)"><img :src="item.cover" alt=""><span><img src="/img/bf2.png" alt="#" ></span></div>
        <p>{{item.name}}</p>
        <b style=" color: rgb(150, 150, 150); font-size: 14px;">{{item.artistName}}</b>
    </div>
</div>

<div class="mv-fenye">
<!--分页器
page-count 总页数
show-page-size 显示的页数
items-per-page 每页显示的内容数量
change 页码改变事件
-->

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
     total:50,
     //页码
     page:1,
     //页容量
     limit:8,
     //地区
     area:"全部",
     //类型
     type:"全部",
     //排序
     order:"上升最快",
    //视频组
    list:[],

        }
    },

watch:{
    area(){
        this.mvdata();
        this.page=1;
    },
    type(){
    this.mvdata();
    this.page=1;
    },
    order(){
   this.mvdata();
   this.page=1;
    }
},

    created(){
         //最新MV
      this.mvdata();
    },
    methods:{
        mvsr(id){
            this.$parent.boshow=false;
        this.$router.push("/mvs/"+id);
        },
        //最新MV
        mvdata(){
             axios({
           url:'https://autumnfish.cn/mv/all',
           method:'get',
           params:{
               area:this.area,
               type:this.type,
               order:this.order,
               limit:this.limit,
               //分页
               offset:(this.page-1)*this.limit
           }
       }).then(res =>{ 
        //  console.log(res)
           this.list=res.data.data});
        },
        yemagaibian(a){
           this.page=a;
           //页面已改变重新获取数据
           this.mvdata();
        }
        
    },
   
}
</script>



<style scoped>
.gedanda{
    width: 1000px;
    box-shadow: 0px 0px 10px rgb(116, 116, 116);
    height: 150px;
  margin: 20px auto;
  border-radius: 20px;
}
#mv-kuai{
    width: 1100px;
  max-height: 100%;
  overflow: auto; /*高读随内容自动改变*/
  margin: 80px  auto;
}

/*分页设置*/
.mv-fenye{
    width: 400px;
    height: 100px;
  
    margin: 0px auto;
}
.ge-daoan{
    width: 100%;
    height: 50px;
    
    position: relative;
}
.ge-daoan2{
    width: 800px;
    height: 30px;
    cursor: pointer;
    position: absolute;
    top: 15px;
    left: 50px;
    text-align: left;
    
}
.item{
    padding: 0px 40px;
   border-right: 1px solid rgb(219, 219, 219);
}
.red{
    color: rgb(188, 57, 57);
}

.x-mv{
    width: 1100px;
    height: 500px;
 
}

 .mv-kuai{
      width: 230px;
      height: 200px;
     
      float: left;
      margin: 10px 18px;
  }
  .mv-img{
      width: 100%;
      height: 150px;
  
      position: relative;
  }
  .mv-img>img{
      width: 230px;
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
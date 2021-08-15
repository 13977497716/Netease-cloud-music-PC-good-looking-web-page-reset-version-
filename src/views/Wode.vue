<template>
<div class="dlsr">
  <div id="dl">
   <div class="bq"><img src="/img/音乐符.png" alt="#"></div>


  <div class="mub">


    <div class="imgsr">
      <img src="/img/花.png" alt="#">
    </div>


    <div class="xz">
   <ul>
     <router-link tag="li" to="/wode/denlus">登录</router-link>
     <router-link tag="li" to="/wode/zhuche">注册</router-link>
    
   </ul>
   </div>

<div class="nr"> <router-view></router-view></div>
   
  </div>
  </div>
  </div>
</template>
<script>
export default {
   data(){
     return{
       nameid:""
     }
   },
   watch:{
     nameid(){
         this.$parent.nameid= this.nameid
     }
   }
}
</script>

<style scoped>
.dlsr{
  width: 100%;
background: url(/img/背景.jpg);
background-size: 100%;
   max-height: 100%;
   overflow: auto; /*高读随内容自动改变  */
}
#dl{
  
  width: 790px;
  height: 560px;
  margin: 130px auto;
  position: relative;
 
}

.mub {
  background-color: rgb(248, 248, 248);
  width: 750px;
  height: 460px;
  
  box-shadow: 15px 10px 30px #000;
  border-radius: 20px;
  position: absolute;
  top: 60px;
  
}
.imgsr{
  width: 380px;
  height: 460px;
  position: relative;
  float: left;
  border-right: 2px solid rgb(37, 37, 37);
}

.imgsr img{
  width: 320px;
  height: 400px;
  top: 60px;
  left: 30px;
  position: absolute;
}
.nr{
  width: 350px;
  height: 340px;
  
  float: left;
} 


.xz{
  height: 120px;
  width: 350px;
  
  float:right;
  
}



 ul{
   list-style: none;
   height: 80px;
    width: 300px;
 
   margin: 30px auto;
     
 }
ul li{
  float: left; 
  text-align: center;
  padding: 0 50px;
  line-height: 80px;
  font-size: 20px;
  font-weight: bold;
  color: #fed459;;
}

.bq{
 
  background-color: #f8cd4b;;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  z-index: 3;
  left: 140px;
  top: 30px;
  
}

.bq>img{
    position: absolute;
    z-index: 4;
    width: 30px;
    height: 40px;
    left: 16px;
    top: 5px;
}

.router-link-active{
  color: rgb(7, 7, 7)
}
</style>
 


<template>
  <div id="denglu">
    <div class="x"> 
    <ul>
      <li><p>Username</p><input type="text" placeholder="请输入手机号" v-model="name" /></li>
      <li><p>Password</p><input type="password" placeholder="请输入密码" v-model="mima"/></li>
    
      <li><button @click="dlbtn()">登录</button></li>
    </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data(){
    return{
        name:"",
        mima:"",
        id:''
    }
  },
   
  methods:{
    // confirm弹窗返回ture或者flase
       dlbtn(){
           
                 //登录
       axios({
           url:'https://autumnfish.cn/login/cellphone',
           method:'get',
           params:{
              phone:this.name,
              password:this.mima
           }
       }).then(res =>{
          console.log(res)

          if(res.data.code == 250)  return alert("网页连接发生不明错误哦");
          if(res.data.code != 200)  return alert("用户或密码不正确，请重新输出");
           
         this.id= res.data.account.id;
          alert("登录成功")
          this.$parent.nameid= this.id
            
        
        
       });
       }
  }


}
</script>



<style scoped>
.x{
  
 
  margin: 0 auto;
}

ul li{
  list-style: none;
  text-align: center;
 margin: 20px auto;
}
input{
  width: 230px;
  height: 40px;
   background-color: rgb(248, 248, 248);
  text-align: center;
  border: none;
 border-bottom: 2px solid rgb(118, 118, 118);
}
button{
  width: 170px;
  height: 50px;
  border-radius: 30px;
  background-color: #fed459;
  color: rgb(255, 255, 255);
  font-size: 20px;
  box-shadow: 5px 5px 10px  #fed459;
  margin: 40px auto;
   font-weight: bold;
  
}

button:hover{
  background-color: #fddd7b;
  overflow: 0.7;
  color: rgb(183, 183, 183);
  width: 160px;
  height: 45px;
}

p{
  margin-left:-170px ;
  color: rgb(118, 118, 118); 
  font-size: 15px;
}
</style>
 


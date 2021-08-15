<template>
  <div id="zhuche">
    <div class="z"> 
    <ul>
         <li><p>Username</p><input type="text" placeholder="请输入昵称" /></li>
      <li><p>Password</p><input type="password" placeholder="请输入密码" /></li>
      <li><p style=" margin-left:-180px ;">Confirm</p><input type="password" placeholder="确认密码"/></li>
     <li><button>注册</button></li>
    </ul>
    </div>
  </div>
</template>


<style scoped>
.z{
  
 
  margin: 0 auto;
}

ul li{
  list-style: none;
  text-align: center;
 margin: 10px auto;
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
 
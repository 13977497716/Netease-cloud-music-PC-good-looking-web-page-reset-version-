<template>
  <div id="mius">
    <div class="daquan">
      <!--顶部-->
     
     <div class="mius-top2">
        <!--搜索框-->
        <div class="sousu">
           <input
            type="text"
            class="shuru"
            v-model="sstext"
            @keyup.enter="sousuye"
            placeholder="搜索你的音乐吧"
          />
         

          <!-- <van-search
  v-model="sstext"
  shape="round"
  background="#f33d37"
  placeholder="请输入搜索关键词"
  @keyup.enter="sousuye"
/> -->
        </div>
      </div>
      <!--导航-->
      <div class="mius-daoan">
        <ul>
          <router-link tag="li" to="/yinyue2/fa">发现音乐</router-link>
          <router-link tag="li" to="/yinyue2/ge">推荐歌单</router-link>
          <router-link tag="li" to="/yinyue2/yi">最新音乐</router-link>
          <router-link tag="li" to="/yinyue2/mv">最新MV</router-link>
        </ul>
      </div>

      <!--内容-->

      <div class="mius-neiron">
        <router-view></router-view>
      </div>

      <!--播放器-->
      <audio :src="yinyue" controls autoplay id="bfq"></audio>

     
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Search } from "vant";

Vue.use(Search);
export default {
  data() {
    return {
      //搜索内容
      sstext: "",
      //父亲音乐地址
      yinyue: "lijunkang",
     
    
    };
  },
  methods: {
    sousuye() {
      //非空判断
        if(this.sstext ==''){
     
      alert("请输入内容");
     
        }else{
            //带数据，跳转到搜索页
            console.log('cdessssss')
           this.$router.push("/yinyue2/ss/"+this.sstext);
        }
    },
  },
};
</script>


<style  scoped>
audio {
  position: fixed;
  bottom: 0px;
  background-color: rgb(215, 215, 215);
  width: 100%;
  z-index: 99;
}

.sousu {
  width: 250px;
  position: absolute;
  right: 0;
  top: 10px;
}
.mius-neiron {
  left: 23%;
  top: 30%;
  position: relative;
  width: 65%;
  max-height: 100%;
  overflow: auto; /*高读随内容自动改变*/

  z-index: 1;
}

.daquan {
  left: 0;
  top: 0;
  position: relative;
  width: 100%;
  max-height: 100%;
  overflow: auto; /*高读随内容自动改变*/
  background-color: rgb(251, 251, 251);
}

.mius-top {
  width: 100%;
  height: 180px;
}

.mius-top2 {
  width: 100%;
  height: 79px;
  position: fixed;
  background: rgb(243, 61, 55);
  top: 0;
  z-index: 2;
}
.mius-daoan {
  width: 200px;
  height: 800px;
  background: rgb(234, 234, 234);
  float: left;
  position: fixed;
  top: 21%;
  border-right: 2px solid rgb(217, 217, 217);
}
ul {
  list-style-type: none;

  width: 100%;
}
ul li {
  text-align: center;
  line-height: 60px;
  color: rgb(53, 53, 53);
}
li:hover {
  background-color: rgb(251, 247, 231);
}
.router-link-active {
  color: rgb(181, 44, 44);
}

/*mv层*/
.mvtuchen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(34, 34, 34);
  z-index: 99;
}
video {
  display: block;
  margin: 200px auto;
  width: 800px;
  height: 500px;
}
</style>
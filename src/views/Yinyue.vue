<template>
  <div id="appsr">
    <!--顶部布局-->
    <div class="top">
      <!--搜索框-->
      <div class="sso">
      
        <input
          type="text"
          class="shuru"
          v-model="msg"
          @keyup.enter="chaxun"
          placeholder="搜索你的音乐吧"
        />
        <button class="ss" @click="chaxun">搜索</button>
        
      </div>
    </div>
    <!--左部布局-->
    <div class="left">
      <div class="miss" :class="{ playing: donghua }">
        <img src="/img/根条.png" class="bang" />
        <!-- 黑胶碟片 -->
        <img src="/img/黑碟.png" class="die autoRotate" />
        <img :src="imgsc" class="yuan autoRotate" />
      </div>
    </div>
    <!--中部布局-->
    <div class="cente">
      <!--歌曲内容-->

      <ul>
        <li v-if="list.length > 0">
          <span class="sy"></span>
          <span
            style="width: 300px; color: deepskyblue; margin-left: 30px"
            class="wen"
            >歌曲</span
          >
          <span style="width: 190px; color: deepskyblue" class="wen">作者</span>
          <span style="width: 170px; color: deepskyblue" class="wen">专辑</span>
          <span style="color: deepskyblue">时间</span>
        </li>

        <li v-for="(m, sy) in slist" class="liebiao" :key="sy">
          <span class="sy"> {{ sy + 1 }}</span>
          <img src="/img/bf.png" class="bofang" @click="bofan(m.id)" />
          <span style="width: 320px" class="wen">{{ m.name }}</span>
          <span style="width: 150px" class="wen">{{ m.artists[0].name }}</span>
          <span style="width: 190px" class="wen">《{{ m.album.name }}》</span>
          <span style="width: 100px" class="wen">{{
            shijian(m.duration)
          }}</span>
          <img
            src="/img/mvbf.png"
            class="bofang"
            @click="mv(m.mvid)"
            v-if="m.mvid != 0"
          />
        </li>

        <!--页数-->
        <li v-if="list.length > 0" style="text-align: center">
          <div class="yeshusr">
            <span
              ><button @click="fenye(dqpage - 1)" class="btn2">
                上一页
              </button></span
            >

            <span
              v-for="a in Math.ceil(list.length / 11)"
              class="yeshu"
              :key="a"
            >
              <a
                href="#"
                class="ace"
                @click="fenye(a)"
                :style="a == dqpage ? { color: 'gray', cursor: 'default' } : ''"
                >{{ a }}</a
              >
            </span>

            <span
              ><button @click="fenye(dqpage + 1)" class="btn2">
                下一页
              </button></span
            >
          </div>
        </li>
      </ul>
    </div>
    <!--右部布局-->
    <div class="right">
      <div class="gdt">
        <dl v-for="item in hotComments" :key="item">
          <dt>
            <img
              :src="item.user.avatarUrl"
              style="width: 70px; height: 70px"
              class="touxiang"
            />{{ item.user.nickname }}
          </dt>
          <hr />
          <dd>{{ item.content }}</dd>
          <br />
        </dl>
      </div>
    </div>
    <!--播放器-->
    <audio
      :src="yinyue"
      @play="play()"
      @pause="pause()"
      controls
      autoplay
      id="bfq"
    ></audio>

    <!--视频-->
    <div class="mvtuchen" v-if="isshow" @click.self="isshow = false">
      <video :src="mvshow" controls="controls"></video>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      msg: "",
      //存储音乐数组
      list: [],
      //音乐播放
      yinyue: "",
      //歌曲专辑图片
      imgsc: "",
      //歌曲评论
      hotComments: [],
      //歌曲MV
      mvshow: "",
      //歌唱
      gechi: [],
      //页数
      slist: [],
      dqpage: 1,
      //动画
      donghua: false,
      isshow: false,
    };
  },

  methods: {
    chaxun() {
      axios
        .get(
          "http://musicapi.leanapp.cn/search?keywords=" + this.msg + "&limit=60"
        )
        .then((res) => {
          this.list = res.data.result.songs;
          this.slist = this.list.slice(0, 11);
        });
    },
    //获取歌曲地址
    bofan(id) {
      this.yinyue = "https://music.163.com/song/media/outer/url?id=" + id;

      //歌曲详细信息（专辑图片）
      axios.get("http://musicapi.leanapp.cn/song/detail?ids=" + id).then((res) => {
        // console.log(res);
        this.imgsc = res.data.songs[0].al.picUrl;
      });

      //歌曲评论获取
      axios
        .get("http://musicapi.leanapp.cn/comment/music?id=" + id + "&limit=1")
        .then((res) => {
          //  console.log(res.data.hotComments);
          this.hotComments = res.data.hotComments;
        });

      //歌词
      axios.get("http://musicapi.leanapp.cn/lyric?id=" + id).then((res) => {
        console.log(res);
      });
    },
    //歌曲MV
    mv(mvid) {
      axios
        .get("http://musicapi.leanapp.cn/mv/detail?mvid=" + mvid)
        .then((res) => {
          //   console.log(res);
          this.isshow = true;
          this.mvshow = res.data.data.brs[240];
          var x = document.getElementById("bfq");
          x.pause();
        });
    },
    //毫秒转换为分钟
    shijian(t) {
      var m, y, h;
      //毫秒转换秒
      m = t / 1000;
      h = Math.floor(m / 60);
      y = Math.floor(m % 60);
      if (y < 10) {
        return h + ":0" + y;
      } else {
        return h + ":" + y;
      }
    },
    //分页
    fenye(a) {
      //a=1时  要0 ——10
      //a=2时  要10 —— 20
      if (a < 1) {
        a = 1;
      }

      if (a > Math.ceil(this.list.length / 11)) {
        a = Math.ceil(this.list.length / 11);
      }

      this.slist = this.list.slice((a - 1) * 11, a * 11);
      //当前页码
      this.dqpage = a;
    },

    //播放
    play() {
      console.log("播放");
      this.donghua = true;
    },
    //暂停
    pause() {
      console.log("暂停");
      this.donghua = false;
    },
  },
};
</script>


<style scoped>
.top {
  width: 900px;
  height: 90px;

   margin: 0 auto;
}
.left {
  width: 400px;
  height: 750px;
  /*  background-color: aquamarine;*/
  float: left;
}
.cente {
  width: 900px;
  height: 750px;
  /*  background-color: rgb(73, 26, 214);*/
  float: left;
}
.right {
  width: 340px;
  height: 750px;
  /* background-color: rgb(41, 41, 40);*/
  float: left;
  overflow: auto;
}
/*中间音乐CSS*/
b{
font-size: 30px;
margin: 0 20px;
}
.bofang {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  opacity: 0.7;
  cursor: pointer;
}
.bofang:hover {
  opacity: 1;
}
.sso {
  text-align: center;
  margin-top: 80px;
}
.shuru {
  width: 500px;
  height: 40px;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 20px;
}
.ss {
  width: 80px;
  height: 45px;
  background-color: deepskyblue;
  border: none;
  border: 2px solid rgb(12, 12, 12);
border-radius: 30px;
}
ul {
  list-style: none;
  width: 900px;
}
li {
  height: 40px;
  width: 900px;
}
audio {
  position: fixed;
  bottom: 0px;
  left: 400px;
  width: 960px;
}
.wen {
  display: inline-block;
}
span {
  overflow: hidden; /*实现文字超过宽度时隐藏*/
  white-space: nowrap; /*设置文字超过宽度隐藏*/
  text-overflow: ellipsis; /*以省略号显示*/
}
.sy {
  width: 50px;
  size: 10px;
  display: inline-block;
  text-align: center;
  color: deepskyblue;
}
.liebiao:nth-child(odd) {
  background-color: rgb(236, 231, 185);
}
.liebiao:hover {
  background-color: rgb(240, 236, 226);
}
/*左间图片CSS*/

.miss {
  width: 400px;
  height: 400px;
}
/*播放棒*/
.bang {
  position: absolute;
  left: 100px;
  top: 20px;
  z-index: 10;
  transform: rotate(-20deg);
  transform-origin: 12px 12px;
  transition: 1s;
}
/*黑碟*/
.die {
  position: absolute;
  z-index: 9;
  top: 100px;
}
/*音乐图片*/
.yuan {
  position: absolute;
  left: 58px;
  top: 155px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  z-index: 8;
}

/*动画*/

/* 旋转的动画 */
@keyframes Rotate {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}

/* 播放旋转 */
.autoRotate {
  animation-name: Rotate;

  animation-iteration-count: infinite; /*播放动画次数：无限*/
  animation-play-state: paused; /*paused暂停*/
  animation-timing-function: linear; /*动画头到尾的速度*/
  animation-duration: 4s; /*完成周期动画的所用时间*/
}
/*播放playing类的die类和yuan类*/
.playing .die,
.playing .yuan {
  animation-play-state: running; /*running播放*/
}

/* 播放杆（返回原来位置）*/
.playing .bang {
  transform: rotate(10deg);
}

/*右间评论CSS*/
.touxiang {
  border-radius: 50%;
  overflow: hidden;
  width: 80px;
  vertical-align: middle;
}

dl {
  /* background-color: rgb(41, 41, 41);*/
  margin-top: 30px;
  box-shadow: 5px 5px 10px rgb(80, 76, 52);
  width: 84%;
  margin-left: 40px;
}
dt {
  size: 15px;
  color: aliceblue;
  text-shadow: 4px 3px 5px rgb(63, 62, 62); /*添加字体文字的阴影*/
}

/*mv层*/
.mvtuchen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(34, 34, 34);
}
video {
  display: block;
  margin: 200px auto;
  width: 800px;
  height: 500px;
}

/*页码*/
.btn2 {
  width: 60px;
  height: 40px;
}
.yeshu {
  background-color: antiquewhite;
  margin: 0 20px;
}

a {
  text-decoration: none; /*去除网页超链接*/
  color: #000;
}
</style>
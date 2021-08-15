<template>
  <div id="yinyue-ye">
    <!--导航栏-->
    <div class="ge-daoan">
      <div class="ge-daoan2">
        <!--添加类名，条件为：ture,点击时tag改为本身-->
        <span class="item" :class="{ red: tag == '0' }" @click="tag = '0'"
          >全部</span
        >
        <span class="item" :class="{ red: tag == '7' }" @click="tag = '7'"
          >华语</span
        >
        <span class="item" :class="{ red: tag == '96' }" @click="tag = '96'"
          >欧美</span
        >
        <span class="item" :class="{ red: tag == '8' }" @click="tag = '8'"
          >日本</span
        >
        <span class="item" :class="{ red: tag == '16' }" @click="tag = '16'"
          >韩国</span
        >
      </div>
    </div>
    <!--标题列-->
    <div class="lie1">
      <table>
        <tr>
          <td style="width: 60px"></td>
          <td style="width: 120px"></td>
          <td style="width: 320px">音乐标题</td>
          <td style="width: 220px">歌手</td>
          <td style="width: 320px">专辑</td>
          <td style="width: 60px">时长</td>
        </tr>
      </table>
    </div>

    <table>
      <tr class="liebiao" v-for="(item, index) in songs" :key="index">
        <td style="width: 60px; text-align: center">{{ index + 1 }}</td>
        <!--图片-->
        <td style="width: 120px">
          <div class="yi-img">
            <img :src="item.album.picUrl" alt="" class="bf-img2" /><img
              src="/img/bf2.png"
              alt=""
              class="bf-img"
              @click="bofa(item.id)"
            />
          </div>
        </td>
        <td style="width: 320px">
          <div>
            {{ item.name }} 
            <img
              src="/img/mvbf.png"
              alt=""
              class="yi-img3"
              v-if="item.mvid != 0"
              @click="mvsr(item.mvid)"
            />
          </div>
        </td>
        <td style="width: 220px">{{ item.album.artists["0"].name }}</td>
        <td style="width: 320px">《{{ item.album.name }}》</td>
        <!--时间-->
        <td style="width: 60px">{{ item.duration }}</td>
      </tr>
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
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { Pagination } from "vant";
Vue.use(Pagination);

export default {
  data() {
    return {
      //新歌推荐
      songs: [],
      //新歌标签
      tag: 0,
    };
  },

  watch: {
    tag() {
      this.xinge();
    },
  },

  created() {
    this.xinge();
  },

  methods: {
    //音乐列表
    xinge() {
      //新歌列表
      axios({
        url: "https://autumnfish.cn/top/song",
        method: "get",
        params: {
          type: this.tag,
        },
      }).then((res) => {
        console.log(res);
        //处理新歌数据
        var lsit = res.data.data;
        this.songs = lsit.slice(0, 20);

        //处理时间
        for (var i = 0; i < this.songs.length; i++) {
          var haomiao = this.songs[i].duration;
          var fen = parseInt(haomiao / 1000 / 60);
          var miao = parseInt((haomiao / 1000) % 60);
          if (miao < 10) {
            this.songs[i].duration = fen + ":0" + miao;
          } else {
            this.songs[i].duration = fen + ":" + miao;
          }
        }
      });
    },
    //音乐播放
    bofa(id) {
      //播放音乐,传给父组件地址
       this.$parent.boshow="true";
         this.$parent.geid=id;
      this.$parent.yinyue =
        "https://music.163.com/song/media/outer/url?id=" + id;
        
      //歌曲详细信息（专辑图片）
      axios
        .get("http://musicapi.leanapp.cn/song/detail?ids=" + id)
        .then((res) => {
          //console.log(res);
          this.$parent.appimg = res.data.songs[0].al.picUrl;
          this.$parent.gege=res.data.songs[0];
        });
    },

    mvsr(id) {
    console.log(id);
    this.$router.push("/mvs/" + id);
     this.$parent.boshow=false;
  },
  },

  
};
</script>

<style  scoped>
#yinyue-ye {
  width: 1100px;
  max-height: 100%;
  overflow: auto; /*高读随内容自动改变*/
  margin: 80px auto;
}
.ge-daoan {
  width: 100%;
  height: 50px;

  position: relative;
}
.ge-daoan2 {
  width: 70%;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 30%;
  right: 0px;
  text-align: right;
}
.item {
  padding: 0px 15px;
}
.red {
  color: rgb(188, 57, 57);
}

.liebiao:nth-child(2n) {
  background-color: rgb(243, 243, 243);
}

.lie1 {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgb(174, 174, 174);
}

.lie1 tr {
  width: 200px;
  height: 60px;
  font-size: 15px;
  color: rgb(113, 113, 113);
}
tr {
  height: 94px;
  font-size: 15px;
  color: rgb(46, 46, 46);
}

.yi-img {
  position: relative;
  height: 80px;
  width: 0px;
}
.yi-img > .bf-img2 {
  width: 65px;
  height: 65px;
  border-radius: 5px;
  margin: 10px auto;
 
}
.bf-img {
  position: absolute;
  top: 28px;
  width: 25px;
  height: 25px;
  z-index: 2;
  left: 20px;
  cursor: pointer;
  opacity: 1;
}
.yi-img3 {
  width: 30px;
  height: 20px;
  vertical-align: middle;
  cursor: pointer;
}

.bf-img:hover {
  opacity: 0.7;
}
</style>
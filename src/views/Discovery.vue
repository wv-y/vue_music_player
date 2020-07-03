<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in gedan" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        推荐最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in newSongList" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="playMusic(index)"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div
              class="singer"
              v-for="(it, index) in item.song.artists"
              :key="index"
            >
              {{ it.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in newMvList" :key="index">
          <div class="img-wrap" @click="toMv(item.id)">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapActions, mapState } from 'vuex'
export default {
  name: "discovery",
  data() {
    return {
      //轮播图
      banners: [],
      //推荐歌单
      gedan: [],
      //推荐音乐
      newSongList: [],
      //推荐mv
      newMvList: [],
      musicList: []
    };
  },

  created() {
    //轮播图
    this.$axios.get("/banner").then((res) => {
      //console.log(res);
      this.banners = res.data.banners;
    });
    //推荐歌单
    this.$axios.get("/personalized?limit=12").then((res) => {
      //console.log(res)
      this.gedan = res.data.result;
    });
    //最新音乐
    this.$axios.get("/personalized/newsong").then((res) => {
      
      this.newSongList = res.data.result;
      for(let i = 0; i<this.newSongList.length; i++){
        let newSong = [
            {
              name: "",
              id: "",
              picUrl: "",
              artist:""
            },
          ];
          newSong[0].name = this.newSongList[i].name;
          newSong[0].id = this.newSongList[i].id;
          newSong[0].picUrl = this.newSongList[i].picUrl;
          newSong[0].artist = this.newSongList[i].song.artists[0].name;
          this.musicList.push(newSong[0]);
      }
    });
    //推荐mv
    this.$axios.get("/personalized/mv?limit=8").then((res) => {
      //console.log(res)
      this.newMvList = res.data.result;
    });
  },
  methods: {
    playMusic(index) {
      this.$axios
        .get("/song/url?id=" + this.musicList[index].id)
        .then((res) => {
          console.log(res);
          let url = res.data.data[0].url;
          //设置给父组件 Index 播放地址
          console.log(this.musicList);
          for (let i = 0; i < this.musicList.length; i++) {
            this.$parent.musicList[i] = this.musicList[i];
          }
          //this.$parent.musicList = this.newSongList;
          this.$parent.musicUrl = url;
          this.$parent.index = index;
          //element-ui Notification 通知
          this.$notify.closeAll();
          this.$notify({
            title: "正在播放",
            duration: 0, //不自动关闭
            dangerouslyUseHTMLString: true, //识别HTML片段
            position: "bottom-right", //弹出位置
            offset: 100, //偏移量
            message: `
        <div>
        <div class = "current-music-card">
					<img class = "cover" src="${this.musicList[index].picUrl}"></img>
          <h3 class = "music-name" >${this.musicList[index].name}--${this.musicList[index].artist}</h3>
        </div>
         <div class = "musicCradButton">
              <span class="iconfont icon-shangyishou" @click="lastMusic"></span>
              <span class="iconfont icon-bofang"></span>
              <span class="iconfont icon-xiayishou"></span>
          </div>
        </div>
				`,
          });
        });
    },

    lastMusic(){
      console.log("shihi")
    },

    //跳转到mv详情页
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
  },
};
</script>

<style></style>

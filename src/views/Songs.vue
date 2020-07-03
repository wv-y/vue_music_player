<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" @click="type=0" :class="{active:type==0}">全部</span>
      <span class="item" @click="type=7" :class="{active:type==7}">华语</span>
      <span class="item" @click="type=96" :class="{active:type==96}">欧美</span>
      <span class="item" @click="type=8" :class="{active:type==8}">日本</span>
      <span class="item" @click="type=16" :class="{active:type==16}">韩国</span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr
          class="el-table__row"
          v-for="(item, index) in musicList"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap" @click="playMusic(index)">
              <img :src="item.album.picUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span> {{ item.name }} </span>
                <span class="iconfont icon-mv"></span>
              </div>
            </div>
          </td>
          <td>
            <p v-for="(it, index) in item.album.artists" :key="index">
              {{ it.name }}
            </p>
          </td>
          <td>{{ item.album.name }}</td>
          <td> {{item.duration}} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "songs",
  data() {
    return {
      type: 0,
      songsList: [],
      musicList: [],
    };
  },
  created() {
    this.getSongs();
  },
  methods: {
    getSongs() {
      this.$axios.get("/top/song?type="+this.type).then((res) => {
        //console.log(res);
        this.songsList = res.data.data;
        for (let i = 0; i < this.songsList.length; i++) {
          let newSong = [
            {
              name: "",
              id: "",
              picUrl: "",
              duration: "",
              album: [],
              artist: ""
            },
          ];
          newSong[0].name = this.songsList[i].name;
          newSong[0].id = this.songsList[i].id;
          newSong[0].picUrl = this.songsList[i].album.picUrl;
          newSong[0].album = this.songsList[i].album;
          newSong[0].artist = this.songsList[i].album.artists[0].name;
          //转换时间格式
          let min = parseInt(this.songsList[i].duration / 60000);
          let sec = parseInt((this.songsList[i].duration / 1000) % 60);
          if (min < 10) {
            min = "0" + min;
          }
          if (sec < 10) {
            sec = "0" + sec;
          }
          newSong[0].duration = `${min}:${sec}`;
          this.musicList.push(newSong[0]);
        }
      });
    },

    //播放歌曲
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
              <span class="iconfont icon-shangyishou""></span>
              <span class="iconfont icon-bofang"></span>
              <span class="iconfont icon-xiayishou"></span>
          </div>
        </div>
				`,
          });
        });
    },
  },

  //监控类型改变
    watch: {
      type(){
        console.log(this.type);
        this.getSongs();
      }
    }
};
</script>

<style></style>

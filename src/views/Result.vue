<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title" :keywords="(inputData = $route.query.inputData)">
        {{ inputData }}
      </h2>
      <span class="sub-title">搜索结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
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
              @dblclick="playMusic(index)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span> {{ item.name }} </span>
                    <span
                      class="iconfont icon-mv"
                      v-if="item.mvid !== 0"
                      @click="toMv(item.mvid)"
                    ></span>
                  </div>
                </div>
              </td>
              <td>{{ item.artist }}</td>
              <td>{{ item.albumName }}</td>
              <td>{{ item.duration | playTimeFormat}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item,index) in resultList" :key="index" @click="toSongList(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num"> {{ item.playCount | playNumFormat }} </span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name"> {{ item.name }} </p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item,index) in resultList" :key="index"  @click="toMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num"> {{ item.playCount | playNumFormat }} </div>
              </div>
              <span class="time"> {{ item.duration | playTimeFormat }} </span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pageNum"
      :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "result",
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      activeIndex: "songs",
      inputData: "",
      type: 1,
      musicList: [],
      resultList: [],
      picUrl: ""
    };
  },
  methods: {
    getResultSongs() {
      this.$axios
        .get(
          "/search?offset=" +
            (this.pageNum - 1) * 10 +
            "&limit=10&keywords=" +
            this.inputData +
            "&type=" +
            this.type
        )
        .then((res) => {
          //console.log(res);
          this.musicList = [];
          var songsList = [];
          songsList = res.data.result.songs;
          for (let i = 0; i < songsList.length; i++) {
            var newSong = [
              {
                name: "",
                id: "",
                picUrl: "",
                duration: "",
                mvid: "",
                artist: "",
                albumName: "",
              },
            ];
            newSong[0].name = songsList[i].name;
            newSong[0].id = songsList[i].id;
            newSong[0].duration = songsList[i].duration;
            newSong[0].mvid = songsList[i].mvid;
            newSong[0].artist = songsList[i].artists[0].name;
            newSong[0].albumName = songsList[i].album.name;
            this.getpicUrl(songsList[i].id);
            newSong[0].picUrl = this.picUrl;
            this.musicList.push(newSong[0]);
            //console.log("newSong"+newSong[0].picUrl+"music"+this.musicList[i].picUrl)
          }
          this.total = res.data.result.songCount
          //console.log(this.musicList);
        });
    },
    //获取歌曲封面
    getpicUrl(id){
      //歌曲封面
      this.$axios.get("/song/detail?ids=" + id).then((res) => {
          this.picUrl = res.data.songs[0].al.picUrl;
          //console.log("图片"+this.picUrl)
      });
    },
    //获取歌单和mv
    getResult(){
      this.$axios.get("/search?offset=" +
            (this.pageNum - 1) * 10 +
            "&limit=10&keywords=" +
            this.inputData +
            "&type=" +
            this.type).then( res => {
              //console.log(res);
              if(this.type === 1000){
                this.resultList = res.data.result.playlists;
                this.total = res.data.result.playlistCount;
              }else{
                this.resultList = res.data.result.mvs;
                this.total = res.data.result.mvCount;
              }
      });
    },
    //播放歌曲
     playMusic(index) {
      this.$axios
        .get("/song/url?id=" + this.musicList[index].id)
        .then((res) => {
        //  console.log(res);
          let url = res.data.data[0].url;
          //歌曲封面
          this.$axios.get("/song/detail?ids=" + this.musicList[index].id).then((res) => {
            this.musicList[index].picUrl = res.data.songs[0].al.picUrl;
            //console.log("图片"+this.picUrl)
          });
          //设置给父组件 Index 播放地址
          for (let i = 0; i < this.musicList.length; i++) {
            this.$parent.musicList[i] = this.musicList[i];
          }
          //this.$parent.musicList = this.newSongList;
          this.$parent.musicUrl = url;
          this.$parent.index = index;
          //element-ui Notification 通知
          
        });

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
         
        </div>
				`,
          });

    },
    //跳转到mv详情页
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    //跳转到歌单详情
    toSongList(id){
      this.$router.push(`/playlist?id=`+id)
    },
    //页码改变
    handleCurrentChange(val) {
      // 保存页码
      this.pageNum = val;
      // 重新获取数据
      if(this.type === 1)
        this.getResultSongs();
      else
        this.getResult();
    },
  },
  created() {
    this.inputData = this.$route.query.inputData;
  },
  watch: {
    inputData() {
      this.pageNum = 1;
      if(this.type === 1)
        this.getResultSongs();
      else
        this.getResult();
    },
    activeIndex() {
      this.musicList = [];
      this.resultList = [];
      switch (this.activeIndex) {
        case 'songs':
          this.type = 1
          this.pageNum = 1
          this.getResultSongs()
          break
        case 'lists':
          this.type = 1000
          this.pageNum = 1
          this.getResult()
          break
        case 'mv':
          this.type = 1004
          this.pageNum = 1
          this.getResult()
          break
        default:
          break
      }
    }
  },
};
</script>

<style></style>

<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="resultMes.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title"> {{resultMes.name}} </p>
        <div class="author-wrap">
          <img class="avatar" :src="resultMes.creator.avatarUrl" alt="" v-if="resultMes.creator !== undefined"/>
          <span class="name"  v-if="resultMes.creator !== undefined"> {{resultMes.creator.nickname}} </span>
          <span class="time"> {{resultMes.createTime | dateFormat}} 创建</span>
        </div>
        <div class="play-wrap"  @click="playMusic(0)">
          <span class="iconfont icon-circle-play"></span>
          <span class="text" >播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item,index) in resultMes.tags" :key="index"> {{item}} </li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc"> {{resultMes.description}} </span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
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
            <tr class="el-table__row" v-for="(item,index) in musicList" :key="index" @click="playMusic(index)">
              <td> {{index+1}} </td>
              <td>
                <div class="img-wrap">
                  <img :src="item.picUrl" alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span> {{item.name}} </span>
                    <span class="iconfont icon-mv" v-if="item.mvid !== 0" @click="toMv(item.mvid)"></span>
                  </div>
                </div>
              </td>
              <td> {{item.artist}} </td>
              <td> {{item.albumName}} </td>
              <td> {{item.duration | playTimeFormat}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total})`" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap" v-if="hotComment !== undefined && hotComment.length !== 0">
          <p class="title">精彩评论<span class="number">({{hotComment.length}})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in hotComment" :key="index">
              <!--头像-->
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <!--评论-->
              <div class="content-wrap">
                <div class="content">
                  <span class="name"> {{item.user.nickname}}：</span>
                  <span class="comment"> {{item.content}} </span>
                </div>
                <!--回复-->
                <div class="re-content" v-if="item.beReplied.length !=0">
                  <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                  <span class="comment"> {{item.beReplied[0].content}} </span>
                </div>
                <div class="date"> {{item.time | dateFormat}} </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap" v-if="newComment !== undefined && newComment.length !== 0">
          <p class="title">最新评论<span class="number">({{total}})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in newComment" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name"> {{item.user.nickname}}： </span>
                  <span class="comment"> {{item.content}} </span>
                </div>
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date"> {{item.time | dateFormat}} </div>
              </div>
            </div> 
        </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="5"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'playlist',
  data() {
    return {
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      resultMes: [],
      musicList: [],
      id: "",
      hotComment: [],
      newComment: [],
      hotCount: 0,
      CommentCount: 0
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getCommentNew()
    },
    //跳转到mv详情页
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    //获取歌单详情
    getSonglist(){
      this.$axios.get("/playlist/detail?id="+this.id).then(res=>{
      //console.log(res);
      this.resultMes = res.data.playlist; 
      let songList = res.data.playlist.tracks;
      for(let i=0; i<songList.length;i++){
        let newSong = [
            {
              name: "",
              id: "",
              mvid: "",
              picUrl: "",
              artist:"",
              duration: "",
              albumName: ""
            },
          ];
        newSong[0].name = songList[i].name;
        newSong[0].id = songList[i].id;
        newSong[0].mvid = songList[i].mv;
        newSong[0].picUrl = songList[i].al.picUrl;
        newSong[0].artist = songList[i].ar[0].name;
        newSong[0].duration = songList[i].dt;
        newSong[0].albumName = songList[i].al.name;
        this.musicList.push(newSong[0]);
      }
      })
    },
    //获取歌单热门评论
    getCommentHot(){
      this.$axios.get("/comment/hot?type=2&id="+this.id).then(res=> {
        //console.log(res);
       this.hotComment = res.data.hotComments;
        //this.hotCount = res.data.total;
      })
    },
    //获取最新评论
    getCommentNew(){
      this.$axios.get("/comment/playlist?limit=5&id="+this.id+"&offset="+(this.page-1)*5).then(res=>{
        console.log(res);
        //this.hotComment = res.data.hotComments;
        this.total = res.data.total;
        this.newComment = res.data.comments;
      })
    },
    //播放歌曲
     playMusic(index) {
      this.$axios
        .get("/song/url?id=" + this.musicList[index].id)
        .then((res) => {
        //  console.log(res);
          let url = res.data.data[0].url;
          //设置给父组件 Index 播放地址
         // console.log(this.musicList);
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
         
        </div>
				`,
          });
        });
    },

  },
  created(){
    this.id = this.$route.query.id;
    this.getSonglist();
    this.getCommentHot();
    this.getCommentNew();
  }
};
</script>

<style >

</style>

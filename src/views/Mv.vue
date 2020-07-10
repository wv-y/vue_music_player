<template>
  <div class="mv-container" >
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          autoplay
          :src="data.url"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="imageSongerUrl" alt="" />
          </div>
          <span class="name"> {{mvDetail.artistName}} </span>
        </div>
        <div class="mv-info">
          <h2 class="title"> {{mvDetail.name}} </h2>
          <span class="date">发布：{{mvDetail.publishTime}}</span>
          <span class="number">播放：{{mvDetail.playCount | playNumFormat}}次</span>
          <p class="desc">
            {{mvDetail.desc}}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap" v-if="hotComment !== undefined && hotComment.length != 0">
        <p class="title">精彩评论<span class="number">({{hotComment.length}})</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item,index) in hotComment" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name"> {{item.user.nickname}}： </span>
                <span class="comment"> {{item.content}} </span>
              </div>
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name"> {{item.beReplied[0].user.nickname}} ：</span>
                <span class="comment"> {{item.beReplied[0].content}} </span>
              </div>
              <div class="date"> {{item.time | dateFormat}} </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap" v-if="newComment !== undefined && newComment.length != 0">
        <p class="title">最新评论<span class="number">( {{ total }} )</span></p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in newComment" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name"> {{item.user.nickname}} ：</span>
                <span class="comment"> {{item.content}} </span>
              </div>
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name"> {{item.beReplied[0].user.nickname}}： </span>
                <span class="comment"> {{item.beReplied[0].content}} </span>
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
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item,index) in mvList" :key="index" @click="getMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num"> {{item.playCount | playNumFormat}} </div>
              </div>
              <span class="time"> {{item.duration | playTimeFormat }} </span>
            </div>
            <div class="info-wrap">
              <div class="name"> {{item.name}} </div>
              <div class="singer"> {{item.artistName}} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 
  name: 'mv',
  data() {
    return {
      data: "",
      mvList: [],
      mvDetail: "",
      imageSongerUrl: "",
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      id: "",
      hotComment: [],
      newComment: []
    };
  },
  methods: {
    handleCurrentChange(val) {
     // console.log(`当前页: ${val}`);
     this.page = val;
     this.getMvComment()
    },
    //获取mv url
    getMvUrl(){
      this.$axios.get("/mv/url?id="+this.id).then(res=>{
      //console.log(res);
      this.data = res.data.data;
    })
    },
    //获取推荐相关mv
    getsimi(){
    this.$axios.get("/simi/mv?mvid="+this.id).then(res => {
      //console.log(res)
      this.mvList = res.data.mvs;
      
    })
    },
    //获取mv详情
    getMvdetail(){
    this.$axios.get("/mv/detail?mvid="+this.id).then(res => {
      console.log(res)
      this.mvDetail = res.data.data;
      //获取歌手头像
      this.$axios.get("/artists?id="+res.data.data.artistId).then(res => {
       // console.log(res);
        this.imageSongerUrl = res.data.artist.picUrl;
      })
    })
    },
    //获取mv评论
    getMvComment(){
      this.$axios.get("/comment/mv?limit=5&id="+this.id+"&offset="+(this.page-1)*5).then(res=>{
       // console.log(res);
        this.hotComment = res.data.hotComments;
        this.newComment = res.data.comments;
        this.total = res.data.total;
      })
    },
    getMv(id){
      this.page = 1;
      this.id = id;
      this.getMvUrl();
      this.getsimi();
      this.getMvdetail();
      this.getMvComment();
    }
  },
  created(){
    
    this.id = this.$route.query.id;
    this.getMvUrl();
    this.getsimi();
    this.getMvdetail();
    this.getMvComment();

  }
};
</script>

<style></style>

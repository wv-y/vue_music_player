<template>
  <div class="mv-container" >
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          
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
          <span class="number">播放：{{mvDetail.playCount}}次</span>
          <p class="desc">
            {{mvDetail.desc}}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">精彩评论<span class="number">(666)</span></p>
        <div class="comments-wrap">
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">最新评论<span class="number">(666)</span></p>
        <div class="comments-wrap">
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
          <div class="item">
            <div class="icon-wrap">
              <img src="../assets/avatar.jpg" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">爱斯基摩：</span>
                <span class="comment">谁说的，长大了依旧可爱哈</span>
              </div>
              <div class="re-content">
                <span class="name">小苹果：</span>
                <span class="comment">还是小时候比较可爱</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
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
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item,index) in mvList" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num"> {{item.playCount}} </div>
              </div>
              <span class="time"> {{item.duration}} </span>
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
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10
    };
  },
  methods: {
    handleCurrentChange(val) {
     // console.log(`当前页: ${val}`);
    }
  },
  created(){
    //获取mv url
    this.$axios.get("/mv/url?id="+this.$route.query.id).then(res=>{
      //console.log(res);
      this.data = res.data.data;
    })
    //获取相关mv推荐
    this.$axios.get("/simi/mv?mvid="+this.$route.query.id).then(res => {
      console.log(res)
      this.mvList = res.data.mvs;
      for(let i = 0; i < this.mvList.length;i++){
        let min = parseInt(this.mvList[i].duration/60000);
        let sec = parseInt(this.mvList[i].duration/1000%60);
        let count = parseInt(this.mvList[i].playCount/10000);
        if(min < 10){
          min = '0'+min;
        }
        if(sec < 10){
          sec = '0'+sec;
        }
        if(count > 1 ){
          count = count +'万';
          this.mvList[i].playCount = count;
        }
        this.mvList[i].duration = min + ':' + sec;
      }
    })
    //获取mv详情
    this.$axios.get("/mv/detail?mvid="+this.$route.query.id).then(res => {
     // console.log(res)
      this.mvDetail = res.data.data;
      
      if(this.mvDetail.playCount > 9999){
        let count = parseInt(this.mvDetail.playCount/10000);
        this.mvDetail.playCount = count + '万'
      }
      //获取歌手头像
      this.$axios.get("/artists?id="+res.data.data.artistId).then(res => {
       // console.log(res);
        this.imageSongerUrl = res.data.artist.picUrl;
      })
    })

  }
};
</script>

<style></style>

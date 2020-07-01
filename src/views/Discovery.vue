<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in gedan" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name"> {{item.name}} </p>
        </div>
        
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        推荐最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in newSongList" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="playMusic(item.id)"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name"> {{item.name}} </div>
            <div class="singer" v-for="(it,index) in item.song.artists" :key="index"> {{it.name}} </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in newMvList" :key="index">
          <div class="img-wrap" @click="toMv(item.id)">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num"> {{item.playCount}} </div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name"> {{item.name}} </div>
            <div class="singer"> {{item.artistName}} </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'discovery',
  data() {
    return {
      //轮播图
     banners:[],
     //推荐歌单
     gedan: [],
     //推荐音乐
     newSongList:[],
     //推荐mv
     newMvList: []
    };
  },

  created(){
    //轮播图
    this.$axios.get("/banner").then(res =>{
      //console.log(res);
      this.banners = res.data.banners;
    })
    //推荐歌单
    this.$axios.get("/personalized?limit=12").then(res =>{
      //console.log(res)
      this.gedan = res.data.result;
    })
    //最新音乐
    this.$axios.get("/personalized/newsong").then(res => {
      //console.log(res)
      this.newSongList = res.data.result;
    })
    //推荐mv
    this.$axios.get("/personalized/mv?limit=8").then(res=>{
      //console.log(res)
      this.newMvList = res.data.result;
    })
  },
  methods:{
    playMusic(id){
      this.$axios.get("/song/url?id="+id).then(res=>{
        let url = res.data.data[0].url;
        //设置给父组件 Index 播放地址
        this.$parent.musicUrl = url;
      })
    },
    //跳转到mv详情页
    toMv(id){
      this.$router.push(`/mv?id=${id}`)
    }
  }
};
</script>

<style >

</style>

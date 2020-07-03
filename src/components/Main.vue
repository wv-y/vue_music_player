<!--<template>
  <el-container class="index-container">
  
    <el-header class="top-container">
      <div class="left-box">
        <div class="history-wrapper">
          <span class="iconfont icon-arrow-lift"></span>
          <span class="iconfont icon-arrow-right"></span>
        </div>
      </div>
      <div class="right-box">
        <el-input
          v-model="musicUrl"
          placeholder="请输入内容"
          clearable
          prefix-icon="el-icon-search"
        ></el-input>
      </div>
    </el-header>
    <el-container>
      <el-aside class="nav">
        <el-menu
          default-active="/discovery"
          :router="true"
          active-text-color="#F56C6C"
        >
          <el-menu-item index="/discovery">
            <i class="iconfont icon-yinle1"></i>
            <template v-slot:title>
              <span class="text">发现音乐</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/playlists">
            <i class="iconfont icon-gedan"></i>
					<template v-slot:title>
						<span class="text">推荐歌单</span>
					</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main"><router-view></router-view></el-main>
    </el-container>
    <div class="player">
      <audio :src="musicUrl" controls></audio>
    </div>
  </el-container>
</template>-->

<template>
  <div class="index-container">
    <div class="nav" >
      <!--<aside>
			<el-menu  default-active="/discovery" :router="true" active-text-color="#FF0000">
				<el-menu-item index="/discovery" >
					
					<template v-slot:title>
            <span class="iconfont icon-yinle4"></span>
						<span class="text">发现音乐</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/playlists" >
					
					<template v-slot:title>
            <span class="iconfont icon-gedan"></span>
						<span class="text">推荐歌单</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/songs" >
					
					<template v-slot:title>
            <span class="iconfont icon-yinle"></span>
						<span class="text">最新音乐</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/mvs" >
					
					<template v-slot:title>
            <span class="iconfont icon-chakanMV"></span>
						<span class="text">最新MV</span>
					</template>
				</el-menu-item>
			</el-menu>
		</aside>-->
    <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-yinle4"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-music-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-yinle"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-chakanMV"></span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main" >
        <transition name="el-fade-in-linear">
      <router-view></router-view>
        </transition>
    </div>
    <div class="player">
      <audio :src='musicUrl' controls autoplay ref="audioRef" @ended="nextMusic"></audio>
    </div>
  </div>
</template> 

<script>
//import { mapState, mapMutations } from 'vuex'
export default {
  name: "index",
  data() {
    return {
      musicUrl: "",
      musicList: [],
      index: 0,
    };
  },
  methods:{
    playMusic(index){
     // console.log(this.musicList[index])
      this.$axios.get("/song/url?id="+this.musicList[index].id).then(res=>{
        this.musicUrl = res.data.data[0].url;
      })
      this.$notify.closeAll();
      this.$notify({
          title: '正在播放',
          duration: 0, //不自动关闭
          dangerouslyUseHTMLString: true, //识别HTML片段
          position: 'bottom-right', //弹出位置
          offset: 100,   //偏移量
          message: `
				<div>
        <div class = "current-music-card">
					<img class = "cover" src="${this.musicList[index].picUrl}"></img>
          <h3 class = "music-name" >${this.musicList[index].name}--${this.musicList[index].artist}</h3>
        </div>
         <div class = "musicCradButton">
              <span class="iconfont icon-shangyishou"></span>
              <span class="iconfont icon-xiayishou"></span>
          </div>
        </div>
				`
        });
    },
   nextMusic(){
    // console.log("调用"+this.index+this.musicList);
     if(this.index == this.musicList.length-1){
       this.index = 0;
     }else{
       this.index++;
     }
     this.playMusic(this.index);
   } 
  }
};
</script>

<style>

.text{
  font-size: 18px;
 
}



</style>




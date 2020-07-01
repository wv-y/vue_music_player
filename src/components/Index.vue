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
      <aside>
			<el-menu background-color="#dfdfdf" default-active="/discovery" :router="true" active-text-color="#FF0000">
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
		</aside>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="player">
      <audio :src='musicUrl' controls autoplay></audio>
    </div>
  </div>
</template> 

<script>
export default {
  name: "index",
  data() {
    return {
      musicUrl: "",
    };
  },
};
</script>

<style>

.text{
  font-size: 18px;
 
}
</style>

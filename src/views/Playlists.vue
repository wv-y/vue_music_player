<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="playListAll[0].coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
          {{playListAll[0].name}}
        </div>
        <div class="info">
         {{playListAll[0].description}}
        </div>
      </div>
      <img :src="playListAll[0].coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item" :class="{ active:selectType=='全部' }" @click="selectType='全部'">全部</span>
        <span class="item" :class="{ active:selectType=='欧美' }" @click="selectType='欧美'">欧美</span>
        <span class="item" :class="{ active:selectType=='华语' }" @click="selectType='华语'">华语</span>
        <span class="item" :class="{ active:selectType=='流行' }" @click="selectType='流行'">流行</span>
        <span class="item" :class="{ active:selectType=='说唱' }" @click="selectType='说唱'">说唱</span>
        <span class="item" :class="{ active:selectType=='摇滚' }" @click="selectType='摇滚'">摇滚</span>
        <span class="item" :class="{ active:selectType=='民谣' }" @click="selectType='民谣'">民谣</span>
        <span class="item" :class="{ active:selectType=='电子' }" @click="selectType='电子'">电子</span>
        <span class="item" :class="{ active:selectType=='轻音乐' }" @click="selectType='轻音乐'">轻音乐</span>
        <span class="item" :class="{ active:selectType=='影视原声' }" @click="selectType='影视原声'">影视原声</span>
        <span class="item" :class="{ active:selectType=='ACG' }" @click="selectType='ACG'">ACG</span>
        <span class="item" :class="{ active:selectType=='怀旧' }" @click="selectType='怀旧'">怀旧</span>
        <span class="item" :class="{ active:selectType=='治愈' }" @click="selectType='治愈'">治愈</span>
        <span class="item" :class="{ active:selectType=='旅行' }" @click="selectType='旅行'">旅行</span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item,index) in playListAll" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num"> {{item.playCount}}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name"> {{item.name}} </p>
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
      :page-size="12"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'recommend',
  data() {
    return {
      //选择的分类
      selectType: "全部",
      //显示的歌单
      playListAll: [],
      // 总条数
      total:0,
      // 页码
      page:1
    };
  },
  methods: {
    //获取歌单数据
    getMusicList(){
      this.$axios.get("/top/playlist?limit=12&cat="+this.selectType+"&offset="+(this.page - 1)*10).then( res => {
      console.log(res)
      this.total = res.data.total; //总条数

      this.playListAll = res.data.playlists;
      for(let i =0;i<this.playListAll.length;i++){
        if (this.playListAll[i].playCount > 9999){
          let count = parseInt( this.playListAll[i].playCount/10000 )
          this.playListAll[i].playCount = count + '万'
        }
      }
    }); 
    },
    //分页变化时更新数据
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.page = val;
      this.getMusicList();
    }
  },
  created(){
    //获取初始数据
    this.getMusicList();
  },
  //监听器
  watch:{
    //监听选择的歌单类型变化时，更新数据
    selectType(){
      this.getMusicList();
      this.page = 1;  //类型变化时，需要将页数重置为1
    }
  }
};
</script>

<style >

</style>

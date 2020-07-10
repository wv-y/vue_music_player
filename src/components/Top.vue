<template>
  <div class="top-container">
    <div class="left-box">
      <!--<div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>-->
      <div class="history-wrapper">
        <span class="iconfont icon-guifandaohanglanfanhui"></span>
        <span class="iconfont icon-fuwuhao-daohang-xiala"></span>
      </div>
    </div>
    <div class="right-box">
     <el-input
          @keyup.enter.native="toResult"
          v-model="inputData"
          placeholder="请输入内容"
          clearable
          prefix-icon="el-icon-search"
        ></el-input>
      </div>
    </div>
  
</template>

<script>
  export default {
    name: 'top',
    data() {
      return {
        inputData: '',
        query: ''
      }
    },
    methods:{
      toResult(){
        if(this.inputData === ''){
          this.$message.error('内容不能为空');
        }else{
          this.$router.push("/result?inputData="+this.inputData)
        }
      }
    }
  }
</script>

<style >
 
</style>

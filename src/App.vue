<!--<template>
  <div id="app">
    <top/>
    <index />
  </div>
</template>

<script>
import top from './components/Top.vue'
import index from './components/Index.vue';
export default {
  name: 'app',
  components: {
    index,
    top
  },
  
/*
  watch:{
    $route(){
      let main = this.$refs.main;
      main.scrollTo(0,0);
    }
  }*/
};
</script>

<style >

</style>
--->

<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<script>

export default {
	name: 'app'
}
</script>
<style >

</style>
<template>
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
  }
};
</script>

<style >

</style>

<template>
  <div id="app">
  <!-- 导航栏 -->
    <leftNav></leftNav>
    <!-- 操作区域 -->
    <div class="main">
       <router-view></router-view>
    </div>
  </div>
</template>

<script>
import leftNav from '@/components/common/LeftNav.vue'
export default {
  name: 'app',
  components:{
    leftNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main{
  width: 95%;
  background-color: #EFF2F7;
  float: left;
  height: 100%;
  overflow: auto;
}
</style>

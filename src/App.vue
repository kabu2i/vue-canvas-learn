<template>
  <div id="app">
    <div class="glo">
      <el-button type="primary" class="glo-button" icon="el-icon-s-home" @click="clickMenu" circle></el-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    clickMenu() {
      this.$router.push( '/' )
    }
  },
}
</script>

<style>
html body {
  margin: 0;
  padding: 0;
}
.glo {
  height: 0;
  float: right;
  position: sticky;
  top: 80%;
  right: 6%;
}
.glo-button {
  display: block;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>

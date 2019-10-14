<template>
  <div class="container">
    <div class="linkList">
      <router-link v-for="(item,index) in linkList" :to='item.path' :key="index">
        <div class="linkItem" >{{index+1}}、{{item.info.title}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { exportRouterList } from "@/router/index";
export default {
  name: "Home",
  data() {
    return {
      linkList: []
    };
  },
  created() {
    console.log(exportRouterList);
    this.linkList = exportRouterList.filter(function(item) {
      return item.info.show;
    });
  }
};
</script>

<style scoped>
</style>

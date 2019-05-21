<template>
  <div class="linkList">
    <router-link :to="{ path:'/preImg'}"  tag="p">
      <div class="linkItem">图片预加载问题</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  }
};
</script>

<style scoped>
.linkList {
  font-size: 24px;
}
</style>

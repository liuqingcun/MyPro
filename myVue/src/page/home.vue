<template>
  <div class="container">
    <div class="linkList">
      <router-link v-for="(item,index) in linkList" :to='item.url' :key="item">
        <div class="linkItem" >{{index+1}}、{{item.title}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      linkList: [{
        title:"emoji表情",
        url:"/emoji"
      }]
    }
  }
}
</script>

<style scoped>

</style>

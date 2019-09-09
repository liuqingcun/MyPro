<template>
  <div>
      <div class="father" @click="alertFn(1)">
          <div class="self" @click="alertFn(2)">
              <div class="child" @click="alertFn(3)"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Event',
  components:{
  },
  data () {
    return {
    }
  },
  methods:{
      alertFn(num){
          alert(num)
      }
  }
}
</script>

<style scoped>
.father{
    background: #9393ff;
    width: 600px;
    height: 600px;
    margin: 0 auto;
}
.self{
    background: #ff5151;
    width: 300px;
    height: 300px;
    margin: 0 auto;
}
.child{
    background: #abcdef;
    width: 150px;
    height: 150px;
    margin: 0 auto;
}
</style>

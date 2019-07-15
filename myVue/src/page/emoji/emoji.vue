<template>
  <div>
    <VueEmoji ref="emoji" width="500" height="200" placeholder="请输入" @input="onInput" />
    <div>{{inputVal}}</div>
  </div>
</template>

<script>
import VueEmoji from '../../components/emoji/VueEmoji'
export default {
  name: 'Emoji',
  components:{
    VueEmoji
  },
  data () {
    return {
      inputVal:""
    }
  },
  methods:{
    onInput(event) {
      console.log(event.data);
      this.inputVal = event.data;
    },
  }
}
</script>

<style scoped>

</style>

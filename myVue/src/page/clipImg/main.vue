<template>
  <div>
    <input type="file" ref="fileVal" accept="image/*" @change="getFileData">
    <div class="showArea">
      <div class="showItem">
        <div class="showTitle">已选择图片：</div>
        <div class="showImg" :style="{'background': 'url('+imgDataUrl+') no-repeat center center/contain'}"></div>
      </div>
      <div class="showItem">
        <div class="showTitle">已裁剪图片：</div>
        <div class="showImg" :style="{'background': 'url('+imgClipUrl+') no-repeat center center/contain'}"></div>
      </div>
    </div>
    <!-- 裁剪图片 -->
    <ClipImg v-if="clipShow" :file="imgData" @closeClip="closeClipDia"/>
  </div>
</template>

<script>
import ClipImg from './clipImg'
export default {
  name: 'Event',
  components:{
    ClipImg
  },
  data () {
    return {
      clipShow: false,
      imgData: {},
      imgDataUrl: '',
      imgClipUrl: ''
    }
  },
  methods:{
    getFileData(){
      let newFile = this.$refs.fileVal.files[0]
      this.imgData = newFile
      this.imgDataUrl = this.fileToURL(this.imgData)
      this.clipShow = true
      console.log(newFile)
    },
    closeClipDia(type,file){
      // type: 1:确定 0：取消
      if(type === 1){
        this.imgClipUrl = this.fileToURL(file)
        console.log(file)
      }
      this.clipShow = false
    },
    fileToURL (file) {
      //  图片data转换URL
      let url = null
      if (window.createObjectURL !== undefined) {
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
  }
}
</script>

<style scoped>
.showArea{
  display: flex;
  margin-top: 30px;
}
.showItem{
  border: 1px solid #ABCDEF;
}
.showImg{
  width: 300px;
  height: 300px;
  border: 1px solid #aaa;
  margin-top: 10px;
}
</style>

<template>
  <div id="app">
    <div class="btnList">
      <button @click="showImg()">显示预加载图片</button>
    </div>
    <!-- <div class="imgBg"></div> -->
    <div class="preImg" :style="{'background-image': 'url('+imgUrl+')','background-size': '100% 100%'}" v-if="imgFlag">我是预加载图片</div>
  </div>
</template>

<script>
export default {
  name: "preImg",
  components: {},
  data() {
    return {
      imgFlag: false,
      imgs: [],
      imgUrl: "",
      imgIndex: 0
    };
  },
  created() {},
  mounted() {
    this.preload();
  },
  methods: {
    showImg() {
      this.imgFlag = true;
      this.imgUrl = this.imgs[this.imgIndex];
      // console.log(this.imgIndex);
      this.imgIndex++;
      if (this.imgIndex > this.imgs.length - 1) {
        this.imgIndex = 0;
      }
    },
    preload() {
      this.imgs = [
        "./static/img/1.jpg",
        "./static/img/2.jpg",
        "./static/img/3.png",
        "./static/img/4.jpg"
      ];
      for (let img of this.imgs) {
        let image = new Image();
        image.src = img;
        image.onload = () => {
          console.log(image);
        };
      }
    }
  }
};
</script>

<style scoped>
#app {
  background: #ccc;
  height: 1000px;
}
.btnList {
  width: 100%;
  height: 100px;
  text-align: center;
}
button {
  width: 200px;
  height: 80px;
  margin: 10px auto;
  border: 2px solid #aefdae;
  background: #abcdef;
  font-size: 24px;
  color: #fff;
  outline: none;
}
.imgBg {
  width: 400px;
  height: 300px;
  border: 1px solid red;
  background: url(./img/1.jpg) no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
}
.preImg {
  width: 400px;
  height: 300px;
  border: 1px solid red;

  text-align: center;
  line-height: 400px;
  color: #fff;
  font-size: 24px;
  margin: 0 auto;
}
</style>

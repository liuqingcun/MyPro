<template>
<div>
  <div class="container">
    <w-f-column itemW="375">
    <template slot-scope="{columnNum,columnIndex}">
      <water-follow :list="list" :columnNum="columnNum" :columnIndex="columnIndex">
      <template slot-scope="{item,index}">
        <div class="my-box" :style="{height:item+'px'}">{{index}}</div>
      </template>
      </water-follow>
    </template>
    </w-f-column>
  </div>
</div>
</template>
 
<script>
import WFColumn from "./WFColumn";
import WaterFollow from "./WaterFollow";
export default {
  name: "page",
  components: { WaterFollow, WFColumn },
  data() {
    return {
      getListDataFlag: true,
      list: []
    };
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.getImgList(10);
  },
  methods: {
    toAppAddNote() {
      this.$toAppAddNote();
    },
    getImgList(num) {
      for (let i = 0; i < num; i++) {
        this.list.push(Math.floor(Math.random() * 301 + 200));
      }
      console.log(this.list.length);
    },
    onScroll() {
      var _this = this;
      //可滚动容器的高度
      let innerHeight = document.querySelector(".container").clientHeight;
      //屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight;
      //可滚动容器超出当前窗口显示范围的高度
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
      if (innerHeight < outerHeight + scrollTop + 200) {
        if (this.getListDataFlag) {
          this.getListDataFlag = false;
          setTimeout(function() {
            _this.getListDataFlag = true;
            _this.getImgList(6);
          }, 600);
        }
      }
    }
  }
};
</script>
 
<style scoped lang="scss">
.noteBtn {
  width: 80%;
  height: 100px;
  margin: 30px auto;
  font-size: 36px;
  color: #fff;
  text-align: center;
  line-height: 100px;
  background: #abc;
}
.container {
  width: 100%;
  padding: 30px 20px 0;
  background: rgba(0, 0, 0, 0.4);
  .my-box {
    width: 330px;
    background: #abcdef;
    margin: 0 auto 20px;
    border-radius: 20px;
    color: #fff;
    text-align: center;
    line-height: 180px;
    font-size: 50px;
    background: url("https://tcdn.52meicang.com/userNote/20190530/8/62373img-67155788.jpg")
      no-repeat center;
    background-size: 100% auto;
  }
}
</style>
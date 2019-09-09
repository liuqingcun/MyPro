<template>
  <div class="cj-mask">
    <div class="show-img">
      <img id="tulip" :src="showPicUrl" alt width="300" />
      <canvas id="myCanvas"></canvas>
      <div id="show-content"></div>
    </div>
    <div class="portrait-footer">
      <div class="fbt-cancel" @click="close(0)">取消</div>
      <div class="fbt-ok" @click="close(1)">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "clipLogo",
  components: {},
  props: ["file"],
  data() {
    return {
      showPicUrl: null,
      img: null
    };
  },
  created() {},
  mounted() {
    this.img = new Image();
    this.showPicUrl = this.getObjectURL(this.file);
    this.picture();
  },
  methods: {
    close(type) {
      if (type) {
        var _this = this;
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); //清空画布
        ctx.drawImage(
          _this.img,
          _this._left,
          _this._top,
          _this._width,
          _this._height
        ); //填充画布
        let imgBase64 = canvas.toDataURL("image/png");
        let imgFile = this.base64ToFile(imgBase64);
        this.$emit("closeClip", type, imgFile);
      } else {
        this.$emit("closeClip", type);
      }
    },
    getObjectURL(file) {
      // 图片data转换URL
      let url = null;
      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    base64ToFile(base64data, filename = "file") {
      // base64转图片对象
      let arr = base64data.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      });
    },
    picture(onOK, onCancel) {
      var _this = this;
      var imgData = this.file;
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      var reader = new FileReader();
      // 调用readAsDataURL函数在后台开始读取文件的操作。当整个图片文件被全部加载完后，他们被转换成了一个被传递到onload回调函数的data:URL
      reader.readAsDataURL(imgData);
      reader.onload = function(e) {
        var dataURL = reader.result;
        var dataLength = dataURL.length;
        var fileLength = parseInt(dataLength - (dataLength / 8) * 2);
        document.querySelector("#tulip").onload = function() {
          var imgW = document.querySelector("#tulip").width;
          var imgH = document.querySelector("#tulip").height;
          var left, top;
          // 图片高>图片宽
          if (imgH > imgW) {
            // 画布宽高=图片宽
            canvas.width = imgW;
            canvas.height = imgW;
            document.querySelector("#show-content").style.width = `${imgW}px`;
            document.querySelector("#show-content").style.height = `${imgW}px`;
            left = 0;
            top = (imgH - imgW) / 2;
          } else {
            // 画布宽高=图片高
            canvas.width = imgH;
            canvas.height = imgH;
            document.querySelector("#show-content").style.width = `${imgH}px`;
            document.querySelector("#show-content").style.height = `${imgH}px`;
            left = (imgW - imgH) / 2;
            top = 0;
          }
          document.querySelector("#show-content").style.left = `${left}px`;
          document.querySelector("#show-content").style.top = `${top}px`;
          document.querySelector(
            "#show-content"
          ).style.background = `url(${dataURL})`;
          document.querySelector(
            "#show-content"
          ).style.backgroundSize = `${imgW}px`;
          document.querySelector(
            "#show-content"
          ).style.backgroundPosition = `-${left}px -${top}px`;
          _this._left = -left;
          _this._top = -top;
          _this._width = imgW;
          _this._height = imgH;
          _this.img.src = dataURL;
        };
      };
      var _x_start,
        _y_start,
        _x_move,
        _y_move,
        _x_end,
        _y_end,
        left_start,
        top_start;
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        //按下
        document
          .getElementById("show-content")
          .addEventListener("touchstart", function(e) {
            _x_start = e.touches[0].pageX; //起始点击位置
            _y_start = e.touches[0].pageY; //起始点击位置
            left_start = document.querySelector("#show-content").style.left; //元素左边距
            top_start = document.querySelector("#show-content").style.top; //元素上边距
          });
        //移动
        document
          .getElementById("show-content")
          .addEventListener("touchmove", function(e) {
            e.preventDefault(); //取消事件的默认动作。
            _x_move = e.touches[0].pageX; //当前屏幕上所有触摸点的集合列表
            _y_move = e.touches[0].pageY; //当前屏幕上所有触摸点的集合列表

            var left =
              parseFloat(_x_move) -
                parseFloat(_x_start) +
                parseFloat(left_start) <
              0
                ? 0
                : parseFloat(_x_move) -
                  parseFloat(_x_start) +
                  parseFloat(left_start);
            var top =
              parseFloat(_y_move) -
                parseFloat(_y_start) +
                parseFloat(top_start) <
              0
                ? 0
                : parseFloat(_y_move) -
                  parseFloat(_y_start) +
                  parseFloat(top_start);
            var imgW = document.querySelector("#tulip").width; //图片宽
            var imgH = document.querySelector("#tulip").height; //图片高
            var canvasW = parseFloat(
              document.querySelector("#show-content").style.width
            ); //画布宽
            var canvasH = parseFloat(
              document.querySelector("#show-content").style.height
            ); //画布高
            // 当选择区超出右边
            if (left > imgW - canvasW) {
              left = imgW - canvasW;
            }
            // 当选择区超出下边
            if (top > imgH - canvasH) {
              top = imgH - canvasH;
            }
            document.getElementById("show-content").style.left = left + "px";
            document.getElementById("show-content").style.top = top + "px";
            document.querySelector(
              "#show-content"
            ).style.backgroundPosition = `-${left}px -${top}px`;
            _this._left = -left;
            _this._top = -top;
            _this._width = imgW;
            _this._height = imgH;
          });
      } else {
        //按下
        document
          .getElementById("show-content")
          .addEventListener("mousedown", function(e) {
            _x_start = e.clientX; //起始点击位置
            _y_start = e.clientY; //起始点击位置
            left_start = document.querySelector("#show-content").style.left; //元素左边距
            top_start = document.querySelector("#show-content").style.top; //元素上边距
            //移动
            document.onmousemove = function(e) {
              e.preventDefault(); //取消事件的默认动作。
              _x_move = e.clientX; //当前屏幕上所有触摸点的集合列表
              _y_move = e.clientY; //当前屏幕上所有触摸点的集合列表
              var left =
                parseFloat(_x_move) -
                  parseFloat(_x_start) +
                  parseFloat(left_start) <
                0
                  ? 0
                  : parseFloat(_x_move) -
                    parseFloat(_x_start) +
                    parseFloat(left_start);
              var top =
                parseFloat(_y_move) -
                  parseFloat(_y_start) +
                  parseFloat(top_start) <
                0
                  ? 0
                  : parseFloat(_y_move) -
                    parseFloat(_y_start) +
                    parseFloat(top_start);
              var imgW = document.querySelector("#tulip").width; //图片宽
              var imgH = document.querySelector("#tulip").height; //图片高

              var canvasW = parseFloat(
                document.querySelector("#show-content").style.width
              ); //画布宽
              var canvasH = parseFloat(
                document.querySelector("#show-content").style.height
              ); //画布高
              // 当选择区超出右边
              if (left > imgW - canvasW) {
                left = imgW - canvasW;
              }
              // 当选择区超出下边
              if (top > imgH - canvasH) {
                top = imgH - canvasH;
              }
              document.getElementById("show-content").style.left = left + "px";
              document.getElementById("show-content").style.top = top + "px";
              document.querySelector(
                "#show-content"
              ).style.backgroundPosition = `-${left}px -${top}px`;
              _this._left = -left;
              _this._top = -top;
              _this._width = imgW;
              _this._height = imgH;
            };
            document.onmouseup = function() {
              document.onmousemove = null;
              document.onmouseup = null;
            };
          });
      }
    }
  }
};
</script>
<style lang="css" scoped>
.cj-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
  z-index: 22;
}

.show-img {
  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#tulip {
    width: 100%;
  }

.show-img:after {
  z-index: 2;
  position: absolute;
  display: block;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}

#myCanvas {
  z-index: 9;
  position: absolute;
  border-radius: 50%;
  display: none;
}

#show-content {
  z-index: 9;
  position: absolute;
  border-radius: 50%;
}

.portrait-footer {
  width: 100%;
  height: 44px;
  position: absolute;
  bottom: 60px;
  line-height: 44px;
  text-align: center;
  color: #fff;
  font-size: 40px;
}

.portrait-footer div {
  width: 50%;
  height: 100%;
  float: left;
}
</style>

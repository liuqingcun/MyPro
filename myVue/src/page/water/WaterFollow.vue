<template>
 <div>
  <div v-for="(item,index) in list" :key="'item-'+index" class="item" :id="'card-'+columnIndex+'-'+index" v-if="load?(record[index].index===columnIndex):true">
   <slot :item="item" :index="index"></slot>
  </div>
 </div>
</template>
 
<script>
export default {
  name: "WaterFollow",
  props: ["list", "columnNum", "columnIndex"],
  data() {
    return {
      column: 0,
      record: [],
      load: false,
      update: false
    };
  },
  methods: {
    calculateColumn() {
      let cList = [];
      for (let i = 0; i < this.columnNum; i++) {
        cList.push(0);
      }
      for (let i = 0; i < this.record.length; i++) {
        let index = 0;
        for (let j = 0; j < cList.length; j++) {
          if (cList[index] > cList[j]) {
            index = j;
          }
        }
        cList[index] += this.record[i].height;
        this.record[i].index = index;
      }
    },
    recordInit() {
      for (let i = 0; i < this.list.length; i++) {
        this.record.push({ index: -1, height: -1 });
      }
    },
    initHeightData() {
      for (let i = 0; i < this.list.length; i++) {
        if (document.getElementById("card-" + this.columnIndex + "-" + i)) {
          let h = document.getElementById("card-" + this.columnIndex + "-" + i)
            .offsetHeight;
          this.record[i].height = h;
        }
      }
    }
  },
  beforeCreate() {},
  created() {
    this.load = false;
    this.recordInit();
  },
  beforeMount() {},
  mounted() {
    this.initHeightData();
    this.calculateColumn();
    this.load = true;
  },
  beforeUpdate() {},
  updated() {
    if (this.update) {
      this.initHeightData();
      this.calculateColumn();
      this.update = false;
      this.load = true;
    }
  },
  beforeDestroy() {},
  destroyed() {},
  watch: {
    columnNum(curr, old) {
      this.calculateColumn();
    },
    list(curr, old) {
      // console.log("list change");
      this.recordInit();
      this.load = false;
      this.update = true;
    }
  }
};
</script>
 
<style scoped>
</style>
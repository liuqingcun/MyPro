<template>
  <div class="calendar">
      <select name="year" id="" v-model="year">
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
      </select>
      <select name="month" id="" v-model="month">
          <option value="0">1</option>
          <option value="1">2</option>
          <option value="2">3</option>
          <option value="3">4</option>
          <option value="4">5</option>
          <option value="5">6</option>
          <option value="6">7</option>
          <option value="7">8</option>
          <option value="8">9</option>
          <option value="9">10</option>
          <option value="10">11</option>
          <option value="11">12</option>
      </select>
      <button @click="changeDate">确定</button>
    <div class="container">
      <div class="weekRow">
        <div class="weekItem" v-for="(item,index) in weekText" :key="index">{{item}}</div>
      </div>
      <div class="dayBox">
        <div
          class="dayItem preMonth"
          v-for="(item,index) in preMonthData"
          :key="'pre'+index"
        >{{item}}</div>
        <div
          class="dayItem currentMonth"
          v-for="(item,index) in currentMonthData"
          :key="'now'+index"
          @click="clickDay(item)"
        >{{item.d}}</div>
        <div
          class="dayItem nextMonth"
          v-for="(item,index) in nextMonthData"
          :key="'next'+index"
        >{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar",
  components: {},
  data() {
    return {
      weekText: ["日", "一", "二", "三", "四", "五", "六"],
      preMonthData: [],
      currentMonthData: [],
      nextMonthData: [],
      year: null,
      month: null
    };
  },
  mounted() {
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth();
    this.setData(this.year, this.month+1, 1);
  },
  methods: {
    clickDay(item) {
      let dateString =
        item.y + "-" + this.doubleNum(item.m) + "-" + this.doubleNum(item.d);
      console.log(dateString);
    },
    changeDate(){
        this.setData(Number(this.year), Number(this.month)+1, 1);
        console.log(this.month+1)
    },
    setData(year, month, day) {
      //   清空数据
      this.preMonthData = [];
      this.currentMonthData = [];
      this.nextMonthData = [];

      let currentMonthDayNum = this.monthHasDayCount(year)[month - 1]; //当前月总天数
      let preMonthDayNum; //上月总天数
      let preMonth; //上月月份
      let preMonthYear; //上月所在年份
      if (month > 1) {
        preMonth = month - 1;
        preMonthYear = year;
        preMonthDayNum = this.monthHasDayCount(preMonthYear)[preMonth - 1];
      } else {
        preMonth = 12;
        preMonthYear = year - 1;
        preMonthDayNum = this.monthHasDayCount(preMonthYear)[preMonth - 1];
      }
      //   上月数据
      let minWeek = new Date(year, month - 1, 1).getDay();
      console.log("minWeek:", minWeek);
      if (minWeek > 0) {
        for (let i = 0; i < minWeek; i++) {
          this.preMonthData.push(preMonthDayNum - minWeek + i);
        }
      } else {
        this.preMonthData = [];
      }
      //   当月数据
      for (let i = 1; i < currentMonthDayNum + 1; i++) {
        let itemData = {
          y: year,
          m: month,
          d: i
        };
        this.currentMonthData.push(itemData);
      }
      // 下月数据
      let maxWeek = new Date(year, month - 1, currentMonthDayNum).getDay();
      console.log("maxWeek:", maxWeek);
      for (let i = 0; i < 6 - maxWeek; i++) {
        this.nextMonthData.push(i + 1);
      }
    },
    monthHasDayCount(year) {
      let countArr = [];
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        countArr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      } else {
        countArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      }
      return countArr;
    },
    doubleNum(num) {
      num < 10 ? "0" + num : num;
      return num;
    }
  }
};
</script>

<style scoped>
.calendar {
  position: relative;
  width: 700px;
  margin: 0 auto;
}
.container {
}
.weekRow {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
}
.weekItem {
  border: 1px solid #abcdef;
  text-align: center;
  font-size: 18px;
  line-height: 40px;
  width: 100px;
  box-sizing: border-box;
}
.dayBox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.dayItem {
  border: 1px solid #abcdef;
  text-align: center;
  font-size: 18px;
  line-height: 40px;
  width: 100px;
  box-sizing: border-box;
}
.preMonth {
  background: #ccc;
}
.currentMonth {
  background: #fff;
  cursor: pointer;
}
.nextMonth {
  background: #ccc;
}
</style>

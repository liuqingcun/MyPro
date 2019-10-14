<template>
  <div class="calendar">
    <!-- 日期选择 -->
    <div class="control">
      <select name="selectYear" id="" v-model="selectYear">
        <option v-for='(item,index) in yearOption' :value="item" :key="index">{{item}}</option>
      </select>
      <select name="selectMonth" id="" v-model="selectMonth">
        <option v-for='(item,index) in monthOption' :value="item" :key="index">{{item+1}}</option>
      </select>
      <button @click="changeDate">确定</button>
      <button @click="selectToday">今日</button>
    </div>
    <!-- 日历展示 -->
    <div class="container">
      <div class="weekRow">
        <div class="weekItem" v-for="(item,index) in weekText" :key="index">{{item}}</div>
      </div>
      <div class="dayBox">
        <!-- 上月 -->
        <div
          class="dayItem preMonth"
          v-for="(item,index) in preMonthData"
          :key="'pre'+index"
        >{{item}}</div>
        <!-- 当月 -->
        <div
          class="dayItem currentMonth"
          :class="{'istoday':item.istoday,'selected':item.selected}"
          v-for="(item,index) in currentMonthData"
          :key="'now'+index"
          @click="clickDay(item,index)"
        >{{item.d}}</div>
        <!-- 下月 -->
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
      yearOption: [2016,2017,2018,2019],
      monthOption: [0,1,2,3,4,5,6,7,8,9,10,11],
      weekText: ["日", "一", "二", "三", "四", "五", "六"],
      preMonthData: [],
      currentMonthData: [],
      nextMonthData: [],
      selectYear: null,
      selectMonth: null
    };
  },
  mounted() {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.currentDay = new Date().getDate();
    this.setData(this.currentYear, this.currentMonth+1);
  },
  methods: {
    clickDay(item,index) {
      this.currentMonthData.forEach((dataItem,dataIndex) => {
        if(index === dataIndex){
          this.$set(this.currentMonthData[dataIndex],'selected',true)
        }else{
          this.$set(this.currentMonthData[dataIndex],'selected',false)
        }
      });
      console.log(item.string)
    },
    selectToday(){
      this.setData(this.currentYear, this.currentMonth+1, this.currentDay);
    },
    changeDate(){
      this.setData(Number(this.selectYear), Number(this.selectMonth)+1);
    },
    setData(year, month, day) {
      this.selectYear = year;
      this.selectMonth = month-1;
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
          this.preMonthData.push(preMonthDayNum - minWeek + i+1);
        }
      } else {
        this.preMonthData = [];
      }
      //   当月数据
      for (let i = 1; i < currentMonthDayNum + 1; i++) {
        // 是否为今天
        let istoday;
        if(year===this.currentYear&&month-1===this.currentMonth&&this.currentDay===i){
          istoday = true
        }else{
          istoday = false
        }
        // 选中日期day
        let selected;
        if(year===this.currentYear&&month-1===this.currentMonth&&day===i){
          selected = true
        }else{
          selected = false
        }
        // 日期字符串
        let dateString =
          year + "-" + this.doubleNum(month) + "-" + this.doubleNum(i);
        // 每日数据
        let itemData = {
          y: year,
          m: month,
          d: i,
          istoday: istoday,
          selected: selected,
          string: dateString
        };
        this.currentMonthData.push(itemData);
      }
      // 下月数据
      let maxWeek = new Date(year, month - 1, currentMonthDayNum).getDay();
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
      num < 10 ? num = "0" + num : num = num;
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

.control{
  padding: 20px;
  text-align: center;
}
.control select,.control button{
  margin: 0 10px;
}
.control select{
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 6px;
}
.control option{
  line-height: 30px;
}
.control button{
  width: 60px;
  height: 30px;
  line-height: 30px;
  border-radius: 6px;
}

.weekRow {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  font-weight: bold;
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
.istoday{
  background: #0ae56e;
}
.selected{
  background: #abcdef;
}
.nextMonth {
  background: #ccc;
}
</style>

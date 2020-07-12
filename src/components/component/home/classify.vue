<template>
  <div class="home-classify">
    <ul class="home-classify-list">
      <li
        v-for="list in classifys"
        :key="list.key"
        :list="list"
      >
        <b>{{list.key}}</b>
        <section>
          <span
            v-for="post in list.value.length"
            :key="post"
            :post="post"
            :style="{color: changeSpanStyle(list.key,list.value[post-1])}"
            v-on:click="getClassList(list.key,$event)"
          >
            {{list.value[post-1]}}
          </span>
        </section> 
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'MovieClassify',
  data:function() {
    return {
      classifys: [
        { key: '类型', value: ['全部','爱情','喜剧','动作','科幻','恐怖','动画','剧情']},
        { key: '地区', value: ['全部','大陆','香港','台湾','美国','韩国','日本']},
        { key: '年份', value: ['全部','2020','2019','2018','2017','2016','2015','2014','2013','2012','2011','2010','00年代','90年代','更早']},
      ],
      oldType: '全部',
      oldArea: '全部',
      oldYear: '全部',
      nowType: '全部',
      nowArea: '全部',
      nowYear: '全部'
    }
  },
  methods: {
    changeSpanStyle(key,value) {
      var col = '';
      switch(key) {
        case '类型': col = (value === this.nowType) ? '#29b6f6' : '#757575';break;
        case '地区': col = (value === this.nowArea) ? '#29b6f6' : '#757575';break;
        case '年份': col = (value === this.nowYear) ? '#29b6f6' : '#757575';break;
      }
      return col;
    },
    getClassList(key,e) {
      var s = e.target.innerText.replace(/ /g,'');
      switch(key) {
        case '类型': this.nowType = s;break;
        case '地区': this.nowArea = s;break;
        case '年份': this.nowYear = s;break;
      }
      if(this.oldType == this.nowType && this.oldArea == this.nowArea && this.oldYear == this.nowYear) return false;
      else {
        var reqTag = [
          { key: '类型', value: this.nowType},
          { key: '地区', value: this.nowArea},
          { key: '年份', value: this.nowYear}
        ];
        this.$store.commit('movie/setterReqTag', {reqTag: reqTag});
        this.oldType = this.nowType;
        this.oldArea = this.nowArea; 
        this.oldYear = this.nowYear;
        return true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-classify {
  margin-top: 50px;
  min-height: 130px;
  border-left: 2px #e57373 solid;
  border-right: 2px #e57373 solid;
  padding-top: 30px;
}
.home-classify-list {
  margin: 0px;
  padding: 0px;
  list-style: none;
  li {
    text-align: left;
    margin: 0px 0px 20px 5%;
    b {
      color: #e57373;
      font-size: 14px;
    }
    section {
      margin-left: 3%;
      display: inline-block;
    }
    span {
      margin-right: 30px;
      font-size: 13px;
      color: #757575;
      cursor: pointer;
    }
    span:hover {
      color: #29b6f6;
    }
  }
}
</style>
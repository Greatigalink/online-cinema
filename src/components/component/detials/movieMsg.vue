<template>
  <div class="movieMsg">
    <header><b>{{this.msgs.name}}</b></header>
    <article>{{this.msgs.content}}</article>
    <section>
      <aside>
        <i class="el-icon-video-camera">导演</i>
        <b>{{this.msgs.director}}</b>
      </aside>
      <aside>
        <i class="el-icon-user">主演</i>
        <b>{{this.msgs.starring}}</b>
      </aside>
      <aside>
        <i class="el-icon-time">时间</i>
        <b>{{this.msgs.time}}</b>
      </aside>
      <aside>
        <i class="el-icon-film">片长</i>
        <b>{{this.msgs.length}}</b>
      </aside>
      <aside>
        <i class="el-icon-place">地区</i>
        <b>{{this.msgs.area}}</b>
      </aside>
      <aside>
        <i class="el-icon-link">类型</i>
        <b>{{this.msgs.type}}</b>
      </aside>
    </section>
    <footer>
      <el-rate
        v-model="sorce"
        disabled
        :max=5
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
    </footer>
  </div>
</template>

<script>
import {Rate} from 'element-ui'
import {mapState} from 'vuex'
export default {
  name: 'movieMsg',
  components: {
    ElRate: Rate
  },
  data:() => {
    return {
      msgs: {},
      sorce: 0
    }
  },
  computed: {
    ...mapState({
      movieMsg: state => state.movie.movieMsg
    })
  },
  mounted() {
    var m =  this.$store.getters['movie/getMovieMsg']('string');
    this.msgs = JSON.parse(m);
    this.sorce = this.msgs.sorce/2;
  }
}
</script>

<style lang="scss" scoped>
.movieMsg {
  position: absolute;
  top: 30px;
  left: 15%;
  width: 80%;
  height: 360px;
  text-align: left;
  letter-spacing: 2px;
  header {
    font-size: 27px;
    color: #29b6f6;
    padding-left: 30px;
  }
  article {
    line-height: 17px;
    padding:10px 0px 0px 20px;
    font-size: 13px;
    color: #795548;
  }
  section {
    padding: 20px;
    i {
      color:#e57373; 
      margin:0px 10px 8px 0px;
      font-size: 12px;
      font-weight: bold;
    }
    b {
      font-size: 10px;
      color: #212121;
    }
  }
  footer {
    padding-left: 20px;
  }
}
</style>
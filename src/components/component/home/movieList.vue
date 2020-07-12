<template>
  <div class="home-movielist">
    <header>
      <b>当前标签&nbsp; </b>
      <span v-for="tag in nowTagMsg" :key="tag.key" :tag="tag">
        <i :class="icon[tag.key]"></i> {{tag.value}}
      </span>
    </header>

    <div v-show="movieListloading" class="movielist-loading">
      <Loading></Loading>
    </div>

    <div v-show="!movieListloading">
      <MovieListMsg v-if="loadResult == 1" :movieLists="movieLists"></MovieListMsg>
      <section v-else-if="loadResult == 0">{{loadResultMsg}}</section>
      <section v-else>{{loadResultMsg}}</section>
    </div>
    
    <footer class="home-movielist-page">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="15"
        :total="sumLists.length"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </footer>
  </div>
</template>

<script>
import {Pagination} from 'element-ui'
import loading from '../../component/other/loading'
import movieListMsg from '../home/movieListMsg'

export default {
  name: 'MovieLsit',
  components: {
    ElPagination: Pagination,
    'Loading': loading,
    'MovieListMsg': movieListMsg
  },
  data:function() {
    return {
      nowTagMsg: this.$store.state.movie.reqTag,
      icon: {
        '类型':'el-icon-price-tag', '地区': 'el-icon-place', '年份': 'el-icon-time'
      },
      movieListloading: true,
      movieLists: [],
      sumLists:[],
      loadResult: 1,
      loadResultMsg: '没有数据哦，试试别的标签'
    }
  },
  watch: {
    getTagMsg:function(newTag, oldTag) {
      this.nowTagMsg = newTag;
      this.movieListloading = true;
      this.getMovieList();
    }
  },
  computed: {
    getTagMsg() {
      return this.$store.state.movie.reqTag;
    }
  },
  methods: {
    getMovieList() {
      var tag = [];
      for(var i = 0;i < 9;i++) {
        if(i == 1 || i==5 || i==6) continue;
        tag[i] = null;
      }
      tag[1] = this.nowTagMsg[2].value == '全部' ? null : (this.nowTagMsg[2].value + "%");
      tag[5] = this.nowTagMsg[0].value == '全部' ? null : ('%' + this.nowTagMsg[0].value + "%");
      tag[6] = this.nowTagMsg[1].value == '全部' ? null : ('%' + this.nowTagMsg[1].value + "%");
      var s = {
        tag: tag,
        counts: 20
      }
      // console.log(s);
      this.listenLoad();
      this.axios.post('/movieList', s).then((response) => {
        this.sumLists = response.data;
        this.movieLists = this.sumLists.slice(0,15);
        this.loadResult = response.data.length == 0 ? 0 : 1;
        this.loadResultMsg = this.loadResult ? '' : '没有数据哦，试试别的标签';
        this.movieListloading = false;
      }).catch(err => {
        alert(err);
      })
    },
    listenLoad() {
      setTimeout(()=> {
        if(this.movieListloading) {
          this.movieListloading = false;
          this.loadResult = -1;
          this.loadResultMsg = '服务器超时加载失败，请重试'
        }
        this.movieListloading = false;
        // this.loadResult = 1;
      },5000);
    },
    handleCurrentChange(val) {
      var n = (val-1) * 15;
      this.movieLists = this.sumLists.slice(n,n+15);
      window.scrollTo(0,650);
    }
  },
  mounted() {
    this.getMovieList();
  }
}
</script>

<style lang="scss" scoped>
.home-movielist {
  margin-top: 50px;
  header {
    border-left: 2px #bdbdbd solid;
    width: 40%;
    text-align: left;
    @media screen and (min-width: 450px) and (max-width: 960px) {
      width: 80%;
    }
    @media screen and (max-width: 450px) {
      width: 100%;
    }
    b {
      margin-left: 5%;
      font-size: 15px;
    }
    span {
      margin-left: 7%;
      color: #29b6f6;
      font-size: 14px;
      i {
        color: #e57373;
      }
    }
  }
  div:nth-child(3) {
    section {
      margin: 270px 40% 200px 39%;
      color: #e57373;
      font-weight: bold;
    }
  }
}
.movielist-loading {
  margin: 270px 40% 200px 39%;
  @media screen and (max-width: 960px){
    margin: 270px 7% 200px 5%;
  }
}
.home-movielist-page {
  margin-top: 30px;
}
</style>
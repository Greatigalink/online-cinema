<template>
  <div class="playMovie">
    <section v-if="!isPlay"><b>暂时没有影厅播放该电影...试一下别的</b></section>
    <el-card
      v-else
      v-for="post in playMovies"
      :key="post.id"
      :post="post"
      class="box-card"
    >
      <header><i class="el-icon-film"></i> {{post.movie_name}}</header>
      <aside><i class="el-icon-time"></i> {{post.date}} -- {{post.time}}</aside>
      <aside><i class="el-icon-location"></i> 线上影院</aside>
      <aside><i class="el-icon-s-home"></i> {{post.hall_id}}号影厅</aside>
      <p>¥{{post.price}}</p>
      <footer v-on:click="buyMovie(post.movie_id)">购票</footer>
    </el-card>
    <el-dialog
      title="订单确认"
      :visible.sync="isBuy"
      center
      :close-on-click-modal="clickClose"
      :before-close="handleClose"
    >
      <div v-if="!loadingBuy" class="buy">
        <header><b> {{this.msg.movie_name}} </b></header>
        <section><aside><i class="el-icon-user"></i> 用户名</aside><b>{{userMsg.nickname}}</b></section>
        <section><aside><i class="el-icon-user-solid"></i> Id</aside> <b>{{userMsg.id}}</b></section>
        <section><aside><i class="el-icon-s-home"></i> 影厅</aside> <b>{{this.msg.hall_id}} 号影厅</b></section>
        <section><aside><i class="el-icon-time"></i> Time</aside> <b>{{this.msg.date}} -- {{this.msg.time}}</b></section>
        <section><aside style="color: #e57373;"> 剩余票数</aside> <b>{{this.msg.remain}} <i class="el-icon-takeaway-box"></i></b></section>
        <div><el-button icon="el-icon-shopping-cart-full" circle></el-button> 支付金额: <b>¥{{this.msg.price}}</b></div>
        <footer v-on:click="getOrder()">确认</footer>
      </div>
      <div v-else class="warning">
        <div v-if="!isBuySuccess">购买中...<i class="el-icon-loading"></i></div>
        <section v-else>
          <header><i v-if="this.buyResult == 1" class="el-icon-success"></i> {{this.buyResult == 1 ? '购买成功' : this.buyResult}}</header>
          <aside v-if="this.buyResult == 1"><i class="el-icon-takeaway-box"></i> 座位号 {{this.sitNumber}}</aside>
          <aside>{{this.buyResult == 1 ? '可到个人订单管理查看' : ''}}</aside>
        </section>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {Card,Dialog} from 'element-ui'
import {mapState,mapGetters} from 'vuex'
import {playMsg,theOrder} from '@/api/movie'
export default {
  name: 'playMovie',
  components: {
    ElCard: Card,
    ElDialog: Dialog
  },
  data:() => {
    return {
      isPlay: true,
      isBuy: false,
      clickClose: true,
      counts: '未查询到剩余票数',
      loadingBuy: false,
      isBuySuccess: false,
      buyResult: '购买失败',
      sitNumber: 0,
      msg: {},
      playMovies: []
    }
  },
  computed: {
    ...mapState({
      loginState: state => state.user.loginState,
      userMsg: state => state.user.userMsg
    }),
    ...mapGetters({
      nowTime: 'getNowDate'
    })
  },
  mounted() {
    if(this.$route.query.type == 'detial') {
      this.getPlayMsg('detial',this.$route.query.id);
    }
  },
  methods: {
    buyMovie(id) {
      if(this.loginState == 1) {
        playMsg({movie_id: id}).then(res => {
          if(res == null) this.msg = {movie_name: '未查询到数据，请刷新'}
          else this.msg = res[0];
          this.isBuy = true;
        }).catch(err => {

        })
      }
      else {
        this.$message({
          showClose: true,
          message: '请先登录',
          type: 'warning'
        });
      }
    },
    getPlayMsg(type,s) { //查询电影场次movieInfo
      var options = (type == 'serch') ? {movie_name: '%' + s + '%'} : {movie_id: s};
      playMsg(options).then(res => {
        if(res == null) this.isPlay = false;
        else {
          this.playMovies = res;
          this.isPlay = true;
        } 
        // console.log(res);
      }).catch(err => {
        alert(err);
      })
    },
    getOrder() {
      this.loadingBuy = true;
      this.clickClose = false;
      var Order = {
        customer_id: this.userMsg.id,
        movie_name: this.msg.movie_name,
        movie_id: this.msg.movie_id,
        hall_id: this.msg.hall_id,
        date: this.msg.date,
        time: this.msg.time,
        buy_time: this.nowTime,
        seat_no: this.msg.bought + 1
      }
      theOrder(Order).then(res => {
        // console.log(res)
        if(res == -1) {this.buyResult = '购买失败，可能是没抢到，再试试'}
        else {
          this.buyResult = 1;
          this.sitNumber = res.bought;
          this.getPlayMsg('serch','');
        }
        this.isBuySuccess = true;
        this.clickClose = true;
      }).catch({

      })
      setTimeout(() => {
        if(!this.isBuySuccess) {
          this.buyResult = '购买超时，再试试';
          this.isBuySuccess;
        }
      },3000);
    },
    handleClose(done) {
      if(this.loadingBuy&&!this.isBuySuccess) {
        this.$message({
          showClose: true,
          message: '请等待购买结果',
          type: 'warning'
        });
      }
      else {
        done();
        this.loadingBuy = false;
        this.isBuySuccess = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.playMovie {
    footer {
    text-align: center;
    background-color:#ef5350;
    margin: 10px 27% 0px 27%;
    border-radius: 15px;
    padding: 8px;
    color: white;
    cursor: pointer;
  }
  padding: 50px;
  text-align: left;
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  section {
    color: #e57373;
  }
}
.box-card {
  display: inline-block;
  margin: 20px;
  background-color: white;
  font-weight: bold;
  width: 300px;
  height: 260px;
  header {
    line-height: 50px;
    font-size: 18px;
    color: #006064;
  }
  aside {
    font-size: 13px;
    line-height: 30px;
    color: #212121;
    i {color: #f57c00;}
  }
  p {color: #f57c00;}
}
.buy {
  header {
    text-align: center;
    font-size: 23px;
    line-height: 38px;
    color:#006064;
    margin-bottom: 30px;
  }
  section{ 
    margin: 10px;
    display: flex;
    font-weight: bold;
    b {flex: 3; color: #212121;}
    aside {flex: 1; font-size: 15px;color: #f57c00;}
  }
  div:nth-child(7) {
    text-align: center;
    margin: 30px 10% 10px 10%;
    font-size: 18px;
    b {color: #29b6f6;margin-left: 10px;}
    button {font-size: 15px;color: #212121;border-color: #212121;margin-right: 10px;}
  }
  footer {margin-top: 20px;}
}
.warning {
  text-align: center;
  div {
    font-size: 18px;
    color: #29b6f6;
  }
  section {
    header {
      font-size: 18px;
      margin: 10px;
      i {color: #43a047;}
    }
    aside {font-size: 14px; color: #29b6f6;margin: 15px;}
  }
}
</style>
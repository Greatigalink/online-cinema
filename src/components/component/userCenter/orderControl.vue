<template>
  <div class="order">
    <header>{{this.msg}}</header>
    <el-card
      v-for="post in orders"
      :key="post.id"
      :post="post"
      style="margin-bottom: 30px;"
    >
      <div class="box-card-order">
        <img :src="'http://212.64.90.182/movie/1/'+ post.movie_id +'.jpg'"/>
        <div>
          <header><i class="el-icon-film"></i> {{post.movie_name}}</header>
          <aside><i class="el-icon-time"></i> {{post.date}} -- {{post.time}}</aside>
          <aside><i class="el-icon-location"></i> 线上影院</aside>
          <aside><i class="el-icon-s-home"></i> {{post.hall_id}}号影厅</aside>
          <aside><i class="el-icon-takeaway-box"></i> 座位号 {{post.seat_no}}</aside>
          <aside><i>购买时间 </i> {{post.buy_time}}</aside>
        </div>
        <footer 
          :style="{backgroundColor: getDelState(post)}" 
          v-on:click="delTicket(post.order_id,post.state,post.data + post.time)">
          <section>{{post.state == 1 ? '退票' : '已退票'}}</section>
          <div><i class="el-icon-delete-solid"></i></div>
        </footer>
      </div>
    </el-card>
  </div>
</template>

<script>
import {Card} from 'element-ui'
import {userOrder,reFund} from '@/api/user'
import {mapState,mapGetters} from 'vuex'
export default {
  name: 'order',
  components: {
    ElCard: Card
  },
  data:() => {
    return {
      orders: [],
      msg: ''
    }
  },
  computed: {
    ...mapState({
      userMsg: state => state.user.userMsg
    }),
    ...mapGetters({
      nowTime: 'getNowDate'
    })
  },
  methods: {
    getUserOrder() {
      var user = {
        customer_id: this.userMsg.id
      },
      compare = "order_id"
      userOrder(user).then(res => {
        this.orders = res;
        if(res == null) this.msg = '你还没有购买任何电影'
        else this.orders.reverse();
      }).catch(err => {
        alert(err);
      })
    },
    getDelState(post) {
      if((post.state == 1 && this.nowTime < (post.data + post.time))) {
        return '#ef5350';
      }
      else return '#757575';
    },
    delTicket(s,t,time) {
        if(t == 0) return false;
        else if(this.nowTime >= time) {
          this.$message({
            type: 'error',
            message: '播放时间已过，无法退票',
          });
          return false;
        }
        this.$confirm('退票后需要重新购买，确定吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delOrder(s);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退票'
          });          
        });
    },
    delOrder(s) {
      var msg;
      reFund({order_id: s}).then((res) => {
        // console.log(res)
        if(res == 0) msg = '退票失败，稍后重试';
        else if(res == 1) msg = '退票成功';
        else msg = '数据更新成功但是状态未知'
        this.$message({
          type: res == 1 ? 'success' : 'error',
          message: msg,
        });
        this.getUserOrder();
      }).catch(err => {
        alert(err);
      })
    }
  },
  mounted() {
    this.getUserOrder();
  },
}
</script>

<style lang="scss" scoped>
.order {
  margin: 50px 0% 0px 0%;
  padding: 30px 13% 30px 5%;
  header:nth-child(1) {font-size: 18px; color: #ef5350;margin-left: 10%;}
}
.box-card-order {
  display: flex;
  text-align: left;
  @media screen and (max-width: 430px){
    flex-direction: column;
  }
  img {
    flex: 0.3;
    width: 175px;
    height: 250px;
  }
  div {
    flex: 1.5;
    padding: 20px 0px 20px 6% ;
    header { font-size: 25px; color: #006064;margin-bottom: 20px;}
    aside {
      font-size: 14px;
      line-height: 30px;
      color: #212121;
      i {color: #f57c00;}
    }
  }
  footer {
    flex: 0.3;
    border-radius: 20px;
    padding: 1px;
    cursor: pointer;
    text-align: center;
    color: white;
    font-size: 23px;
    section {
      margin-top: 50%;
    }
  }
}
</style>
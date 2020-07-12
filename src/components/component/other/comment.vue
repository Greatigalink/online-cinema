<template>
  <div id="comment">
    <header>
      <aside>{{loginState == 1 ? ('来给电影评论吧~~ ' + userMsg.nickname) : '请先登录'}}</aside>
    </header>
    <textarea v-model="comMsg" placeholder="请输入内容" rows="8"></textarea>
    <section>{{warning}}</section>
    <el-button :disabled="loginState != 1" type="primary" v-on:click="submitCom" round>提交</el-button>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import {submitCom} from '@/api/movie'
export default {
  name: 'comment',
  data:() => {
    return {
      comMsg: '',
      warning: ''
    }
  },
  computed: {
    ...mapState({
      loginState: state => state.user.loginState,
      userMsg: state => state.user.userMsg,
      movieMsg: state => state.movie.movieMsg
    }),
    ...mapGetters('user',{
      checkCon: 'checkContent'
    }),
    ...mapGetters({
      nowTime: 'getNowDate'
    })
  },
  methods: {
    submitCom() {
      if(this.checkCon(this.comMsg) == 1) {
        var msg = {
          movie_id: this.$route.query.id,
          name: this.userMsg.nickname,
          content: this.comMsg,
          time: this.nowTime
        }
        submitCom(msg).then(res => {
          // console.log(res)
          if(res == 1) {
            this.isWarning('提交成功','success');
            this.$emit('reComList');
          }
          else this.isWarning('提交失败请重试','error');
        }).catch(err => {
          alert(err)
        })
      }
      else this.warning = '不能为空哦~'
    },
    isWarning(s,type) {
      this.$message({
        showClose: true,
        message: s,
        type: type
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#comment {
  margin: 100px 13% 20px 13%;
  header {
    margin: 10px;
    padding: 10px;
    border-bottom: 1px #bbddbb solid;
    color: #29b6f6;
  }
  section {
    color: brown;
    padding: 5px;
  }
}
</style>
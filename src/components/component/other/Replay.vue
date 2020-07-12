<template>
  <div id="replay">
    <el-dialog
      :visible.sync="open"
      :before-close="handleClose"
      class="ry-dialog"
      center
    >
      <section>
        <h4 style="text-align: center;">{{title}}</h4>
        <textarea v-model="content" placeholder="内容" rows="6"/>
        <aside>{{warning}}</aside>
      </section>
      <aside><el-button type="primary" @click="submitRy" round>提交</el-button></aside>
    </el-dialog>
  </div>
</template>

<script>
  import {Dialog,Button} from 'element-ui'
  import {mapGetters,mapState} from 'vuex'
  import {submitCom} from '@/api/movie'
  export default {
    name: 'Replay',
    props: ['openRy','ryMsg'],
    components: {
      ElDialog: Dialog,
      ElButton: Button
    },
    data:function() {
      return {
        open: this.openRy,
        title: '',
        content: '',
        warning: '',
        ryMsgs: this.ryMsg
      }
    },
    computed: {
      ...mapState({
        loginState: state => state.user.loginState,
        userMsg: state => state.user.userMsg
      }),
      ...mapGetters('user',{
        checkCon: 'checkContent'
      }),
      ...mapGetters({
        nowTime: 'getNowDate'
      })
    },
    mounted() {
      this.startTitle();
    },
    methods: {
      startTitle() {
        console.log(this.ryMsgs)
        this.title = '回复 > ' + (this.ryMsgs.ryedName);
      },
      handleClose(done) {
        if(open) {
          done();
          this.$emit('closeRy');
        }
      },
      submitRy() {
        if(this.checkCon(this.content) == 1) {
          var msg = {
            main_id: this.ryMsgs.main_id,
            name: this.userMsg.nickname,
            ryedName: this.ryMsgs.ryedName,
            content: this.content,
            time: this.nowTime
          }
          // console.log(msg)
          submitCom(msg).then(res => {
            if(res == 1) {
              this.open2('回复成功','success');
              this.$emit('closeRy');
              this.$emit('reComList');
            }
            else this.open2('回复失败请重试','error');
          })
        }
        else this.warning = '内容不能为空哦'
      },
      open2(msg,type) {
        this.$message({
          showClose: true,
          message: msg,
          type: type
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  #replay {
    padding: 0px 30% 0px 30%;
    section {
      display: flex;
      flex-direction: column;
      aside {
        line-height: 12px;
        color: #990000;
        font-size: 10px;
      }
      input,textarea {
        margin: 10px 0px 10px 0px;
        padding: 5px;
        border: 1px #00bcd4 solid;
        border-radius: 5px;
        outline: none;
        font-size: 12px;
      }
    }
    aside {
      text-align: center;
    }
  }
  .ry-dialog {
    margin: 0px 20% 0px 20%;
  }
  @media screen and (max-width: 450px){
    .ry-dialog {
      margin: 0px 1% 0px 1%;
    }
  }
</style>

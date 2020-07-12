<template>
  <div id="detials-display">
    <h2>{{nowType}}</h2>
    <section v-if="comTrue" class="des-display-List">
      <ul>
        <li v-for="post in commentlist"
          :key="post.id"
          :post="post"
          class="des-dis-list-con"
        >
          <div class="des-dis-list-conmain">
            <section>
              <el-avatar
                :size="50"
                :src="avatorSrc(post.comment.poster)"
              >
              </el-avatar>
            </section>
            <section>
              <aside class="des-name">{{post.comment.name}}</aside>
              <aside class="des-content">{{post.comment.content}}</aside>
              <section class="des-mark">
                <aside><i class="el-icon-pie-chart"></i>&nbsp;{{post.comment.time}}</aside>
                <aside @click="replay(post,true)"><i class="el-icon-chat-dot-square"></i></aside>
                <aside @click="exRy(post.comment.id)">回复<i class="el-icon-d-caret">{{post.replay == null ? 0 : post.replay.length}}</i></aside>
              </section>
            </section>
          </div>
          <div v-if="expandRy == post.comment.id">
            <div  
              v-for="rply in post.replay"
              :key="rply.id"
              :rply="rply"
              class="des-dis-list-replay"
            >
              <section>
                <el-avatar :size="33" :src="avatorSrc(rply.poster)"></el-avatar>
                <aside> <span>{{rply.name}}</span></aside>
                <section>回复</section>
                <aside> <span>{{rply.ryedName}}</span></aside>
              </section>
              <section>{{rply.content}}</section>
              <section>
                <aside><i class="el-icon-pie-chart"></i>&nbsp;{{rply.time}}</aside>
                <aside @click="replay(post,false,rply)"><i class="el-icon-chat-dot-square"></i></aside>
              </section>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section v-else style="margin: 50px;">
      <h3 style="text-align: center;color: #795548;">{{msg}}</h3>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    name: 'detials-display',
    props: ['nowType','list'],
    data:function() {
      return {
        comTrue: this.list == null ? false : true,
        msg: '还没有评论，快来抢沙发吧!',
        avatorsrc: '',
        commentlist: this.list,
        expandRy: '',
        expandRyPre: ''
      }
    },
    watch: {
      list:function(n,o) {
        this.commentlist = n;
        this.comTrue = n.length == 0 ? false : true;
      }
    },
    computed: {
      ...mapState({
        loginState: state => state.user.loginState
      }),
    },
    methods: {
      avatorSrc(s) {
        var src = require('../../../assets/images/logo.png');
        if(s == undefined || s == '' || s.length == 0 || s == 'none') return src;
        else return s;
      },
      exRy(s) {
        if(s == this.expandRyPre) {
          this.expandRy = '';
          this.expandRyPre = '';
        }
        else {
          this.expandRy = s;
          this.expandRyPre = s;
        }
      },
      replay(f,main,r) {
        if(this.loginState != 1) {
          this.$message({
            showClose: true,
            message: '请先登录',
            type: 'warning'
          })
        }
        else this.$emit('getterRy',f,main,r);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #detials-display {
    text-align: left;
    margin-top: 30px;
    background-color: white;
    min-height: 100px;
    padding: 1px;
    h2 {
      text-align: center;
      color: #795548;
    }
  }
  .des-display-List {
    margin: 10px;
    padding: 1px;
    ul {
      margin: 0px;
      padding: 0px;
    }
    .el-avatar {
      background-color: white;
    }
  }
  .des-dis-list-con {
    margin: 30px 10px 0px 10px;
    list-style: none;
    border-bottom: 1px #757575 solid;
    padding: 5px;
    white-space: pre-wrap;
  }
  .des-dis-list-conmain {
    display: flex;
    section:nth-child(2) {
      margin-left: 10px;
      flex: 5;
      padding: 10px;
      font-weight: bold;
      .des-name {
        color: #00bcd4;
        font-size: 17px;
      }
      .des-content {
        color: #795548;
        letter-spacing: 1px;
        line-height: 23px;
        font-size: 14px;
        min-height: 20px;
      }
    }
  }
  .des-mark {
    font-size: 13px;
    color: #757575;
    display: flex;
    aside:nth-child(1) {
      padding-top: 3px;
    }
    aside:nth-child(2) {
      color: #00bcd4;
      margin-left: auto;
      margin-right: 8px;
      font-size: 18px;
      cursor: pointer;
    }
    aside:nth-child(3) {
      padding-top: 3px;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .des-dis-list-replay {
    margin:0px 0px 0px 9%;
    display: flex;
    flex-direction: column;
    section:nth-child(1) {
      padding-top: 5px;
      display: flex;
      font-size: 11px;
      border-top: 1px #BDBDBD solid;
      section { margin-top: 9px;}
      aside {
        margin:0px 5px 0px 5px;
        padding-top: 9px;
        text-align: center;
        color: #00bcd4;
      }
    }
    section:nth-child(2) {
      font-size: 11px;
      color: #795548;
      min-height: 20px;
      margin: 5px 0px 5px 4%;
    }
    section:nth-child(3) {
      display: flex;
      aside:nth-child(1) {
        padding-top: 4px;
        font-size: 11px;
        margin-left: 4%;
      }
      aside:nth-child(2) {
        margin-left: auto;
        color: #00bcd4;
        cursor: pointer;
        font-size: 17px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    .des-dis-list-replay {
      padding: 5px;
      section:nth-child(2) {
        margin-left: 13%;
      }
      section:nth-child(3) {
        aside:nth-child(1) {
           margin-left: 10%;
        }
      }
    }
  }
</style>

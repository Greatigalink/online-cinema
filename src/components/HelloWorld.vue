<template>
  <div class="hello">
    <img src="../assets/images/logo.png">
    <h1>{{ msg }}</h1>
    <div id="use-sass">
      <p>浏览、登录、购票</p>
    </div>
    <ul>
      <li>
        <router-link
          to="/home"
        >
          <i class="el-icon-video-play"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '影院票务管理系统'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  margin-top: 180px;
  height: 400px;
  img {
    color: #ef9a9a;
  }
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
i {
  font-size: 30px;
}
#use-sass {
  $col: #ffa726;
  p {
    color: $col;
  }
}
</style>

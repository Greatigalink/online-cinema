<template>
  <header class="home-head">
    <img @click="jumpHello" src="../../../assets/images/logo.png"/>
    <article class="home-head-article">
      <h1>快速购票 &nbsp;&nbsp;&nbsp; 浏览影讯</h1>
      <h2>
        <span
          v-for="post in warnings.length"
          :key="post"
          :post="post"
        >
          {{warnings[post - 1]}}
        </span>
      </h2>
    </article>
  </header>
</template>

<script>
export default {
  name: 'homeHead',
  data:function() {
    return {
      warnings: '选择你喜欢的电影并购买吧!'
    }
  },
  methods: {
    jumpHello() {
      this.$router.push({
        path: '/',
        name: 'HelloWorld'
      })
    }
    // switchImg() {
    //   setInterval(() => {
    //     this.imgId ++;
    //     this.imgId = this.imgId > 3 ? 0 : this.imgId;
    //   },5000)
    // },
    // getImgSrc(e) {
    //   if(e.target.tagName == 'HEADER') {
    //     console.log(this.imgId);
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
$W: 100%;
$a: 'http://101.37.83.157:3000/movie/back/3.jpg';
$b: 'http://101.37.83.157:3000/movie/back/2.jpg';
$c: 'http://101.37.83.157:3000/movie/back/4.jpg';
$d: 'http://101.37.83.157:3000/movie/back/5.jpg';
.home-head {
  width: $W;
  background: url($a), url($b), url($c), url($d);
  height: 550px;
  padding-top: 10px;
  background-size: cover;
  animation: back 20s infinite;
  img {
    margin-top: -50px;
    background-color: white;
    border-radius: 15px;
    padding:0px 7px 0px 7px;
    cursor: pointer;
  }
  @media screen and (max-width: 450px) {
    img {
      margin-top: -20px;
    }
  }
  @keyframes back {
    0% {background: url($a);background-size: cover;}
    20% {background: url($a);background-size: cover;}
    25% {background: url($b);background-size: cover;}
    45% {background: url($b);background-size: cover;}
    50% {background: url($c);background-size: cover;}
    70% {background: url($c);background-size: cover;}
    75% {background: url($d);background-size: cover;}
    95% {background: url($d);background-size: cover;}
  }
}
.home-head-article {
  color: white;
  margin: 100px 32% 0px 32%;
  cursor: default;
  h1 {
    color: #b2ebf2;
    font-size: 30px;
  }
  h2 {
    span {
      animation: head-art 1s; 
      font-size: 17px;
    } 
  }
  @media screen and (max-width: 450px) {
    margin: 100px 10% 0px 10%;
    h1 { font-size: 25px;}
    h2 {
      span { font-size: 13px;}
    }
  }
  @keyframes head-art {
    0% { margin-left: -20px; opacity: 0;}
    100% { text-align: center; opacity: 1;}
  }
}
</style>
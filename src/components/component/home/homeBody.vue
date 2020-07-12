<template>
  <div class="home-body">
    <header class="home-body-link">
      <section 
        v-for="post in headlinks" 
        :key="post.id" 
        :post="post"
      >
        <header>
          <i :class="post.class"></i>
        </header>
        <article>
          <aside>{{post.title}}</aside>
          <p>{{post.article}}</p>
        </article>
      </section>
    </header>
    <Movie-Classify></Movie-Classify>
    <Movie-List></Movie-List>
    <section class="home-body-1"><h3>点击电影查看详情，登录后就可以买票!</h3></section>
  </div>
</template>

<script>
import MovieClassify from '../home/classify'
import MovieList from '../home/movieList'
export default {
  name: 'homeBody',
  components: {
    'Movie-Classify': MovieClassify,
    'Movie-List': MovieList
  },
  data:function() {
    return {
      headlinks: [
        {id: 1, class: 'el-icon-video-camera-solid', title: '浏览影讯', article: '根据您的口味推荐，众多热门电影等你浏览'},
        {id: 2, class: 'el-icon-user', title: '登录账户', article: '注册您的专属用户，选择您的兴趣标签'},
        {id: 3, class: 'el-icon-shopping-cart-full', title: '购买影票', article: '查看影院场次信息，快速购票，生成二维码票据'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.home-body {
  min-height: 700px;
  padding: 10px 10% 10px 10%;
}
.home-body-link {
  background-color: white;
  margin-top: -90px;
  border-bottom: 1px #bdbdbd solid;
  display: flex;
  padding: 20px;
  section {
    flex: 1;
    header {
      margin: 10px 0px 20px 0px;
      i {
        color: #ffa726;
        font-size: 70px;
      }
    }
    article {
      animation: link 1.5s;
      aside {
        font-weight: bold;
        color: #29b6f6;
      }
      p {
        margin: 10px 13% 10px 13%;
        font-size: 14px;
        color: #9e9e9e;
      }
    }
    @keyframes link {
      from { margin-top: 50px; opacity: 0;}
      to { margin-top: 0px; opacity: 1;}
    }
  }
  @media screen and (max-width: 960px){
    flex-direction: column;
    margin: -120px 5% 0px 5%;
  }
}
.home-body-1 {
  margin: 80px -12.5% 0px -12.5%;
  height: 90px;
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  padding-top: 20px;
  color: white;
}
</style>
<template>
  <article class="home-movielist-list">
    <ul>
      <li
        v-for="post in movieLists"
        :key="post.id"
        :post="post"
      >
        <div>
          <section>
            <img :src="post.poster" @click="seeMovie(post)"/>
          </section>
          <article class="mobile-movieList">
            <h4>{{post.name}}</h4>
            <aside>{{post.content.length > 55 ? post.content.slice(0,54) + '......' : post.content}}</aside>
            <p>
              <span style="color: #424242;">导演: </span>
              {{post.director.length > 11 ? post.director.slice(0,10) + '..' : post.director}}
            </p>
            <p>{{post.time}}</p>
            <p>{{post.length}}</p>
            <p>{{post.area}} / {{post.type}}</p>
          </article>
        </div>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: 'movieListMsg',
  props: ['movieLists'],
  methods: {
    seeMovie(movieId) {
      this.$store.commit('movie/setterMovieMsg',movieId);
      this.$router.push({
        path: '/detailsmv',
        name: 'detailsmv',
        query: {
          id: movieId.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-movielist-list {
  margin-top: 50px;
  ul {
    margin: 0px;
    padding: 0px;
    text-align: left;
    @media screen and (min-width: 450px) and (max-width: 960px) {
      text-align: center;
    }
  }
  li {
    list-style: none;
    display:inline-block;
    margin: 15px;
    width: 370px;
    height: 230px;
    transition: all 1s;
    @media screen and (max-width: 430px) {
      text-align: left;
      width: 130px;
      height: 80px;
      margin-left: 5px;
    }
    div {
      display: flex;
    }
    section {
      flex: 0.9;
      height: 230px;
      @media screen and (max-width: 430px) {
        height: 150px;
      }
      cursor: pointer;
      margin-right: 10px;
      overflow: hidden;
      background-color: black;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.3s;
      }
      img:hover {
        transform: scale(1.08);
        opacity: 0.8;
      }
    }
    article {
      flex: 1;
      margin-right: 5px;
      h4 {
        line-height: 13px;
        color: #546e7a;
      }
      aside {
        font-size: 13px;
        letter-spacing: 1px;
        color: #795548;
      }
      p {
        font-weight: bold;
        font-size: 11px;
        color: #29b6f6;
        line-height: 10px;
      }
    }
  }
  li:hover {
    box-shadow: 5px 5px 10px #bdbdbd;
  }
}
@media screen and (max-width: 430px){
  .mobile-movieList {
    display: none;
  }
}
</style>
<template>
  <div id="movieDetails">

    <div v-show="movieloading" class="movie-loading">
      <Loading></Loading>
    </div>

    <div v-show="!movieloading" class="movieDetails-body">
      <div class="movieDetails-header">
        <header>
          <img :src="movieMsg.poster"/>
          <div class="movieDetails-intro">
            <canvas id="canvas-movieIntro" width="850" height="420"></canvas>
            <MovieMsg></MovieMsg>
          </div>
        </header>
      </div>
      <section class="movieDetials-buy">
        <aside v-on:click="buyMovie">
          <b>快速购票</b>
        </aside>
      </section>
      <com-input @reComList="reComList"></com-input>
      <ryplay v-if="replay" :openRy="true" @closeRy="closeRy" :ryMsg="ryMsg" @reComList="reComList"></ryplay>
      <section v-if="iscomlist" class="movie-comment">
        <com-display :list="comlist" @getterRy="getterRy"></com-display>
      </section>
    </div>
    
  </div>
</template>

<script>
import loading from '../component/other/loading'
import {mapState} from 'vuex'
import {comList} from '@/api/movie'
import movieMsg from '../component/detials/movieMsg'
import comDisplay from '../component/other/artcomdisplay'
import comment from '../component/other/comment'
import ryplay from '../component/other/Replay'
export default {
  name: 'movieDetails',
  components: {
    'Loading': loading,
    'MovieMsg': movieMsg,
    'com-display':comDisplay,
    'com-input': comment,
    'ryplay': ryplay
  },
  data:() => {
    return {
      movieloading: true,
      replay: false,
      iscomlist: false,
      movieMsg: {},
      ryMsg: '',
      comlist: []
    }
  },
  mounted() {
    this.movieloading = false;
    this.pointIntro();
    var m =  this.$store.getters['movie/getMovieMsg']('string');
    this.movieMsg = JSON.parse(m);
    this.getComList();
  },
  methods: {
    pointIntro() {
      var canvasDom = document.getElementById("canvas-movieIntro");
      var cxt = canvasDom.getContext("2d");
      cxt.fillStyle="white";
      cxt.beginPath();
      cxt.moveTo(160,0);
      cxt.lineTo(850,0);
      cxt.lineTo(850,420);
      cxt.lineTo(0,420);
      cxt.quadraticCurveTo(50, 80, 160, 0) 
      cxt.closePath();
      cxt.fill();
    },
    getComList() {
      // console.log(this.movieMsg.id)
      comList({movie_id: this.movieMsg.id}).then(res => {
        // console.log(res)
        this.comlist = res;
        this.iscomlist = true;
      }).catch(err => {
        alert(err);
      })
    },
    buyMovie() {
      this.$router.push({
        path: '/buyMovie',
        name: 'buyMovie',
        query: {
          type: 'detial',
          id: this.movieMsg.id
        }
      })
    },
    getterRy(f,main,r) {
      // console.log(f,main,r)
      this.ryMsg = {
        ryedName: main ?  f.comment.name : r.name,
        main_id: f.comment.id,
        type: main
      }
      this.replay = true;
    },
    reComList() {
      this.getComList();  
    },
    closeRy() {
      this.replay = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-loading {
  margin: 270px 40% 200px 39%;
  @media screen and (max-width: 960px){
    margin: 270px 7% 200px 5%;
  }
}
#movieDetails {
  margin-top: 50px;
  padding: 1px;
}
.movieDetails-header {
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
  }
.movieDetails-body {
  padding: 1px;
  header {
    background: rgba($color: #212121, $alpha: 0.1);
    padding: 50px 13% 10px 13%;
    display: flex;
    height: 330px;
    position: relative;
    img {
      border-top-right-radius: 50px;
      border: 5px white solid;
      margin: 50px 0px -140px 0px;
      width: 27%;
      animation: imgStart 1s;
    }
    @keyframes imgStart {
      from {transform: scaleY(-1);opacity: 0;}
      to {transform: scaleY(1);opacity: 1;}
    }
  }
}
.movieDetials-buy {
    margin: 200px 43% 100px 43%;
    height: 55px;
    cursor: pointer;
    background-image: linear-gradient(to top, #c79081 0%, #dfa579 100%);
    padding-top: 1px;
    font-size: 20px;
    color: white;
    border-radius: 13px;
    aside {
      margin-top: 15px;
    }
}
.movieDetails-intro {
  flex: 0.8;
  animation: introStart 2s;
  margin:50px 0px 0px -40px;
  position: relative;
  @keyframes introStart {
    from {margin-left: 300px;}
    to {margin-left: -40px;}
  }
}
.movie-comment {
  margin: 20px 10% 20px 10%;
  background-color: white;
}
</style>
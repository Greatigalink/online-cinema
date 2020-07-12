<template>
  <div id="home">
    <div v-if="homeloading" class="home-loading">
      <Loading></Loading>
    </div>
    <div v-else class="home-content">
      <Home-Head></Home-Head>
      <Home-Body></Home-Body>
    </div>
  </div>
</template>

<script>
import homeHead from '../component/home/homeHead'
import homeBody from '../component/home/homeBody'
import loading from '../component/other/loading'
export default {
    name: 'home',
    components: {
      'Home-Head': homeHead,
      'Home-Body': homeBody,
      'Loading': loading
    },
    data:function() {
      return {
        homeloading: true
      }
    },
    methods: {
      loading() {
        let that = this;
        var imgSrcs = ['/movie/back/3.jpg','/movie/back/2.jpg','/movie/back/4.jpg', '/movie/back/5.jpg'],
            i = 0,
            timer = null,
            len = imgSrcs.length,
            loadImg = function(src) {
              if(i < len) {
                var imgObject = new Image();
                imgObject.src = 'http://101.37.83.157:3000' + src;
                timer = setInterval(() => {
                  if(imgObject.complete) {
                    clearInterval(timer);
                    loadImg(imgSrcs[++i]);
                  }
                },100);
              }
              else {
                that.homeloading = false;
              }
            };
            loadImg(imgSrcs[i]);
      }
    },
    mounted() {
      this.loading();
    }
}
</script>

<style lang="scss" scoped>
#home {
  margin-top: 50px;
  background-color: white;
  min-height: 700px;
  padding-top: 1px;
}
.home-loading {
  margin: 270px 40% 200px 39%;
  @media screen and (max-width: 960px){
    margin: 270px 7% 200px 5%;
  }
}
.home-content {
  animation: home 1s;
  @keyframes home {
    from {opacity: 0;}
    to {opacity: 1;}
  }
}
</style>
<template>
  <div id="loadding">
    <aside>加载资源中</aside>
    <ul>
      <li><i class="el-icon-video-camera-solid"></i></li>
      <li><i class="el-icon-video-camera-solid"></i></li>
      <li><i class="el-icon-video-camera-solid"></i></li>
      <li><i class="el-icon-video-camera-solid"></i></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'loadding'
}
</script>

<style lang="scss" scoped>
#loadding {
  display: flex;
  aside {
    flex: 0.7;
    font-size: 15px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #29b6f6;
    text-align: right;
  }
  ul {
    flex: 1;
    display: flex;
    margin: 0px;
    padding: 0px;
    list-style: none;
    li {
      flex: 1;
      color: #ffa726;
    }
    li:nth-child(1) {animation: loadding1 1s infinite;}
    li:nth-child(2) {animation: loadding2 1s infinite;}
    li:nth-child(3) {animation: loadding3 1s infinite;}
    li:nth-child(4) {animation: loadding4 1s infinite;}
    @keyframes loadding1 {
      0% {transform: translateY(0px);}
      12.5% {transform: translateY(-10px);}
      25% {transform: translateY(0px);}
    }
    @keyframes loadding2 {
      11.8% {transform: translateY(0px);}
      23.7% {transform: translateY(-10px);}
      35.5% {transform: translateY(0px);}
    }
    @keyframes loadding3 {
      25% {transform: translateY(0px);}
      37.5% {transform: translateY(-10px);}
      50% {transform: translateY(0px);}
    }
    @keyframes loadding4 {
      37.5% {transform: translateY(0px);}
      50% {transform: translateY(-10px);}
      62.5% {transform: translateY(0px);}
    }
  }
}
</style>
<template>
  <div id="buyMovie">
    <img src="../../assets/images/logo.png"/>
    <Serch @getPlayMsg="getPlayMsg"></Serch>
    <div v-if="!isBuy">
      <PlayMovie ref="getMsg"></PlayMovie>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import serchMovie from '../component/buyMovie/serchMovie'
import playMovie from '../component/buyMovie/playMovie'
export default {
  name: 'buyMovie',
  components: {
    'Serch': serchMovie,
    'PlayMovie': playMovie
  },
  data:() => {
    return {
      isBuy: false,
    }
  },
  methods: {
    getPlayMsg(type,s) {
      this.$refs.getMsg.getPlayMsg(type,s);
    }
  }
}
</script>

<style lang="scss" scoped>
#buyMovie {
  img { margin-top: 50px;}
  padding: 1px;
  margin-top: 50px;
  border-top: 1px #bdbdbd solid;
}
</style>
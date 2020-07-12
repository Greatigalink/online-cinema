<template>
  <div class="serchMovie">
    <section>
      <input placeholder="搜一搜近期热映电影" v-model="serchContent" v-on:keyup.enter="serchMovie()"/>
      <aside><el-button icon="el-icon-search" v-on:click="serchMovie()" circle></el-button></aside>
    </section>
  </div>
</template>

<script>
export default {
  name: 'serchMovie',
  data:() => {
    return {
      serchContent: ''
    }
  },
  methods: {
    serchMovie() {
      this.$emit('getPlayMsg','serch',this.serchContent);
    }
  }
}
</script>

<style lang="scss" scoped>
.serchMovie {
  height: 200px;
  padding: 1px;
  section {
    margin: 80px 35% 0px 35%;
    display: flex;
    aside { 
      margin-top: 8px;
      button {
        color: white;
        background-color: #29b6f6;
      }
    }
  }
}
</style>
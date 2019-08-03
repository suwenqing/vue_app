<template>
  <div>
    <van-panel v-for="(item,index) in commentList" :key="index">
      <div slot="header" class="header">第{{index+1}}楼 用户：{{item.user_name}} 发表时间：{{item.add_time|dataFormat()}}</div>
      <div class="content">{{item.content}}</div>
    </van-panel>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
    };
  },

  methods: {},

  created() {},
  computed: {
    ...mapState(["commentList"])
  }
};
</script>

<style lang='less' scoped>
.header {
  background-color: #ccc;
  height:30px;
  line-height: 30px;
}
.content {
  height: 30px;
  padding: 10px;
}

</style>

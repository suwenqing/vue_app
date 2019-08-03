<template>
  <div>
    <van-panel>
      <div class="first" slot="header">
        <h3>{{goodDescList.title}}</h3>
      </div>
      <div slot="footer">
        <p v-html="goodDescList.content"></p>
      </div>
    </van-panel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gid: this.$route.params.id,
      goodDescList: {}
    };
  },

  methods: {
    async getGoodsDesc() {
      const res = await this.axios.get(`/api/goods/getdesc/${this.gid}`);
      if (res.status != 0) {
        return false;
      }
      this.goodDescList = res.message[0];
      console.log(this.goodDescList);
    }
  },

  created() {
    this.getGoodsDesc();
  }
};
</script>

<style lang='less' scoped>
.van-panel {
  text-align: center;

  .first {
    color: #26a2ff;
  }
  p {
      margin:0;
      width: 100%;
      text-align: left;
      overflow: hidden;
    img {
      width: 100%;
    }
  }
}
.van-panel__footer{
    padding:3px;
}
</style>

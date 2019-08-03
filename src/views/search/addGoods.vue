<template>
  <div>
    <van-cell-group>
      <van-field v-model="inputContent" placeholder="请输入商品名称" />
    </van-cell-group>

    <van-button type="info" @click="addBrand">添加商品</van-button>

    <!-- 失败弹窗 -->
    <van-popup
      v-model="show"
      position="top"
      :overlay="false"
      :style="{ height: '40px',backgroundColor:'red' }"
    >请输入商品名称</van-popup>

    <!-- 成功弹窗 -->
    <van-popup
      v-model="showSuccess"
      :duration="time"
      position="top"
      :overlay="false"
      get-container="#search"
      :style="{ height: '40px',backgroundColor:'green' }"
    >商品添加成功</van-popup>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      inputContent: "",
      show: false,
      showSuccess: false,
      time: 0.5
    };
  },

  methods: {
    async addBrand() {
      if (this.inputContent.trim() == "") {
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 500);
        return;
      }
      const res = await this.axios.post("/api/addproduct", {
        name: this.inputContent
      });
      if (res.status != 0) {
        return false;
      }
      this.showSuccess = true;
      setTimeout(() => {
        this.$router.push('/search')

      }, 1000);

    }
  },

  created() {}
};
</script>

<style lang='less' scoped>
.van-button {
  width: 96%;
  margin: 30px 2%;
}
.van-popup {
  text-align: center;
  color: #fff;
  line-height: 40px;
}
</style>

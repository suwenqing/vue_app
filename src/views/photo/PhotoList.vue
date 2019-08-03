<template>
  <div>
    <!-- 分类列表 -->
    <!-- <van-grid >
      <van-grid-item v-for="item in photoList" :key="item.id" @click="showPhoto(item.id)" :text="item.title" />
    </van-grid>-->
    <van-tabs v-model="active" @click="showPhoto">
      <van-tab v-for="(item,index) in photoList" :key="index" :title="item.title">
        <!-- 图片列表 -->
        <lazy-component>
          <div v-for="item in allPhoto">
            <img v-lazy="item.img_url" @click="showImgDetail(item.id)"/>
            <!-- <h4 v-html="item.title"></h4> -->
            <p v-html="item.zhaiyao">
            </p>
          </div>
        </lazy-component>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photoList: [],
      allPhoto: [],
      active: 0
    };
  },

  methods: {
    // 获取图片分类列表
    async getPhotoList() {
      const res = await this.axios.get("/api/getimgcategory");
      if (res.status == 0) {
        this.photoList = res.message;
        this.photoList.unshift({ title: "全部", id: 0 });
      }
      console.log(this.photoList);
    },

    // 获取所有图片
    async showPhoto(index) {
      const param = index ? this.photoList[index].id : 0;

      const res = await this.axios.get("/api/getimages/" + param);
      if (res.status == 0) {
        this.allPhoto = res.message;
        console.log(this.allPhoto);
      }
    },

    // 获取图片详情信息
    showImgDetail(id){
        this.$router.push(`/home/photoinfo/${id}`)
    }
  },

  created() {
    this.getPhotoList();
    this.showPhoto(0);
  }
};
</script>

<style lang='less' scoped>
.van-tab__pane {
  text-align: center;
  div {
      position: relative;
    img {
      width: 96%;
      box-shadow: 0 0 7px #666;
      margin-top: 5px;
    }
    // h4{
    //     position: absolute;
    //     bottom:0;
    //     left:2%;
    //     color:#fff;
    //     z-index: 1;
    //     width: 96%;

    // }
    p {
      text-indent: 2rem;
      position: absolute;
      text-align: left;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      width:96%;
      height:80px;
      bottom: 0;
      left: 2%;
      margin:0
    }
  }
}
</style>

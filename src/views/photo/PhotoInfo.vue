<template>
  <div>
    <van-card centered>
      <h3 slot="title" class="h3title">{{imgDetailDesc.title}}</h3>
      <div slot="num" style="color:#666">点击:{{imgDetailDesc.click}}次</div>
      <div slot="price" style="color:#666">发表时间:{{imgDetailDesc.add_time|dataFormat()}}</div>
    </van-card>

    <!-- 图片展示 -->
    <div class="second">
      <img v-for="(item,index) in smallImg" :key="item.id" :src="item.src" @click="showImg(index)" />
    </div>

    <!-- 图片预览模块 -->
    <van-image-preview :start-position="index" lazy-load swipe-duration close-on-popstate v-model="show" :images="images" @change="onChange">
      <template v-slot:index>
        第{{ index+1 }}页
      </template>
    </van-image-preview>

    <!-- 图片介绍模块 -->
    <p v-html="imgDetailDesc.content"></p>

    评论模块
    <h2>发表评论：{{imgId}}</h2>
    <van-cell-group>
      <van-field  type="textarea" v-model="inputContent" placeholder="请输入评论内容" />
    </van-cell-group>
    <van-button type="info" @click="addComment(imgId)">发表评论</van-button>
    <comment-cart></comment-cart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgId: this.$route.params.id,
      imgDetailDesc: [],
      smallImg: [],
      images: [],
      show: false,
      index: 0,
      inputContent:'',
    };
  },

  methods: {
    // 获取图片介绍信息
    async getImgDetail() {
      const res = await this.axios.get(`/api/getimageInfo/${this.imgId}`);
      if (res.status == 0) {
        this.imgDetailDesc = res.message[0];
        console.log(this.imgDetailDesc)
      }
    },

    // 获取图片缩略图信息
    async getSmallImg() {
      const res = await this.axios.get(`/api/getthumimages/${this.imgId}`);
      if (res.status == 0) {
        this.smallImg = res.message;
        // console.log(this.smallImg);
        this.smallImg.forEach(item => {
          this.images.push(item.src);
        });
        // console.log(this.images)
      }
    },

    // 设置预览图片的索引值
    onChange(index) {
      this.index = index;
    },

    // 展示预览图片
    showImg(index){
        this.onChange(index)
        this.show = true;
    },

    // 添加评论
    async addComment(id){
        if(this.inputContent.trim()==''){
            return this.$toast('请输入内容')
        }
        const res = await this.axios.post(`/api/postcomment/${id}`,{
            content:this.inputContent
        })
        if(res.status == 0){
            this.$store.dispatch('getCommentList',this.imgId)
        }
    }
  },

  created() {
    this.getImgDetail();
    this.getSmallImg();
    // 显示评论
    this.$store.dispatch('getCommentList',this.imgId)
  }
};
</script>

<style lang='less' scoped>
.van-card {
  .van-card__header {
    padding: 0 5px 10px;
  }
  background-color: #fff;
  .h3title {
    text-align: center;
    color: #26a2ff;
  }
}
.content {
  color: #8f8f94;
}
.second {
  // display: flex;
  padding: 20px;
  img {
    width: 30%;
    margin-right: 3%;
    margin-bottom: 4%;
    flex-wrap: wrap;
    box-shadow: 0 0 7px #666;
  }
}
p{
    line-height: 20px;
    margin:0;
    padding: 0 10px;
}
.van-field{
    border:1px solid #ccc;
    padding:5px;
}
.van-button{
    width: 100%;
    margin:3px;
}
</style>

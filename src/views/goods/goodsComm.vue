<template>
    <div>
    <h2>发表评论：{{gid}}</h2>
    <van-cell-group>
      <van-field  type="textarea" v-model="inputContent" placeholder="请输入评论内容" />
    </van-cell-group>
    <van-button type="info" @click="addComment(gid)">发表评论</van-button>
     <comment-cart></comment-cart>
    </div>
</template>

<script>
    export default {

    data () {
      return {
          gid:this.$route.params.id,
          inputContent:'',
      }
    },

    methods: {
        async addComment(id){
        const res = await this.axios.post(`/api/postcomment/${id}`,{
            content:this.inputContent
        })
        if(res.status == 0){
            this.$store.dispatch('getCommentList',this.gid)
        }
    }
    },

    created () {
        this.$store.dispatch('getCommentList',this.gid)
    }
}
</script>

<style lang='less' scoped>
.van-field{
    border:1px solid #ccc;
    padding:5px;
}
.van-button{
    width: 100%;
    margin:3px;
}
</style>

<template>
    <div id="search">
      <div class="search-bar">
        <input type="text" v-model="inputContent" placeholder="请输入关键词" @change="changeSearch">
        <van-icon  name="search" />
        <span @click="cancelSearch">取消</span>
      </div>

      <div class="block1" v-show="block1">
        <van-cell-group>
          <van-cell title="搜索历史" >
            <template slot="default">
              <van-icon name="delete" @click="initSearch"/>
            </template>
          </van-cell>
          <van-cell value="内容" >
            <ul v-if="localSearch.length!=0">
              <li v-for="(item,i) in localSearch" :key="i" @click="addContent(item)">{{item}}</li>
            </ul>
            <p v-else>暂无搜索历史</p>
          </van-cell>
        </van-cell-group>
      </div>


      <div class="block2" v-show="block2">
        <van-cell value="内容" >
          <ul>
            <li v-for="item in brandList" :key="item.id">
              <van-cell :title="item.name"  >
                <template slot="default">
                    <span class="custom-title">商品上架时间:</span>
                    <span >{{item.ctime|dataFormat()}}</span>
                </template>
              </van-cell>
              </li>
          </ul>
        </van-cell>
      </div>


    </div>
</template>

<script>
    export default {

    data () {
      return {
        content:'',
        brandList:[],
        inputContent:'',
        block1:true,
        block2:false,
        localSearch:[],
        showSuccess: false,
      }
    },

    methods: {
      async changeSearch(){
        const res = await this.axios.get('/api/getprodlist')
        if(res.status!=0){
          return false
        }
        this.brandList = res.message
        this.block1 = false
        this.block2 = true

        const flag = this.localSearch.includes(this.inputContent)

        if(!flag){
          if(this.localSearch.length>=10){
            this.localSearch.pop()
          }
          this.localSearch.unshift(this.inputContent)
          localStorage.setItem('historySearch',JSON.stringify(this.localSearch))
        }
      },

      cancelSearch(){
        this.inputContent = ''
        this.block1 = true
        this.block2 = false
      },

      addContent(item){
        this.inputContent = item
        this.changeSearch()
      },

      initSearch(){
        this.localSearch = []
        localStorage.setItem('historySearch',JSON.stringify([]))
      }
    },

    created () {
      this.localSearch = JSON.parse(localStorage.getItem('historySearch'))

    }
}
</script>

<style lang='less' scoped>
.search-bar {
  position: relative;
  height:40px;
  .van-icon{
    position: absolute;
    left:15px;
    top:12px;
  }
  span{
  margin-left: 20px;
  line-height: 40px;
}
}
input {
  background-color: #eee;
  width:80vw;
  float: left;
  margin:5px;
  padding-left:30px;
  box-sizing: border-box;
  height:30px;
  outline: none;
  border:none;
}
.van-cell{
  padding: 12px;
  span{
    white-space: nowrap;
  }
}
.block1{
  li{
    float: left;
    background-color: #eee;
    margin-right: 5px;
    padding: 4px;
  }
}
p{
  text-align: center;
}
</style>

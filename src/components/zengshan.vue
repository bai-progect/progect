<template>
  <!-- 增删改查页面 -->
  <div class="HistoryList">
    <van-button class="xinz" type="info" @click="jia">新增</van-button>
    <div v-show="xian" class="xian">
      <div class="shu">
        <input type="text" v-model="ine.id" placeholder="请输入">
        <input type="text" v-model="ine.name" placeholder="请输入">
        <input type="text" v-model="ine.sex" placeholder="请输入">
      </div>
      <van-button type="info" @click="xinzeng">确定</van-button>
    </div>
    <div class="List" v-for="(item,indx) in inne">
      <div class="shi">
        <div style="margin-left: 5px">姓名:{{item.a}}</div>
        <div>年龄:{{item.b}}</div>
        <div>性别:{{item.c}}</div>
      </div>
      <div class="botton">
        <van-button type="info" @click="bianji(indx,item)">编辑</van-button>
        <van-button style="margin-left:10%" @click="shanchu(indx,item)" type="danger">删除</van-button>
      </div>
    </div>
    <div v-show="aaa" class="xian">
      <div class="shu">
        <input type="text" v-model="inea.id" disabled>
        <input type="text" v-model="inea.name">
        <input type="text" v-model="inea.sex">
      </div>
      <van-button type="info" @click="qued">确定</van-button>

    </div>
  </div>
</template>

<script>
  import {
    zeng,
    del,
    inserta,
    cha,
  } from '@/api/travelApi'
  export default {
    data() {
      return {
        xian: false,
        aaa: false,
        ine: {},
        inea: [],
        inne: []

      }
    },
    methods: {
      chaa() {
        let data = {}
        cha(data).then(res => {
          // console.log(res.length, "项目名称")
          this.inne = res
          console.log(this.inne, "项目页面")


        }).then(() => {
          // on close
        });
      },
      jia() {
        this.xian = !this.xian
      },
      xinzeng() {
        this.xian = false
        console.log(this.ine.id)
        console.log(this.ine.name)
        console.log(this.ine.sex)
        let data = {
          a: this.ine.id,
          b: this.ine.name,
          c: this.ine.sex,
        }
        inserta(data).then(res => {
          // console.log(res.length, "项目名称")

          console.log(res, "项目页面")
          this.chaa()
          this.ine.id=''
          this.ine.name=''
          this.ine.sex=''


        }).then(() => {
          // on close
        });
        console.log("新增")
      },
      bianji(indx, item) {

        this.inea.id = item.a
        this.inea.name = item.b
        this.inea.sex = item.c
        this.aaa = !this.aaa

        console.log(this.inea, "this.inea")
        console.log(indx, item.a)
        console.log("编辑")
      },
      qued() {
        let data = {
          a: this.inea.id,
          b: this.inea.name,
          c: this.inea.sex,
        }
        zeng(data).then(res => {
          // console.log(res.length, "项目名称")
          console.log(res, "项目页面")
          this.aaa = false
          this.chaa()

        }).then(() => {
          // on close
        });
      },
      shanchu(indx, item) {
        let aa = item.a
        let data = {
          a: aa
        }
        del(data).then(res => {
          // console.log(res.length, "项目名称")
          console.log(res, "项目页面")
          this.chaa()

        }).then(() => {
          // on close
        });
        console.log(indx, item.id)
        console.log("删除")
      }

    },
    mounted() {
      this.chaa()

    }
  }

</script>

<style scoped>
  .HistoryList {
    margin: 0 auto;
    width: 90%;
    height: 300px;
    font-size: 14px
  }

  .List {
    width: 100%;
    height: auto;
    background: #f5f7fa;
    margin-top: 10px;
    overflow: hidden;
  }

  .xian {
    margin: 10px auto;
    width: 100%;
    height: 30px;
    background: #f0f2f5;
  }

  .shu {
    width: 70%;
    overflow: hidden;
    float: left;
  }

  .xian button {
    width: 60px;
    line-height: 30px;
    height: 30px;
  }

  .shu input {
    width: 20%;
    display: block;
    float: left;
    margin-left: 10px;
    margin-top: 3px
  }

  .shi {
    width: 58%;
    overflow: hidden;
    float: left;
  }

  .shi div {
    width: auto;
    float: left;
    margin-left: 5px;
    line-height: 30px
  }

  .botton {
    width: 42%;
    float: right;
  }

  .botton button {
    width: 60px;
    float: left;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    margin: 0;
  }

  .xinz {
    width: 100px;
    border-radius: 5px
  }

</style>

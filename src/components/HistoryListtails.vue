<template>
  <div class="Historydetails">
      <div class="detailsbox">
          <div class="detailstop"><img :src="details.ApplyUserImage" alt="">
            <span class="travel">{{details.pedestrian}}的出差</span>
            <span v-if="details.openspstatus==1" class="state approval">审批中</span>
            <span v-if="details.openspstatus==2" class="state adopt">已通过</span>
            <span v-if="details.openspstatus==3" class="Reject state">已驳回</span>
            <span v-if="details.openspstatus==4" class="Revoke state">已撤销</span>
          </div>
          <div class="academician"> <div class="startas">出发城市</div> <div class="endsa">{{details.departure}}</div></div>
          <div class="academician"> <div class="startas">目的城市</div> <div class="endsa">{{details.arrived}}</div></div>
          <div class="academician"> <div class="startas">开始时间</div> <div class="endsa">{{details.starttime}}</div></div>
          <div class="academician"> <div class="startas">结束时间</div> <div class="endsa">{{details.endtime}}</div></div>
          <div class="academician"> <div class="startas">出差时长</div> <div class="endsa">{{details.duration}}</div></div>
          <div class="academician"> <div class="startas">工作类型</div> <div class="endsa">{{details.worktype}}</div></div>
          <div class="academician"> <div class="startas">项目名称</div> <div class="endsa">{{details.projectname}}</div></div>
          <div class="academician"> <div class="startas">其他销售</div> <div class="endsa">{{details.market}}</div></div>
          <div class="academician"> <div class="startas">归属单位</div> <div class="endsa">{{details.unit}}</div></div>
          <div class="academician"> <div class="startas">出差事由</div> <div class="endsa">{{details.reasons}}</div></div>
          <div class="academician"> <div class="startas">交通工具</div> <div class="endsa">{{details.vehicles}}</div></div>
          <div class="academician"> <div class="startas">同行人</div> <div class="endsa">{{details.trekking}}</div></div>
          <!-- <div class="academician"> <div class="startas">去订票</div> <div class="endsa">{{details.booking}}</div></div> -->
          <div class="academician"> <div class="startas">审批流程</div> <div class="endsa">{{details.approvers}}</div></div>
          <!-- <div class="academician"> <div class="startas">抄送人</div> <div class="endsa">{{details.Copier}}</div></div> -->
         <button @click="aaa">跳转</button>
         
        </div>
  </div>
</template>

<script>
import {
  queryall
  } from '@/api/travelApi'
  export default {
    data() {
      return {
        adopt:false,
        reject:true,
        revoke:false,
        details:{
          ApplyUserImage:``,
          pedestrian:``,
          openspstatus:``,
          // departure:`北京`,
          // arrived :`广州`,
          // starttime:`2019-9-85`,
          // endtime:`2019-10-5`,
          // duration:`120`,
          worktype:``,
          projectname:``,
          market:``,
          // unit:`中国中央电视台`,
          // reasons:`领导安排`,
          // Vehicle:`火箭炮`,
          trekking:``,
          // booking:`www.baidu.com`,
          approvers:``,
          // Copier:`白总、王总、将总`,
        }
       
      }
    },
    methods: {
      aaa(){
        this.$router.push({
          path: '/testhistory',
         
        })
      },
      history() {
        let data = {
          // userid : sessionStorage.getItem('myId')
          approval:  this.$route.query.approval
        }
        queryall(data).then(res => {
          this.details = res.data
          console.log(res.data,"接收数据")
          this.details.pedestrian=res.data.xCtravelpersonnel[0].pedestrian
          this.details.ApplyUserImage=res.data.xCtravelcallbacks[0].applyuserimage
          this.details.openspstatus=res.data.xCtravelcallbacks[0].openspstatus
          this.details.worktype=res.data.xCtravelproject[0].worktype
          this.details.market=res.data.xCtravelproject[0].market
          this.details.trekking=res.data.xCtravelpersonnel[0].trekking
          this.details.projectname=res.data.xCtravelproject[0].projectname
          this.details.approvers=res.data.xCtravelcallbacks[0].itemname
        }).then(() => {
          // on close
        });
      },
    },
	mounted(){
    this.history()
    console.log(
      this.$route.query.approval,"接收"
    )
	
	}
  }

</script>

<style scoped>
  .detailsbox{
    width: 95%;
    height: auto;
    margin-left: 5%;
  }
  .detailstop{
    width: 100%;
    height: 35px;

    margin-top: 10px
  }
  .detailstop img{
    display: block;
    width: 35px;
    height: 35px;
    float: left;
    border-radius: 4px
  }
  .travel{
    width: 140px;
    display: block;
    height: 35px;
    line-height: 35px;
    margin-left: 15px;
    float: left;
    font-weight: 600
  }

  .state{
    width: 40px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    border-radius: 4px;
    margin-top: 6px;
    display: block;
    float: left;
  }
  .adopt {
    border: 1px solid #52B444;
    color: #52B444;
  }
  .Reject{
    border: 1px solid #ED3A3A;
    color: #ED3A3A;
  }
  .Revoke{
    border: 1px solid #919191;
    color: #919191;
  }
  .approval {
    border: 1px solid #1F5698;
    color: #1F5698;
  }
  .academician{
    width: 100%;
    height: auto;
    line-height: 25px;
    text-align: left;
    margin-top: 10px;
    color: #919191;
    overflow: hidden;
  }
  .endsa{ 
    float: left;  
    margin-left: 15px;
    color: #000
  }
  .startas{
    float: left;  
    width: 70px;

  }
</style>

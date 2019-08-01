<template>
  <!-- 出差历史记录 -->
  <div class="HistoryList">
    <div class="Historybox" v-if="Notempty">
      <div class="History" v-for="(item , index) in business" @click="detailsa(index)">
        <div class="Historytop">
          <span class="travel">{{item.xctravelpersonnel[0].pedestrian}}的出差</span>
          <span v-if="item.xctravelcallbacks[0].openspstatus==1" class="state approval">审批中</span>
          <span v-if="item.xctravelcallbacks[0].openspstatus==2" class="state adopt">已通过</span>
          <span v-if="item.xctravelcallbacks[0].openspstatus==3" class="Reject state">已驳回</span>
          <span v-if="item.xctravelcallbacks[0].openspstatus==4" class="Revoke state">已撤销</span>
          <span class="festival"
            style="float: right;">{{item.applytime}}</span>
        </div>
        <div class="city">出差城市: &nbsp {{item.arrived}}</div>
        <div class="city">开始时间: &nbsp {{item.starttime}}</div>
        <div class="city">结束时间: &nbsp {{item.endtime}}</div>
      </div>

    </div>
    <div v-if="Notemptys">
      <div class="Notemptys">
        <img src="../../static/kongbai.png" alt="">
        <p>暂无提交记录</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    querytable,
    queryall
  } from '@/api/travelApi'
  export default {
    data() {
      return {
        Notemptys: false,
        Notempty: true,
        Approval: false,
        adopt: false,
        reject: false,
        revoke: false,
        business: [],
        addapp:'',
        thirds: {
          "oaType": "10002", // String
          "templateId": "", // String
          "thirdNo": '', // String
          "extData": {
            'fieldList': [{
                'title': '出发城市',
                'type': 'text',
                'value': '',

              },
              {
                'title': '目的城市',
                'type': 'text',
                'value': '',
              },
              {
                'title': '开始时间',
                'type': 'text',
                'value': '',
              },
              {
                'title': '结束时间',
                'type': 'text',
                'value': '',
              },
              {
                'title': '出差时长',
                'type': 'text',
                'value': '',

              },
              {
                'title': '行政归属单位',
                'type': 'text',
                'value': '',
              },
              {
                'title': '工作类型',
                'type': 'text',
                'value': '',
              },
              {
                'title': '项目名称',
                'type': 'text',
                'value': '',
              },
              {
                'title': '其他销售',
                'type': 'text',
                'value': '',

              },
              // {
              //   'title': '东华其他销售',
              //   'type': 'text',
              //   'value': '',
              // },
              {
                'title': '出差事由',
                'type': 'text',
                'value': '',
              },
              {
                'title': '交通工具',
                'type': 'text',
                'value': '',
              },
              {
                'title': '同行人',
                'type': 'text',
                'value': '',
              },
              {
                'title': '审批通过去订票',
                'type': 'link',
                'value': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww37e19e92a4cde98a&redirect_uri=xc.zhangwin.com:82/dist&response_type=code&scope=SCOPE&agentid=1000024&state=STATE#wechat_redirect',
              }
              // ,{
              //   'title': '去订票',
              //   'type': 'text',
              //   'value': '审批通过之后去携程商旅订票',
              // }
            ],
          }
        }
      }
    },
    methods: {
      //调取历史记录数据
      history() {
        let data = {
          userid : sessionStorage.getItem('myId')
          // userid: 292
        }
        querytable(data).then(res => {
          // console.log(res.length, "项目名称")
          console.log(res[0], "项目页面")
          this.business = res
          // console.log(this.business, "this.business")
          if (res.length == 0) {
            this.Notemptys = true
            this.Notempty = false
          }
        }).then(() => {
          // on close
        });
      },
      //出差历史详情
      detailsa(index) {
        console.log(this.business[index].approval,"发送")
         this.addapp=this.business[index].approval
        this.historya()
        this.getadds()
        // this.$router.push({
        //   path: '/HistoryListdetails',
        //   query:{
        //     approval: this.business[index].approval
        //   }
        // })
      },
      historya() {
        console.log(this.addapp,"approvalapproval")
        let data = {
          // userid : sessionStorage.getItem('myId')
          approval: this.addapp
        }
        queryall(data).then(res => {
          this.details = res.data
          // console.log(res.data,"接收数据")
          // this.details.pedestrian=res.data.xCtravelpersonnel[0].pedestrian
          // this.details.ApplyUserImage=res.data.xCtravelcallbacks[0].applyuserimage
          // this.details.openspstatus=res.data.xCtravelcallbacks[0].openspstatus
          // this.details.worktype=res.data.xCtravelproject[0].worktype
          // this.details.market=res.data.xCtravelproject[0].market
          // this.details.trekking=res.data.xCtravelpersonnel[0].trekking
          // this.details.projectname=res.data.xCtravelproject[0].projectname
          // this.details.approvers=res.data.xCtravelcallbacks[0].itemname

           let datas = res.data
           this.thirds.thirdNo = datas.approval
            let listArr = this.thirds.extData.fieldList
            for (const [i, v] of listArr.entries()) {
              if (v.title == '出发城市') listArr[i].value = datas.departure
              if (v.title == '目的城市') listArr[i].value = datas.arrived
              if (v.title == '开始时间') listArr[i].value = datas.starttime
              if (v.title == '结束时间') listArr[i].value = datas.endtime
              if (v.title == '出差时长') listArr[i].value = datas.duration
              if (v.title == '行政归属单位') listArr[i].value = datas.unit
              if (v.title == '工作类型') listArr[i].value = datas.xCtravelproject[0].worktype
              if (v.title == '项目名称') listArr[i].value = datas.xCtravelproject[0].projectname || '无'
              if (v.title == '其他销售') listArr[i].value = datas.xCtravelproject[0].market || '无'
              // if (v.title == '东华其他销售') listArr[i].value = datas.xCtravelproject[0].othersales || '无'
              if (v.title == '出差事由') listArr[i].value = datas.reasons
              if (v.title == '交通工具') listArr[i].value = datas.vehicles || '无'
              if(v.title=='同行人') listArr[i].value = datas.xCtravelpersonnel[0].trekking || '无' 
            }
            console.log(listArr, '8888')

        }).then(() => {
          // on close
        });
      },
      //调取企业微信jssdk接口
      getadds() {
        
        function GetQueryString(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }
        var agentId = GetQueryString("AgentId")
        var Secret = GetQueryString("Secret")
  
          let _this = this
          // SHA1
          function add(x, y) {
            return ((x & 0x7FFFFFFF) + (y & 0x7FFFFFFF)) ^ (x & 0x80000000) ^ (y & 0x80000000);
          }
  
          function SHA1hex(num) {
            var sHEXChars = "0123456789abcdef";
            var str = "";
            for (var j = 7; j >= 0; j--)
              str += sHEXChars.charAt((num >> (j * 4)) & 0x0F);
            return str;
          }
  
          function AlignSHA1(sIn) {
            var nblk = ((sIn.length + 8) >> 6) + 1,
              blks = new Array(nblk * 16);
            for (var i = 0; i < nblk * 16; i++) blks[i] = 0;
            for (i = 0; i < sIn.length; i++)
              blks[i >> 2] |= sIn.charCodeAt(i) << (24 - (i & 3) * 8);
            blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
            blks[nblk * 16 - 1] = sIn.length * 8;
            return blks;
          }
  
          function rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
          }
  
          function ft(t, b, c, d) {
            if (t < 20) return (b & c) | ((~b) & d);
            if (t < 40) return b ^ c ^ d;
            if (t < 60) return (b & c) | (b & d) | (c & d);
            return b ^ c ^ d;
          }
  
          function kt(t) {
            return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
              (t < 60) ? -1894007588 : -899497514;
          }
  
          function SHA1(sIn) {
            var x = AlignSHA1(sIn);
            var w = new Array(80);
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            var e = -1009589776;
            for (var i = 0; i < x.length; i += 16) {
              var olda = a;
              var oldb = b;
              var oldc = c;
              var oldd = d;
              var olde = e;
              for (var j = 0; j < 80; j++) {
                if (j < 16) w[j] = x[i + j];
                else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                var t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));
                e = d;
                d = c;
                c = rol(b, 30);
                b = a;
                a = t;
              }
              a = add(a, olda);
              b = add(b, oldb);
              c = add(c, oldc);
              d = add(d, oldd);
              e = add(e, olde);
            }
            var SHA1Value = SHA1hex(a) + SHA1hex(b) + SHA1hex(c) + SHA1hex(d) + SHA1hex(e);
            return SHA1Value.toLowerCase();
          }
         
          var params = {
            nonceStr: Math.random().toString(36).substr(2),
            timestamp: (new Date()).getTime(),
            url: window.location.href.split("#")[0],
            //企业id
            corpid: "ww37e19e92a4cde98a",
            agentid: agentId,
            //自建应用id
            secretid: Secret
          };
          params.appNonceStr = Math.random().toString(36).substr(2);
          params.appTimeStamp = (new Date()).getTime()
          //获取token获取token
          //获取企业ticket --获取应用ticket
          var tokenUrl = "http://xcsl.zhangwin.com/tencent/gettoken?corpid=" + params.corpid + "&corpsecret=" + params.secretid;
          // console.log(tokenUrl,"tokenUrltokenUrltokenUrl")
          $.ajax(tokenUrl, {
            data: {},
            async: false,
            dataType: 'json',
            success: function (data) {
              params.token = data["access_token"];
            },
            error: function (e) {
              console.info("tokenerror", e);
            }
          });
  
          //获取企业签名--获取企业签名
          var qiyeTicketUrl = "http://xcsl.zhangwin.com/tencent/get_jsapi_ticket?access_token=" + params.token;
          $.ajax(qiyeTicketUrl, {
            data: {},
            async: false,
            dataType: 'json',
            success: function (data) {
              params.qiyeticket = data["ticket"];
            },
            error: function (e) {
              console.info("tokenerror", e);
            }
          });
  
          //获取企业签名
          var qiyeticketStr = "jsapi_ticket=" + params.qiyeticket + "&noncestr=" + params.nonceStr + "&timestamp=" +
            params
            .timestamp +
            "&url=" + params.url;
          params.qiyeSignature = SHA1(qiyeticketStr);
  
          //获取应用ticket--获取应用签名
          var yingyongTicketUrl = "http://xcsl.zhangwin.com/tencent/ticket/get?access_token=" + params.token +
            "&type=agent_config";
          $.ajax(yingyongTicketUrl, {
            data: {},
            async: false,
            dataType: 'json',
            success: function (data) {
              params.yingyongticket = data["ticket"];
            },
            error: function (e) {
              console.info("tokenerror", e);
            }
          });
          //获取应用签名
          var appticketStr = "jsapi_ticket=" + params.yingyongticket + "&noncestr=" + params.appNonceStr + "&timestamp=" +
            params.appTimeStamp +
            "&url=" + params.url;
          params.appSignature = SHA1(appticketStr);
          //jssdk config
          wx.config({
            beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false,
            appId: params.corpid, // 必填，企业微信的corpID
            timestamp: params.timestamp, // 必填，生成签名的时间戳
            nonceStr: params.nonceStr, // 必填，生成签名的随机串
            signature: params.qiyeSignature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
            jsApiList: ['thirdPartyOpenPage', 'selectEnterpriseContact'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
          });
          wx.checkJsApi({
            jsApiList: ['thirdPartyOpenPage', 'selectEnterpriseContact'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res) {
              // console.log(res)
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
          });
          wx.ready(function () {
            wx.agentConfig({
              beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
              debug: false,
              corpid: params.corpid, // 必填，企业微信的corpid，必须与当前登录的企业一致
              agentid: params.agentid, // 必填，企业微信的应用id
              timestamp: params.appTimeStamp, // 必填，生成签名的时间戳
              nonceStr: params.appNonceStr, // 必填，生成签名的随机串
              signature: params.appSignature, // 必填，签名，见附录1
              jsApiList: ['thirdPartyOpenPage'], //必填
              success: function (res) {
                //   wx.invoke('thirdPartyOpenPage', {
                //   "oaType": _this.thirds.oaType, // String
                //   "templateId": _this.thirds.templateId, // String
                //   "thirdNo":_this.thirds.thirdNo, // String
                //   "extData": _this.thirds.extData
                // },
                // function (res) {
                //   // 输出接口的回调信息输出接口的回调信息输出接口的回调信息输出接口的回调信息
                //   console.log(res,"thirdPartyOpenPage,res");
                // });
                // console.log(_this, "_this123456789")
                // console.log(res, "res123456789")
                // console.log(sessionStorage.getItem("IDtemplate"),"sessionStorage.getItem.IDtemplate")
                wx.invoke('thirdPartyOpenPage', {
                    "oaType": _this.thirds.oaType, // String
                    "templateId": sessionStorage.getItem("IDtemplate"), // String
                    "thirdNo": _this.thirds.thirdNo, // String
                    "extData": _this.thirds.extData
                  },
  
                  function (res) {
                    // 输出接口的回调信息输出接口的回调信息
                    // console.log(res, "thirdPartyOpenPage,res");
                  });
  
              },
              fail: function (res) {
                if (res.errMsg.indexOf('function not exist') > -1) {
                  alert('版本过低请升级')
                }
              }
            });
          });
  
          console.info("所有参数", params);
  
      },

    },
    mounted() {
      this.history()
    }
  }

</script>

<style scoped>
  .Historybox {
    width: 100%;
    height: auto;
  }

  .History {
    width: 97%;
    height: 121px;
    margin-left: 3%;
    border-bottom: 1px solid #EBEBEB;
    position: relative;
    padding: 10px 0;
  }

  .Historytop {
    display: block;
    width: 100%;
    height: 30px;
    padding-bottom: 5px
  }

  .History span {
    display: block;
    float: left;
  }

  .travel {
    width: 28%;
    height: 30px;
    line-height: 30px;
    font-weight: 600;
    text-align: left
  }

  .city {
    width: 100%;
    height: 25px;
    text-align: left;
    line-height: 25px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .adopt {
    border: 1px solid #52B444;
    color: #52B444;
  }

  .festival {
    width: 120px;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    margin-top: 5px;
    margin-right: 10px
  }

  .state {
    width: 40px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    border-radius: 4px;
    margin-top: 5px
  }

  .Reject {
    border: 1px solid #ED3A3A;
    color: #ED3A3A;
  }

  .Revoke {
    border: 1px solid #919191;
    color: #919191;
  }

  .approval {
    border: 1px solid #1F5698;
    color: #1F5698;
  }

  .Notemptys {
    position: relative;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    margin-top: 150px;
    margin-left: -150px;
    color: #919191;

  }

  .Notemptys p {
    position: absolute;
    bottom: 155px;
    width: 100%;
    margin: 0 auto;
    display: block;
    color: #b2b2b2
  }
  .Notemptys img{
    width: 80px;
    display: block;
    margin: 0 auto
  }

</style>

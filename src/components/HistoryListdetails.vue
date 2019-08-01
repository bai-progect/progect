<template>
  <div class="Historydetails">
      <!-- <div class="detailsbox">
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
          <div class="academician"> <div class="startas">去订票</div> <div class="endsa">{{details.booking}}</div></div>
          <!-- <div class="academician"> <div class="startas">审批流程</div> <div class="endsa">{{details.approvers}}</div></div> -->
          <!-- <div class="academician"> <div class="startas">抄送人</div> <div class="endsa">{{details.Copier}}</div></div> -->
         
        <!-- </div> --> 
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
        },
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
              },{
                'title': '去订票',
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
      history() {
        let data = {
          // userid : sessionStorage.getItem('myId')
          approval:  this.$route.query.approval
        }
        queryall(data).then(res => {
          this.details = res.data
          console.log(res.data,"接收数据")
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
          console.log(tokenUrl,"tokenUrltokenUrltokenUrl")
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
              console.log(res)
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
                console.log(_this, "_this123456789")
                console.log(res, "res123456789")
                console.log(sessionStorage.getItem("IDtemplate"),"sessionStorage.getItem.IDtemplate")
                wx.invoke('thirdPartyOpenPage', {
                    "oaType": _this.thirds.oaType, // String
                    "templateId": sessionStorage.getItem("IDtemplate"), // String
                    "thirdNo": _this.thirds.thirdNo, // String
                    "extData": _this.thirds.extData
                  },
  
                  function (res) {
                    // 输出接口的回调信息输出接口的回调信息
                    console.log(res, "thirdPartyOpenPage,res");
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
	mounted(){
    this.history()
    this.getadds()

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

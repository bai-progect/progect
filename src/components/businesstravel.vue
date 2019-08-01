<template>
  <div class="business">
      <van-button class="submit" style="margin: 15px 0 0 0 ;" @click="HistoryList" type="info">查看历史</van-button>
    <!-- 出发城市 -->
    <div class="setout">
      <label class="name">出发城市 <i>*</i></label>
      <div class="layui-block" style="width:65%; position: relative;"  :select="users" :value="userId">
          <cn-region-picker style="text-align: right; width: 230px; position: absolute;right: 15px;" v-model="Verification.name" v-validate="'required'"  name="name" class="layui-input" :placeholder="errors.first('Verification.name')  || '请选择'" :class="[isRed?'invalid':'',{'input': true, 'is-danger': errors.has('Verification.name') }]"  @on-pick-city="Verification.name = $event"></cn-region-picker>
        <!-- <input style="margin-right: 15px" v-model="Verification.name" v-validate="'required'"
          :class="[isRed?'invalid':'',{'input': true, 'is-danger': errors.has('Verification.name') }]" type="text"
          name="name" class="layui-input" :placeholder="errors.first('name')  || '请输入'"> -->
        <!-- <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span> -->
      </div>
    </div>
    <!-- 目的城市 -->
    <div class="setout">
      <label class="name">目的城市 <i>*</i></label>
      <div class="layui-block"  style="width:65%;position: relative;"  :select="users" :value="userId">
          <cn-region-picker style="text-align: right; width: 230px; position: absolute;right: 15px" v-model="Verification.City" v-validate="'required'"  name="City" class="layui-input" :placeholder="errors.first('Verification.City')  || '请选择'" :class="[isRed?'invalid':'',{'input': true, 'is-danger': errors.has('Verification.City') }]"  @on-pick-city="Verification.City = $event"></cn-region-picker>
        <!-- <input  style="margin-right: 15px" v-model="Verification.City" v-validate="'required'"
          :class="[isRed?'invalid':'',{'input': true, 'is-danger': errors.has('Verification.City') }]" type="text"
          name="City" class="layui-input" :placeholder="errors.first('City')  || '请输入'"> -->
        <!-- <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span> -->
      </div>
    </div>
    <!-- 开始时间 -->
    <div style="background:#fff">
        <div class="out" style="margin-top:15px">
            <label class="name">开始时间 <i>*</i></label>
            <div class="layui-block" :select="users" :value="userId" @click="startTime">
              <input  style="margin-right: 15px" v-model="Verification.start" disabled v-validate="'required'"
                :class="[isRed?'invalid':'',{'input': true, 'is-danger': errors.has('Verification.start') }]" type="text"
                name="start" class="layui-input" :placeholder="errors.first('start')  || '请选择'">
              <!-- <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span> -->
            </div>
          </div>
          <div class="xian"></div>
          <!-- 结束时间 -->
          <div class="out">
            <label class="name">结束时间 <i>*</i></label>
      
            <div class="layui-block" :select="users" :value="userId" @click="endTime">
              <input  style="margin-right: 15px" v-model="Verification.end" disabled v-validate="'required'"
                :class="[isRed?'invalid':'',{'input': true, 'is-danger': errors.has('Verification.end') }]" type="text"
                name="end" class="layui-input" :placeholder="errors.first('end')  || '请选择'">
              <!-- <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span> -->
            </div>
          </div>
          <div class="xian"></div>
          <!-- 出差时长 -->
          <div class="out">
            <label class="name">出差时长 <i>*</i></label>
            <div class="layui-block" :select="users" :value="userId">
              <input style="margin-right:34px;width: 10%;" v-validate="'required'" v-model="Verification.duration2"
                :class="[isRed?'invalid':'',{'input': true, 'is-danger': errors.has('Verification.duration2') }]"
                type="number" name="duration2" class="layui-input" :placeholder="errors.first('duration2')  || '0'">
              <span style="position: absolute;right: 15px;top: 8px;">天</span>
              <!-- <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span> -->
            </div>
          </div>
    </div>
    
    <!-- 行政归属单位 -->
    <div class="setout">
      <label class="name">行政归属单位 <i>*</i></label>
      <div class="layui-block" :select="users" @click="showPopup" :value="userId">
        <input style=" margin-right: 25px;" v-model="Verification.ascription" disabled v-validate="'required'"
          :class="[isRed?'invalid':'',{'input': true, 'is-danger': errors.has('Verification.ascription') }]" type="text"
          name="ascription" class="layui-input" :placeholder="errors.first('ascription')  || '请选择'">
        <!-- <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span> -->
      </div>
      <img class="leftjian" src="../../static/xuanze.svg" alt="">
    </div>
    <!-- 工作类型 -->
    <div class="setout">
      <label class="name">工作类型 <i>*</i></label>
      <div class="layui-block" :select="users" :value="userId" @click="typesPopup">
        <input style=" margin-right: 25px;" v-model="Verification.types" disabled v-validate="'required'"
          :class="[isRed?'invalid':'',{'input': true, 'is-danger': errors.has('Verification.types') }]" type="text"
          name="types" class="layui-input" :placeholder="errors.first('types')  || '请选择'">
        <!-- <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span> -->
      </div>
      <img class="leftjian" src="../../static/xuanze.svg" alt="">

    </div>
    <!-- 项目名称 -->
    <div class="setout" style="position:relative">
      <div class="name">项目名称<i v-if="xiang">*</i></div>
      <div class="layui-block" @click="personnelpog">
        <input v-model="project" disabled type="text" class="layui-input" placeholder="请搜索">
        <!-- <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span> -->
      </div>
    </div>
    <!-- 东华智慧城市销售人员 -->
    <div class="setout" style="position:relative;">
      <div class="name">销售人员 <i>*</i></div>
      <div class="layui-block" @click="personneldong">
        <!-- <input v-model="personnel" type="text" class="layui-input" placeholder="请输入"> -->
        <input style="margin-right: 15px;" v-model="personnel" disabled v-validate="'required'"
        :class="[isRed?'invalid':'',{'input': true, 'is-danger': errors.has('personnel') }]" type="text"
        name="personnel" class="layui-input" :placeholder="errors.first('personnel')  || '请输入'">

        <!-- <div v-show="personnel" style="position: absolute;right: 15px;top: 9px;" @click="onSearchpeople">搜索</div> -->
        <!-- <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span> -->
      </div>
    </div>
    <!-- 东华其他销售 -->
    <!-- <div class="setout" style="position:relative"> -->
      <!-- <div class="name">东华其他销售</div> -->
      <!-- <div class="layui-block"  @click="personnelther"> -->
        <!-- <input v-model="sale" type="text" @blur="onSBlur" class="layui-input" :style="{marginRight:(sale?'45px':'')}"
          placeholder="请输入"> -->
          <!-- <input v-model="sale" disabled placeholder="请搜索"> -->
        <!-- <div v-show="sale" style="position: absolute;right: 10px;top: 9px;" @click="onSearch">搜索</div> -->
        <!-- <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span> -->
      <!-- </div> -->
    <!-- </div> -->
    <!-- 出差事由 -->
    <div class="set">
      <label class="cause">出差事由 <i>*</i></label>
      <div class="layui-block" :select="users" :value="userId">
        <textarea v-model="Verification.cause" v-validate="'required'"
          :class="[isRed?'invalid':'',{'input': true, 'is-danger': errors.has('Verification.cause') }]" type="text"
          name="cause" class="layui-input" :placeholder="errors.first('cause')  || '须注明服务项目'"></textarea>
        <!-- <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span> -->
      </div>
    </div>
    <!-- 交通工具 -->
    <div class="setout">
      <div class="name">交通工具</div>
      <div class="layui-block">
        <input style=" margin-right: 25px;" readonly="readonly" v-model="vehicle" @click="vehiclePopup" type="text" class="layui-input"
          placeholder="请选择">
        <!-- <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span> -->
      </div>
      <img class="leftjian" src="../../static/xuanze.svg" alt="">
    </div>
    <div class="logins" v-show="logins">
      <van-loading color="#1989fa" />
    </div>

    <!-- 同行人 -->
    <div class="hotel" style="position:relative">
        <div class="hotelname">同行人<div style="position:absolute;left: 60px;top: 10px;font-size: 13px;color: #b2b2b2">(仅限复算住宿标准)</div></div>
        <div class="hotelbox">
          <div  v-show="showPrise" class="hotelpeople">
            <div>
              <img :src="trekks.avatar" alt=""> 
            </div>
          <span>{{trekks.name}}</span>
           <i @click="cline"><img src="../../static/删除-01.svg" alt=""></i>
          </div>
          <div v-show="showRentPrise"  @click="clipeer" class="hotelpeople">
              <img src="../../static/添加-01.svg" alt="">
          </div>
          <div v-show="peopeye" class="hotelpeople">
              <img :src="trekksid.avatar" alt=""> 
              <span>{{trekksid.name}}</span>
            <i @click="line"><img src="../../static/删除-01.svg" alt=""></i>
          </div>
          <div v-show="peopeye1"  @click="clipeea" class="hotelpeople">
          <img src="../../static/添加-01.svg" alt="">
          </div>
          <div v-show="threepeop"" class="hotelpeople">
              <img :src="threepeo.avatar" alt=""> 
              <span>{{threepeo.name}}</span>
            <i @click="threeline"><img src="../../static/删除-01.svg" alt=""></i>
          </div>
          <div v-show="threepeop1"  @click="peopthreea" class="hotelpeople">
          <img src="../../static/添加-01.svg" alt="">
          </div>
        </div>
      </div>

    <!-- 东华智慧城市销售人员 -->
    <div class="peerox" v-if="xiaoshou" v-show="newdongh">
        <van-search
        v-model="personnel"
        placeholder="请搜索东华智慧城市销售人员"
        show-action
        shape="round"
        @search="Colleaguepeople"
      >
        <div slot="action" @click="onSearchpeople">搜索</div>
      </van-search>
      <div style="width:100%;height:90%;position: absolute;top: 8%;"  @click="projectcline"></div>
      <div>
        <van-popup style="width:70%;max-height: 80%;border-radius: 4px" v-model="searchBoxs">
          <div @click="userInfos(inx)" style="padding: 10px 0;line-height:28px;border-bottom: 1px solid #E5E5E5"
            v-for="(sitem,inx) in searchLists">{{sitem.organizes[0].name}} <br> {{sitem.name}} {{sitem.mobile}} </div>
        </van-popup>
        <div class="zanwu" v-if="searchBox1">暂无搜索记录</div>
      </div>
    </div>
      
    <!-- 其他销售搜索内容 -->
    <!-- <div class="peerox" v-show="newother">
        <van-search
        v-model="sale"
        placeholder="请搜索东华其他销售"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <div style="width:100%;height:90%;position: absolute;top: 8%"  @click="projectother"></div>
      <div>
          <van-popup style="width:70%;max-height: 80%;border-radius: 4px" v-model="searchBox">
            <div @click="userInfo(inx)" style="padding: 10px 0;line-height:28px;border-bottom: 1px solid #E5E5E5"
              v-for="(sitem,inx) in searchList">{{sitem.organizes[0].name}} <br> {{sitem.name}} {{sitem.mobile}} </div>
          </van-popup>
          <div class="zanwu" v-if="searchBox1">暂无搜索记录</div>
      </div>
    </div> -->
   
    <div>
      <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
        <van-picker :show-toolbar=true @confirm="confirm" @cancel="onConfirm" :columns="columns" @change="onChange" />
      </van-popup>
    </div>
    <div>
      <van-popup v-model="typesP" position="bottom" :style="{ height: '50%' }">
        <van-picker :show-toolbar=true @confirm="typeyes" @cancel="typeno" :columns="typeclo" @change="typechange" />
      </van-popup>
    </div>
    <div>
      <van-popup v-model="vehicleP" position="bottom" :style="{ height: '50%' }">
        <van-picker :show-toolbar=true @confirm="vehicleyes" @cancel="vehicleno" :columns="vehiclePo"
          @change="vehiclechange" />
      </van-popup>
    </div>
    <div>
      <van-popup v-model="startShow" position="bottom" :style="{ height: '50%' }">
        <van-datetime-picker v-model="startDate" type="date" @confirm="startConfirm" @cancel="startCancel"
          @change="startChange" />
      </van-popup>
    </div>
    <div>
      <van-popup v-model="endShow" position="bottom" :style="{ height: '50%' }">
        <van-datetime-picker v-model="endDate" type="date" @confirm="endConfirm" @cancel="endCancel"
          @change="endChange" />
      </van-popup>
    </div>
    <!-- 搜索第一同行人框 -->
    <div class="peerox" v-show="peerpeopl">
        <van-search
        v-model="colle"
        placeholder="请搜索同行人"
        show-action
        shape="round"
        @search="Colleaguepeople"
      >
        <div slot="action" @click="Colleaguepeople">搜索</div>
      </van-search>
      <div style="width:100%;height:90%;position: absolute;top: 8%"  @click="clipeers"></div>
      <div>
        <div>
            <van-popup style="width:70%;max-height: 80%;border-radius: 4px" v-model="colleagues">
              <div @click="Colleagus(inx)" style="padding: 10px 0;line-height:28px;border-bottom: 1px solid #E5E5E5;"
                  v-for="(sitem,inx) in colleaguelist"> {{sitem.organizes[0].name}} <br> {{sitem.name}} {{sitem.mobile}}</div>
            </van-popup>
        </div>
       
        <div class="zanwu" v-if="searchBox1">暂无搜索记录</div>
      </div>
    </div>

     <!-- 搜索第二同行人框 -->
     <div class="peerox" v-show="peerpeopa">
      <van-search
      v-model="colletwo"
      placeholder="请搜索同行人"
      show-action
      shape="round"
      @search="Colleaguetwoa"
    >
      <div slot="action" @click="Colleaguetwoa">搜索</div>
    </van-search>
    <div style="width:100%;height:90%;position: absolute;top: 8%"  @click="clipeera"></div>
      <div>
        <van-popup style="width:70%;max-height: 80%;border-radius: 4px" v-model="Colleaguetwo">
          <div @click="Colleagusa(inx)" style="padding: 10px 0;line-height:28px;border-bottom: 1px solid #E5E5E5"
            v-for="(sitem,inx) in Colleaguetw"> {{sitem.organizes[0].name}} <br> {{sitem.name}} {{sitem.mobile}}</div>
        </van-popup>
        <div class="zanwu" v-show="searchBox1">暂无搜索记录</div>
      </div>
    </div>

    <!-- 搜索第三同行人框 -->
    <div class="peerox" v-show="peopthree">
        <van-search
        v-model="collethree"
        placeholder="请搜索同行人"
        show-action
        shape="round"
        @search="colleathree"
      >
        <div slot="action" @click="colleathree">搜索</div>
      </van-search>
      <div style="width:100%;height:90%;position: absolute;top: 8%"  @click="peopthree1"></div>
        <div>
          <van-popup style="width:70%;max-height: 80%;border-radius: 4px" v-model="twothree">
            <div @click="Colleagusah(inx)" style="padding: 10px 0;line-height:28px;border-bottom: 1px solid #E5E5E5"
              v-for="(sitem,inx) in threefol"> {{sitem.organizes[0].name}} <br> {{sitem.name}} {{sitem.mobile}}</div>
          </van-popup>
          <div class="zanwu" v-show="searchBox1">暂无搜索记录</div>
        </div>
      </div>

     <!-- 搜索项目名称  -->
     <div class="peerox" v-show="newprojecta">
      <van-search
      v-model="project"
      placeholder="请输入项目名称"
      show-action
      shape="round"
      @search="projectclone"
    >
      <div slot="action" @click="projectclone">搜索</div>
    </van-search>
    <div style="width:100%;height:90%;position: absolute;top: 8%;"  @click="modalityas"></div>
      <div >
          <div v-show="isShow" style="width:100%;height:100%;position: fixed;top:0px;z-index: 999;background-color: rgba(0,0,0,.7)"  @click="modality">
            <div style="max-height: 80%;top:10%;position:absolute;left:15%;overflow:scroll;overflow-x:hidden;word-break: break-all;text-justify: newspaper;text-align: center;z-index:99;max-width:70%;min-width:70%;background:#fff;border-radius: 4px">
              <div style="width:100%; border-bottom:1px solid #E5E5E5;"  v-for="(item,index) in fprjname">
                <div style="width:230px; margin: 0 auto;padding-bottom: 10px;padding-top: 10px;" @click="onTap(index)">{{item}}</div>
            </div>
            </div>
          </div>
      </div>
    </div>  
    <van-button class="submit" @click="idChanged" type="info">下一步</van-button>
    <!-- <van-button class="submit" @click="history" type="info">接口</van-button> -->
    <!-- <van-button class="submit" @click="getadds" type="info">原地</van-button>-->
  </div>
</template>
<script>
  import {
    getQueryString
  } from '@/utils/common'
  import {
    handleRes
  } from '@/utils/common'

  import {
    getUserAPI,
    getList,
    administrative,
    evection,
    username,
    wisdomname,
    querytable,
    querytemp,
    usernamea
  } from '@/api/travelApi'
      
  import {
    Validators
  } from "@/utils/validate";
  import {
    Dialog
  } from 'vant';
  export default {
    data() {
      return {
        xiaoshou:true,
        xiang:false,
        showPrise:true,
	      showRentPrise:false,
        peerpeopl:false,
        peerpeopa:false,
        peopthree:false,
        peopeye:true,
        threepeop:true,
        peopeye1:false,
        threepeop1:false,
        collesss:true,
        newprojecta:false,
        newdongh:false,
        newother:false,
        list: [],
        sale1: false,
        searchList: [],
        searchLists: [],
        colleaguelist: [],
        Colleaguetw: [],
        threefol: [],
        searchBox1: false,
        searchBoxs: false,
        colleagues: false,
        Colleaguetwo: false,
        twothree: false,
        value: '',
        logins: false,
        isShow: false,
        startDate: new Date(),
        endDate: new Date(),
        startShow: false,
        endShow: false,
        Verification: {
          name: '',
          City: '',
          start: '',
          end: '',
          duration2: '',
          ascription: '',
          types: '',
          cause: '',
        },
        users: '',
        userId: '',
        personnel: '',
        // sale: '',
        colle: '',
        colletwo: '',
        collethree: '',
        // colles: false,
        project: '',
        vehicle: '',
        show: false,
        typesP: false,
        vehicleP: false,
        columns: [],
        typeclo: ['售前(必填销售人员)', '售后(必填项目名称)', '其他'],
        vehiclePo: ['飞机', '火车', '汽车', '其他'],
        fprjname: [],
        fname: [],
        fodprj: [],
        fodemp: [],
        isRed: false,
        teextid:'',
        teextidtt:'',
        teenamett:'',
        threename:'',
        teename:'',
        threeid:'',
        with:'',
        withid:'',
        trekk: {},
        trekks: {},
        trekksid: {},
        threepeo: {},
        sesstaf:'',
        thirds: {
          "oaType": "10001", // String
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
    computed: {
      duration() {
        return this.datedifference(this.Verification.start, this.Verification.end)
      },
    },
    watch: {
      personnel: {
        handler(n, o) {
          if (!n) {
            this.searchBoxs = false
          }
        }
      },
      colle: {
        handler(n, o) {
          if (!n) {
            this.colleagues = false
          }
        }
      },
      colletwo: {
        handler(n, o) {
          if (!n) {
            this.Colleaguetwo = false
          }
        }
      },
      collethree: {
        handler(n, o) {
          if (!n) {
            this.twothree = false
          }
        }
      }
    },
    methods: {
      //获取code和协同ID判断有没有权限登录
      async getUser() {
        let code = getQueryString('code')
        let templateid = getQueryString('templateid')
        let agentId = getQueryString('AgentId')
        let secret = getQueryString('Secret')
        sessionStorage.setItem("templateId",templateid)
        sessionStorage.setItem("AgentId",agentId)
        sessionStorage.setItem("Secret",secret)
        console.log(templateid,"我是模板ID")
        console.log(agentId,"我是agentIdID")
        console.log(secret,"我是secret")
        console.log(sessionStorage.getItem("templateId"),"我是模板ID2")
        try {
          let data = await getUserAPI({
            //appName: 'xiecheng',
            appName: 'shenpi',
            code
          })
          if (data.data.xt_id) {
            console.log(data, "我是res")
            console.log(data.data.xt_id, "我是res.data.xt_id")
            let userId = data.data.xt_id
            let myId = data.data.userid
            let Name = data.data.name
            // let arr = []
            // data.data.organizes.map(i => arr.push(i.name))
            // let company = arr.join(',')
            sessionStorage.setItem('userId', userId)
            sessionStorage.setItem('myId', myId)
            let company =data.data.depName
            sessionStorage.setItem('company', company)
            sessionStorage.setItem('Name', Name)
            // alert(userId, "我是userId")
            this.$router.push({
              path: "/"
            });
          } else {
            this.dialog()
          }
        } catch (err) {
          console.log(err)
        }
      },
      //开始时间
      startTime() {
        this.startShow = true
      },
      //开始时间 确认
      startConfirm() {
        this.startShow = false
        this.Verification.start = this.startChange()
        this.Verification.duration2 = this.duration
      },
      //开始时间 取消
      startCancel() {
        this.startShow = false
      },
      //开始时间 选中
      startChange() {
        return this.getNowDate(this.startDate)
      },
      //结束时间
      endTime() {
        this.endShow = true
      },
      //结束时间 确认
      endConfirm() {
        this.endShow = false
        this.Verification.end = this.endChange()
        this.Verification.duration2 = this.duration
      },
      //结束时间 取消
      endCancel() {
        this.endShow = false
      },
      //结束时间 选中
      endChange() {
        return this.getNowDate(this.endDate)
      },
      //时间格式 2019-10-10
      getNowDate(date) {
        let n = date.getFullYear()
        let y = date.getMonth() + 1
        if (y < 10) {
          y = '0' + y
        }
        let r = date.getDate()
        if (r < 10) {
          r = '0' + r
        }
        return `${n}-${y}-${r}`
      },
      //开始/结束时间 差值
      datedifference(sDate1, sDate2) { //sDate1和sDate2是2019-10-10格式  
        var dateSpan,
          iDays;
        if (!sDate1 || !sDate2) {
          this.Verification.duration2 = ''
          return 0
        }
        console.log(sDate1, sDate2, "5555555555555555555555")
        // sDate1 = new Date(sDate1).getTime()
        // sDate2 = new Date(sDate2).getTime()
        sDate1 = new Date(sDate1).getTime()
        sDate2 = new Date(sDate2).getTime()
        console.log(sDate1, sDate2, "6666666666666666666666666")
        if (sDate1 > sDate2) {
          this.$toast('开始时间不能大于结束时间');
          this.Verification.duration2 = ''
          return 0
        }

        dateSpan = Math.abs(sDate2 - sDate1);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000)) + 1;
        this.Verification.duration2 = ''

        return iDays
      },
      //项目数据 列表
      getDatas(val) {
        this.personnel = ''
        let data = {
          parameters: val
        }
        if (val) {
          getList(data).then(res => {
            console.log(res,"项目名称")
            if(res==null){
              this.isShow=false
              Dialog.alert({
            message: '暂无搜索结果'
          }).then(() => {
            // on close
          });
            }else{
              if(typeof(res.fprjname)=="string"){
              let arry=[]
              arry.push(res.fprjname)
              res.fprjname=arry

               let arrya=[]
              arrya.push(res.fname)
              res.fname=arrya
            }else{
            this.fname = res.fname
            this.fprjname = res.fprjname
            }
            this.fname = res.fname
            this.fprjname = res.fprjname
            this.fodprj = res.fodprj
            this.fodemp = res.fodemp
            let adf=res.fprjname
            // console.log(typeof(adf),"rerererere")
            }
           
          }).catch(err => {
            console.log(err)
          })
        }
      },
      //项目列表 输入
      listShow() {
        this.isShow = true
        if (!this.project) this.isShow = false
        this.getDatas(this.project)
      },
      //项目列表 选中
      onTap(i) {
        this.personnel = this.fname[i]
        this.project = this.fprjname[i]
        this.proect = this.fodprj[i]
        this.fodemp = this.fodemp[i]
        // console.log(this.personnel, "1111")
        // console.log(this.project, "00000")
        // console.log(this.proect, "2222")
        // console.log(this.fodemp, "2222")
        this.isShow = false
        this.newprojecta=false
        this.fprjname=''

      },
      modality(){
        this.isShow =false
      },
      modalityas(){
        this.newprojecta =false
      },
      //调取行政归属单位
      showPopup(val) {
        this.show = true;
        this.showaa()
      },

      typesPopup() {
        this.typesP = true;
      },
      vehiclePopup() {
        this.vehicleP = true;
      },
      onConfirm(value) {
        this.show = false
      },
      typeno(value) {
        this.typesP = false
      },
      vehicleno(value) {
        this.vehicleP = false
      },
      confirm() {
        this.show = false
        this.Verification.ascription = this.columns[this.index] || this.columns[0]
        // console.log( this.Verification.ascription,"adasdsadasd")
      },
      onChange(picker, value, index) {
        // console.log(`当前值：${value}, 当前索引：${index}`);
        this.index = index
        // console.log(this.index,'********')
      },
      typeyes() {
        this.typesP = false
        this.Verification.types = this.typeclo[this.typeIndex] || this.typeclo[0]
        console.log(this.Verification.types)
       if(this.typeIndex==1){
        this.xiaoshou=false
         this.xiang=true
        //  alert("售后")
        console.log(this,"售后")
       }else{ 
         this.xiang=false
         this.xiaoshou=true
         this.newdongh = false
       }
      },
      typechange(picker, value, index) {
        console.log(`当前值：${value}, 当前索引：${index}`);
        this.typeIndex = index
        console.log(this.typeIndex, '********')
      },
      vehicleyes() {
        this.vehicleP = false
        this.vehicle = this.vehiclePo[this.vehiclePoIndex] || this.vehiclePo[0]
        console.log(this.vehicle)
      },
      vehiclechange(picker, value, index) {
        console.log(`当前值：${value}, 当前索引：${index}`);
        this.vehiclePoIndex = index
        console.log(this.vehiclePoIndex, '********')
      },
      //搜索东华销售
      // onSearch() {
      //   console.log("搜索", this.sale)
      //   this.searchBox = true
      //   // this.searchBoxs = false
      //   username(this.sale).then(res => {
      //     if (res.data !== undefined && res.data.length > 0) {
      //       console.log(res.data, '数据局666')
      //       let name = res.data.map(i => i.organizes[0].name)
      //       console.log(name)
      //       this.searchList = []
      //       if (res.data.length !== 0) {
      //         this.searchList = res.data
      //         this.department = name
      //         console.log(this.department, "其他沙鸥")
      //         this.searchBox1 = false
      //       } else {
      //         this.searchBox1 = truetrue
      //       }
      //       console.log(this.searchList, "5151")
      //     } else {
      //       Dialog.alert({
      //       message: '暂无搜索结果'
      //     }).then(() => {
      //       // on close
      //     });
      //       this.searchList = []
      //       this.searchBox = false
      //     }
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // },
      //东华智慧城市销售人员
      onSearchpeople() {
        console.log("搜索", this.personnel)
        // this.searchBox = falsefalse
        this.logins = true
        username(this.personnel).then(res => {
            if (res.data !== undefined && res.data.length > 0) {
              this.searchBoxs = true
              this.logins = false
            console.log(res.data, '数据局5555')
            let name = res.data.map(i => i.organizes[0].name)
            console.log(name)
            this.searchLists = []
            if (res.data.length !== 0) {
              this.searchLists = res.data
              this.departments = name
              this.searchBox1 = false
            } else {
              this.searchBox1 = true
            }
            console.log(this.searchLists, "1515")
          } else {
            this.logins = false
            Dialog.alert({
            message: '暂无搜索结果'
          }).then(() => {
            // on close
          });
            this.searchBoxs = false
          }


          
        }).catch(err => {
          console.log(err)
        })
      },

      //第一同行人
      Colleaguepeople() {

        console.log("搜索", this.colle)
        this.logins = true
        // this.searchBoxs = false
        usernamea(this.colle).then(res => {
          if (res.data !== undefined && res.data.length > 0) {
            this.logins = false
        this.colleagues = true
            console.log(res.data, '数据局777')
            let name = res.data.map(i => i.organizes[0].name)
            console.log(name)
            this.colleaguelist = []
            if (res.data.length !== 0) {
              this.colleaguelist = res.data
              this.department = name
              console.log(this.department, "其他沙鸥")
              this.searchBox1 = false
            } else {
              this.searchBox1 = true
            }
            console.log(this.colleaguelist, "5151")
          } else {
            this.logins = false
              this.colleagues = false
            console.log(this.colleagues,"6556")
            Dialog.alert({
            message: '暂无搜索结果'
          }).then(() => {
            // on close
          });
           
            
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //第二同行人
      Colleaguetwoa() {
        // this.colletwo=''
        console.log("搜索", this.colletwo)
        this.logins = true
        // this.searchBoxs = false
        usernamea(this.colletwo).then(res => {
          if (res.data !== undefined && res.data.length > 0) {
            this.logins = false
            this.Colleaguetwo = true
            console.log(res.data, '第二数据局777')
            let name = res.data.map(i => i.organizes[0].name)
            console.log(name)
            this.Colleaguetw = []
            if (res.data.length !== 0) {
              this.Colleaguetw = res.data
              this.department = name
              console.log(this.department, "第二其他沙鸥")
              this.searchBox1 = false
            } else {
              this.searchBox1 = true
            }
            console.log(this.Colleaguetw, "第二41851")
          } else {
            this.logins = false
            Dialog.alert({
            message: '暂无搜索结果'
          }).then(() => {
            // on close
          });
            this.Colleaguetwo = false
          }
        }).catch(err => {
          console.log(err)
        })
      },
      
      //第三同行人
      colleathree() {
        // this.colletwo=''
        console.log("搜索三", this.collethree)
        this.logins = true
        // this.searchBoxs = false
        usernamea(this.collethree).then(res => {
          if (res.data !== undefined && res.data.length > 0) {
            this.logins = false
            this.twothree = true
            console.log(res.data, '第三数据局777')
            let name = res.data.map(i => i.organizes[0].name)
            console.log(name)
            this.threefol = []
            if (res.data.length !== 0) {
              this.threefol = res.data
              this.department = name
              console.log(this.department, "第三其他沙鸥")
              this.searchBox1 = false
            } else {
              this.searchBox1 = true
            }
            console.log(this.threefol, "第三41851")
          } else {
            this.logins = false
            Dialog.alert({
            message: '暂无搜索结果'
          }).then(() => {
            // on close
          });
            this.twothree = false
            console.log( this.twothree," this.twothree this.twothree this.twothree")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 失焦事件
      onSBlur() {
        console.log('视角111')
        this.searchBox = false
        this.searchBoxs = false
        this.colleagues = false
        this.Colleaguetwo = false
        this.twothree = false
        // this.sale1 = false
      },
      //聚焦事件
      // onSFocus(){
      //   console.log('聚焦')
      //   if(this.sale !== ""){
      //     this.sale1 = truetrue
      //   }
      // },
      //选中其他销售搜索内容
      // userInfo(inx) {
      //   console.log(inx)
      //   this.sale = this.searchList[inx].name
      //   this.othersalesid = this.searchList[inx].xtId
      //   console.log(this.othersalesid, "东华其他销售")

      //   console.log(this.sale, "112233")
      //   this.searchBox = false
      //   this.newother=false

      // },

      //选中东华智慧城市销售人员
      userInfos(inx) {
        console.log(inx)
        this.personnel = this.searchLists[inx].name
        this.fodemp = this.searchLists[inx].xtId
        console.log(this.fodemp, "东华智慧城市销售")
        console.log(this.personnel, "123456")
        this.searchBoxs = false
        this.newdongh = false
      },
      //选中同行人
      // Colleagus(inx) {
      //   console.log(inx,"选中同行人")
      //   this.colle = this.colleaguelist[inx].name
      //   this.colleagueId = this.colleaguelist[inx].xtId
      //   console.log(this.colle,"我是同行人")
      //   this.list.push({
      //     name: this.colle,
      //     id: this.colleagueId
      //   })
      //   if (this.list.length > 1) {
      //     alert("同行人最多选择两位")
      //     this.collesss=false
      //   }
      //   this.colle = []
      //   this.colleaguelist =[]
      //   console.log(this.list.length,"this.list.length")
      //   console.log(this.list, "this.list")
      //   // this.trekk =[]
      //   let sesst = this.list
      //   this.sesstaf=sesst[0].name,"asdf"
       
      //   console.log(this.sesstaf,"asdf")
      //   sesst.map(i => {
      //     this.trekk[i.name] = i.id

      //   })
      //   console.log(this.trekk, "还有1")
      //   console.log(this.list.length, "this.list.length")
      //   // console.log(this.colle,"同行人")
      //   console.log(this.colleagueId, "123456")
      //   this.colleagues = false
      // },

      //选中第一同行人 
        Colleagus(inx) {
        console.log(inx,"选中同行人")
        this.sesstaf = this.colleaguelist[inx].name
        this.colleagueId = this.colleaguelist[inx].xtId
        this.avatar = this.colleaguelist[inx].avatar
        console.log(this.sesstaf,"选职工")
        console.log(this.avatar,"选职工头像")
        this.trekks.avatar=this.avatar
        this.trekks.name=this.sesstaf
        console.log(this.trekks.avatar,"this.trekks.avata")

        this.colleagues = false

       console.log(this.colleaguelist[inx],'this.colleaguelistthis.colleaguelist')
         this.colle = this.sesstaf
         if(this.sesstaf !==undefined){
            this.showPrise = true;
            this.showRentPrise = false;  
        }
       console.log(this.sesstaf,"this.sesstaf")

       let sesst =this.colleaguelist[inx]
       this.teename=this.colleaguelist[inx].name
       this.teextid=this.colleaguelist[inx].xtId
       this.peerpeopl=false
      //  var obj ={this.teename:this.teextid}
      //   sesst.map(i => {
      //     this.trekk[i.name] = i.id

      //   }) 
    
      },
      //选中第二同行人 
      Colleagusa(inx) {
        console.log(inx,"选中同行人")
        this.sesstaftwo = this.Colleaguetw[inx].name
        this.colleagueIdtwo = this.Colleaguetw[inx].xtId
        this.avatartwo = this.Colleaguetw[inx].avatar
        console.log(this.sesstaftwo,"选职工san")
        console.log(this.avatartwo,"选职工头像")
        this.trekksid.avatar=this.avatartwo
        this.trekksid.name=this.sesstaftwo
        console.log(this.trekksid.avatar,"this.trekksid.avata")

        this.Colleaguetwo = false

       console.log(this.Colleaguetw[inx],'this.colleaguelistthis.colleaguelisttwo')
         this.colletwo = this.sesstaftwo
         if(this.sesstaftwo !==undefined){
          this.peopeye = true;
          this.peopeye1 = false; 
			     
        }
       console.log(this.sesstaftwo,"this.sesstaftwo")

       let sesst =this.Colleaguetw[inx]
       this.teenamett=this.Colleaguetw[inx].name
       this.teextidtt=this.Colleaguetw[inx].xtId
       console.log(this.teenamett,"this.teenamettthis.teenamettthis.teenamettthis.teenamettthis.teenamett")
       console.log(this.teextidtt,"this.teenamettthis.teenamettthis.teenamettthis.teenamettthis.teenamett")
       this.peerpeopa=false
      //  var obj ={this.teename:this.teextid}
      //   sesst.map(i => {
      //     this.trekk[i.name] = i.id

      //   }) 
    
      },
      
       //选中第三同行人 
      Colleagusah(inx) {
        console.log(inx,"选中同行人")
        this.sesstafb = this.threefol[inx].name
        this.colleagueaId = this.threefol[inx].xtId
        this.avatar = this.threefol[inx].avatar
        console.log(this.sesstafb,"选职工")
        console.log(this.avatar,"选职工头像")
        this.threepeo.avatar=this.avatar
        this.threepeo.name=this.sesstafb
        console.log(this.threepeo.avatar,"this.threepeo.avatar")

        this.twothree = false

       console.log(this.threefol[inx],'this.colleaguelistthis.colleaguelist')
         this.collethree = this.sesstafb
         if(this.sesstafb !==undefined){
            this.threepeop = true;
            this.threepeop1 = false;  
        }
       console.log(this.sesstafb,"this.sesstafb")

       let sesst =this.threefol[inx]
       this.threename=this.threefol[inx].name
       this.threeid=this.threefol[inx].xtId
       console.log(this.threename,"threename2626")
       console.log(this.threeid,"threeid626")
       this.peopthree=false
      //  var obj ={this.teename:this.teextid}
      //   sesst.map(i => {
      //     this.trekk[i.name] = i.id

      //   }) 
    
      },

      idChanged(value) {
        console.log(this.Verification.duration2 ,"this.pickedCityaaa,")

      //   for (var i=0;i<this.pickedCity.length;i++){
      //     console.log(this.pickedCity[i].shortName)
      //    obj.push(this.pickedCity[i].shortName)
      //    console.log(obj.join,"obj")
      //   }
      //  return obj
      //   console.log(obj.join,"2512")
      //   console.log(this.pickedCity, null, ' ',"确定的this")
      //   console.log(this.Verification)
        // for (let i in this.Verification) {
        // console.log("let in this.Verification = " +this.Verification[i])
        if( this.Verification.types=="售后(必填项目名称)"){
          if (this.Verification.City == "" || this.Verification.ascription == "" || this.Verification.cause == "" || this
          .Verification.end == "" || this.Verification.name == "" || this.Verification.start == "" || this.Verification
          .types == ""|| this.personnel == ""|| this.project == "") {
          this.userId = value
          this.$validator.validateAll()
          this.isRed = true
          this.$toast('请补全必填选项');
        } else {
          console.log(this, "参数")
          this.changed()

        }
        }else{
          if (this.Verification.City == "" || this.Verification.ascription == "" || this.Verification.duration2 <= 0 || this.Verification.cause == "" || this
          .Verification.end == "" || this.Verification.name == "" || this.Verification.start == "" || this.Verification
          .types == ""|| this.personnel == "") {
          this.userId = value
          this.$validator.validateAll()
          this.isRed = true
          this.$toast('请补全必填选项');
        } else {
          console.log(this, "参数")
          this.changed()
        
        }
        }
       
      },
      //跳转历史页面
      HistoryList(){
        this.$router.push({ path:'/HistoryList'})
      },
     
      showaa() {
        let data = {
          parameters: sessionStorage.getItem('userId'),
          // parameters: '021426',
        }
        if (true) {
          administrative(data).then(res => {
            console.log(res)
            if(res.length==1){
               this.Verification.ascription=res[0]
              console.log(res[0])
            }
            this.columns = res
          }).catch(err => {
            console.log(err)
          })
        }
      },
      //没有协同ID提示内容
      dialog() {
        Dialog.alert({
          message: '您没有协同ID,请联系相关人员补全'
        }).then(() => {
          window.close();
        });
      },
      //调取企业微信jssdk
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
              //   // 输出接口的回调信息输出接口的回调信息
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
      
      //提交
      async changed() {
        this.logins = true
        let obj=[]
        this.Verification.name.map(i=>{
         obj.push(i.shortName)
         console.log(i.shortName)
        })
        console.log(obj)
        let objs=[]
        this.Verification.City.map(i=>{
          objs.push(i.shortName)
         console.log(i.shortName)
        })
        console.log(obj)
        let data = {
          pedestrian: sessionStorage.getItem('Name'),
          company: sessionStorage.getItem('company'),
          userid: sessionStorage.getItem('myId'),
          pedestrianid: sessionStorage.getItem('userId'),
          // departure: this.Verification.name,
          arrived: objs,
          starttime: this.Verification.start,
          endtime: this.Verification.end,
          duration: this.Verification.duration2,
          unit: this.Verification.ascription,
          worktype: this.Verification.types,
          projectname: this.project,
          prnumber: this.proect,
          // othersalesid: this.othersalesid,
          market: this.personnel,
          // othersales: this.sale,
          reasons: this.Verification.cause,
          vehicles: this.vehicle,
          trekking: this.teename,
          trekkingid: this.teextid,
          with: this.teenamett,
          withid: this.teextidtt,
          cc: this.threename,
          ccid: this.threeid,
          department: this.department,
          sellunit: this.fodemp,
          departure:obj
          // trekking:{"白紫勇":"BaiZiYong","白海江":"baiBai"},
        }
        if (this.colleagueId !== null && this.colleagueIdtwo !== null &&this.colleagueaId !==null) {
          evection(data).then(res => {

            setTimeout(() => {
              // this.history()
              this.getadds()
            }, 500);
            this.logins = false

            console.log("res.error", res.error_code, this)

            let datas = res.data
            console.log(datas.xCtravelpersonnel,"同行人2")
            console.log(datas.xCtravelpersonnel[0],"同行人2")
            console.log(datas.xCtravelpersonnel[0].trekking,"同行人333")
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

          }).catch(err => {
            this.logins = false
            console.log(err)
          })
        } else {
          this.logins = false
          this.$toast('请联系相关人员补全同行人协同ID');
        }
      },
     //根据人员部门判断模板ID
      history() {
        let Company=sessionStorage.getItem("company")
        console.log(Company,"companycompany")
        let data = {
         company:sessionStorage.getItem("company")
        // company:"东华云计算有限公司/待定"
        }
        querytemp(data).then(res => {
          var IDtemplate=res.templateid
          sessionStorage.setItem("IDtemplate",IDtemplate)
          console.log(IDtemplate,"接口的IDtemplate")
         console.log(res.templateid,"部门")
        }).then(() => {
          // on close
        });
      },

      //审批接口
      AppRoval() {
        alert("审批")
        var _this = this
        wx.invoke('thirdPartyOpenPage', {
            "oaType": _this.thirds.oaType, // String
            "templateId": _this.thirds.templateId, // String
            "thirdNo": _this.thirds.thirdNo, // String
            "extData": _this.thirds.extData
          },
          function (res) {
            // 输出接口的回调信息输出接口的回调信息
            console.log(res, "thirdPartyOpenPage,res");
          });
      },
      //选择同行人
      cline(){
       console.log(651)
       console.log(this,"484")
       this.teename=''
       this.teextid=''
       this.colleagueId=''
       this.colle=''
       this.showPrise = false;
        this.showRentPrise = true;  
      },
      threeline(){
        console.log(15152)
        console.log(this,"disan")
        this.threename=''
       this.threeid=''
       this.colleagueaId=''
       this.collethree=''
        this.threepeop1=true
        this.threepeop=false
      },
      line(){
        console.log(15152)
        console.log(this,"484")
        this.teenamett=''
       this.teextidtt=''
       this.colleagueIdtwo=''
       this.colletwo=''
        this.peopeye=false
        this.peopeye1=true
      },
      clipeer(){  
        this.peerpeopl=true;
        console.log("打开")
      },
      clipeea(){  
        this.peerpeopa=true;
        console.log("打开第二个")
      },
      clipeers(){
        this.peerpeopl=false;
        console.log("关闭")
      },
      clipeera(){
        this.peerpeopa=false;
        console.log("第二个")
      },
      peopthreea(){
        this.peopthree=true;
        console.log("打开第三个")
      },
      peopthree1(){
        this.peopthree=false;
        console.log("第三个")
      },
      showP(){
        if(this.trekks.name ==undefined){
			      this.showPrise = false;
            this.showRentPrise = true;  
        }
        if(this.trekksid.name ==undefined){
			      this.peopeye = false;
            this.peopeye1 = true;  
        }
        if(this.threepeo.name ==undefined){
			      this.threepeop = false;
            this.threepeop1 = true;  
        }
      },
    
      //打开东华城市销售
      projectcline(){
        this.newdongh =false
        console.log("关闭东华")
      },
    
      //关闭东华城市销售
      personneldong(){
        this.newdongh =true
        console.log("打开东华")
      },
   
      //关闭东华其他销售
      projectother(){
        this.newother =false
        console.log("关闭东华")
      },
   
     //打开东华其他销售 
      personnelther(){
        this.newother =true
        console.log("打开东华")
      },
    
      //关闭东华其他销售 
      personnelpog(){
        this.newprojecta =true
        console.log("打开项目")
      },
     
      projectclone(){
        // this.newprojecta =false
        // console.log("关闭项目")
        this.listShow()
      },
      
    },
    mounted() {
      this.showP()
      
      setTimeout(() => {
        this.history()
        this.showaa()
      }, 3000);
    },
    
    created() {
      this.getUser()
    }

  }

</script>
<style>
  .picker-bg .picker .sort{
    height: auto!important;
  }
  .cn-picker-input{
    text-overflow: clip!important; 
  }
  input[disabled] {
    color: #000;
    opacity: 1;
    background: none;
  }

  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: red;
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: red;
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: red;
  }

  .invalid::-webkit-input-placeholder {
    color: red;
  }

  .picker-bg .picker{
    width: 100%!important;
    height: 100%!important;
    margin: 0 auto!important;
  }
  .picker-bg .picker .button-area button{
    padding: 7px 8px!important;
    margin-right: 18%!important;
  }
  .cn-picker-input{
    line-height: 35px!important;
    text-align: right!important;
    border: none!important;
    outline: none!important;
  }
  .outer .input-close{
    top: 11px!important;
    right: -7px!important;
  }
  .picker-bg .picker .button-area :nth-child(2){
    display: none;
  }
  .picker-bg .picker .button-area :nth-child(1){
    background-color: #409eff!important
  }
  .picker-bg .picker .button-area :nth-child(3){
    display: none;
  }
  .picker-bg .picker .setting{
    width: 100%!important;
  }
.picker-bg .picker .letter-item{
  padding: 14px!important;
}
.picker-bg .picker .content{
  margin-top: 59%!important;
}
</style>

<style scoped>
  .zanwu {
    height: 500px;
    line-height: 500px;
  }

  .logins {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999999;
  }

  .logins .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
  }

  .out {
    position: relative;
  }

  .business {
    width: 100%;
    height: auto;
    background: #efefef
  }

  .setout {
    background: #fff;
    margin-top: 15px;
    display: block;
    width: 100%;
    height: 40px;
    border-top: 1px solid #EBEBEB;
    border-bottom: 1px solid #EBEBEB;
    position: relative;
  }

  .name {
    width: auto;
    padding: 0px 15px 0 10px;
    height: 40px;
    float: left;
    line-height: 40px
  }

  .setout .layui-block {
    float: right;
    width:48%;
    height: 30px
  }

  .layui-block input {
    float: right;
    text-align: right;
    border: none;
    height: 28px;
    outline: none;
    margin-top: 1px;
    margin-right: 15px;
    padding: 5px 0 0 0;
    font-size: 15px;
    width: 150px;
  }

  .name i {
    float: right;
    line-height: 40px;
    padding:  0 0 5px 0;
    color: #f00;
    width: 20px;
    height: 40px;
  }

  .setoust {
    background: #fff;
    margin-top: 15px;
    display: block;
    width: 100%;
    height: 50px;
    border-top: 1px solid #EBEBEB;
    border-bottom: 1px solid #EBEBEB
  }

  .out {
    background: #fff;
    display: block;
    width: 100%;
    height: 40px;
  }

  .xian {
    width: 97%;
    margin-left: 3%;
    border-top: 1px solid #f4f4f4;
  }

  .person {
    width: 100px;
    height: 50px;
    word-wrap: break-word;
    text-align: left;
    padding: 0 10px 0 10px;
    float: left;
    line-height: 25px
  }

  .set {
    background: #fff;
    margin-top: 15px;
    display: block;
    width: 100%;
    height: auto;
    border-top: 1px solid #EBEBEB;
    border-bottom: 1px solid #EBEBEB
  }

  .cause {
    padding: 10px 10px 0 10px;
    display: block;
    line-height: 30px;
    text-align: left
  }

  .cause i {
    line-height: 30px;
    color: #f00;
    width: 20px;
  }

  .set textarea {
    width: 95%;
    border: none;
    outline: none;
    margin:  0 0 10px -4px
  }

  .set ul {
    width: 100%;
    height: 40px;
    display: block;
    margin: 0;
    padding: 0
  }

  .set ul li {
    width: 40px;
    height: 40px;
    float: left;
    margin-left: 17px;
    list-style: none;
  }

  .set ul li img {
    display: block;
    width: 100%;
    height: 40px;
  }

  .submit {
    width: 80%;
    margin: 20px 0;
    background: #467DB9;
    border-radius: 4px;
    border: none
  }

  .cloopeople {
    width: 50%;
    height: 40px;
    float: left;
    line-height: 40px;
  }

  .cloopeople ul {
    width: 500px;
    height: 40px;
  }

  .cloopeople ul li {
    width: 90px;
    height: 40px;
    background: #fff;
    float: left;
  }
  .hotel{
    width: 100%;
    height: 150px;
    background: #fff;
    margin-top: 15px;
    border-top: 1px solid #EBEBEB;
    border-bottom: 1px solid #EBEBEB;

  }
  .hotelbox{
    width: 100%;
    height: 90px;
    padding: 0 0 60px 0

  }
  .hotelpeople{
    width: 45px;
    float: left;
    height: 45px;
    line-height: 36px;
    margin-left: 3%;
    position: relative;
    margin-right: 20px;
    border-radius: 4px
  }
  .hotelpeople i{
    position: absolute;
    width: 20px;
    height: 20px;
    top: -10px;
    right: -10px;
    line-height: 10px;
  }
  .hotelpeople div{
    width: 45px;
    height: 45px;
    border-radius: 4px;
    overflow: hidden;
  }
  .hotelpeople img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .hotelpeople span{
    font-size: 13px;
    width: 40px;
    display: block;
    text-align: center;
  }
  .hotelname{
    width: 300px;
    height: 40px;
    text-align: left;
    line-height: 40px;
    padding: 10px 10px 12px 10px;
  }
  .peerox{
    position: fixed;
    top: 0;
    background-color: rgba(0,0,0,.7);
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 1111;
  }
  .clipeername{
    color: #fff;
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .leftjian{
    position: absolute;
    display: block;
    width: 10px;
    height: 10px;
    /* float: right;
    margin-right: -45%;
    margin-top: 15px; */
    right: 10px;
    top: 15px
  }
</style>

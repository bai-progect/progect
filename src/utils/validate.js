import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN';//引入中文文件

// 配置中文
Validator.addLocale(zh);

const config = {
    errorBagName: 'errors', // change if property conflicts.
    fieldsBagName: 'fields',
    delay: 0,
    locale: 'zh_CN',
    strict: true,
    enableAutoClasses: false,
    classNames: {
      touched: 'touched', // the control has been blurred   //校验字段所在元素获得过焦点返回truke,否则返回false
      untouched: 'untouched', // the control hasn't been blurred  //取反
      valid: 'valid', // model is valid    //字段校验是否通过
      invalid: 'invalid', // model is invalid   //取反
      pristine: 'pristine', // control has not been interacted with   //取反
      dirty: 'dirty' // control has been interacted with   //字段值改变过至少一次返回true，否则返回false
    },
    events: 'blur',
    inject: true
  };
  Vue.use(VeeValidate, config);


// 自定义validate 
const dictionary = {
   zh_CN: {
      messages: {
        email: () => '请输入正确的邮箱格式',
        required: ( field )=> field
      },
      attributes:{
        email:'邮箱',
        password:'密码',
        name: '请输入',   
        City: '请输入',   
        start: '请选择',   
        end: '请选择',   
        duration2: '0',   
        ascription: '请选择',   
        types: '请选择',   
        cause: '须注明所服务项目',   
        phone: '手机'
      }
  }
};

Validator.updateDictionary(dictionary);

Validator.extend('phone', {
  messages: {
    zh_CN:field => field + '必须是11位手机号码',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});
export let Validators=Validator;
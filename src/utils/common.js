import { Dialog } from 'vant'

export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
    r = decodeURI(window.location.search).substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2])
  } else {
    return ""
  }
}

export function handleRes(res, msg) { // 统一处理接口返回值
	if(res.error_code !== 0) {
    Dialog.alert({ message: `${msg}失败：${res.msg}` })
    return false
  } else {
  	return true
  }
}
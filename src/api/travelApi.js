import { $http } from "./config"
function get(url,params) {
	return $http({
		url,
		method: 'get',
		params
	})
}
function post(url,data) {
	return $http({
		url,
		method: 'post',
		data
	})
}
//export const getUserAPI = params => { return get(`http://118.24.137.48:11003/address/wxuser/getuserinfo2`, params) } // 根据code获取当前用户
export const getUserAPI = params => { return get(`http://118.24.137.48:11002/wxuser/getuserinfo2`, params) } // 东华根据code获取当前用户
export const getList = data => { return get(`http://118.24.137.48:11117/business/universal/project`,data) }
export const administrative = data => { return get(`http://118.24.137.48:11117/business/universal/administrative`,data) }
export const evection = data => { return post(`http://118.24.137.48:11117/business/evection/insert`,data) } 
export const username = data => { return get(`http://118.24.137.48:10000/user/findByUserNameLike/${data}`) }
export const usernamea = data => { return get(`http://118.24.137.48:10000/user/findByUserNameLike2/${data}`) }
export const wisdomname = data => { return get(`http://118.24.137.48:11002/user/findByUserNameLike/${data}`) }
export const querytable = data => { return post(`http://118.24.137.48:11117/business/evection/querytable`,data) }
export const queryall = data => { return post(`http://118.24.137.48:11117/business/evection/queryall`,data) }
export const querytemp = data => { return post(`http://118.24.137.48:11117/business/template/querytemp`,data) }

//增删改查
//export const zeng = data => { return post(`http://192.168.1.207:11117/business/chaxun/update`,data) }
//export const del = data => { return post(`http://192.168.1.207:11117/business/chaxun/del`,data) }
//export const inserta = data => { return post(`http://192.168.1.207:11117/business/chaxun/insert`,data) }
//export const cha = data => { return post(`http://192.168.1.207:11117/business/chaxun/query`) }




//携程
//export const administrative = data => { return get(`/business/universal/administrative`,data) }
//export const evection = data => { return post(`/business/evection/insert`,data) }
//export const wisdomname = data => { return get(`/busine/user/findByUserNameLike/${data}`) }
//export const username = data => { return get(`/busines/user/findByUserNameLike/${data}`) }

//增删改查
export const zeng = data => { return post(`http://118.24.137.48:11117/business/chaxun/update`,data) }
export const del = data => { return post(`http://118.24.137.48:11117/business/chaxun/del`,data) }
export const inserta = data => { return post(`http://118.24.137.48:11117/business/chaxun/insert`,data) }
export const cha = data => { return post(`http://118.24.137.48:11117/business/chaxun/query`) }

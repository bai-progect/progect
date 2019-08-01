import {$http} from "./config"

// 详情
export const getDetail = params =>{ 
	return $http({
		url: '/process/instance/info/ccme',
		//url: './static/json/detail.json',
	    method: 'get',
	    params
	 })
}

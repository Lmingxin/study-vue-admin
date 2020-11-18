import axios from '@/axios'

//获取验证码
export function GetSms(data = {}) {
	return axios.request({
		method: 'POST',
		url: '/getSms/',
		data,
	})
}

//注册
export function Register(data = {}) {
	return axios.request({
		method: 'POST',
		url: '/register/',
		data,
	})
}

//登录
export function Login(data = {}) {
	return axios.request({
		method: 'POST',
		url: '/login/',
		data,
	})
}

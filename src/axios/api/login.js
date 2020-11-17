import axios from '@/axios'

export function GetSms(data = {}) {
	return axios.request({
		method: 'POST',
		url: '/getSms/',
		data,
	})
}

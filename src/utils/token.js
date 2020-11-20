import cookie from 'cookie_js'

export function getToken(data) {
	let info = ''
	if (cookie.get(data)) {
		info = cookie.get(data).replace(/\"/g, '')
	} else {
		info = cookie.get(data)
	}
	return info
}
export function setToken(key, data) {
	return cookie.set(key, JSON.stringify(data))
}
export function removeToken(key) {
	return cookie.remove(key)
}

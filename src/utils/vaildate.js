import { MessageBox } from 'element-ui'
/**
 * 过滤特殊字符
 */
export function stripscript(str) {
	var pattern = new RegExp(
		"[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"
	)
	var rs = ''
	for (var i = 0; i < str.length; i++) {
		rs = rs + str.substr(i, 1).replace(pattern, '')
	}
	return rs
}
/**
 * 验证邮箱
 */
export function validateEmail(rule, value, callback) {
	let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
	if (value === '') {
		callback(new Error('请输入邮箱'))
	} else if (!reg.test(value)) {
		callback(new Error('请输入正确的邮箱'))
	} else {
		callback()
	}
}

/**
 * 验证密码 6至20位的字母+数字
 */
export function validatePass(rule, value, callback) {
	let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
	if (value === '') {
		callback(new Error('请输入密码'))
	} else if (!reg.test(value)) {
		callback(new Error('请输入正确的密码'))
	} else {
		callback()
	}
}

/**
 * 验证验证码
 */
export function validateVCode(rule, value, callback) {
	let reg = /^[a-z0-9]{6}$/
	if (value === '') {
		callback(new Error('请输入验证码'))
	} else if (!reg.test(value)) {
		callback(new Error('请输入正确的验证码'))
	} else {
		callback()
	}
}

/**
 * 没有使用default时，可以同时声明多个export。
 * 文件 import 需要花括号。
 */

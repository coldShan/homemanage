import Vue from 'vue'
import * as types from '../types'
import {
	showMsg,
	hideMsg,
	showLoading,
	hideLoading
} from './popupActions'
import {base_url} from '../../common.js'

let $http = Vue.http;
let $router = Vue.router;
let msg = '请求超时！';

export const getUserInfo = (store, options, router) => {
    // console.log(router);
	$http.post(base_url+'/user/info', options).then(function(response) {
		hideLoading(store);
		if (!response.ok) {
			store.dispatch(types.FAILURE_USER_INFO)
			showMsg(store, msg);
			return
		}
		let resData = response.json();
		// console.log(response.json());
		if (resData.code === 0) {
			let data = {
				name: resData.data.name,
				image_add: resData.data.image_add
			};
			store.dispatch(types.SUCCESS_USER_INFO, data)
            // window.location.href = window.location.origin+'/index';
            router.go({name: 'index'});
		} else {
			showMsg(store, resData.m)
			store.dispatch(types.FAILURE_USER_INFO)
		}
	}, function(response) {
		showMsg(store, msg)
		hideLoading(store)
		store.dispatch(types.FAILURE_USER_INFO)
	})
}
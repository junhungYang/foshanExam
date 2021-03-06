import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // 以Store_xxxxx命名
        Store_showModal: {},
        Store_modalFlag: false,
        Store_signInfo: {},
        Store_agree: false,
    },
    mutations: {
        // 以Store_xxxxx命名
        Store_showModalInit(state,payload) {
            payload.title ? '' : payload.title = '提示'
            payload.content ? '' : payload.content = '提示内容'
            payload.successBtn ? '' : payload.successBtn = '确定'
            payload.cancelBtn ? '' : payload.cancelBtn = '取消'
            payload.successCB ? '' : payload.successCB = function() {}
            payload.cancelCB ? '' : payload.cancelCB = function() {}
            payload.cancelFlag === false ? '' : payload.cancelFlag = true
            state.Store_showModal = payload
            state.Store_modalFlag =  true
        },
        Store_delModal(state) {
            state.Store_modalFlag = false
            state.Store_showModal = {}
        },
        Store_signInfoInit(state, payload) {
          state.Store_signInfo = payload
          console.log(state.Store_signInfo)
        },
        Store_agreeChange(state) {
            state.Store_agree = !state.Store_agree
        }
    }
})

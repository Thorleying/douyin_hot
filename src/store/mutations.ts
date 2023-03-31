export default {
    openModel (state, payload) {
        state.openModelState=payload
        console.log(state.openModelState,'当前状态')
    }
}
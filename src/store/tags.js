export default {
    state:{
        tags:[
            {
              title:'Comedy',
              use:false
            },
            {
              title:'Westerns',
              use:false
            },
            {
              title:'Advanture',
              use:false
            },
          ]
    },
    mutations:{
        newTag(state, tagload){
            state.tags.push(tagload)
        }
    },
    actions:{
        newTag({commit}, tagload){
            commit('newTag', tagload)
        }
    },
    getters:{
        tags(state){
            return state.tags;
        },
    }
}
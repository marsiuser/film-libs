export default{
    state:{
        tasks:[
            {
              'id':1,
              'title':'Title 1',
              'description':' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam excepturi illo dolore eos quos, reprehenderit quae sequi consequatur praesentium, odio expedita ipsa unde in nobis debitis dignissimos at saepe deleniti.',
              'whatWatch':'Film',
              'completed':false,
              'editing':false,
            },
             {
              'id':2,
              'title':'Title 2',
              'description':' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam excepturi illo dolore eos quos, reprehenderit quae sequi consequatur praesentium, odio expedita ipsa unde in nobis debitis dignissimos at saepe deleniti.',
              'whatWatch':'Serial',
              'completed':true,
              'editing':false,
            }
          ],
    },
    mutations:{
        newTask(state, loadtask){
            state.tasks.push(loadtask)
        }
    },
    actions:{
        newTask({commit}, loadtask){
            loadtask.id =  Math.random()
            commit('newTask', loadtask)
        }
    },
    getters:{
        tasks(state){
            return state.tasks;
        },
        taskCompleted(state){
            return state.tasks.filter(task =>{
                return task.completed
            })
        },
        taskNotCompleted(state){
            return state.tasks.filter(task =>{
                return task.completed === false
            })
        }, 
    }
}
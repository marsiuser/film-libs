import firebase from 'firebase/app'
import Task from "./task_help"
export default{
    state:{
        tasks:[
            // {
            //   'id':1,
            //   'title':'Title 1',
            //   'description':' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam excepturi illo dolore eos quos, reprehenderit quae sequi consequatur praesentium, odio expedita ipsa unde in nobis debitis dignissimos at saepe deleniti.',
            //   'whatWatch':'Film',
            //   'completed':false,
            //   'editing':false,
            // },
            //  {
            //   'id':2,
            //   'title':'Title 2',
            //   'description':' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam excepturi illo dolore eos quos, reprehenderit quae sequi consequatur praesentium, odio expedita ipsa unde in nobis debitis dignissimos at saepe deleniti.',
            //   'whatWatch':'Serial',
            //   'completed':true,
            //   'editing':false,
            // }
          ],
    },
    mutations:{
        loadTasks(state, payload){
            state.tasks = payload
        },
        newTask(state, loadtask){
            state.tasks.push(loadtask)
        },
        
    },
    actions:{
        async loadTasks({commit},){
            commit('clearError')
            commit('setLoading', true)
            try{
                const task = await firebase.database().ref('tasks').once('value')
                const tasks = task.val()
                const tasksArray = []
                Object.keys(tasks).forEach(key => {
                    const t = tasks[key]
                    tasksArray.push(
                        new Task(
                            t.title,
                            t.description,
                            t.whatWatch,
                            t.time,
                            t.tags,
                            t.completed,
                            t.editing,
                            t.user,
                            key
                        )
                    )
                })
                commit('loadTasks', tasksArray)
                console.log(tasks)
                // const newTask =  new Task(
                //     loadtask.title,
                //     loadtask.description,
                //     loadtask.whatWatch,
                //     loadtask.time,
                //     loadtask.tags,
                //     loadtask.completed,
                //     loadtask.editing,
                // )
                // console.log(task) 
                commit('setLoading', false)
            } catch(error){
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async newTask({commit, getters}, loadtask){
            commit('clearError')
            commit('setLoading', true)
            try{
                const newTask =  new Task(
                    loadtask.title,
                    loadtask.description,
                    loadtask.whatWatch,
                    loadtask.time,
                    loadtask.tags,
                    loadtask.completed,
                    loadtask.editing,
                    getters.user.id
                )
                const task = await firebase.database().ref('tasks').push(newTask);
                // console.log(task) 
                commit('newTask', {
                    ...newTask,
                    id: task.key
                })
                commit('setLoading', false)
            } catch(error){
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        // newTask({commit}, loadtask){
        //     loadtask.id =  Math.random()
        //     commit('newTask', loadtask)
        // }
    },
    getters:{
        tasks(state, getters){
            return state.tasks.filter(task =>{
                return task.user === getters.user.id
            });
        },
        taskCompleted(state, getters){
            return getters.tasks.filter(task =>{
                return task.completed
            })
        },
        taskNotCompleted(state, getters){
            return getters.tasks.filter(task =>{
                return task.completed === false
            })
        }, 
    }
}
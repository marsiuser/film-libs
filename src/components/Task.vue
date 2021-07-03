<template>
      <div class="task page">
       <div class="container">
          <div class="task-header">
                <h1 class="page-name">Tasks</h1>
                <div class="task-filter">
                  <v-btn @click="filter = 'active'"
                    elevation="2"
                    rounded
                  >Active</v-btn>
                  <v-btn @click="filter = 'completed'"
                    elevation="2"
                    rounded
                    >Completed</v-btn>
                  <v-btn @click="filter = 'all'"
                    elevation="2"
                    rounded
                    >All</v-btn>
                </div>
          </div>
          <div class="task-list" v-for="task in tasksFilter" :key="task.id" :class="{completed: task.completed}">
              <v-card class="task-card">
                <div class="task-card__wrap">
                    <div class="task-card__top">
                        <p class="task-card__category">{{task.whatWatch}}</p>
                        <span class="task-card__time">Total time: {{task.time}}</span>
                    </div>
                    <img class="task-card__close" src="../assets/img/close.svg" alt="close">
                </div>
                <div class="task-card__completed">
                    <v-checkbox v-model="task.completed" hide-details></v-checkbox>
                    <p class="task-card__title"> {{task.title}}</p>
                </div>
                <p class="task-card__info">{{task.description}}</p>
                <div class="task-card__footer">
                    <div class="tag-list">
                      <div class="tag-item" v-for="tag in task.tags" :key="tag.title">
                          <v-chip 
                            text-color="white"
                          >
                            {{tag.title}}
                          </v-chip>
                      </div>
                    </div>
                </div>
              </v-card>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'Task',
  data(){
    return{
      filter: 'active',
    }
  },
  computed:{
    tasksFilter(){
      if(this.filter === 'active'){
        return this.$store.getters.taskNotCompleted
      } else if(this.filter === 'completed'){
        return this.$store.getters.taskCompleted
      } else if(this.filter === 'all'){
         return this.$store.getters.tasks
      }
      return this.filter === 'active'
    },
  },
  components: {
  }
}
</script>


<style lang="scss">
  .task-header{
    display: flex;
    justify-content: space-between;
  }
  .task-list.completed{
    .task-card__title{
      text-decoration: line-through;
      color: rgb(128, 128, 128);
    }
  }
  .tag-list{
    .theme--light.v-chip {
      background: #64CCCC !important;
      color: #fff;
    }
  }
  .task-filter{
    display: flex;
    justify-content: space-between;
    max-width: 320px;
    width: 100%;
    .active{
      background-color: crimson !important;
      color: #fff !important;
    }
  }
  .task-card__footer{
    .tag-list{
      display: flex;
      margin-top: 15px;
      .tag-item{
        margin-right: 10px;
      }
    }
  }
</style>

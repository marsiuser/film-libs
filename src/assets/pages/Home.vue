<template>
  <div class="home page">
   <div class="container">
      <h1 class="page-name">Home</h1>
      <!-- <v-text-field label="What we will watch" ></v-text-field> -->
      <div class="auth-form">
        <div class="auth-form__wrap">
          <div class="auth-form__item">
              <input id="home-name" v-model="taskTitle" @keyup.enter="newTask"
                class="auth-form__input" 
                label="What we will watch" 
                required
              >
              <label for="home-name">What we will watch</label>
          </div>
        </div>
        <div class="auth-form__wrap">
          <div class="auth-form__item">
              <textarea id="home-descr"
                v-model="taskDescription" 
                @keyup.enter="newTask"
                class="auth-form__input" 
                label="Description" 
                required
              ></textarea>
              <label class="label-textarea" for="home-descr">Description</label>
          </div>
        </div>
      </div>
     
      <v-radio-group class="option-list" v-model="whatWatch">
        <v-radio class="option-list__watch" label="Film" id="radioFilm" value="Film" 
        ></v-radio>
        <v-radio class="option-list__watch" label="Serial" id="radioSerial" value="Serial"
        ></v-radio>
      </v-radio-group>
      <div class="total-time">
        <div class="total-time__film auth-form" v-if="whatWatch === 'Film'">
          <div class="auth-form__wrap">
            <div class="auth-form__item">
                <input v-model="filmHours"
                  type="number"
                  class="auth-form__input" 
                  label="Hours" 
                  value="1"
                  required
                >
                <label>Hours</label>
            </div>
          </div>
          <div class="auth-form__wrap">
            <div class="auth-form__item">
                <input v-model="filmMinutes"
                  type="number"
                  class="auth-form__input" 
                  label="Minutes" 
                  value="30"
                  required
                >
                <label>Minutes</label>
            </div>
          </div>
           <div class="watch">
              <p class="watch-time"><span>Total time watch: </span>{{filmTime }} </p>
           </div>
        </div>
        <div class="total-time__film auth-form" v-if="whatWatch === 'Serial'">
             <div class="auth-form__wrap">
                <div class="auth-form__item">
                    <input  v-model="serialSeasons"
                      type="number"
                      class="auth-form__input" 
                      label="How many seasons?" 
                      value="1"
                      required
                    >
                    <label>How many seasons?</label>
                </div>
              </div>
              <div class="auth-form__wrap">
                <div class="auth-form__item">
                    <input  v-model="serialSeries"
                      type="number"
                      class="auth-form__input" 
                      label="How many series?" 
                      value="10"
                      required
                    >
                    <label>How many series?</label>
                </div>
              </div>
              <div class="auth-form__wrap">
                <div class="auth-form__item">
                    <input  v-model="serialSeriesMinutes"
                      type="number"
                      class="auth-form__input" 
                      label="How long is one series? (minutes)" 
                      value="40"
                      required
                    >
                    <label>How long is one series? (minutes)</label>
                </div>
              </div>
              <div class="watch">
                  <p class="watch-time"><span>Total time watch: </span> {{ serialTime }}</p>
              </div>
        </div>
      </div>
      <v-btn class="tag-addition"
        elevation="2"
        large
        rounded
        @click="tagNew  = !tagNew"
        :class="{active: tagNew}">
        Add new
        <v-icon dark :class="{active: tagNew}">
          mdi-plus
        </v-icon>
      </v-btn>
      <div class="tag-new" v-if="tagNew">
         <div class="auth-form__wrap">
            <div class="auth-form__item tag-new__text">
                <input  v-model="tagTitle"
                  @keyup.enter="newTag"
                  class="auth-form__input" 
                  label="New tag" 
                  required
                >
                <label>New tag</label>
            </div>
          </div>
         <v-btn class="tag-new__btn" @click="newTag">
          Send
        </v-btn>
      </div>
      <transition-group class="tag-list" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutDown">
        <div class="tag-item" v-for="tag in tags" :key="tag.title">
          <v-chip @click="addTagUsed(tag)"
            :class="{active: tag.use}"
            close
            text-color="white"
            @click:close="closeTag"
          >
            {{tag.title}}
          </v-chip>
      </div>
      </transition-group>
      <v-btn class="send-all" @click="newTask()"
        rounded
      >Send</v-btn>
   </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      taskTitle:'',
      // taskId:3,
      taskDescription:'',
      whatWatch:'Film',
      filmHours:1,
      filmMinutes:30,
      serialSeasons:1,
      serialSeries:10,
      serialSeriesMinutes: 40,
      tagNew:false,
      tagsUsed:[],
      tagTitle:'',
    }
  },
  methods:{
    newTag(){
      if(this.tagTitle === ''){
        return
      } 
      // this.tags.push({
      //   title: this.tagTitle,
      //   used:false,
      // })
      const tag = {
        title: this.tagTitle,
        use: false
      }
      this.$store.dispatch("newTag", tag);
    },
    newTask(){
      if( this.taskTitle === ''){
        return
      }
      let time;
      if (this.whatWatch === 'Film'){
        time =  this.filmTime;
      } else {
        time = this.serialTime;
      }
      const task = ({
        // id: this.taskId,
        title:this.taskTitle,
        description:this.taskDescription,
        whatWatch: this.whatWatch,
        time,
        tags: this.tagsUsed,
        completed:false,
        editing: false
      })
      this.$store.dispatch('newTask', task)
      console.log(task);
      // Reset
      this.taskTitle='';
      this.taskDescription ='';
      this.tagsUsed = [];
      for(let i=0; i< this.tags.length; i++){
        this.tags[i].use = false;
      }
    },
    addTagUsed(tag){
      tag.use = !tag.use;
      if(tag.use){
        this.tagsUsed.push({
          title: tag.title
        }) 
      }
      else{
        this.tagsUsed.splice(tag.title, 1);
      }
    },
    closeTag () {
      alert('Chip close clicked');
    },
    getHouresAndMinutes(minutes){
      let hours = Math.trunc(minutes/60);
      let min = minutes % 60;
      return hours + ' Hourse ' + min + ' Minutes';
    },
  },
  computed:{
    tags(){
      return this.$store.getters.tags;
    },
    filmTime(){
      let min = (this.filmHours * 60) + (this.filmMinutes * 1);
      return this.getHouresAndMinutes(min);
    },
    serialTime(){
      let min =  this.serialSeasons * this.serialSeries * this.serialSeriesMinutes;
      return this.getHouresAndMinutes(min);
    },
  },
  name: 'Home',
  components: {
  }
}
</script>


<style lang="scss">
  .home{
    .total-time__film{
      margin-top: 30px;
    }
    .watch{
        padding: 12px;
        border-radius: 5px;
        border: 1px solid #ffa51f;
        display: inline-block;
       .watch-time{
        font-style: italic;
        font-size: 14px;
        color: rgba(0,0,0,.6);
        font-weight: 700;
        span{
          font-style: normal;
          font-weight: 400;
        }
      }
    }
    .send-all{
      display: flex;
      background-color: #787ae7!important;
      color: #fff !important;
      margin-top: 40px;
      margin-left: auto;
      padding: 20px 30px !important;
    }
    .v-input__control .v-icon.v-icon{
      color: #787ae7 !important;
    }
    .tag-addition{
        margin: 30px 0px 10px;
        background-color: #787ae7!important;
        color: #fff !important;
    }
    .tag-addition.active{
      background-color: #4244b7 !important;
    }
    .tag-new{
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__btn{
        background-color: #787ae7!important;
        color: #fff !important;
      }
      &__text{
        margin: 30px 30px 0px 0px;
      }
    }
    .v-text-field .v-label--active{
      left: -10px !important;
    }
    .v-input--radio-group--column .v-radio:not(:last-child):not(:only-child){
      margin-bottom: 0px;
      margin-right: 10px;
    }
    .v-input--radio-group--column .v-input--radio-group__input{
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .option-list .v-label{
      margin-left: 7px;
    }
    .tag-addition{
      .v-icon.v-icon.active{
        transform: rotate(90deg);
        transition: all 0.2s;
      }
    }
    .tag-list{
      margin: 40px 0px;
      display: flex;
      .tag-item{
        margin-right: 10px;
      }
      .theme--light.v-chip{
        background-color: #ffa51f;
        color: #fff;
        cursor: pointer;
      }
      .theme--light.v-chip.active{
        background-color: #ff7328 !important;
      }
    }
  }
  .task {
  .v-input--selection-controls{
    padding: 0px;
    margin: 0px 20px 0px 0px;
  }
  .task-card {
    padding: 25px;
    margin-bottom: 30px;
    &__wrap{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__top{
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    &__completed{
      display: flex;
      align-items: center;
    }
    &__close{
      max-width: 17px;
      cursor: pointer;
    }
    &__info{
      font-size: 16px;
      line-height: 20px;
      margin-top: 10px;
    }
    &__category{
      text-transform: uppercase;
      background-color: #787ae7;
      padding: 6px 10px;
      color: #fff;
      text-align: center;
      min-width: 120px;
      margin-right: 30px;
      font-weight:600;
      border-radius: 4px;
    }
    &__time{

    }
		// .task-card__title

		&__title {
      font-size: 18px;
      line-height: 22px;
      font-weight: 600;
		}

		// .task-card__description

		&__description {
		}

		// .task-card__watch

		&__watch {
		}
  }
}

</style>
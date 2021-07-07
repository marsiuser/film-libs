<template>
    <div class="main">
         <div class="header">
        <div class="container">
            <div class="header-wrap">
                <div class="header-logo">
                    <router-link to="/"><img src="../assets/img/logo3.svg" alt="logo"></router-link>
                </div>
                <div class="header-menu">
                    <nav  class="hamburger-menu">
                        <input id="menu__toggle" type="checkbox">
                        <label class="menu__btn" for="menu__toggle">
                            <span></span>
                        </label>
                        <ul class="header-menu__list menu__box">
                            <li v-for="link in links" :key="link.title"><router-link class="menu__item" :to="`${link.url}`">{{ link.title }}</router-link></li>
                            <li v-if="checkUser" @click="logout()"><span class="menu__item">Log Out</span></li>
                            <!-- <li><router-link class="menu__item" to="/task">Tasks</router-link></li>
                            <li><router-link class="menu__item" to="/login">Login</router-link></li>
                            <li><router-link class="menu__item" to="/registration">Registration</router-link></li> -->
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'Header',
   data(){
    return{
    }
  },
  components: {
  },
  methods:{
    logout(){
        this.$store.dispatch('logoutUser')
        this.$router.push('/login')
    }
  },
  computed:{
     checkUser () {
      return this.$store.getters.checkUser
    },
    links () {
      if (this.checkUser) {
        return [
          {title: 'Home', url: '/'},
          {title: 'Library', url: '/task'}
        ]
      }
      return [
        {title: 'Login', url: '/login'},
        {title: 'Registration', url: '/registration'}
      ]
    },
  }
}
</script>

<style lang="scss" scoped>

.header {
    box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.15);
    .header-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 0px;
    }
    .header-logo {
        img{
            max-width: 160px;
        }
        a{
            font-weight: 700;
            color: #000;
            font-size: 24px;
        }
    }
    .header-menu {
        max-width: 300px;
        width: 100%;
		// .header-menu__list

		&__list {
            display: flex;
            justify-content: flex-end;
            a,span{
                color: #000;
                font-size: 16px;
                cursor: pointer;
                display: block;
                margin-right: 40px;
                font-weight: 600;
                &:hover{
                    color:#787ae7;
                    transition: all 0.3s;
                }
            }
		}
    }
}
// humburger menu
#menu__toggle{
    display: none;
}

@media screen and (max-width: 640px){
    .header-wrap{
        position: relative;
    }
    .header-logo{
        width: 100%;
        z-index: 999;
    }

    .header .header-menu__list{
        display: block;
    }

    .header .header-menu__list li{
        margin-bottom: 15px;
    }

    .main .header .header-menu__list{
        display: block;
        padding-left: 25px;
        padding-right:25px;
    }
    .header-text  p{
        color:#fff;
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 30px;
    }
    .header-social{
        display: flex;
        margin-bottom: 20px;
    }
    .main .header .header-phone{
        margin: 0px 0px 20px;
    }
    .main .header .header-call{
        padding: 15px 10px;
        width: 100%;
        margin-top: 50px;
    }
    .menu__item_mob,
    .main .header .header-call{
        display: block;
    }
    #menu__toggle {
        opacity: 0;
        display: block;
      }
     .header-logo.fixed{
          position: fixed;
          top: 30px;
          left: 30px;
      }
      #menu__toggle:checked ~ .menu__btn{
          position: fixed;
          right: 10px;
          top: 30px;
      }
      #menu__toggle:checked ~ .menu__btn > span {
        transform: rotate(45deg);
      }
      #menu__toggle:checked ~ .menu__btn > span::before {
        top: 0;
        transform: rotate(0);
      }
      #menu__toggle:checked ~ .menu__btn > span::after {
        top: 0;
        transform: rotate(90deg);
      }
      #menu__toggle:checked ~ .menu__box {
        visibility: visible;
        left: 0;
      }
      
      .menu__btn {
        display: flex;
        align-items: center;
        position: absolute;
        top: 18px;
        right: 0px;
        width:33px;
        height: 26px;
        cursor: pointer;
        z-index: 999;
      }
      
      .menu__btn > span,
      .menu__btn > span::before,
      .menu__btn > span::after {
        display: block;
        position: absolute;
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background-color: #000;
        transition-duration: .25s;
      }
      .menu__btn > span::before {
        content: '';
        top: -8px;
      }
      .menu__btn > span::after {
        content: '';
        top: 8px;
      }
      
      .menu__box {
        display: block;
        position: fixed;
        visibility: hidden;
        top: 0;
        left: -100%;
        width: 300px;
        height: 100%;
        margin: 0;
        padding: 110px 12px 100px;
        list-style: none;
        background: #fff;
        box-shadow: 1px 0px 6px rgba(0, 0, 0, .2);
        transition-duration: .25s;
        z-index: 99;
      }
      
      .menu__item {
        display: block;
        font-size: 20px;
        font-weight: 600;
        text-decoration: none;
        transition-duration: .25s;
      }
}
</style>

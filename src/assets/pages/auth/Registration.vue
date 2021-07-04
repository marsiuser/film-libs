<template>
  <div class="registration page">
   <div class="container">
      <div class="auth">
        <div class="auth-banner">
          <h2>Banner</h2>
        </div>
        <div class="auth-registration">
          <h1 class="page-name">Welcome to Film Library ! <img src="../../img/hi.svg" alt="welcome"></h1>
          <p class="auth-registration__subtitle">Enter your email and password to continue.</p>
          <form class="auth-form" @submit.prevent="onSubmitForm">
                <div class="auth-form__wrap" :class="{errorInput: $v.email.$error}">
                    <div class="auth-form__item">
                        <input id="auth-email" 
                            class="auth-form__input" 
                            :class="{errorText: $v.email.$error}"
                            label="Email" v-model="email"
                            @change="$v.email.$touch()"
                            required
                          >
                          <label for="auth-email">Email</label>
                      </div>
                      <div class="error" v-if="!$v.email.required">Field is required</div>
                      <div class="error" v-if="!$v.email.email">Incorrect email</div>
                </div>
                 <div class="auth-form__wrap" :class="{errorInput: $v.password.$error}">
                    <div class="auth-form__item">
                        <input id="auth-password" 
                          class="auth-form__input" 
                          :class="{errorText: $v.password.$error}"
                          @change="$v.password.$touch()"
                          required
                          label="Password" v-model="password"
                        >
                        <label for="auth-password">Password</label>
                    </div>
                    <div class="error" v-if="!$v.password.required">Field is required</div>
                    <div class="error" v-if="!$v.password.minLength">Password must have at least 6 symbols</div>
                 </div>
                <div class="auth-form__wrap" :class="{errorInput: $v.repeatPassword.$error}">
                    <div class="auth-form__item">
                        <input id="auth-reppassword" 
                          class="auth-form__input" 
                          :class="{errorText: $v.repeatPassword.$error}"
                          @change="$v.repeatPassword.$touch()"
                          required
                          label="Password" v-model="repeatPassword"
                        >
                        <label for="auth-reppassword">Repeat password</label>
                    </div>
                    <div class="error" v-if="!$v.repeatPassword.required">Field is required</div>
                    <div class="error" v-if="!$v.repeatPassword.sameAsPassword">Password is not the same</div>
                </div>
                <v-btn class="auth-submit"
                  type="submit" 
                  elevation="2"
                  large
                  rounded>
                  <span v-if="loading">Loading...</span>
                  <span v-else>Log in</span>
                </v-btn>
                <div class="auth-results">
                    <p class="auth-result" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
                    <p class="auth-result result-bag" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
                     <p class="auth-result result-bag" v-else>{{submitStatus}}</p>
                </div>
                <div class="auth-login">
                  <span>Do you have account?</span>
                  <router-link to="/login"> Enter here</router-link>
                </div>
          </form>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import { required, sameAs, email, minLength  } from 'vuelidate/lib/validators'
export default {
  name: 'Registration',
  data() {
    return {
      email: '',
      password: '',
      repeatPassword:'',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword:{
      required,
      sameAsPassword: sameAs('password')
    }
  },
   methods: {
    onSubmitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          email:this.email,
          password: this.password,
        }
        this.$store.dispatch('registerUser', user)
        .then(() =>{
          console.log('REGISTER!')
          this.submitStatus = 'OK'
          this.$router.push('/')
        })
        .catch(err =>{
          this.submitStatus = err.message
        })

        // this.submitStatus = 'PENDING'
        // setTimeout(() => {
        //   this.submitStatus = 'OK'
        // }, 500)
      }
    }
  },
  computed:{
    loading(){
      return this.$store.getters.loading
    }
  }
}
</script>


<style lang="scss">
.auth {
  display: flex;
  justify-content: space-between;
  .auth-banner {
    width: 48%;
  }
  .auth-login{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    a{
      color: #ffbc36;
      font-weight: 600;
      transition: 0.2s;
      display: block;
      margin-left: 7px;
      &:hover{
        color: #ff5252;
        transition: 0.2s;
      }
    }
  }
  .auth-results{
    .auth-result{
      margin-top: 20px;
      color: #42CC42;
      font-size: 14px;
    }
    .result-bag{
      color: #ff5252 !important;
    }
  }
  .auth-registration {
     width: 48%;
     .page-name{
       font-weight: 700;
       margin-bottom: 20px;
       img{
         max-width: 50px;
       }
     }
     &__subtitle{
        line-height: 1.4;
        margin: 0 3px;
        letter-spacing: normal;
        color: rgb(88, 88, 88);
        font-weight: 400;
        font-size: 16px;
        margin-bottom: 40px;
     }
  }
  .auth-submit{
      background-color: #ff5252 !important;
      color: #fff !important;
      font-family: 'Nunito', sans-serif;
      text-transform: initial;
      font-size: 16px !important;
      padding: 18px 35px !important;
  }
}
.auth-form {
  .auth-form__wrap{
    margin-bottom: 35px;
  }
    .error{
      display: none;
    }
    .auth-form__wrap.errorInput .error{
      display: block;
      font-size: 12px;
      color: red;
      margin-top: 10px;
    }
		// .auth-form__item

		&__item {
        position:relative;
        margin:0 auto;
        input {
          width: 100%;
          position:relative;
          outline:0;
          background:#fff;
          padding:15px 25px;
          border-radius:5px;
          transition:all .5s ease;
          border:1px solid #eaeaea;
      }
      label {
        position:absolute;
        left: 20px;
        transform: translate(-0%, -50%);
        top: 50%;
        transition:all .3s ease;
        color:#000;
      }
      input:focus,
      input:valid{
        background:#fff;
        -webkit-box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.08);
        -moz-box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.08);
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.08);
      }
      input:focus ~ label,
      input:valid ~ label {
        transform: translate3d(-15px, -47px, 0px);
        font-size: 14px;
        font-weight:700;
        color:#000;
      }
		}
    .auth-form__item input.error{
      border-color: red ;
    }
}
</style>

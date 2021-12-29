<template>
<div class="login">
    <div class="login-desc">
        <h3>Bienvenido a su Login</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis condimentum velit. Praesent sed mauris a ipsum interdum aliquam ut vel tortor.</p>
    </div>
    <div class="login-card">
        <div class="login-action">
            <input placeholder="Ingrese su usuario" v-model="login.username">
        </div>
        <div class="login-action">
            <input placeholder="Ingrese su contraseña" v-model="login.password">
        </div>
        <div class="login-action invalid" v-if="invalid === true">
          <p>Credenciales invalidas</p>
        </div>
        <div class="login-action">
            <button class="login" @click="authentication()">Iniciar Sesion</button>
        </div>
        <div class="login-action">
            <p>¿Olvidaste tu contraseña?</p>
        </div>
        <div class="login-action">
            <hr>
        </div>
        <div class="login-action">
            <button class="singup">Registrate</button>
        </div>
    </div>
    <loading v-if="loading===true"></loading>
</div>
    
</template>

<script>
import CustomerService from '@/service/user/CustomerService'
import Loading from '../../components/Loading.vue';

export default {
  components: { Loading },
  name: "Login",
  data() {
    return {
      login: {
        username: '',
        password: ''        
      },
      loading: false,
      invalid: false
    }
  },
  methods: {
    authentication(){
      this.loading = true
      CustomerService.authenticate(this.login).then(() => {
        this.loading=false
        console.log(this.loading)
      }).catch(() => {
        this.loading=false
        this.invalid = true
      })
    }
  }
};
</script>

<style>
input:not(:focus):not(:placeholder-shown):invalid  ~input[type=date]{
    border: 1px solid red !important;
}

div.login {
  width: 900px;
  margin: 100px auto;
  display: flex;
  font-family: "Roboto";
}

div.login-desc {
  flex: 1;
  margin-right: 25px;
}

div.login-desc > h3 {
  color: var(--primary-inten);
  text-align: center;
  font-size: 2.5rem;
  margin: 1.5em 0 0 0;
  font-family: Poppins-Bold;
}

div.login-desc > p {
  color: var(--primary-subinten);
  text-align: justify;
  font-size: 1.1rem;
  margin: 4em 0;
  font-family: Poppins-Regular;
}

div.login-card{
  background: var(--background-opacity-aux);
  padding: 10px;
  border-radius: 20px;
  flex: 1;
}

div.login-card > div.login-action {
  width: 100%;
  display: flex;
  justify-content: center;
}

div.login-card div.login-action.invalid p{
  color: rgb(167, 13, 13);
  margin: 25px 0 0 0;
  text-decoration: none;
}

div.login-card > div.login-action > input,
div.login-card > div.login-action > button {
  border-radius: 10px;
}

div.login-card > div.login-action > input::placeholder{
  color: var(--placeholder-second);
}

div.login-card > div.login-action > input {
  color: var(--second);
  background: var(--default);
  flex: 0.8;
  padding: 0.6em;
  border-radius: 10px;
  border: 1px solid var(--input-box);
  margin-top: 30px;
  font-size: 1.1rem;
  font-family: Poppins-Bold;
}

div.login-card > div.login-action > button.login {
  flex: 0.8;
  padding: 0.5em 0.4em;
  margin: 1.5em 0 0.9em 0;
  font-size: 1.2rem;
  border: none;
  background: var(--succesful-second);
  color: var(--default);
  cursor: pointer;
}

div.login-card > div.login-action > button.login:active {
  background: var(--succesful-second-active);
}

div.login-card > div.login-action > hr {
  width: 80%;
  border: 1px solid var(--second);
  border-radius: 1px;
  margin-top: 20px;
}

div.login-card > div.login-action > p {
  margin-top: 0.5em;
  color: var(--text-aux);
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
  font-family: Poppins-Light;
}

div.login-card > div.login-action > p:hover {
  color: var(--text-aux-active);
}

div.login-card > div.login-action > button.singup {
  flex: 0.5;
  padding: 0.6em 0.5em;
  margin: 1em 0 0.5em 0;
  font-size: 1.2rem;
  background: var(--succesful);
  border: none;
  color: var(--default);
  cursor: pointer;
}

div.login-card > div.login-action > button.singup:active {
  background: var(--succesful-active);
}

@media screen and (max-width: 1024px) {

  div.login-desc > h3 {
    margin: 5px 0px;
  }

  div.login-desc > p{
    margin: 25px 0px;
  }

  div.login {
    width: 90%;
    flex-direction: column;
  }
  div.login-desc {
    margin: 0px;
  }
  div.login-card {
    padding: 10px 0px 10px 0px;
    border: none;
  }
}
</style>
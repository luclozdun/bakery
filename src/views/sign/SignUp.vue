<template>
  <div class="signup">
    <div class="signup-social">
      <div class="singup-center">
        <h3 class="text-4xl mb-8 font-bold text-title">Bienvenido a KeeKoYa</h3>
        <div class="signup-social-desc">
          <p class="text-center text-primary">
            Encuenta los productos mas frescos mediante un click!<br>¡Que esperas para unirte!
          </p>
        </div>
        <div class="hidden">
          <div class="signup-social-action">
            <button class="facebook">Facebook</button>
          </div>
          <div class="signup-social-action">
            <button class="google">Google</button>
          </div>
          <div class="signup-social-action">
            <button class="outlook">Outlook</button>
          </div>
        </div>
      </div>
    </div>
    <div class="signup-normal" id="signup-normal pt-5">
      <div class="signup-action">
        <input placeholder="Nombre" v-model="customer.name" required maxlength="15" />
      </div>
      <div class="signup-action">
        <input placeholder="Usuario" v-model="customer.username" required maxlength="20" />
      </div>
      <div class="signup-action">
        <input placeholder="Correo" v-model="customer.email" type="email" required maxlength="40" />
      </div>
      <div class="signup-action">
        <input placeholder="Numero" v-model="customer.number" required minlength="9" maxlength="9" />
      </div>
      <div class="signup-action">
        <input placeholder="Contraseña" v-model="customer.password" type="password" required maxlength="20" />
      </div>
      <div class="signup-action">
        <input type="date" required v-model="brithday" />
      </div>
      <div class="signup-action">
        <button class="signup" @click="create()">Crear Cuenta</button>
      </div>
    </div>
    <Loading v-if="loading"/>
  </div>
</template>

<script>
import moment from "moment";
import Loading from "../../components/Loading.vue";

export default {
    name: "SignIn",
    data() {
        return {
          loading: false,
            customer: {
                name: "",
                username: "",
                number: "",
                password: "",
                email: "",
                brithday: Date,
                image: "",
            },
            brithday: Date,
        };
    },
    methods: {
        create() {
            this.loading = true
            var asd = new Date(this.brithday);
            this.customer.brithday = moment(asd).format("DD/MM/YYYY");
            this.$store.dispatch("Authenticate/register", this.customer).then(() => {
                console.log("Registed");
                this.$router.push({ name: "SignIn" });
            }, (error) => console.log(error)).then(() => this.loading = false);
        },
    },
    components: { Loading }
};
</script>

<style>
div.signup {
  width: 1000px;
  margin: 100px auto 100px auto;
  border-radius: 20px;
  display: flex;
}

div.singup-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

div.signup-social-title {
  width: 90%;
  display: flex;
  justify-content: center;
  font-size: 2.3rem;
  margin: 1em 0px;
  text-align: center;
  color: var(--primary-inten);
}

div.signup-social-desc {
  margin: 1.4rem 0;
  display: flex;
  text-align: justify;
  color: var(--primary-subinten);
  font-size: 1.1rem;
}

div.signup-social {
  flex: 1;
  align-items: center;
  display: flex;
  margin: 0px 20px;
}

div.signup-social>div.singup-center>div.signup-social-action {
  width: 100%;
}

div.signup-social>div.singup-center>div.signup-social-action>button {
  font-size: 1rem;
  padding: 0.8em 0;
  margin-top: 1.2em;
  color: var(--default);
  border: none;
  cursor: pointer;
  border-radius: 7px;
  width: 90%;
}

div.signup-social>div.singup-center>div.signup-social-action>button.facebook {
  background: #3b5998;
}

div.signup-social>div.singup-center>div.signup-social-action>button.google {
  color: #1778f2;
  background: white;
  border: 2px solid #1778f2;
}

div.signup-social>div.singup-center>div.signup-social-action>button.outlook {
  background: #1778f2;
}

div.signup-social>div.singup-center>div.signup-social-action>button.facebook:active {
  background: #5473b6;
}

div.signup-social>div.singup-center>div.signup-social-action>button.google:active {
  background: #1778f2;
  color: white;
}

div.signup-social>div.singup-center>div.signup-social-action>button.outlook:active {
  background: #60a7ff;
}

div.signup-normal {
  flex: 1;
  background: var(--background-opacity-aux);
  border-radius: 20px;
}

div.signup-normal>div.signup-action,
div.signup-social>div.singup-center>div.signup-social-action {
  display: flex;
  justify-content: center;
  flex: 1;
}

div.signup-normal>input:not(:focus):not(:placeholder-shown):invalid {
  border: 1px solid red !important;
}

div.signup-normal>div.signup-action>h1 {
  font-size: 2.3rem;
  margin: 1em 0;
  color: var(--primary-inten);
}

div.signup-normal>div.signup-action>input::placeholder {
  color: var(--placeholder-second);
}

div.signup-normal>input[type="date"]:not(:focus):not(:placeholder-shown):invalid {
  color: var(--placeholder-second);
}

div.signup-normal>div.signup-action>input {
  background: var(--default);
  border: 1px solid var(--input-box);
  color: var(--second);
  flex: 0.8;
  margin: 0.8em 0;
  padding: 0.5em 0.5em;
  border-radius: 5px;
  font-size: 1.1rem;
}

div.signup-normal>div.signup-action>button.signup {
  padding: 0.6em 0.4em;
  margin: 0.8em 0 0.9em 0;
  font-size: 1.2rem;
  background: var(--succesful);
  border: none;
  color: white;
  cursor: pointer;
  flex: 0.8;
  border-radius: 10px;
}

div.signup-normal>div.signup-action>button.signup:active {
  background: var(--succesful-active);
}

@media screen and (max-width: 1024px) {
  div.signup {
    width: 90%;
    flex-direction: column;
  }

  div.signup-social-title {
    display: flex;
    justify-content: center;
    font-size: 35px;
    margin: 5px 0px;
  }

  div.signup-social-desc {
    text-align: center;
    margin: 25px 0px;
    font-size: 18px;
  }

  div.signup>div.signup-action>div.date>select {
    width: 35px;
  }

  div.signup-normal {
    margin: 20px 0px;
  }

  div.signup-normal>div.signup-action>h1 {
    font-size: 30px;
  }

  div.signup-normal>div.signup-action>div.date>select {
    width: 50px;
  }

  div.signup-social>div.singup-center>div.signup-social-action>button {
    width: 100%;
  }
}
</style>

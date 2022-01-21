<template>
  <div class="container-addbusiness">
    <div class="container-addbusibess">
      <div class="profile-title">
        <p>Deseo añadir mi pasteleria</p>
      </div>
      <div class="card" v-if="nobakery === true">
        <input
          minlength="8"
          maxlength="8"
          placeholder="dni"
          required
          v-model="profile.dni"
        />
        <input
          minlength="8"
          placeholder="DNI"
          required
          v-model="profile.docDNI"
        />
        <input minlength="8" placeholder="ruc" required v-model="profile.ruc" />
        <input
          minlength="8"
          placeholder="RUC"
          required
          v-model="profile.docRUC"
        />
        <input
          minlength="8"
          placeholder="Sanidad"
          required
          v-model="profile.docSanitation"
        />
        <input
          minlength="8"
          placeholder="Permiso de Municipalidad"
          required
          v-model="profile.permMunicipa"
        />
        <input
          minlength="8"
          placeholder="Licencia"
          required
          v-model="profile.license"
        />
        <div class="button">
          <button class="accept" @click="createProfile">
            Enviar Solicitud
          </button>
        </div>
      </div>
      <template v-else>
        <v-data-table
          :headers="headers"
          :items="profiles"
          hide-default-footer
          class="table"
        >
          <template v-slot:[`item.permMunicipa`]="{}">
            <div class="t-flex">
              <button>
                <v-icon x-large>
                  mdi-file-pdf-box
                </v-icon>
              </button>
            </div>
          </template>
          <template v-slot:[`item.license`]="{}">
            <div class="t-flex">
              <button>
                <v-icon x-large>
                  mdi-file-pdf-box
                </v-icon>
              </button>
            </div>
          </template>
          <template v-slot:[`item.docSanitation`]="{}">
            <div class="t-flex">
              <button>
                <v-icon x-large>
                  mdi-file-pdf-box
                </v-icon>
              </button>
            </div>
          </template>
          <template v-slot:[`item.actions`]="{}">
            <div class="t-flex">
              <v-icon big @click="deleteProfile" v-if="process !== 2">
                mdi-delete
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </template>
      <div class="card" v-if="(process === 2) | (process === 3)">
        <button class="accept" v-on:click="solicitude = !solicitude">
          Resultado
        </button>
      </div>
      <div class="card" v-if="(process === 1) & (nobakery === false)">
        <button class="process">Resultado</button>
      </div>
    </div>
    <div class="solicitude" v-if="solicitude === false">
      <div class="scontainer">
        <div class="close">
          <div class="icon" v-on:click="solicitude = !solicitude"></div>
        </div>
        <div class="info">
          <div class="card" v-if="process === 2">
            <h1>Respuesta:</h1>
            <div class="emoji"></div>
            <p>Hola!! Fuiste escogido para formar parte de nuestro equipo.</p>
            <p>Te recordamos para que puedas ingresar como pastelero</p>
            <p>Tus credenciales son las mismas que tu usuario</p>
            <p>Tu contraseña nueva es 12345</p>
          </div>
          <div class="card" v-if="process === 3">
            <h1>Respuesta:</h1>
            <div class="emoji"></div>
            <p>
              Lamentablemente con tu informacion enviada fue incompleta o tienes
              datos invalidos registrados en nuestro sistema.
            </p>
            <p>
              Te recomendamos que valides tus datos y actualices los datos
              restante
            </p>
            <p>
              Recuerda que tienes otras oportunidades para formar parte de
              nuestra familia
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileService from "@/service/profile/ProfileService";

export default {
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "DNI", value: "dni" },
        { text: "RUC", value: "ruc" },
        { text: "Licensia (PDF)", value: "license" },
        { text: "Municipalidad (PDF)", value: "permMunicipa" },
        { text: "Sanidad (PDF)", value: "docSanitation" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      profiles: [],
      profile: {
        customerId: 0,
        dni: "",
        docDNI: "",
        ruc: "",
        docRUC: "",
        docSanitation: "",
        permMunicipa: "",
        license: "",
      },
      nobakery: false,
      idCustomer: 0,
      idProfile: 0,
      prof: {},
      process: 0,
      solicitude: true,
    };
  },
  methods: {
    initialCustomerId() {
      this.idCustomer = this.$store.state.AuthCustomer.customer.id;
    },
    getByCustomerId() {
      ProfileService.getByCustomer(this.idCustomer).then(
        (response) => {
          this.profiles.push(response.data);
          this.nobakery = false;
          this.process = response.data.process;
          this.idProfile = response.data.id;
        },
        (error) => {
          console.log(error);
          this.nobakery = true;
        }
      );
    },
    createProfile() {
      this.profile.customerId = this.idCustomer;
      ProfileService.create(this.profile).then(
        () => {
          this.getByCustomerId();
          this.profile = Object.assign({});
        },
        (error) => console.log(error)
      );
    },
    deleteProfile() {
      ProfileService.deleteByCustomer(this.idProfile).then(
        () => {
          this.profiles.pop();
          this.getByCustomerId();
        },
        (error) => console.log(error)
      );
    },
  },
  mounted() {
    this.initialCustomerId();
    this.getByCustomerId();
  },
};
</script>

<style>
div.container-addbusiness div.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

div.container-addbusiness input:first-child {
  margin: 0;
}

div.container-addbusiness div.card input {
  width: 80%;
  color: var(--second);
  background: var(--default);
  flex: 0.8;
  padding: 0.6em;
  border-radius: 10px;
  border: 1px solid var(--input-box);
  margin-top: 20px;
  font-size: 1.1rem;
  font-family: Poppins-Bold;
}

div.container-addbusiness div.card input,
div.container-addbusiness div.card button {
  border-radius: 10px;
}

div.container-addbusiness div.card input::placeholder {
  color: var(--placeholder-second);
}

div.container-addbusiness div.card button {
  padding: 0.6em 0.8em;
  margin-top: 30px;
  font-family: Poppins-Bold;
}

div.container-addbusiness td button {
  padding: 0.6em 0.8em;
  font-family: Poppins-Bold;
  padding: 0.2em;
}

div.t-flex {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.solicitude {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(202, 202, 202, 0.363);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.solicitude div.card {
  box-shadow: 0 0 2px 0 black;
  border-radius: 35px;
  background: var(--default);
}

div.solicitude div.info {
  max-width: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.solicitude div.scontainer {
  position: relative;
}

div.solicitude div.info div.card div.emoji {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rebeccapurple;
  margin: 30px 0;
}

div.solicitude div.info div.card p {
  width: 80%;
  text-align: center;
}

div.solicitude div.close {
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: right;
}

div.solicitude div.close div.icon {
  width: 40px;
  height: 40px;
  background: var(--second);
  margin-right: 20px;
  margin-top: 5px;
  border-radius: 50%;
  cursor: pointer;
}
</style>

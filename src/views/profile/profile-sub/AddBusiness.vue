<template>
  <div class="container-addbusiness" v-if="reloadPage">
    <div class="w-full mb-4">
      <div class="profile-title">
        <Title text="Deseo añadir mi pasteleria" />
      </div>
      <div class="space-y-4 card mt-4" v-if="nobakery === true">
        <div class="w-full flex flex-col">
          <label class="text-primary text-sm text-font">Nombre de la Pasteleria:</label>
          <input style="margin-top: 0 !important;" type="text" placeholder="EJM: LA BARBACOA MÁGICA" required
            @input="handleInput" name="nameBakery" />
          <label class="text-red-500 text-sm text-font" v-if="profile.nameBakeryRequired">DEBE INGRESAR UN NOMBRE</label>
        </div>
        <div class="w-full flex flex-col">
          <label class="text-primary text-sm text-font">Costo($):</label>
          <input style="margin-top: 0 !important;" type="text" placeholder="EJM: $$$" required @input="handleInput"
            name="cost" />
          <label class="text-red-500 text-sm text-font" v-if="profile.costRequired">DEBE INGRESAR UN COSTO
            REFERENCIAL</label>
        </div>
        <div class="w-full flex flex-col">
          <label class="text-primary text-sm text-font">Ubicación:</label>
          <input style="margin-top: 0 !important;" type="text" placeholder="EJM: AV. BRASIL 354" required
            @input="handleInput" name="location" />
          <label class="text-red-500 text-sm text-font" v-if="profile.locationRequired">DEBE INGRESAR UNA
            UBICACIÓN</label>
        </div>
        <div class="w-full flex flex-col">
          <label class="text-primary text-sm text-font">DNI:</label>
          <input style="margin-top: 0 !important;" type="text" placeholder="EJM: 98735155" required @input="handleInput"
            name="dni" />
          <label class="text-red-500 text-sm text-font" v-if="profile.dniRequired">DEBE INGRESAR SU NUMERO DE
            IDENTIFICACIÓN</label>
        </div>
        <div class="w-full flex flex-col">
          <label class="text-primary text-sm text-font">DNI - DOCUMENTO:</label>
          <input style="margin-top: 0 !important;" type="file" placeholder="DNI" required @change="handleFile"
            name="docDNI" />
          <label class="text-red-500 text-sm text-font" v-if="profile.docDNIRequired !== ''">{{ profile.docDNIRequired
          }}</label>
        </div>
        <div class="w-full flex flex-col">
          <label class="text-primary text-sm text-font">RUC:</label>
          <input style="margin-top: 0 !important;" type="text" placeholder="ruc" required @input="handleInput"
            name="ruc" />
          <label class="text-red-500 text-sm text-font" v-if="profile.rucRequired">DEBE INGRESAR SU NUMERO RUC</label>
        </div>
        <div class="w-full flex flex-col">
          <label class="text-primary text-sm text-font">RUC - DOCUMENTO:</label>
          <input style="margin-top: 0 !important;" type="file" required @change="handleFile" name="docRUC" />
          <label class="text-red-500 text-sm text-font" v-if="profile.docRUCRequired !== ''">{{ profile.docRUCRequired
          }}</label>
        </div>
        <div class="w-full flex flex-col">
          <label class="text-primary text-sm text-font">SANIDAD - DOCUMENTO:</label>
          <input style="margin-top: 0 !important;" type="file" required @change="handleFile" name="docSanitation" />
          <label class="text-red-500 text-sm text-font" v-if="profile.docSanitationRequired !== ''">{{
            profile.docSanitationRequired }}</label>
        </div>
        <div class="w-full flex flex-col">
          <label class="text-primary text-sm text-font">PERMISO MUNICIPAL - DOCUMENTO:</label>
          <input style="margin-top: 0 !important;" type="file" required @change="handleFile" name="permMunicipa" />
          <label class="text-red-500 text-sm text-font" v-if="profile.permMunicipaRequired !== ''">{{
            profile.permMunicipaRequired }}</label>
        </div>
        <div class="w-full flex flex-col">
          <label class="text-primary text-sm text-font">LICENCIA - DOCUMENTO:</label>
          <input style="margin-top: 0 !important;" type="file" required @change="handleFile" name="license" />
          <label class="text-red-500 text-sm text-font" v-if="profile.licenseRequired !== ''">{{ profile.licenseRequired
          }}</label>
        </div>
        <div class="button">
          <button class="accept" @click="createProfile">
            Enviar Solicitud
          </button>
        </div>
      </div>
      <template v-else>
        <div class="mt-4">
          <Table :filter="filterTable" :data="profiles" @onRow="onClickRow" />
        </div>

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
    <div v-if="this.loading">
      <Loading />
    </div>
  </div>
</template>

<script>
import ProfileService from "@/service/profile/ProfileService";
import ConvertBlob from "@/service/blob/ConvertBlob";
import jwt_decode from "jwt-decode";
import Table from "../../../components/Table";
import { DocumentSearchIcon, QuestionMarkCircleIcon } from '@vue-hero-icons/solid'
import Title from "../../../components/Title.vue";
import AWS_S3 from "@/service/aws/s3"
import Loading from '../../../components/Loading';

const typeEvent = {
  dni: 'DOC-DNI',
  ruc: 'DOC-RUC',
  permi: 'DOC-PERM',
  license: 'DOC-LIC',
  sanity: 'DOC-SAN',
  doc: 'DOC'
}

export default {
  data() {
    return {
      reloadPage: false,
      filterTable: {
        cols: [
          {
            title: 'Nombre',
            data: (v) => (v.nameBakery),
            type: 'normal',
            width: '100px',
            class: 'text-center'
          },
          {
            title: 'LOCACIÓN',
            data: (v) => (v.location),
            type: 'normal',
            class: 'text-center'
          },
          {
            title: 'DNI',
            data: (v) => (v.dni),
            type: 'normal',
            class: 'text-center'
          },
          {
            type: 'icon',
            icon: DocumentSearchIcon,
            indetity: typeEvent.dni,
            class: 'text-white flex justify-center',
            classIcon: 'bg-red-100 cursor-pointer p-1 bg-title rounded-full'
          },
          {
            title: 'RUC',
            data: (v) => (v.ruc),
            type: 'normal',
            class: 'text-center'
          },
          {
            type: 'icon',
            icon: DocumentSearchIcon,
            indetity: typeEvent.ruc,
            class: 'text-white flex justify-center',
            classIcon: 'bg-red-100 cursor-pointer p-1 bg-title rounded-full'
          },
          {
            title: 'LICENCIA',
            type: 'icon',
            icon: DocumentSearchIcon,
            indetity: typeEvent.license,
            class: 'text-white flex justify-center',
            classIcon: 'bg-red-100 cursor-pointer p-1 bg-title rounded-full'
          },
          {
            title: 'PERMISO MUNICIPAL',
            type: 'icon',
            icon: DocumentSearchIcon,
            indetity: typeEvent.permi,
            class: 'text-white flex justify-center',
            classIcon: 'bg-red-100 cursor-pointer p-1 bg-title rounded-full'
          },
          {
            title: 'SANIDAD',
            type: 'icon',
            icon: DocumentSearchIcon,
            indetity: typeEvent.sanity,
            class: 'text-white flex justify-center',
            classIcon: 'bg-red-100 cursor-pointer p-1 bg-title rounded-full'
          },
          {
            title: '',
            data: (v) => (v.location),
            type: 'actions',
            width: '100px',
            actions: [
              {
                label: 'ESTADO',
                icon: QuestionMarkCircleIcon,
                class: 'bg-blue-500 text-white'
              }
            ],
          }
        ]
      },
      loading: false,
      profiles: [],
      profile: {
        customerId: 0,
        dni: '',
        dniRequired: false,
        docDNI: '',
        docDNIRequired: '',
        ruc: '',
        rucRequired: false,
        docRUC: '',
        docRUCRequired: '',
        docSanitation: '',
        docSanitationRequired: '',
        permMunicipa: '',
        permMunicipaRequired: '',
        license: '',
        licenseRequired: '',
        nameBakery: '',
        nameBakeryRequired: false,
        cost: '',
        costRequired: false,
        location: '',
        locationRequired: false,
      },
      nobakery: false,
      id: 0,
      idProfile: 0,
      prof: {},
      process: 0,
      solicitude: true,
      archivo: File,
      faltaDocumento: 'DEBE INGRESAR UN DOCUMENTO',
      faltaDocument5MB: 'DE INGRESAR UN DOCUMENTO MENOR DE 5MB'
    };
  },
  methods: {
    async DownloadDocument(key, name) {
      this.loading = true
      const blob = await AWS_S3.GetByKey(key, name)
      ConvertBlob.ConvertBlobToDocument(blob)
      this.loading = false
    },
    async onClickRow(val) {
      if (val.type === typeEvent.dni) await this.DownloadDocument(val.docDNI, `${val.nameBakery}-DNI`)
      else if (val.type === typeEvent.ruc) await this.DownloadDocument(val.docRUC, `${val.nameBakery}-RUC`)
      else if (val.type === typeEvent.license) await this.DownloadDocument(val.license, `${val.nameBakery}-LICENCIA`)
      else if (val.type === typeEvent.permi) await this.DownloadDocument(val.permMunicipa, `${val.nameBakery}-PERMISO-MUNICIPAL`)
      else if (val.type === typeEvent.sanity) await this.DownloadDocument(val.docSanitation, `${val.nameBakery}-SANIDAD`)
    },
    handleInput(e) {
      var state = false
      const { value, name } = e.target

      if (value === '') state = true

      this.profile[name] = value
      this.profile[`${name}Required`] = state
    },
    handleFile(e) {
      const { files, name } = e.target
      var state = ''

      if (files.length === 0) state = this.faltaDocumento

      if (this.validateFileToMB(files[0], 5)) state = faltaDocument5MB

      this.profile[name] = files[0]
      this.profile[`${name}Required`] = state
    },
    initialCustomerId() {
      var isLoggedIn = this.$store.state.Authenticate.status.loggedIn;
      if (!isLoggedIn) {
        return;
      }
      var token = this.$store.state.Authenticate.token;
      if (token === undefined)
        this.$router.push({ name: "Home" });
      var data = jwt_decode(token);
      this.id = data.id;
      this.role = data.role;
      if (this.role !== 'CUSTOMER') {
        this.$router.push({ name: 'Home' });
        return;
      }
    },
    validateFileToMB(file, mb = 5) {
      const size = file.size / 1024

      if (size > mb) return false
      return true
    },
    getByCustomerId() {
      this.loading = true;
      ProfileService.getByCustomer(this.id).then((response) => {
        this.profiles.push(response.data);
        this.nobakery = false;
        this.process = response.data.process;
        this.idProfile = response.data.id;
        this.reloadPage = true
      }, (error) => {
        console.log(error);
        this.nobakery = true;
        this.reloadPage = true
      }).then(() => this.loading = false);
    },
    async createProfile() {
      console.log(this.profile)

      var success = true

      if (this.profile.nameBakery === '') {
        success = false
        this.profile.nameBakeryRequired = true
      }

      if (this.profile.cost === '') {
        success = false
        this.profile.costRequired = true
      }

      if (this.profile.location === '') {
        success = false
        this.profile.locationRequired = true
      }

      if (this.profile.dni === '') {
        success = false
        this.profile.dniRequired = true
      }

      if (this.profile.ruc === '') {
        success = false
        this.profile.rucRequired = true
      }

      if (this.profile.docDNI === '') {
        success = false
        this.profile.docDNIRequired = this.faltaDocumento
      }

      if (this.profile.docRUC === '') {
        success = false
        this.profile.docRUCRequired = this.faltaDocumento
      }

      if (this.profile.docSanitation === '') {
        success = false
        this.profile.docSanitationRequired = this.faltaDocumento
      }

      if (this.profile.permMunicipa === '') {
        success = false
        this.profile.permMunicipaRequired = this.faltaDocumento
      }

      if (this.profile.license === '') {
        success = false
        this.profile.licenseRequired = this.faltaDocumento
      }

      if (this.validateFileToMB(this.profile.docDNI, 5)) {
        success = false
        this.profile.docDNIRequired = this.faltaDocument5MB
      }

      if (this.validateFileToMB(this.profile.docRUC, 5)) {
        success = false
        this.profile.docRUCRequired = this.faltaDocument5MB
      }

      if (this.validateFileToMB(this.profile.docSanitation, 5)) {
        success = false
        this.profile.docSanitationRequired = this.faltaDocument5MB
      }

      if (this.validateFileToMB(this.profile.permMunicipa, 5)) {
        success = false
        this.profile.permMunicipaRequired = this.faltaDocument5MB
      }

      if (this.validateFileToMB(this.profile.license, 5)) {
        success = false
        this.profile.licenseRequired = this.faltaDocument5MB
      }

      if (!success) return
      this.loading = true;
      this.profile.customerId = this.id;
      const dni = await AWS_S3.Upload(this.profile.docDNI)
      if (!dni.success) success = false

      const ruc = await AWS_S3.Upload(this.profile.docRUC)
      if (!ruc.success) success = false

      const municipal = await AWS_S3.Upload(this.profile.permMunicipa)
      if (!municipal.success) success = false

      const sanitary = await AWS_S3.Upload(this.profile.docSanitation)
      if (!sanitary.success) success = false

      const license = await AWS_S3.Upload(this.profile.license)
      if (!license.success) success = false

      if (!success) return

      const request = {
        cost: this.profile.cost,
        customerId: this.profile.customerId,
        dni: this.profile.dni,
        docDNI: dni.key,
        docRUC: ruc.key,
        docSanitation: sanitary.key,
        license: license.key,
        location: this.profile.location,
        nameBakery: this.profile.nameBakery,
        permMunicipa: municipal.key,
        ruc: this.profile.ruc
      }

      ProfileService.create(request).then(() => {
        this.getByCustomerId();
        this.profile = Object.assign({});
      }, (error) => console.log(error)).then(() => this.loading = false);
    },
    async createProfilee() {
      const key = '73c130e7-c503-439f-852d-faab76812d31.jpg'
      const response = await AWS_S3.GetByKey(key, 'PENDEJO')
      await ConvertBlob.ConvertAWSToDocument(response)
    },
    deleteProfile() {
      ProfileService.deleteByCustomer(this.idProfile).then(() => {
        this.profiles.pop();
        this.getByCustomerId();
      }, (error) => console.log(error));
    },
  },
  mounted() {
    this.initialCustomerId();
    this.getByCustomerId();
  },
  components: { Table, Title, Loading, Loading }
};
</script>

<style scoped>
div.container-addbusiness div.card {
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
}

div.container-addbusiness td button {
  padding: 0.6em 0.8em;
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
}</style>

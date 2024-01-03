<template>
  <div class="container-privacy">
    <div class="privacy" v-if="reloadPage">
      <div class="profile-title">
        <Title text="Información Personal" />
      </div>
      <div class="privacy-data mt-3">
        <table class="privacy-table text-lg w-full text-gray-700">
          <tr>
            <th>
              <p>Username</p>
            </th>
            <td>
              <input disabled :value="user.username" />
            </td>
          </tr>
          <tr>
            <th>
              <p>Nombre</p>
            </th>
            <td>
              <input disabled :value="user.name" />
            </td>
          </tr>
          <tr>
            <th>Contraseña</th>
            <td>
              <input disabled type="password" :value="user.password" />
            </td>
          </tr>
          <tr>
            <th>
              <p>Numero Celular</p>
            </th>
            <td>
              <input disabled :value="user.number" />
            </td>
          </tr>
          <tr>
            <th>
              <p>Correo</p>
            </th>
            <td>
              <input disabled :value="user.email" />
            </td>
          </tr>
          <tr>
            <th>Fecha de Nacimiento</th>
            <td>
              <input disabled :value="user.brithday" />
            </td>
          </tr>
          <tr v-if="role === 'BAKER'">
            <th>Mi Dni</th>
            <td>
              <input disabled :value="user.dni" />
            </td>
          </tr>
          <tr v-if="role === 'BAKER'">
            <th>Mi Dni</th>
            <td>
              <div class="py-1">
                <DocumentSearchIcon class="w-8 h-8 text-title cursor-pointer" @click="downloadDocument('DNI')"/>
              </div>
            </td>
          </tr>
          <tr v-if="role === 'BAKER'">
            <th>Mi Ruc</th>
            <td>
              <input disabled :value="user.ruc" />
            </td>
          </tr>
          <tr v-if="role === 'BAKER'">
            <th>Mi Ruc</th>
            <td>
              <div class="py-1">
                <DocumentSearchIcon class="w-8 h-8 text-title cursor-pointer" @click="downloadDocument('RUC')"/>
              </div>
            </td>
          </tr>
          <tr v-if="role === 'BAKER'">
            <th>Mi Permiso Municipal</th>
            <td>
              <div class="py-1">
                <DocumentSearchIcon class="w-8 h-8 text-title cursor-pointer" @click="downloadDocument('PEM')"/>
              </div>
            </td>
          </tr>          
          <tr v-if="role === 'BAKER'">
            <th>Mi Licencia</th>
            <td>
              <div class="py-1">
                <DocumentSearchIcon class="w-8 h-8 text-title cursor-pointer" @click="downloadDocument('LIC')"/>
              </div>
            </td>
          </tr>
          <tr v-if="role === 'BAKER'">
            <th>Mi Licencia de Sanidad</th>
            <td>
              <div class="py-1">
                <DocumentSearchIcon class="w-8 h-8 text-title cursor-pointer" @click="downloadDocument('SAN')"/>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="loading">
      <Loading />
    </div>
  </div>
</template>

<script>
import UserService from "@/service/security/UserService";
import jwt_decode from "jwt-decode";
import Loading from "../../../components/Loading.vue";
import Title from "../../../components/Title.vue";
import { DocumentSearchIcon } from '@vue-hero-icons/solid'
import AWS_S3 from '@/service/aws/s3'
import ConvertBlob from '@/service/blob/ConvertBlob'

export default {
  name: "Privacy",
  data() {
    return {
      reloadPage: false,
      user: {},
      role: String,
      id: Number,
      loading: false
    };
  },
  methods: {
    initialState() {
      this.loading = true
      var isLoggedIn = this.$store.state.Authenticate.status.loggedIn;
      if (!isLoggedIn) {
        return;
      }
      var token = this.$store.state.Authenticate.token;
      var data = jwt_decode(token);
      this.id = data.id;
      this.role = data.role;
      if (this.role === 'OWNER') {
        this.$router.push({ name: 'checkBaker' });
        return;
      }
      UserService.getUser(this.role, this.id).then((response) => {
        this.user = response.data;
        this.reloadPage = true;
      }).then(() => this.loading = false);;
    },
    async downloadDocument(type){
      this.loading = true
      if(type === 'DNI'){
          var blob = await AWS_S3.GetByKey(this.user.docDNI, `${this.user.nameBakery}-DNI`)
          console.log(blob)
          await ConvertBlob.ConvertBlobToDocument(blob)
      }
      else if(type === 'LIC'){
          var blob = await AWS_S3.GetByKey(this.user.license, `${this.user.nameBakery}-LICENCIA`)
          await ConvertBlob.ConvertBlobToDocument(blob)
      }
      else if(type === 'RUC'){
          var blob = await AWS_S3.GetByKey(this.user.docRUC, `${this.user.nameBakery}-RUC`)
          await ConvertBlob.ConvertBlobToDocument(blob)
      }
      else if(type === 'PERM'){
          var blob = await AWS_S3.GetByKey(this.user.permMunicipa, `${this.user.nameBakery}-PERMISO-MUNICIPAL`)
          await ConvertBlob.ConvertBlobToDocument(blob)
      }
      else if(type === 'SAN'){
          var blob = await AWS_S3.GetByKey(this.user.docSanitation, `${this.user.nameBakery}-DNI`)
          await ConvertBlob.ConvertBlobToDocument(blob)
      }
      this.loading = false
    }
  },
  mounted() {
    this.initialState();
  },
  components: { Loading, Title, DocumentSearchIcon }
};
</script>

<style scoped>
table.privacy-table th,
table.privacy-table td {
  background: white;
  border: 1px solid var(--primary);
  padding: 0.2rem 1rem;
}

table.privacy-table input {
  width: 100%;
}
</style>

<template>
  <div class="checkbaker w-full">
    <div class="container" v-if="realod">
      <div v-if="this.profiles.length === 0">
        <Empty :show="true" message="No se encontro información interesados pendientes." />
      </div>
      <div v-else>
        <Table :filter="filterTable" :data="profiles" @onRow="manejarClicEnHijo" />
      </div>
    </div>
    <div v-if="loading">
      <loading/>
    </div>    
  </div>
</template>

<script>
import ProfileService from "@/service/profile/ProfileService";
import Table from "../../components/Table";
import Empty from "../../components/Empty.vue";
import { CheckIcon, TrashIcon, DocumentSearchIcon } from '@vue-hero-icons/solid'
import AWS_S3 from "@/service/aws/s3"
import ConvertBlob from "@/service/blob/ConvertBlob"
import Loading from '../../components/Loading.vue';

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
      loading: false,
      profiles: [],
      answer: {
        process: 0,
      },
      realod: false,
      filterTable: {
        cols: [
          {
            title: 'DNI',
            data: (v) => (v.dni),
            type: 'normal'
          },
          {
            title: '',
            type: 'icon',
            icon: DocumentSearchIcon,
            indetity: typeEvent.dni,
            class: 'text-white flex justify-center',
            classIcon: 'bg-red-100 cursor-pointer p-1 bg-title rounded-full'
          },
          {
            title: 'RUC',
            data: (v) => (v.ruc),
            type: 'normal'
          },
          {
            title: '',
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
            title: 'DOCUMENTO SANITARIO',
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
                label: 'APROBAR',
                icon: CheckIcon,
                class: 'bg-green-500 text-white',
                type: 'APROBAR'
              },
              {
                label: 'RECHAZAR',
                icon: TrashIcon,
                class: 'bg-red-500 text-white',
                type: 'RECHAZAR'
              }
            ],
          }
        ]
      },
    };
  },
  methods: {
    async DownloadDocument(key, name){
      this.loading = true
        const blob = await AWS_S3.GetByKey(key, name)
        ConvertBlob.ConvertBlobToDocument(blob)
        this.loading = false
    },
    async manejarClicEnHijo(val) {
      
      if (val.type === typeEvent.dni) {
        await this.DownloadDocument(val.docDNI, `${val.nameBakery}-DNI`)
        return
      }
      if (val.type === typeEvent.ruc) {
        await this.DownloadDocument(val.docRUC, `${val.nameBakery}-RUC`)
        return
      }
      if (val.type === typeEvent.license) {
        await this.DownloadDocument(val.license, `${val.nameBakery}-LICENCIA`)
        return
      }
      if (val.type === typeEvent.permi) {
        await this.DownloadDocument(val.permMunicipa, `${val.nameBakery}-PERMISO-MUNICIPAL`)
        return
      }
      if (val.type === typeEvent.sanity) {
        await this.DownloadDocument(val.docSanitation, `${val.nameBakery}-SANIDAD`)
        return
      }

      var process = val.type === 'RECHAZAR' ? 3 : 2

      this.answer.process = process;
      this.loading=true
      ProfileService.editProfile(val.id, this.answer).then(() => {
        this.loading=false
        this.getAllProfiles();        
      }, (error) => console.log(error));
    },
    getAllProfiles() {
      this.loading = true
      ProfileService.getAll().then((response) => {
        (this.profiles = response.data)
        this.loading = false
        this.realod = true
      }, (error) => console.log(error));
    }
  },
  mounted() {
    this.getAllProfiles();
  },
  components: { Table, Empty, Loading }
};
</script>

<style scoped>
div.checkbaker div.container {
  width: 80%;
}

div.checkbaker div.container div {
  width: 100%;
}
</style>

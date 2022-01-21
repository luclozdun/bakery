<template>
  <div class="checkbaker">
    <div class="container">
      <template>
        <v-data-table
                    :headers="headers"
                    :items="profiles"
                    hide-default-footer
                    class="table"
                >
                    <template v-slot:[`item.permMunicipa`]="{  }">
                        <div class="t-flex">
                            <button><h2>PL</h2></button>
                        </div>                        
                    </template>
                    <template v-slot:[`item.license`]="{  }">
                        <div class="t-flex">
                            <button><h2>PL</h2></button>
                        </div>                        
                    </template>
                    <template v-slot:[`item.docSanitation`]="{  }">
                        <div class="t-flex">
                            <button><h2>PL</h2></button>
                        </div>                        
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <div class="t-flex">
                            <v-icon
                                big
                                @click="asd(item, 2)"
                            >
                                mdi-message-plus
                            </v-icon>
                            <v-icon
                                big
                                @click="asd(item, 3)"
                            >
                                mdi-trash-can
                            </v-icon>
                        </div>                        
                    </template>
                </v-data-table>        
      </template>
    </div>
  </div>
</template>

<script>

import ProfileService from '@/service/profile/ProfileService';

  export default {
    data () {
      return {
        headers: [
          { text: 'Id', value: 'id' },
          { text: 'DNI', value: 'dni' },
          { text: 'RUC', value: 'ruc' },
          { text: 'Licensia (PDF)', value: 'license' },
          { text: 'Municipalidad (PDF)', value: 'permMunicipa' },
          { text: 'Sanidad (PDF)', value: 'docSanitation' },
          { text: 'Respuesta', value: 'actions', sortable: false }
        ],
        profiles: [],
        answer: {
          process: 0
        }
      }
    },
    methods: {
      getAllProfiles(){
        ProfileService.getAll().then(response => this.profiles = response.data, error => console.log(error))
      },
      asd(item, process){
        this.answer.process = process
        ProfileService.editProfile(item.id, this.answer).then(() => {
          this.getAllProfiles()
        }, error => console.log(error))
      }
    },
    mounted() {
      this.getAllProfiles()
    }
  }
</script>

<style>
div.checkbaker div.container{
  width: 80%;
  background: red;
  
}
div.checkbaker div.container div{
  width: 100%;
}
</style>
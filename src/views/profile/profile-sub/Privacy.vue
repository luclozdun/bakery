<template>
  <div class="container-privacy">
    <div class="privacy">
      <div class="profile-title">
        <p>Informacion Personal</p>
      </div>
      <div class="privacy-data">
        <table>
          <div>
            <tr>
              <th><p>Nombre</p></th>
              <td>
                <p>{{ user.name }}</p>
              </td>
            </tr>
            <tr>
              <th><p>Apellido</p></th>
              <td><p>none</p></td>
            </tr>
            <tr>
              <th>Contraseña</th>
              <td>█ █ █ █ █</td>
            </tr>
            <tr>
              <th><p>Numero Celular</p></th>
              <td>
                <p>{{ user.number }}</p>
              </td>
            </tr>
            <tr>
              <th><p>Correo</p></th>
              <td>
                <p>{{ user.email }}</p>
              </td>
            </tr>
            <tr>
              <th>Fecha de Nacimiento</th>
              <td>
                <p>{{ user.brithday }}</p>
              </td>
            </tr>
          </div>

          <div v-if="role === 'BAKER'">
            <tr>
              <th>Mi Licencia</th>
              <td>
                <p>ICON</p>
              </td>
            </tr>
            <tr>
              <th>Mi Ruc</th>
              <td>
                <p>ICON</p>
              </td>
            </tr>
            <tr>
              <th>Mi Permiso Municipal</th>
              <td>
                <p>ICON</p>
              </td>
            </tr>
          </div>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Privacy",
  data() {
    return {
      user: {},
      role: String,
    };
  },
  methods: {
    initialState() {
      var token = this.$store.state.AuthBaker.baker.token;
      var base64Payload = token.split(".")[1];
      var payload = Buffer.from(base64Payload, "base64");
      var dataToken = JSON.parse(payload.toString());
      if (dataToken.role == "BAKER") {
        this.role = "BAKER";
        this.user = this.$store.state.AuthBaker.baker;
      } else if (dataToken.role == "USER") {
        this.role = "USER";
        this.user = this.$store.state.AuthCustomer.customer;
      }
    },
  },
  mounted() {
    this.initialState();
  },
};
</script>

<style>
div.privacy-data {
  margin: 20px 0px;
  display: flex;
  justify-content: center;
}

div.privacy-data table {
  border-spacing: 0px 15px;
  width: 80%;
}

div.privacy-data tr {
  margin-top: 20px;
  background: var(--background-opacity);
}

div.privacy-data th,
div.privacy-data td {
  padding: 5px 20px;
  color: var(--title);
}

div.privacy-data th {
  text-align: end;
  padding-right: 5px;
  border-start-start-radius: 15px;
  font-family: Poppins-Bold;
  font-size: 18px;
}

div.privacy-data td:last-child {
  border-end-end-radius: 15px;
}

div.privacy-data td {
  font-family: Poppins-Light;
  font-size: 18px;
}

div.privacy-data td div {
  cursor: pointer;
  height: 30px;
  padding: 10px 0px;
  width: 30px;
}

div.privacy-data td p {
  display: inline-block;
}

@media (max-width: 750px) {
  div.privacy-data table {
    display: block;
    width: 100%;
  }

  div.privacy-data tr {
    width: 100%;
    margin-top: 20px;
    display: block;
  }

  div.privacy-data th {
    display: block;
    text-align: center;
    font-size: 16px;
    padding: 0;
  }

  div.privacy-data td {
    padding: 0px 5px;
    overflow: auto;
    font-size: 16px;
    text-align: center;
    display: block;
  }

  div.privacy-data td:last-child {
    display: none;
  }
}
</style>

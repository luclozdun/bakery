<template>
  <div class="h-full w-full mt-0">
    <div class="flex h-full">
      <div class="bg-primary h-full max-md:hidden" style="width: '320px'">
        <div class="mt-3 px-3" v-for="(router, index) in routers" :key="index">
          <router-link :to="{ name: router.name }" class="flex py-2 rounded-sm px-5 items-center hover:bg-primary-200">
            <div class="w-10 h-10 rounded-sm bg-white">
              <div class="svg"></div>
            </div>
            <div class="text-white px-5 font-bold text-lg " style="width: 190px">
              <p>{{ router.text }}</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="p-5 overflow-x-auto w-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "Profile",
  data() {
    return {
      active: Boolean,
      menu: Boolean,
      routersCustomer: [
        {
          name: "Privacy",
          icon: "icon-user-private",
          text: "Datos Personales",
        },
        {
          name: "MyOrder",
          icon: "icon-order",
          text: "Mis Pedidos",
        },
        {
          name: "AddBusiness",
          icon: "icon-bakery-add",
          text: "Tengo un Negocio",
        },
      ],
      routersBaker: [
        {
          name: "Privacy",
          icon: "icon-user-private",
          text: "Mi Información",
        },
        {
          name: "AddProduct",
          icon: "icon-gps",
          text: "Mi tienda",
        },
      ],
      routersOwner: [
        {
          name: "checkBaker",
          icon: "icon-order",
          text: "Solicitudes",
        },
        {
          name: "checkBaker",
          icon: "icon-order",
          text: "Torta",
        },
        {
          name: "checkBaker",
          icon: "icon-order",
          text: "Pie",
        },
      ],
      routers: [],
      loggedInCustomer: Boolean,
      loggedInBaker: Boolean,
      id: Number,
      role: String,
    };
  },
  methods: {
    isloggedIn() {
      this.loggedInCustomer = this.$store.state.Authenticate.status.loggedIn;

      if(!this.loggedInCustomer) {
        this.$router.push({ name: "Home" });
        return
      } 

      var token = this.$store.state.Authenticate.token;

      if (!this.loggedInCustomer) {
        this.$router.push({ name: "Home" });
      }
      
      var decode = jwt_decode(token);

      this.id = decode.id;
      this.role = decode.role;

      if (decode.role === "CUSTOMER") {
        this.routers = this.routersCustomer;
      } else if (decode.role === "BAKER") {
        this.routers = this.routersBaker;
      } else if (decode.role === "OWNER") {
        this.routers = this.routersOwner;
      }
    },
    render() {
      let localdata = this;
      const render_width = window.matchMedia("(max-width: 1200px)");
      function render(media) {
        if (media.matches) {
          localdata.active = true;
        } else {
          localdata.menu = true;
          localdata.active = false;
        }
      }
      render(render_width);
      render_width.addListener(render);
    },
  },
  mounted() {
    this.isloggedIn();
    this.render();
  },
};
</script>

<style scoped>
div.profile-title {
  font-size: 30px;
  color: var(--second);
}

div.container-profile {
  width: 1200px;
  margin: 30px auto 0px auto;
  position: relative;
}

div.container-group {
  display: flex;
  position: relative;
  overflow: hidden;
}

div.container-group div.nav-profile {
  flex: 0.7;
  margin-right: 2em;
  height: 100%;
}

div.nav-profile div.profile-grid a.option-grid {
  display: grid;
  background: var(--primary-inten);
  grid-template:
    "icon desc" 70px/
    50px auto;
  z-index: 15;
}

div.nav-profile div.profile-grid a.option-grid div.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  grid-area: icon;
}

div.nav-profile div.profile-grid a.option-grid div.icon div.svg {
  background: var(--default);
  width: 50px;
  height: 50px;
}

div.nav-profile div.profile-grid a.option-grid div.desc {
  margin-left: 8px;
  font-size: 1.2rem;
  display: flex;
  color: var(--default);
  align-items: center;
  grid-area: desc;
}

div.nav-profile div.profile-grid a.option-grid div.desc p {
  margin-left: 5px;
}

div.container-group div.sub-profile {
  margin: 0 auto;
  flex: 2;
}

@media (min-width: 1200px) {
  div.nav-profile div.profile-grid a.option-grid:hover {
    background: var(--primary);
    transform: translateX(10px);
    transition: all 0.5s ease;
  }
}

@media (max-width: 1200px) {
  div.profile-title {
    text-align: center;
  }

  div.container-profile {
    width: 100%;
    margin: 0;
  }

  div.container-show {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.8em 0;
    cursor: pointer;
  }

  div.container-show button.show {
    width: 50px;
    height: 50px;
    background: var(--second);
    border-radius: 50%;
    z-index: 8;
  }

  div.container-group div.nav-profile {
    width: 100%;
    margin-right: 0;
    position: fixed;
    left: -100%;
    transition: left 0.5s ease;
    z-index: 8;
  }

  div.container-group div.nav-profile div.profile-grid {
    row-gap: 0;
  }

  div.container-group div.sub-profile {
    width: 100%;
  }
}

@media (max-width: 400px) {
  div.nav-profile div.profile-grid a.option-grid div.icon div.svg {
    width: 40px;
    height: 40px;
  }

  div.nav-profile div.profile-grid a.option-grid div.desc {
    font-size: 1rem;
  }
}
</style>

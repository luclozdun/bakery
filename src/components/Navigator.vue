<template>
  <div class="nav-bar">
    <router-link to="/">
      <div class="nav-title" @click="closeNav">
        <p>KeekoYa</p>
      </div>
    </router-link>
    <div class="nav-option">
      <div class="nav-stack" @click="activeNav()">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="routers">
        <div class="nav-router">
          <div class="router" @click="activeNav()">
            <router-link
              :to="{ name: router.name }"
              v-for="(router, index) in routers"
              :key="index"
            >
              <div class="nav-grid">
                <div class="nav-icon">
                  <img />
                </div>
                <div class="nav-desc">
                  <p>{{ router.desc }}</p>
                </div>
              </div>
            </router-link>
            <router-link
              v-if="loggedInCustomer === true || loggedInBaker === true"
              to="/"
            >
              <div class="nav-grid" @click="logout">
                <div class="nav-icon">
                  <img />
                </div>
                <div class="nav-desc">
                  <p>Cerrar Sesion</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Animation from "@/js/animation.js";

export default {
  name: "NavBar",
  data() {
    return {
      menu: true,
      active: Boolean,
      signin: true,
      routers: [],
      loggedInCustomer: false,
      loggedInBaker: false,
      role: String,
    };
  },
  methods: {
    logout() {
      if (this.loggedInCustomer) {
        this.$store.dispatch("AuthCustomer/logout").then(
          () => {
            this.loggedInCustomer = false;
            this.isloggedIn();
          },
          () => {
            console.log("No cerro sesion");
          }
        );
      } else if (this.loggedInBaker) {
        this.$store.dispatch("AuthBaker/logout").then(
          () => {
            this.loggedInBaker = false;
            this.isloggedIn();
          },
          () => {
            console.log("No cerro sesion");
          }
        );
      }
    },
    /*
        var token;
        if (this.loggedInCustomer)
          token = this.$store.state.AuthCustomer.customer.token;
        else if (this.loggedInBaker)
          token = this.$store.state.AuthBaker.baker.token;
        var base64Payload = token.split(".")[1];
        var payload = Buffer.from(base64Payload, "base64");
        var dataToken = JSON.parse(payload.toString());
        this.role = dataToken.role; */
    isloggedIn() {
      this.loggedInCustomer = this.$store.state.AuthCustomer.status.loggedIn;
      this.loggedInBaker = this.$store.state.AuthBaker.status.loggedIn;

      if (this.loggedInCustomer || this.loggedInBaker) {
        this.routers = [
          {
            name: "Privacy",
            desc: "Perfil",
            img: "perifl",
            direct: "routerProfile",
          },
          {
            name: "Bakery",
            desc: "Pastelerias",
            img: "perifl",
            direct: "",
          },
        ];
        if (this.loggedInCustomer)
          this.routers.push({
            name: "Order",
            desc: "Carrito",
            img: "perifl",
            direct: "routerProfile",
          });
      } else {
        this.routers = [
          { name: "Bakery", desc: "Pastelerias", img: "perifl" },
          { name: "SignUp", desc: "Registrarse", img: "perifl" },
          { name: "SignIn", desc: "Ingresar", img: "perifl" },
        ];
      }
    },
    render() {
      let localdata = this;
      const render_width = window.matchMedia("(max-width: 600px)");
      function render(media) {
        if (media.matches) {
          localdata.active = true;
          localdata.menu = Animation.LeftRight(
            "nav-router",
            "nav-bar",
            localdata.menu
          );
        } else {
          localdata.active = false;
          localdata.menu = true;
        }
      }
      render(render_width);
      render_width.addListener(render);
    },
    activeNav() {
      let localdata = this;
      if (localdata.active == true) {
        localdata.menu = Animation.LeftRight(
          "nav-router",
          "nav-bar",
          localdata.menu
        );
      }
    },
    closeNav() {
      let localdata = this;
      if (localdata.menu == true) {
        localdata.menu = Animation.LeftRight(
          "nav-router",
          "nav-bar",
          localdata.menu
        );
      }
    },
  },
  mounted() {
    this.isloggedIn();
    this.render();
  },
};
</script>

<style>
a:link {
  text-decoration: none;
  height: 100%;
  z-index: 999;
}

div.nav-bar {
  width: 100%;
  background: var(--default);
  box-shadow: 0px 0px 5px #1d233d8e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9;
  height: 70px;
}

div.nav-bar > div {
  display: flex;
  align-items: center;
}

div.nav-bar div.nav-title {
  height: 100%;
  padding: 0 25px;
  font-family: Poppins-Black;
  font-size: 22px;
  color: var(--second);
  display: flex;
  justify-content: center;
  align-items: center;
}

div.nav-bar > div.nav-option {
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.nav-bar > div.nav-option > div {
  height: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
}

div.nav-bar > div.nav-option > div.nav-stack {
  display: none;
  flex-direction: column;
  padding: 0px 20px;
}

div.nav-option > div.nav-stack > div {
  width: 35px;
  height: 7px;
  margin-bottom: 3px;
  background: var(--primary);
  border-radius: 15px;
}

div.nav-option {
  height: 100%;
}

div.nav-option div.nav-router div.router {
  display: flex;
  height: 100%;
  flex-direction: row;
}

div.nav-option div.nav-router div.nav-grid {
  height: 100%;
  display: grid;
  grid-template:
    "icon desc" auto/
    0px auto;
  padding: 0 0.8em;
}

div.nav-option div.nav-router a {
  display: flex;
  justify-content: center;
  align-items: center;
}

div.nav-router div.nav-grid div {
  justify-content: center;
  align-items: center;
  display: flex;
}

div.nav-router div.nav-grid div.nav-icon {
  grid-area: icon;
}

div.nav-router div.nav-grid div.nav-desc {
  grid-area: desc;
  color: var(--primary);
  font-family: Poppins-Bold;
  font-size: 1.1rem;
}

div.nav-router {
  height: 100%;
}

div.nav-router a div.nav-grid div.nav-desc p::after {
  content: "";
  display: block;
  width: 0px;
  height: 2px;
  background: var(--line);
  margin: 0px auto;
  border-radius: 3px;
}

div.nav-router a:hover div.nav-grid div.nav-desc p {
  transform: translateY(-2px);
  transition: all 0.5s;
}

div.nav-router a:hover div.nav-grid div.nav-desc p::after {
  width: 100%;
  transition: all 0.3s;
}

@media (max-width: 600px) {
  div.nav-bar > div.nav-option > div.nav-stack {
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
  }

  div.routers {
    display: block !important;
    width: 100%;
    height: 0px !important;
    position: absolute;
    top: 100%;
    right: 0;
  }

  div.nav-option div.nav-router {
    right: 0;
    left: 0;
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    transition: left 0.5s ease;
  }

  div.nav-option div.nav-router div.nav-grid {
    display: grid;
    grid-template:
      "icon desc" 80px /
      auto auto;
    padding: 0 2em;
  }

  div.nav-option div.nav-router div.nav-grid div.nav-desc {
    color: var(--default);
    font-size: 1rem;
  }

  div.nav-option div.nav-router div.nav-grid div.nav-icon img {
    width: 35px;
    height: 35px;
    margin-right: 20px;
    background: var(--default);
  }

  div.nav-option div.nav-router div.router {
    background: var(--primary);
    width: 100%;
    flex-direction: column;
  }

  div.nav-option div.nav-router div.router a {
    height: auto;
    align-items: start;
    flex-direction: column;
  }

  div.nav-option div.nav-router div.router a::after {
    content: "";
    display: block;
    height: 3px;
    width: 90%;
    margin: 0 auto;
    background: var(--default);
    border-radius: 3px;
  }

  div.nav-router a div.nav-grid div.nav-desc p::after {
    display: none;
  }
}
</style>

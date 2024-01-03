<template>
  <div class="nav-bar">
    <router-link to="/">
      <div class="nav-title" @click="closeNav">
        <p class="font-bold text-title">KeekoYa</p>
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
                <div class="nav-desc font-bold">
                  <p>{{ router.desc }}</p>
                </div>
              </div>
            </router-link>
            <router-link v-if="loggedIn === true" to="/">
              <div class="nav-grid" @click="logout">
                <div class="nav-icon">
                  <img />
                </div>
                <div class="nav-desc font-bold">
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

export default {
  name: "NavBar",
  data() {
    return {
      menu: true,
      active: Boolean,
      signin: true,
      routers: [],
      loggedIn: false,
      role: String,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("Authenticate/logout").then(
        () => {
          this.loggedIn = false;
          this.isloggedIn();
        },
        () => {
          console.log("No cerro sesion");
        }
      );
    },
    isloggedIn() {
      this.loggedIn = this.$store.state.Authenticate.status.loggedIn;

      if (this.loggedIn === false) {
        this.routers = [
          { name: "Bakery", desc: "Pastelerias", img: "perifl" },
          { name: "SignUp", desc: "Registrarse", img: "perifl" },
          { name: "SignIn", desc: "Ingresar", img: "perifl" },
        ];
      } else {
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
          {
            name: "Order",
            desc: "Carrito",
            img: "perifl",
            direct: "routerProfile",
          },
        ];
      }
    },
    render() {
      let localdata = this;
      const render_width = window.matchMedia("(max-width: 600px)");
      function render(media) {
        if (media.matches) {
          localdata.active = true;
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
      }
    },
    closeNav() {
      let localdata = this;
      if (localdata.menu == true) {
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
  z-index: 9;
}

div.nav-bar {
  width: 100%;
  background: var(--default);
  box-shadow: 0px 0px 5px #1d233d8e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  height: 70px;
}

div.nav-bar > div {
  display: flex;
  align-items: center;
}

div.nav-bar div.nav-title {
  height: 100%;
  padding: 0 25px;
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

<template>
  <div class="container-profile">
    <div class="container-show">
      <button class="show" @click="navAnimation()"></button>
    </div>
    <div class="container-group">
      <div class="nav-profile">
        <div
          class="profile-grid"
          v-for="(router, index) in routers"
          :key="index"
          @click="navAnimation()"
        >
          <router-link :to="{ name: router.name }" class="option-grid">
            <div class="icon">
              <div class="svg"></div>
            </div>
            <div class="desc">
              <p>{{ router.text }}</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="sub-profile">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Animation from "@/js/animation.js";

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
          name: "Surprise",
          icon: "icon-cake",
          text: "Tortas y Sorpresas",
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
        {
          name: "AddLocation",
          icon: "icon-gps",
          text: "Mis Ubicaciones",
        },
      ],
      routersBaker: [
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
          name: "AddCard",
          icon: "icon-card-add",
          text: "Mis Tarjetas",
        },
        {
          name: "AddProduct",
          icon: "icon-gps",
          text: "Mi tienda",
        },
      ],
      routers: [],
      loggedInCustomer: Boolean,
      loggedInBaker: Boolean,
    };
  },
  methods: {
    isloggedIn() {
      this.loggedInCustomer = this.$store.state.AuthCustomer.status.loggedIn;
      this.loggedInBaker = this.$store.state.AuthBaker.status.loggedIn;
      if (this.loggedInCustomer || this.loggedInBaker) {
        if (this.loggedInCustomer) {
          this.routers = this.routersCustomer;
        } else if (this.loggedInBaker) {
          this.routers = this.routersBaker;
        }
      } else {
        this.$router.push({ name: "Home" });
      }
    },
    render() {
      let localdata = this;
      const render_width = window.matchMedia("(max-width: 1200px)");
      function render(media) {
        if (media.matches) {
          localdata.menu = Animation.LeftRightDisplay(
            "nav-profile",
            "sub-profile",
            localdata.menu
          );
          localdata.active = true;
        } else {
          localdata.menu = true;
          localdata.active = false;
        }
      }
      render(render_width);
      render_width.addListener(render);
    },
    navAnimation() {
      let localdata = this;
      if (this.active === true) {
        localdata.menu = Animation.LeftRightDisplay(
          "nav-profile",
          "sub-profile",
          localdata.menu
        );
      }
    },
  },
  mounted() {
    this.isloggedIn();
    this.render();
    this.navAnimation();
  },
};
</script>

<style>
div.profile-title {
  font-family: Poppins-Bold;
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
  font-family: Poppins-Bold;
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
    font-family: Poppins-Bold;
  }
}
</style>

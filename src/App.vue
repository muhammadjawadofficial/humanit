<template>
  <div id="app">
    <div>
      <b-navbar toggleable="sm" type="dark" variant="dark" sticky>
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">Shell Store</b-navbar-brand>

        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav>
            <template v-for="brand in getBrands">
              <b-nav-item-dropdown
                v-if="brand.phones.length"
                :key="brand.id + '-brand'"
                :text="brand.name"
                right
              >
                <b-dropdown-item
                  :to="'/case/' + phone.id"
                  v-for="phone in brand.phones"
                  :key="phone.id + '-phone'"
                  >{{ phone.name }}</b-dropdown-item
                >
              </b-nav-item-dropdown>
              <b-nav-item disabled v-else href="#" :key="brand.id + '-brand'">{{
                brand.name
              }}</b-nav-item>
            </template>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item class="checkout-btn s-btn m-0" to="/checkout" right>
              Checkout
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view />
      <notifications width="250px" style="top: 60px" position="top right" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "app",
  data() {
    return {
      mobileBrands: [],
      mobileList: [],
      selectedBrand: null,
    };
  },
  computed: {
    ...mapGetters(["getBrands"]),
  },
  methods: {
    ...mapActions(["fetchBrand"]),
    selectBrand(brand) {
      this.selectedBrand = brand;
    },
  },
  mounted() {
    this.fetchBrand();
  },
};
</script>
<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";

#app {
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom right, #e3f0ff, #fafcff);
  min-height: 100vh;
  height: 100%;
}

.app-container {
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 10px 20px #1687d933;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body {
  margin: 0;
}
div.vue-notification {
  border-radius: 5px;
  margin: 5px 10px;
}
.s-btn {
  margin: 10px;
  width: 140px;
  height: 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  &,
  * {
    color: #202020 !important;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none !important;
}
.checkout-btn {
  background: linear-gradient(to bottom right, #b8d7ff, #6e8fbb);
}
.cart-btn {
  background: linear-gradient(to bottom right, #7dc855, #5a923c);
}
</style>

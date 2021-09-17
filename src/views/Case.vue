<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <div v-if="getCases.length" class="case-list">
      <div class="case-wrapper" v-for="caseInfo in getCases" :key="caseInfo.id">
        <div class="case-top-section" @click="routeToCase(caseInfo)">
          <template v-if="caseInfo.caseImages.length">
            <img
              :src="
                'data:' +
                caseInfo.caseImages[0].type +
                ';base64, ' +
                caseInfo.caseImages[0].data
              "
              class="img"
              alt=""
            />
          </template>
          <template v-else>
            <img src="@/assets/noimageplaceholder.png" class="img" alt="" />
          </template>
          <div class="img-info">
            <div class="top-to-bottom">
              <span class="text-to-animate">Tap For More Info</span>
            </div>
            <div class="info-inner">
              <span class="case-name">{{ caseInfo.name }}</span>
              <span class="case-manufacturer">{{ caseInfo.manufacturer }}</span>
            </div>
            <div class="bottom-to-top">
              Available Phones
              <span class="text-to-animate">{{
                getAvailablePhone(caseInfo)
              }}</span>
            </div>
          </div>
        </div>

        <div class="case-bottom-section" @click="addProductToCart(caseInfo)">
          <div class="h-bg">
            <div class="h-bg-inner"></div>
          </div>
          <a class="cart">
            <span class="price">${{ caseInfo.price }}</span>
            <span class="add-to-cart">
              <span class="txt">Add in cart</span>
            </span>
          </a>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Unfortunately, We have no case for {{ phoneInfo.name }}</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      items: [],
      phoneInfo: {
        id: null,
        name: null,
      },
    };
  },
  watch: {
    "$route.params": function (val) {
      this.routeChangeHandler(val);
    },
  },
  computed: {
    ...mapGetters(["getCartDetails", "getCases", "getBrands"]),
  },
  mounted() {
    this.fetchCases(this.$route.params.phoneId);
    this.initializeBreadcrumb();
  },
  methods: {
    routeChangeHandler(val) {
      this.fetchCases(val.phoneId);
      if (!val.phoneId) {
        this.initializeBreadcrumb();
      } else if (this.getBrands.length) {
        this.getBrands.forEach((brand) => {
          brand.phones.forEach((phone) => {
            if (phone.id == val.phoneId) {
              this.phoneInfo = phone;
            }
          });
        });
        this.changeBreadCrumb(this.phoneInfo);
      }
    },
    initializeBreadcrumb() {
      this.items = [
        {
          text: "Home",
          to: "/case",
        },
      ];
    },
    changeBreadCrumb(phoneInfo) {
      this.items.splice(1, 1);
      this.items.push({
        text: phoneInfo.name,
        to: "/case/" + phoneInfo.id,
      });
    },
    ...mapActions(["addToCart", "fetchCases"]),
    addProductToCart(caseInfo) {
      let phoneId = this.$route.params.phoneId;
      if (phoneId) {
        let quantity = caseInfo.phoneCases.find(
          (x) => x.phoneInfo.id == phoneId
        ).quantity;
        console.log("total quantity is : ", quantity);
        this.addToCart({
          data: caseInfo,
          phoneId: phoneId,
        });

        this.$notify({
          title: "Success!",
          type: "success",
          text: "Added to Cart!",
          duration: 2000,
          speed: 400,
        });
      } else {
        this.$notify({
          title: "Failure!",
          type: "error",
          text: "Select a model first!",
          duration: 2000,
          speed: 400,
        });
      }
    },
    routeToCase(caseInfo) {
      if (this.$route.params.phoneId) {
        this.$router.push({
          name: "CaseDetails",
          params: {
            caseId: caseInfo.id,
            phoneId: this.$route.params.phoneId || null,
          },
        });
      } else {
        this.$router.push({
          name: "CaseDetailsByCaseId",
          params: {
            caseId: caseInfo.id,
          },
        });
      }
    },
    getAvailablePhone(caseInfo) {
      let allPhones = "";
      caseInfo.phoneCases.forEach((x) => {
        if (allPhones != "") {
          allPhones += ", ";
        }
        allPhones += x.phoneInfo.name;
      });
      return allPhones;
    },
  },
};
</script>

<style lang="scss" scoped>
.case-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  .case {
    flex: 1;
  }
}
.case {
  padding: 10px;
  margin: 5px;
  border: 1px solid grey;
  border-radius: 5px;
}
.d-flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.align-center {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.flex-centerY-centerX {
  justify-content: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

body {
  background-color: #f7f7f7;
}

.page-wrapper {
  height: 100%;
  display: table;
}

.page-wrapper .page-inner {
  display: table-cell;
  vertical-align: middle;
}

.case-wrapper {
  width: calc(25% - 30px);
  padding: 15px;
  margin: 15px auto;
  background-color: #fff;
  cursor: pointer;
}

@media (max-width: 991px) {
  .case-wrapper {
    width: 345px;
  }
}

@media (max-width: 767px) {
  .case-wrapper {
    width: 290px;
    margin: 30px auto;
  }
}

.case-wrapper:hover .h-bg {
  left: 0px;
}

.case-wrapper:hover .price {
  left: 20px;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #818181;
}

.case-wrapper:hover .add-to-cart {
  left: 50%;
}

.case-wrapper:hover .img {
  webkit-filter: blur(7px);
  -o-filter: blur(7px);
  -ms-filter: blur(7px);
  filter: blur(7px);
  filter: progid:DXImageTransform.Microsoft.Blur(pixelradius='7', shadowopacity='0.0');
  opacity: 0.4;
}

.case-wrapper:hover .info-inner {
  bottom: 155px;
}

.case-wrapper:hover {
  .bottom-to-top,
  .top-to-bottom {
    -webkit-transition-delay: 300ms;
    -o-transition-delay: 300ms;
    transition-delay: 300ms;
    opacity: 1;
  }
  .bottom-to-top {
    bottom: 50px;
  }
  .top-to-bottom {
    top: 50px;
  }
}

.case-wrapper .case-bottom-section {
  width: 100%;
  height: 60px;
  position: relative;
  overflow: hidden;
}

.case-wrapper .case-top-section {
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.case-wrapper .img {
  padding: 20px 0;
  height: calc(100% - 80px);
  -webkit-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  -moz-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  -o-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
}

.h-bg {
  -webkit-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  -moz-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  -o-transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  transition: all 800ms cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  width: 660px;
  height: 100%;
  background-color: #3f96cd;
  position: absolute;
  left: -659px;
}

.h-bg .h-bg-inner {
  width: 50%;
  height: 100%;
  background-color: #464646;
}

.info-inner {
  -webkit-transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
  -moz-transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
  -o-transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
  transition: all 400ms cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  position: absolute;
  width: 100%;
  bottom: 10px;
}

.info-inner .case-name,
.info-inner .case-manufacturer {
  display: block;
}

.info-inner .case-name {
  font-family: "PT Sans", sans-serif;
  font-size: 18px;
  color: #252525;
}

.info-inner .case-manufacturer {
  font-family: "Lato", sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  color: #8c8c8c;
}

.bottom-to-top,
.top-to-bottom {
  -webkit-transition: all 300ms cubic-bezier(0, 0, 0.18, 1);
  -moz-transition: all 300ms cubic-bezier(0, 0, 0.18, 1);
  -o-transition: all 300ms cubic-bezier(0, 0, 0.18, 1);
  transition: all 300ms cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  position: absolute;
  width: 100%;
  font-family: "PT Sans", sans-serif;
  color: #828282;
  opacity: 0;
}

.bottom-to-top {
  bottom: -20px;
}
.top-to-bottom {
  top: -20px;
}

.bottom-to-top,
.top-to-bottom {
  .text-to-animate {
    color: #252525;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.cart {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-family: "Lato", sans-serif;
  font-weight: 700;
}

.cart .price {
  -webkit-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  -moz-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  -o-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-delay: 100ms;
  -o-transition-delay: 100ms;
  transition-delay: 100ms;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #252525;
}

.cart .add-to-cart {
  -webkit-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  -moz-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  -o-transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  transition: all 600ms cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -moz-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  -o-transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  transition-timing-function: cubic-bezier(0, 0, 0.18, 1);
  /* ease-out */
  -webkit-transition-delay: 100ms;
  -o-transition-delay: 100ms;
  transition-delay: 100ms;
  display: block;
  position: absolute;
  top: 50%;
  left: 110%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.cart .add-to-cart .txt {
  font-size: 12px;
  color: #fff;
  letter-spacing: 0.045em;
  text-transform: uppercase;
  white-space: nowrap;
}
</style>
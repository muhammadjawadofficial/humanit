<template>
  <main class="container app-container" v-if="caseDetails">
    <!-- Left Column / Headphones Image -->
    <div class="left-column">
      <div class="slides">
        <span
          class="dot"
          :class="{ active: activeSlide == slide.id }"
          v-for="slide in caseDetails.caseImages"
          :key="slide.id"
          @click="activeSlide = slide.id"
        ></span>
      </div>
      <div class="images">
        <template v-if="caseDetails.caseImages.length">
          <img
            v-for="(slide, index) in caseDetails.caseImages"
            :key="slide.id"
            :class="{ active: activeSlide == slide.id }"
            :src="
              utilService.parseImageSrc(
                caseDetails.caseImages[index].type,
                caseDetails.caseImages[index].data
              )
            "
            alt=""
          />
        </template>
        <template v-else>
          <img
            src="@/assets/noimageplaceholder.png"
            class="img active"
            alt=""
          />
        </template>
      </div>
      <!-- <img data-image="blue" src="images/blue.png" alt="" />
      <img data-image="red" class="active" src="images/red.png" alt="" /> -->
    </div>

    <!-- Right Column -->
    <div class="right-column">
      <!-- Product Description -->
      <div class="product-description">
        <span>Phone Case</span>
        <h1>{{ caseDetails.name }}</h1>
        <p>
          {{ caseDetails.description }}
        </p>
      </div>

      <!-- Product Configuration -->
      <div class="product-configuration">
        <!-- Mobile Configuration -->
        <div class="mobile-option text-left">
          <template v-if="phoneDetails.length">
            <div class="mobile-option-select">
              <v-select
                v-model="selectedPhone"
                :options="phoneDetails"
                label="phone"
              >
                <template #header>
                  <div style="opacity: 0.8">Select a Model</div>
                </template>
              </v-select>
            </div>
          </template>
          <template v-else> Not Available </template>
        </div>
      </div>
      <!-- Product Pricing -->
      <div class="product-price">
        <span>${{ caseDetails.price }}</span>
        <a
          v-if="phoneDetails.length"
          @click="addProductToCart()"
          class="cart-btn s-btn"
          >Add to cart</a
        >
        <a v-else class="cart-btn s-btn not-allowed">N/A</a>
        <router-link class="checkout-btn s-btn" to="/checkout"
          >Checkout</router-link
        >
      </div>
    </div>
  </main>
</template>

<script>
import CaseService from "@/services/CaseService";
import vSelect from "vue-select";
import Util from "@/services/Util";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    "v-select": vSelect,
  },
  computed: {
    ...mapGetters(["getCartDetails"]),
  },
  data() {
    return {
      caseDetails: null,
      utilService: Util,
      activeSlide: 0,
      phoneDetails: [],
      selectedPhone: {},
    };
  },
  mounted() {
    CaseService.getCasesById(this.$route.params.caseId).then((res) => {
      this.caseDetails = res.data;
      if (this.caseDetails.caseImages.length) {
        this.activeSlide = this.caseDetails.caseImages[0].id;
      }
      this.phoneDetails = [
        ...this.caseDetails.phoneCases.map((x) => {
          return {
            id: x.id,
            name: x.name,
            phoneId: x.phoneInfo.id,
            phone: x.phoneInfo.name,
            quantity: x.quantity,
          };
        }),
      ];
      this.selectedPhone = this.phoneDetails.find(
        (x) => x.phoneId == this.$route.params.phoneId
      );
    });
  },
  methods: {
    ...mapActions(["addToCart"]),
    getCaseFromCart(id) {
      return this.getCartDetails.find((x) => id == x.phoneId);
    },
    popMessage(type, title, text) {
      this.$notify({
        title: title,
        type: type,
        text: text,
        duration: 2000,
        speed: 400,
      });
    },
    addProductToCart() {
      if (!this.selectedPhone || !this.selectedPhone.phoneId) {
        this.popMessage("error", "Failure!", "Select a model first!");
        return;
      }
      let caseFromCart = this.getCaseFromCart(this.selectedPhone.phoneId);
      let totalQuantity = this.selectedPhone.quantity;
      let isNotOutOfStock =
        !caseFromCart || caseFromCart.quantity < totalQuantity;

      if (totalQuantity > 0 && isNotOutOfStock) {
        this.addToCart({
          data: this.caseDetails,
          phoneId: this.selectedPhone.phoneId,
        });
        this.popMessage("success", "Success!", "Added to Cart!");
      } else {
        this.popMessage("error", "Failure!", "Out of Stock!");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.slides {
  position: absolute;
  bottom: 0;
  display: flex;
  left: 0;
  right: 0;
  justify-content: center;
  z-index: 1;
  .dot {
    &.active::after {
      background-color: grey;
    }
    &::after {
      cursor: pointer;
      content: "";
      display: block;
      width: 10px;
      aspect-ratio: 1/1;
      //   background-color: grey;
      border: 1px solid grey;
      border-radius: 50%;
      margin: 4px;
    }
  }
}
/* Columns */
.left-column {
  width: 65%;
  position: relative;
}

.right-column {
  width: 35%;
  margin-top: 60px;
}

/* Left Column */
.left-column img {
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  opacity: 0;
  transition: all 0.3s ease;
}

.left-column img.active {
  opacity: 1;
}

/* Product Description */
.product-description {
  border-bottom: 1px solid #e1e8ee;
  margin-bottom: 20px;
}
.product-description span {
  font-size: 12px;
  color: #358ed7;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
}
.product-description h1 {
  font-weight: 300;
  font-size: 52px;
  color: #43484d;
  letter-spacing: -2px;
}
.product-description p {
  font-size: 16px;
  font-weight: 300;
  color: #86939e;
  line-height: 24px;
}

/* Product Color */
.product-color {
  margin-bottom: 30px;
}

.color-choose div {
  display: inline-block;
}

.color-choose input[type="radio"] {
  display: none;
}

.color-choose input[type="radio"] + label span {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: -1px 4px 0 0;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 50%;
}

.color-choose input[type="radio"] + label span {
  border: 2px solid #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
}

.color-choose input[type="radio"]:checked + label span {
  /* background-image: url(images/check-icn.svg); */
  background-repeat: no-repeat;
  background-position: center;
}

/* Cable Configuration */
.cable-choose {
  margin-bottom: 20px;
}

.cable-choose button {
  border: 2px solid #e1e8ee;
  border-radius: 6px;
  padding: 13px 20px;
  font-size: 14px;
  color: #5e6977;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.5s;
}

.cable-choose button:hover,
.cable-choose button:active,
.cable-choose button:focus {
  border: 2px solid #86939e;
  outline: none;
}

.mobile-option {
  border-bottom: 1px solid #e1e8ee;
  margin-bottom: 20px;
  &-select {
    margin: 10px auto;
  }
}

.mobile-option a {
  color: #358ed7;
  text-decoration: none;
  font-size: 12px;
  position: relative;
  margin: 10px 0;
  display: inline-block;
}
.mobile-option a:before {
  content: "?";
  height: 15px;
  width: 15px;
  border-radius: 50%;
  border: 2px solid rgba(53, 142, 215, 0.5);
  display: inline-block;
  text-align: center;
  line-height: 16px;
  opacity: 0.5;
  margin-right: 5px;
}

/* Product Price */
.product-price {
  display: flex;
  align-items: center;
}

.product-price span {
  font-size: 26px;
  font-weight: 300;
  color: #43474d;
  margin-right: 20px;
}

.cart-btn {
  &.not-allowed {
    cursor: not-allowed;
  }
}
.cart-btn + .cart-btn {
  margin-left: 10px;
}
.cart-btn:hover {
  background-color: #64af3d;
}

/* Responsive */
@media (max-width: 940px) {
  .container {
    flex-direction: column;
    margin-top: 60px;
  }

  .left-column,
  .right-column {
    width: 100%;
  }

  .left-column img {
    width: 300px;
    right: 0;
    top: -65px;
    left: initial;
  }
}

@media (max-width: 535px) {
  .left-column img {
    width: 220px;
    top: -85px;
  }
}
.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 15px 15px 30px;
  display: flex;
}
</style>
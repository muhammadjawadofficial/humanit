<template>
  <div class="cart-section">
    <div class="cart-container">
      <div class="header">
        <h3 class="heading">Shopping Cart</h3>
        <h5 class="remove-all" @click="setCart()">Remove all</h5>
      </div>
      <div class="cart-items no-data" v-if="!getCartDetails.length">
        <h2>No Data Added to Cart</h2>
      </div>
      <div
        class="cart-items"
        v-for="(item, index) in getCartDetails"
        :key="index + 'item'"
      >
        <div class="image-box">
          <template v-if="item.data.caseImages.length">
            <img
              :src="
                utilService.parseImageSrc(
                  item.data.caseImages[0].type,
                  item.data.caseImages[0].data
                )
              "
              style="height=120px"
            />
          </template>
          <template v-else>
            <img
              src="@/assets/noimageplaceholder.png"
              class="img active"
              alt=""
              style="height=120px"
            />
          </template>
        </div>
        <div class="about">
          <h1 class="title">{{ item.data.name }}</h1>
          <h3 class="subtitle">{{ getPhoneName(item) }}</h3>
        </div>
        <div class="counter">
          <div class="btn" @click="incrementQuantity(index)">+</div>
          <div class="count">{{ item.quantity }}</div>
          <div class="btn" @click="decrementQuantity(index)">-</div>
        </div>
        <div class="prices">
          <div class="amount">${{ item.quantity * item.data.price }}</div>
          <div class="remove" @click="removeItem(index)"><u>Remove</u></div>
        </div>
      </div>
      <hr />
      <div class="checkout">
        <div class="total">
          <div>
            <div class="Subtotal">Sub-Total</div>
            <div class="items">{{ getCartDetails.length }} items</div>
          </div>
          <div class="total-amount">${{ getTotalValue() }}</div>
        </div>
        <button class="checkout-btn s-btn ml-auto">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Util from "@/services/Util";
export default {
  data() {
    return {
      utilService: Util,
    };
  },
  computed: {
    ...mapGetters(["getCartDetails"]),
  },
  methods: {
    ...mapActions([
      "decrementQuantity",
      "incrementQuantity",
      "removeItem",
      "setCart",
    ]),
    getPhoneName(item) {
      let phoneName = "";
      item.data.phoneCases.forEach((x) => {
        if (x.phoneInfo.id === item.phoneId) {
          phoneName = x.phoneInfo.name;
        }
      });
      return phoneName;
    },
    getTotalValue() {
      let totalValue = 0;
      this.getCartDetails.forEach((x) => {
        totalValue += x.data.price * x.quantity;
      });
      return totalValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}
.cart-container {
  width: 70%;
  height: 90%;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 10px 20px #1687d933;
  padding: 20px 0;
}

.header {
  margin: auto;
  width: 90%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.heading {
  font-size: 20px;
  font-family: "Open Sans";
  font-weight: 700;
  color: #2f3841;
}

.remove-all {
  font-size: 14px;
  font-family: "Open Sans";
  font-weight: 600;
  color: #e44c4c;
  cursor: pointer;
  border-bottom: 1px solid #e44c4c;
}

.cart-items {
  margin: auto;
  width: 90%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  &.no-data {
    justify-content: center;
  }
}
.image-box {
  img {
    width: 100%;
  }
  width: 15%;
  text-align: center;
}
.about {
  height: 100%;
  width: 45%;
}
.title {
  padding-top: 10px;
  font-size: 32px;
  font-family: "Open Sans";
  font-weight: 800;
  color: #202020;
}
.subtitle {
  line-height: 10px;
  font-size: 18px;
  font-family: "Open Sans";
  font-weight: 600;
  color: #909090;
}

.counter {
  width: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-family: "Open Sans";
  font-weight: 900;
  color: #202020;
  cursor: pointer;
}
.count {
  font-size: 20px;
  font-family: "Open Sans";
  font-weight: 600;
  color: #202020;
}

.prices {
  height: 100%;
  text-align: right;
}
.amount {
  padding-top: 20px;
  font-size: 26px;
  font-family: "Open Sans";
  font-weight: 800;
  color: #202020;
}
.remove {
  padding-top: 5px;
  font-size: 14px;
  font-family: "Open Sans";
  font-weight: 600;
  color: #e44c4c;
  cursor: pointer;
}

.pad {
  margin-top: 5px;
}

hr {
  width: 66%;
  float: right;
  margin-right: 5%;
}
.checkout {
  float: right;
  margin-right: 5%;
  width: 28%;
}
.total {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.Subtotal {
  font-size: 22px;
  font-family: "Open Sans";
  font-weight: 700;
  color: #202020;
}
.items {
  font-size: 16px;
  font-family: "Open Sans";
  font-weight: 500;
  color: #909090;
  line-height: 10px;
}
.total-amount {
  font-size: 36px;
  font-family: "Open Sans";
  font-weight: 900;
  color: #202020;
}
</style>
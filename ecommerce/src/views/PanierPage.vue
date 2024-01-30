<template>
  <div class="panier-container">
    <div
      class="panier-item-card"
      v-for="(product, index) in this.objectsInCart"
      :key="index"
    >
      <img :src="product.image" alt="" />
      <p>{{ product.description }}</p>
      <div class="buttons-container">
        <button class="remove-button" @click="removeItem(product.Id)">
          Remove item
        </button>
        <div class="quantity-container">
          <button
            :class="product.quantity === 1 ? 'greyed' : ' '"
            @click="decrease(product, product.Id)"
          >
            -
          </button>
          <p>{{ product.quantity }}</p>
          <button @click="increase(product, product.Id)">+</button>
          <p>US$ {{ product.price * product.quantity }}</p>
        </div>
      </div>
    </div>
    <div class="separation-line"></div>
    <div class="total-container">
      <p>Grand Total: US$ {{ this.$store.getters.getTotal.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      objectsInCart: [],
    };
  },
  methods: {
    removeItem(id) {
      console.log(id);
      localStorage.removeItem(`item_${id}`);
      this.$store.dispatch("setProductsInCart");
      this.$store.dispatch("setPriceTotal");
      location.reload();
    },
    increase(item, Id) {
      item.quantity++;
      this.$store.dispatch("setProductsInCart");
      this.changeStorageQuantity(Id, item.quantity);
      this.$store.dispatch("setPriceTotal");
    },
    decrease(item, Id) {
      if (item.quantity > 1) {
        item.quantity--;
        this.$store.dispatch("setProductsInCart");
        this.changeStorageQuantity(Id, item.quantity);
        this.$store.dispatch("setPriceTotal");
      }
    },
    changeStorageQuantity(index, newAmount) {
      let item = JSON.parse(localStorage.getItem(`item_${index}`));
      item.quantity = newAmount;
      localStorage.setItem(`item_${index}`, JSON.stringify(item));
    },
    loadCart() {
      let items = Object.keys(localStorage)
        .filter((key) => key.startsWith("item_"))
        .map((key) => JSON.parse(localStorage.getItem(key)));
      this.objectsInCart = items;
    },
  },
  mounted() {
    this.loadCart();
    this.$store.dispatch("setProductsInCart");
    this.$store.dispatch("setPriceTotal");
  },
};
</script>

<style lang="scss">
.panier-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.panier-item-card {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  width: 66%;
  gap: 30px;

  p {
    margin: 0 25px;
    max-width: 400px;
  }

  img {
    width: 100px;
    height: 100px;
  }
}

.remove-button {
  background: none;
  cursor: pointer;
  border: none;
  text-decoration: underline;
  margin: 10px 0;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  width: 25%;
}

.quantity-container {
  width: 70%;
  display: flex;
  justify-content: flex-end;

  button {
    width: 25px;
    height: 20px;
    border-radius: 3px;
    align-self: center;
    background-color: rgb(228, 228, 228);
    border: 1px solid black;
    cursor: pointer;
  }

  .greyed {
    border: 1px solid lightgrey;
    color: lightgrey;
  }

  p {
    align-self: center;
    margin: 0 5px;
  }
}

.separation-line {
  height: 1px;
  width: 66%;
  background-color: lightgrey;
}
.total-container {
  width: 66%;
  display: flex;
  font-weight: bold;
  justify-content: flex-end;
}
</style>
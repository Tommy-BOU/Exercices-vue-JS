<template>
  <div class="container">
    <ItemCard
      v-for="(product, index) in products"
      :key="index"
      :Id="product.Id"
      :image="product.image"
      :title="product.title"
      :price="product.price"
      :quantity="product.quantity"
      :item="product"
      :selectedBool="checkSelected(product.Id)"
    />
  </div>
</template>

<script>
import ItemCard from "@/components/ItemCard.vue";
export default {
  data() {
    return {
      isSelected: false,
    };
  },
  components: { ItemCard },
  methods: {
    checkSelected(index) {
            let items = Object.keys(localStorage)
                .filter((key) => key.startsWith("item_"))
                .map((key) => JSON.parse(localStorage.getItem(key)));
            for (let i of items){
              if (i.Id === index){
                return true;
              }
            }

    },
    APIcall() {
      this.axios.get("https://fakestoreapi.com/products").then((response) => {
        for (let data in response.data) {
          let newProduct = {
            title: "",
            image: "",
            price: 0,
            description: "",
            quantity: 0,
            Id: null,
          };
          newProduct.title = response.data[data].title;
          newProduct.image = response.data[data].image;
          newProduct.price = response.data[data].price;
          newProduct.description = response.data[data].description;
          newProduct.Id = parseInt(data);
          this.$store.commit("setProducts", newProduct);
        }
      });
    },
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
  },
  created() {
    this.APIcall();
    this.$store.dispatch("setProductsInCart");
    this.$store.dispatch("setPriceTotal");
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.item-card {
  padding: 25px;
  width: 350px;
  height: 250px;
  box-shadow: 1px 5px 10px 1px lightgrey;
}
.item-card img {
  width: 100px;
  height: 100px;
}

.selected-item {
  border: 1px solid cornflowerblue;
}
</style>
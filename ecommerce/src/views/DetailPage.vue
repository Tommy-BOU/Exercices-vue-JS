<template>
  <div class="detail-container">
    <img :src="currentItem.image" alt="" />
    <div class="detail-subcontainer">
      <h1>{{ currentItem.title }}</h1>
      <p class="detail-price">US$ {{ currentItem.price }}</p>
      <h2>Description</h2>
      <p>{{ currentItem.description }}</p>
      <MyButton
        :label="isSelected ? 'supprimer' : 'Ajouter au panier'"
        :backgroundColor="isSelected ? 'red' : 'blue'"
        @generalEventBtn="addToCart(currentItem)"
      />
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/MyButton.vue";
export default {
  data() {
    return {
      // currentItem: {},
      isSelected: false,
    };
  },
  components: {
    MyButton,
  },
  methods:{
     addToCart(item) {
      if (!this.isSelected) {
        this.isSelected = true;
        if (item.quantity === 0) {
          item.quantity = 1;
        }

        localStorage.setItem(`item_${item.Id}`, JSON.stringify(item));
      } else {
        this.isSelected = false;
        localStorage.removeItem(`item_${item.Id}`);
      }
      this.$store.dispatch("setProductsInCart");
      this.$store.commit("updatePriceTotal");
    },
  },
  computed: {
    currentItem() {
      return this.$store.getters.getCurrentItem;
    },
  },
  created() {
    let itemId = this.$route.params.id;
    this.$store.commit("selectUser", itemId);
  },
};
</script>

<style lang="scss">
.detail-container {
  border: 1px solid grey;
  display: flex;
  padding: 50px;
  margin: 50px;
  gap: 50px;
  align-items: center;

  img {
    width: 400px;
    height: 400px;
  }
  .detail-subcontainer {
    display: flex;
    flex-direction: column;
    .detail-price {
      border: 1px solid blue;
      width: 100px;
      padding: 20px 10px;
    }
    p{
      line-height: 50px;
    }
  }
}
</style>
<template>
  <div class="item-card" v-bind:class="isSelected ? 'selected-item' : ' '">
    <img :src="image" alt="" />
    <p class="title">{{ title }}</p>
    <p class="price">US$ {{ price }}</p>
    <div class="aligned">
      <button class="detail-button" @click="viewDetail(item.Id)">voir les détails</button>
      <MyButton
        :label="isSelected ? 'supprimer' : 'Ajouter au panier'"
        :backgroundColor="isSelected ? 'red' : 'blue'"
        @generalEventBtn="addToCart(item)"
      />
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/MyButton.vue";
export default {
  data() {
    return {
      isSelected: this.selectedBool,
      itemData: {},
    };
  },
  components: {
    MyButton,
  },
  props: {
    selectedBool: {type: Boolean},
    image: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    Id: { type: Number, required: true },
    item: { type: Object, required: true },
  },
  methods: {
    viewDetail(id) {
      //  Faire une redirection vers le composant views updateUser.vue
      this.$router.push({ name: "detail", params: { id } });
    },
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
      this.$store.dispatch("setPriceTotal");
    },
  },
};
</script>

<style lang="scss">
.price {
  font-weight: bold;
}
.aligned {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.detail-button{
  background: none;
  border: none;
  text-decoration: underline;
  color: purple;
  cursor: pointer;
}
</style>
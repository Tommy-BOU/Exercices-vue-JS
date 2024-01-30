import { createStore } from 'vuex'


export default createStore({
    state: {  // Etat global -> propriété de données partagées par tous les composants 
        products: [],
        productsInCart: 0,
        priceTotal: 0,
        currentItem: null,
    },
    mutations: { // Mutations -> méthodes qui modifient les propriétés de l'état global, synchrone
        setProducts(state, item) {
            state.products.push(item);
        },
        increaseProductsInCart(state) {
            state.productsInCart++;
        },
        decreaseProductsInCart(state) {
            state.productsInCart--;
        },
        updateProductsInCart(state, count) {
            state.productsInCart = count;
        },
        initializePriceTotal(state, amount) {
            state.priceTotal = amount;
        },
        selectUser(state, itemId) {
            let selectedItem = state.products[itemId];
            if (selectedItem) {
                state.currentItem = selectedItem;
            } else {
                alert('Produit introuvable')
            }
        },
    },



    actions: {// Actions -> méthodes asynchrone

        setProductsInCart(context) {
            let items = Object.keys(localStorage)
                .filter((key) => key.startsWith("item_"))
                .map((key) => JSON.parse(localStorage.getItem(key)));
            context.commit('updateProductsInCart', items.length);
        },
        setPriceTotal(context) {
            let items = Object.keys(localStorage)
                .filter((key) => key.startsWith("item_"))
                .map((key) => JSON.parse(localStorage.getItem(key)));
            let sum = 0;
            for (let data in items) {

                sum += items[data].price * items[data].quantity;
            }
            context.commit('initializePriceTotal', sum);
        },
    },
    getters: {// Getters -> propriétés calculées partagées par tous les composants ( computed)
        getProductId(state, index) {
            return state.products[index].Id;
        },
        getProducts(state) {
            return state.products;
        },
        getTotal(state) {
            return state.priceTotal;
        },
        getProductsInCart(state) {
            return state.productsInCart;
        },
        getCurrentItem(state) {
            return state.currentItem;
        }
    },
})

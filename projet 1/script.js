const app = Vue.createApp({
    data() {
        return {
            products: [
                {
                    image: "./img/bigmac.webp",
                    nom: "Big Mac",
                    prix: 5.99,
                    quantity: 0,
                    isSelected: false,
                },

                {
                    image: "./img/mcchicken.jpeg",
                    nom: "Mc Chicken",
                    prix: 4.99,
                    quantity: 0,
                    isSelected: false,
                },

                {
                    image: "./img/doublecheese.webp",
                    nom: "Double Cheese",
                    prix: 2.99,
                    quantity: 0,
                    isSelected: false,
                },

                {
                    image: "./img/frite.webp",
                    nom: "Frites",
                    prix: 2.99,
                    quantity: 0,
                    isSelected: false,
                },

                {
                    image: "./img/mcnugget.jpeg",
                    nom: "Mc Nuggets",
                    prix: 3.49,
                    quantity: 0,
                    isSelected: false,
                },

                {
                    image: "./img/salade.jpeg",
                    nom: "Salade",
                    prix: 2.79,
                    quantity: 0,
                    isSelected: false,
                },

                {
                    image: "./img/coca.jpeg",
                    nom: "Coca-Cola",
                    prix: 1.99,
                    quantity: 0,
                    isSelected: false,
                },

                {
                    image: "./img/icetea.png",
                    nom: "Lipton Ice-tea",
                    prix: 1.99,
                    quantity: 0,
                    isSelected: false,
                },

                {
                    image: "./img/bouteilledeau.png",
                    nom: "Eau",
                    prix: 1.49,
                    quantity: 0,
                    isSelected: false,
                },

            ],
            total: 0,

        }
    },
    methods: {
        selectItem(item) {
            if (item.quantity === 0){
                item.isSelected = true;
                item.quantity = 1;
            }
            else if (item.quantity > 1){
                return;
            }
            else{
                item.isSelected = false;
                item.quantity = 0;
            }
            // item.quantity = item.isSelected && item.quantity === 1 ? 0 : item.quantity; 
            // item.quantity = item.quantity === 0 && !item.isSelected ? 1 : item.quantity; 
            // item.isSelected = item.quantity === 1 ? !item.isSelected : item.isSelected;
        },
        refreshTotal() {
            let sum = 0
            for (let item of this.products)
                sum += (item.quantity * item.prix);
            this.total = sum;
            return this.total.toFixed(2);
        }
    }
})

app.mount('#app');
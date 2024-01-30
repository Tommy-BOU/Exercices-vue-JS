const app = Vue.createApp({
    data() {
        return {
            products: [],
            itemName: "",
            itemPrice: null,
            itemQuantity: null,
            itemCategory: "",
            modificationId: null,
            modalToggle: false,
        }
    },

    methods: {
        createItem() {
            let canCreate = this.itemName != "" && this.itemPrice != null && this.itemPrice > 0 && this.itemQuantity > 0 && this.itemQuantity != null & this.itemCategory != "";
            if (canCreate) {
                let newItem = {
                    name: this.itemName,
                    price: this.itemPrice,
                    quantity: this.itemQuantity,
                    category: this.itemCategory,
                    id: this.products.length,
                };

                this.products.push(newItem);
                this.itemName = "";
                this.itemPrice = null;
                this.itemQuantity = null;
                this.itemCategory = "";
            }
            else {
                alert("Invalid form. (Fields can't be empty & values must be greater than 0)");
            }

        },
        deleteItem(index) {
            let validateDelete = window.confirm("Are you sure you want to delete ?");
            if (validateDelete) {
                this.products.splice(index, 1);
                this.updateId();
            }

        },
        updateId() {
            for (let index in this.products)
                this.products[index].id = parseInt(index);
        },
        modifyItem(index) {

            this.itemName = this.products[index].name;
            this.itemPrice = this.products[index].price;
            this.itemQuantity = this.products[index].quantity;
            this.itemCategory = this.products[index].category;
            this.modificationId = this.products[index].id;

        },
        confirmChanges() {
            let canModify = this.itemName != "" && this.itemPrice != null && this.itemPrice > 0 && this.itemQuantity > 0 && this.itemQuantity != null & this.itemCategory != "";
            if (canModify) {
                let index = this.modificationId;
                let item = this.products[index];
                item.name = this.itemName;
                item.price = this.itemPrice;
                item.quantity = this.itemQuantity;
                item.category = this.itemCategory;

                this.modalToggle = !this.modalToggle
                this.resetVariables();
            }
            else {
                alert("Invalid form. (Fields can't be empty & values must be greater than 0)");
            }
        },
        resetVariables() {
            this.itemName = "";
            this.itemPrice = null;
            this.itemQuantity = null;
            this.itemCategory = "";
            this.modificationId = null;
        }
    }
});

app.mount("#app");
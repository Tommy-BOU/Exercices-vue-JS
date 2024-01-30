<template>
  <div>
    <!-- On défini le type d'event avec @click et on appelle la méthode methGeneralEvent  qui va donner un alias pour la méthode qu'on va utiliser dans le composant parent -->
    <!-- : -> v-bind -->
    <!-- @ -> v-on -->
    <button class="customButton" :class="btnClass" @click="methGeneralEvent">{{ label }}</button>
    <!-- Equivalent -->
    <!-- <button v-bind:class="btnClass" v-on:click="methGeneralEvent">{{ label }}</button> -->
  </div>
</template>

<script>
export default {

    props: {
        label: String, 
        backgroundColor: String
     
    }, 
    methods: {
        methGeneralEvent() {
            // Event personnalisé 
            // Déclarer un alias pour appeler l'evenment sur le composant parent
            this.$emit('generalEventBtn');
        }
    },
    computed: {
        btnClass() {

        return {

            'green-btn': this.backgroundColor === 'green',

            'red-btn': this.backgroundColor === 'red',

            'blue-btn': this.backgroundColor === 'blue'

          }

        }
    }

}
</script>

<style>
.green-btn {
    background-color: green;
    color: white;
}
.red-btn {
    background-color: red;
    color: white;
}
.blue-btn {
    background-color: blue;
    color: white;
}

.customButton{
    border-radius: 20px;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}

</style>
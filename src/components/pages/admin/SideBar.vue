<script setup lang="ts">

</script>

<template>

  <v-layout>
    <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        theme="dark"
        permanent
    >
      <v-list nav>
        <router-link :to="{name: 'dashboard'}" class="no-underline" value="dashboard" active-class="active">
          <v-list-item prepend-icon="mdi-clock-start"  class="item">Dashboard</v-list-item>
        </router-link>

        <router-link :to="{name: 'user'}" class="no-underline" value="user">
          <v-list-item prepend-icon="mdi-email" value="inbox" class=" item">User</v-list-item>
        </router-link>

        <router-link :to="{name: 'product'}" class="no-underline" value="product">
          <v-list-item prepend-icon="mdi-clock-start"  class="item">Product</v-list-item>
        </router-link>
      </v-list>

    </v-navigation-drawer>

  </v-layout>


</template>

<style scoped>
.no-underline {
  text-decoration: none;
}
.active{
  color: black !important;
}

.item   .v-list-item-title{
  font-size: 20px;
  color: white;
}
</style>
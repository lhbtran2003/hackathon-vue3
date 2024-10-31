<script setup lang="ts">
import SideBar from "./SideBar.vue";

</script>

<template>
  <v-row class="d-flex justify-space-between" style=" background-color: #b8c9ff; height: 100vh" cols="9">

    <v-col cols="3">
      <SideBar/>

    </v-col>

    <v-col>
      Dashboard page
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
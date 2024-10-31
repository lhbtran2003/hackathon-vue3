<script setup lang="ts">

import SideBar from "./admin/SideBar.vue";
</script>

<template>
  <div style="width: 100vh; height: 100vh" class="d-flex flex-column justify-center align-center">
    <h1>Welcome to my channel ╰(*°▽°*)╯</h1>
    <h3>If u want to manage data, please click
      <router-link :to="{name: 'dashboard'}" class="no-underline">here</router-link>
    </h3>
  </div>

</template>

<style scoped>
.no-underline {
  text-decoration: none;

}
</style>
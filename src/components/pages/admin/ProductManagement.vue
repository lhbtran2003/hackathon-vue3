<script setup lang="ts">

import SideBar from "./SideBar.vue";
</script>

<template>
  <v-row class="d-flex justify-space-between" style=" background-color: #b8c9ff; height: 100vh" cols="9">

    <v-col cols="3">
      <SideBar/>

    </v-col>

    <v-col>
      <v-table
          height="300px"
          fixed-header
          style=" background-color: #b8c9ff"
      >
        <thead >
        <tr style=" background-color: #b8c9ff">
          <th class="text-left" style=" background-color: #b8c9ff">
            Name
          </th>
          <th class="text-left" style=" background-color: #b8c9ff">
            Calories
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
        >
          <td>hihi</td>
          <td>haha</td>
        </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>

</template>

<style scoped>

</style>
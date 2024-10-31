<script setup lang="ts">

import SideBar from "./SideBar.vue";

import { ref } from 'vue';
import AddUserDialog from '/src/components/AddUserDialog.vue';
import EditUserDialog from '/src/components/EditUserDialog.vue';

const isAddDialogOpen = ref(false);
const isEditDialogOpen = ref(false);
const selectedUser = ref(null);

// Hàm mở dialog Thêm
const openAddDialog = () => {
  isAddDialogOpen.value = true;
};

// Hàm mở dialog Sửa
const openEditDialog = (user) => {
  selectedUser.value = user;
  console.log(selectedUser.value);
  isEditDialogOpen.value = true;
};

// Hàm đóng dialog
const closeAddDialog = () => {
  isAddDialogOpen.value = false;
};

const closeEditDialog = () => {
  isEditDialogOpen.value = false;
};


//mảng chứa danh sách user
const userArray = [
  {id: 1, userName: "abc", gender: 0, dob: "20/03/2005", email: "abc@gmail.com"},
  {id: 2, userName: "acb", gender: 1, dob: "20/03/2005", email: "abc@gmail.com"},
  {id: 3, userName: "bac", gender: 2, dob: "20/03/2005", email: "abc@gmail.com"},
  {id: 4, userName: "bac", gender: 1, dob: "20/03/2005", email: "abc@gmail.com"},
  {id: 5, userName: "cab", gender: 1, dob: "20/03/2005", email: "abc@gmail.com"},
  {id: 6, userName: "cba", gender: 2, dob: "20/03/2005", email: "abc@gmail.com"},
  {id: 7, userName: "xyz", gender: 0, dob: "20/03/2005", email: "abc@gmail.com"},
  {id: 8, userName: "yxz", gender: 1, dob: "20/03/2005", email: "abc@gmail.com"},
  {id: 9, userName: "zxy", gender: 2, dob: "20/03/2005", email: "abc@gmail.com"},
]
// localStorage.setItem("user", JSON.stringify(userArray));
const storedUsers = ref([]);
storedUsers.value = JSON.parse(localStorage.getItem("user") || "[]");

// Xóa user theo id
const deleteUser = (id: number) => {
  const confirm = window.confirm('Bạn có muốn xóa người dùng này ko');
  if(confirm) {
    storedUsers.value = storedUsers.value.filter(user => user.id !== id);
    localStorage.setItem("user", JSON.stringify(storedUsers.value));
  }

};


// Cập nhật thông tin user
const updateUser = (updatedUser) => {
  const index = storedUsers.value.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    storedUsers.value[index] = updatedUser;
    localStorage.setItem("user", JSON.stringify(storedUsers.value));
  }
  closeEditDialog();
};

</script>


<template>
  <v-row class="d-flex justify-space-between  ma-2 wheat-bg" style=" background-color: #b8c9ff; height: 100vh">

    <v-col cols="3">
      <SideBar/>

    </v-col>

    <v-col>

      <v-row class="d-flex justify-space-between mt-2 pe-12">
        <div class="d-flex align-end">

          <v-text-field
              outlined
              dense
              hide-details
              class="search-field"
          ></v-text-field>


          <v-btn color="primary" class="ml-2">
            Tìm
          </v-btn>
        </div>
        <div class="pe-2">
          <button @click="() => {openAddDialog(); console.log('ok')}">Add user</button>
          <AddUserDialog :status="isAddDialogOpen" @close="closeAddDialog" />
          <EditUserDialog :status="isEditDialogOpen" :user="selectedUser" @close="closeEditDialog"  @update="updateUser"/>

        </div>
      </v-row>

      <v-row>
        <v-table
            height="300px"
            fixed-header
            style=" background-color: #b8c9ff"
            class="full-width-table"
        >
          <thead>
          <tr style=" background-color: #b8c9ff">
            <th class="text-center" style=" background-color: #b8c9ff">
              ID
            </th>
            <th class="text-center" style=" background-color: #b8c9ff">
              User Name
            </th> <th class="text-center" style=" background-color: #b8c9ff">
            Giới tính
          </th>
            <th class="text-center" style=" background-color: #b8c9ff">
              Ngày sinh
            </th> <th class="text-center" style=" background-color: #b8c9ff">
            Email
          </th>
            <th class="text-center" style=" background-color: #b8c9ff">
              Hành động
            </th>
          </tr>
          </thead>
          <tbody>

          <tr

              v-for="user in storedUsers"
              :key="user.id"
          >
            <td class="text-center">{{user.id}}</td>
            <td class="text-center">{{ user.userName }}</td>
            <td class="text-center">{{ user.gender === 0 ? "Nam" : user.gender === 1 ? "Nữ" : "Khác" }}</td>
            <td class="text-center">{{ user.dob }}</td>
            <td class="text-center">{{ user.email }}</td>
            <td >
              <div class="d-flex justify-center align-items-center" style="gap: 16px;">
                <v-btn rounded="lg" size="small" color="info" @click="openEditDialog(user)">Sửa</v-btn>
                <v-btn rounded="lg" size="small" color="error" @click="deleteUser(user.id)">Xóa</v-btn>
              </div>
            </td>

          </tr>
          </tbody>
        </v-table>

      </v-row>
    </v-col>

  </v-row>
</template>

<style scoped>
.search-field {
  width: 250px;
  border: 1px solid #b8c9ff;
  height: 37px;

}
.full-width-table {
  width: 100%;
}
</style> đây là user cha
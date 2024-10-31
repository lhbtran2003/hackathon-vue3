<script setup lang="ts">
import { ref, defineProps, defineEmits, reactive, computed } from 'vue';

const props = defineProps(['status']);
const emit = defineEmits(['close']);

// Close dialog
const closeDialog = () => {
  emit("close");
};

// Form data and validation rules
const userForm = reactive({
  userName: '',
  email: '',
  dob: '',
  gender: 0,
});

const userNameRules = [(v: string) => !!v || 'User name là bắt buộc'];
const emailRules = [
  (v: string) => !!v || 'Email là bắt buộc',
  (v: string) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Email không hợp lệ'
];

const dobRules = [(v: string) => !!v || 'Ngày sinh là bắt buộc'];
const genderRules = [(v: number) => v !== null || 'Giới tính là bắt buộc'];

const errors = reactive({
  userName: '',
  email: '',
  dob: '',
  gender: ''
});

const emailError = ref(false);

// Validate form
const isValidForm = () => {
  let valid = true;

  errors.userName = userNameRules.map(rule => rule(userForm.userName)).filter(err => err !== true)[0] || '';
  errors.email = emailRules.map(rule => rule(userForm.email)).filter(err => err !== true)[0] || '';
  errors.dob = dobRules.map(rule => rule(userForm.dob)).filter(err => err !== true)[0] || '';
  errors.gender = genderRules.map(rule => rule(userForm.gender)).filter(err => err !== true)[0] || '';

  if (errors.userName || errors.email || errors.dob || errors.gender) {
    valid = false;
  }

  return valid;
};

// Reset form data
const resetUserForm = () => {
  userForm.userName = '';
  userForm.email = '';
  userForm.dob = '';
  userForm.gender = 0;
};

// Load users from localStorage
const arrayUser = ref(JSON.parse(localStorage.getItem('user') || '[]'));

// Handle form submission
const addUser = () => {
  emailError.value = false;

  if (isValidForm()) {
    const alreadyEmail = arrayUser.value.some(user => user.email === userForm.email);

    if (alreadyEmail) {
      emailError.value = true;
    } else {
      const maxId = arrayUser.value.length ? Math.max(...arrayUser.value.map(user => user.id)) + 1 : 1;
      arrayUser.value.push({
        id: maxId,
        userName: userForm.userName,
        gender: Number(userForm.gender),
        dob: userForm.dob,
        email: userForm.email,
      });
      console.log(arrayUser.value)

      localStorage.setItem("user", JSON.stringify(arrayUser.value));
      closeDialog();
      resetUserForm();
    }
  }
};
</script>

<template>
  <v-dialog v-model="props.status" persistent max-width="500px">
    <v-form lazy-validation @submit.prevent="addUser">
      <v-card class="dialog m-2">
        <v-card-title class="text-h5 text-center border">Add User</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="userForm.userName"
              label="User Name"
              :rules="userNameRules"
              required
              :error-messages="errors.userName"
          />
          <v-radio-group v-model="userForm.gender" :rules="genderRules">
            <v-row class="ps-5">
              <v-col><v-radio :value= "0" color="error">Nam</v-radio></v-col>
              <v-col><v-radio :value="1" color="orange">Nữ</v-radio></v-col>
              <v-col><v-radio :value="2" color="indigo">Khác</v-radio></v-col>
            </v-row>
          </v-radio-group>
          <v-text-field
              v-model="userForm.dob"
              type="date"
              :rules="dobRules"
              required
              :error-messages="errors.dob"
          />
          <v-text-field
              v-model="userForm.email"
              label="Email"
              :rules="emailRules"
              required
              :error-messages="errors.email"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" type="submit">Add</v-btn>
        </v-card-actions>
        <v-alert v-if="emailError" border="top" type="warning" variant="outlined" prominent>
          Email đã tồn tại
        </v-alert>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped lang="scss">
.dialog {
  background-color: #edb2e6;
  border: 15px solid #f64ce2;
}

.content {
  font-size: medium;
  color: black;
  font-weight: bold;
}
</style>

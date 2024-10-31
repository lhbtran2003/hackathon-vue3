<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, computed } from 'vue';

const props = defineProps({
  status: Boolean,
  user: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits(['close', 'update']);

const userName = ref('');
const email = ref('');
const isUpdatingDob = ref(false); // Biến tạm để theo dõi việc cập nhật dob

const dob = computed({
  get: () => {
    if (!dob.value) return '';
    const [day, month, year] = dob.value.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  },
  set: (value) => {
    if (!isUpdatingDob.value) {
      isUpdatingDob.value = true;
      dob.value = value ? value.split('-').reverse().join('/') : '';
      isUpdatingDob.value = false;
    }
  }
});
const gender = ref(0);

watch(() => props.user, (newUser) => {
  userName.value = newUser.userName;
  email.value = newUser.email;
  dob.value = newUser.dob;
  gender.value = newUser.gender;
});

const closeDialog = () => {
  emit('close');
};

const updateUser = () => {
  emit('update', {
    id: props.user.id,
    userName: userName.value,
    email: email.value,
    dob: dob.value,
    gender: gender.value
  });
  closeDialog();
};
</script>

<template>
  <v-dialog v-model="props.status" persistent max-width="500px">
    <v-card>
      <v-card-title class="text-h5">Edit User</v-card-title>
      <v-card-text>
        <v-form lazy-validation>
          <v-label>User name</v-label>
          <v-text-field v-model="userName" label="User Name" required />

          <v-label>Gender</v-label>
          <v-radio-group v-model="gender">
            <v-radio value="0" color="error">Nam</v-radio>
            <v-radio value="1" color="orange">Nữ</v-radio>
            <v-radio value="2" color="indigo">Khác</v-radio>
          </v-radio-group>

          <v-label>Date of birth</v-label>
          <v-text-field v-model="dob" type="date" required />

          <v-label>Email</v-label>
          <v-text-field v-model="email" label="Email" required />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" @click="updateUser">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>

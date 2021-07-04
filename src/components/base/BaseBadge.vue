<template>
  <span class="badge ion-text-center">{{ title }} </span>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style scoped>
.badge {
  font-size: 1.2rem;
  background-color: #ccc;
  color: #252525;
  border-radius: 10px;
  padding: 0.3rem 0.6rem;
  display: inline-block;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
  background-color: #BF3100;
  color: white;
  min-width: 3.2rem;
}
</style>
<template>
  <span class="badge">{{ title }} </span>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style scoped>
.badge {
  font-size: 1.5rem;
  background-color: #ccc;
  color: #252525;
  border-radius: 10px;
  padding: 0.3rem 0.8rem;
  display: inline-block;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
  background-color: #3d008d;
  color: white;
}
</style>
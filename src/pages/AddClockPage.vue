<template>
  <base-layout page-title="Dodaj zegar" page-default-back-link="/clocks">
    <clock-form @save-clock="saveClock"></clock-form>
  </base-layout>
</template>

<script>
import ClockForm from "../components/clocks/ClockForm.vue";
export default {
  components: {
    ClockForm
  },
  methods: {
    async saveClock(clockData) {
      await this.$store.dispatch("addClock", clockData);
      // this is for accessing true item id generated by firebase
      await this.$store.dispatch("loadClocks");
      this.$router.replace("/clocks");
    }
  }
};
</script>
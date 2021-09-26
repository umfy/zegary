<template>
  <ion-list v-if="clocksHaveLoaded">
    <clock-list-item v-for="clock in clocks" :key="clock.id" :clock="clock"></clock-list-item>
  </ion-list>
  <h2 v-else>Ładowanie...</h2>
</template>

<script>
import { IonList } from "@ionic/vue";
import ClockListItem from "./ClockListItem.vue";
export default {
  components: {
    IonList,
    ClockListItem
  },
  props: {
    clocks: Array
  },
  data() {
    return {
      clocksHaveLoaded: false
    };
  },
  created() {
    // pictures work on phone, not on desktop due to security restrictions
    this.loadClocks();
  },
  methods: {
    async loadClocks() {
      console.log("loading alllllll");
      try {
        await this.$store.dispatch("loadClocks");
      } catch (error) {
        const errorMessage = new Error(
          error.message || "something went wrong..."
        );
        throw errorMessage;
      }
      this.clocksHaveLoaded = true;
    }
  }
  // computed: {
  //   clocks() {
  //     return this.$store.getters.clocks;
  //   }
  // }
};
</script>
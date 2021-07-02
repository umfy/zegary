<template>
  <ion-grid>
    <!-- <base-card> -->
    <ion-row>
      <ion-col class="ion-text-center">
        <h3>{{ start }}</h3>
      </ion-col>
      <ion-col class="ion-text-center"><h3>—</h3></ion-col>
      <ion-col class="ion-text-center">
        <h3>{{ stop }}</h3>
      </ion-col>
    </ion-row>
    <!-- </base-card> -->
  </ion-grid>
</template>

<script>
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
// import BaseCard from "../base/BaseCard.vue";

export default {
  props: {
    historyPair: Object,
    isDisabled: Boolean
  },
  components: {
    // BaseCard,
    IonGrid,
    IonRow,
    IonCol
  },
  computed: {
    start() {
      if (this.historyPair.start) {
        return this.historyPair.start.split("T")[0];
      } else {
        return "";
      }
    },
    stop() {
      if (this.historyPair.stop) {
        return this.historyPair.stop.split("T")[0];
      } else {
        return "";
      }
    }
  }
};
</script>

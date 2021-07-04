<template>
  <ion-item :router-link="`/clocks/${clock.id}`">
    <!-- <ion-item @click='routeToClock'> -->
    <ion-thumbnail slot="start">
      <ion-img :src="clock.image.webviewPath" :alt="clock.title"></ion-img>
    </ion-thumbnail>
    <ion-label>{{ clock.title }}</ion-label>
    <base-badge :title="countDays"></base-badge>
  </ion-item>
</template>

<script>
import { IonItem, IonImg, IonThumbnail, IonLabel } from "@ionic/vue";
import BaseBadge from "../base/BaseBadge.vue";
export default {
  components: {
    BaseBadge,
    IonItem,
    IonImg,
    IonThumbnail,
    IonLabel,
  },
  props: {
    clock: Object,
  },
  data() {
    return {};
  },
  computed: {
    countDays() {
      let stopDate = "";
      if (
        this.clock.history == undefined ||
        this.clock.history.length === 0 ||
        this.clock.history[0].start == ""
      ) {
        return "-";
      }

      if (this.clock.history[0].stop == "") {
        stopDate = new Date();
      } else {
        stopDate = new Date(this.clock.history[0].stop);
      }
      const startDate = new Date(this.clock.history[0].start);
      // parseInt was bad idea. It took numbers like 6^-10 and parsed it to 6 instead of 0
      return Math.floor((stopDate - startDate) / 86400000);
    },
  },
};
</script>
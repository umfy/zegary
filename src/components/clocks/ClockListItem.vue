<template>
  <ion-item :router-link="`/clocks/${clock.id}`">
    <ion-thumbnail slot="start">
      <ion-img :src="clock.image.webviewPath" :alt="clock.title"></ion-img>
    </ion-thumbnail>
    <ion-label>{{ clock.title }}</ion-label>
  </ion-item>
</template>

<script>
import { IonItem, IonImg, IonThumbnail, IonLabel } from "@ionic/vue";

export default {
  components: {
    IonItem,
    IonImg,
    IonThumbnail,
    IonLabel
  },
  props: {
    clock: Object
  },
  data() {
    return {};
  }
};
</script>
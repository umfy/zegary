<template>
    <ion-img :src="image.webviewPath" :alt="title"></ion-img>
    <h1 class="ion-text-center">{{ title }}</h1>
    <!-- <h2>Opis:</h2> -->
    <ion-item lines="none">
      <h3>{{ description }}</h3>
    </ion-item>
    <h4 class="ion-text-center">
      {{ sentence }}
      <base-badge :title="countDays"> </base-badge>
      {{ sentenceDays }}
    </h4>
    <h3 class='ion-text-center'>
      <ion-button color='secondary' @click='analyticsRedirect'>
        <ion-icon slot='start' :icon='analyticsOutline'></ion-icon>
        Analiza
      </ion-button>
    </h3>
    <h2 class="marginTop">Historia Nakręceń:</h2>
    <div v-for="pair in history" :key="pair.id">
      <ion-item>
        <display-uneditable-dates
          :historyPair="pair"
        ></display-uneditable-dates>
      </ion-item>
    </div>
</template>

<script>
import { IonImg, IonItem, IonButton, IonIcon } from "@ionic/vue";
import {
  analyticsOutline
} from "ionicons/icons";
import DisplayUneditableDates from "../ui/DisplayUneditableDates.vue";
// import BaseCard from "../base/BaseCard.vue";
import BaseBadge from "../base/BaseBadge.vue";
export default {
  props: {
    title: String,
    image: Object,
    description: String,
    history: Array
  },
  components: {
    DisplayUneditableDates,
    BaseBadge,
    // BaseCard,
    IonImg,
    IonItem,
    IonButton,
    IonIcon
  },
  data() {
    return {
      sentence: "Zegar jest zatrzymany.",
      sentenceDays: "",
      analyticsOutline
    };
  },
  computed: {
    countDays() {
      let stopDate = "";
      if (
        this.history == undefined ||
        this.history.length === 0 ||
        this.history[0].start == ""
      ) {
        this.setSentence("Zegar jest zatrzymany.", "");
        return "-";
      }

      if (this.history[0].stop == "") {
        this.setSentence("Działa nieprzerwanie od", "dni.");
        stopDate = new Date();
      } else {
        this.setSentence("Zegar działał", "dni.");
        stopDate = new Date(this.history[0].stop);
      }
      const startDate = new Date(this.history[0].start);
      // parseInt was bad idea. It took numbers like 6^-10 and parsed it to 6 instead of 0
      return Math.floor((stopDate - startDate) / 86400000);
    },
  },
  methods: {
    setSentence(one, two) {
      this.sentence = one;
      this.sentenceDays = two;
    },
    analyticsRedirect(){
      this.$router.push(this.$route.path + "/analytics");
    }
  },
  created() {}
};
</script>

<style scoped>
h2 {
  margin-left: 1.5rem;
}
h3 {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  color: #424242;
}
.marginTop {
  margin-top: 2rem;
}
h4 {
  color:#BF3100;
}
</style>
<template>
  <base-layout page-title="Wszystkie zegary">
    <base-dialog :show="timeIsOpened" @close="resetTimeIsOpened">
      <free-clock></free-clock>
    </base-dialog>
    <template v-slot:actions-end>
      <ion-button @click="openTime">
        <ion-icon slot="icon-only" :icon="timeOutline"></ion-icon>
      </ion-button>
    </template>
    <clocks-list :clocks="clocks"></clocks-list>
  </base-layout>
</template>

<script>
import { IonButton, IonIcon } from "@ionic/vue";
import { timeOutline } from "ionicons/icons";
import ClocksList from "../components/clocks/ClocksList.vue";
import BaseDialog from "../components/base/BaseDialog.vue";
import FreeClock from "../components/ui/FreeClock.vue";
export default {
  components: {
    FreeClock,
    ClocksList,
    IonButton,
    IonIcon,
    BaseDialog
  },
  data() {
    return {
      timeIsOpened: false,
      timeOutline
    };
  },
  computed: {
    clocks() {
      return this.$store.getters.clocks;
    }
  },
  methods: {
    openTime() {
      this.timeIsOpened = true;
    },
    resetTimeIsOpened() {
      this.timeIsOpened = false;
    }
  }
};
</script>
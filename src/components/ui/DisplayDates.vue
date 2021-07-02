<template>
  <ion-grid>
    <base-card class="smallerMargins">
      <ion-row>
        <ion-col class="ion-text-center">
          <ion-datetime
            v-model="inputStart"
            min="2010"
            :max="yearNow"
            display-format="DD.MM.YYYY"
            month-short-names="Styczeń, Luty, Marzec, Kwiecień, Maj, Czerwiec, Lipiec, Sierpień, Wrzesień, Październik, Listpopad, Grudzień"
          ></ion-datetime>
        </ion-col>
        <ion-col class="ion-text-center">_</ion-col>
        <ion-col class="ion-text-center">
          <ion-datetime
            v-model="inputStop"
            min="2010"
            :max="yearNow"
            display-format="DD.MM.YYYY"
            month-short-names="Styczeń, Luty, Marzec, Kwiecień, Maj, Czerwiec, Lipiec, Sierpień, Wrzesień, Październik, Listpopad, Grudzień"
          ></ion-datetime>
        </ion-col>
        <ion-col class="ion-text-center">
          <ion-button @click="deletePair">
            X
          </ion-button>
        </ion-col>
      </ion-row>
    </base-card>
  </ion-grid>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonDatetime, IonButton } from "@ionic/vue";
import BaseCard from "../base/BaseCard.vue";
// import BaseDialog from "../base/BaseDialog.vue";

export default {
  props: {
    historyPair: Object
  },
  emits: ["delete-pair", "set-pair"],
  components: {
    BaseCard,

    IonGrid,
    IonRow,
    IonCol,
    IonDatetime,
    IonButton
  },
  data() {
    return {
      editDateDialogVisible: false,
      inputStart: this.historyPair.start,
      inputStop: this.historyPair.stop
    };
  },
  watch: {
    inputStart(newValue) {
      this.$emit("set-pair", {
        id: this.historyPair.id,
        start: newValue,
        stop: this.inputStop
      });
    },
    inputStop(newValue) {
      this.$emit("set-pair", {
        id: this.historyPair.id,
        start: this.inputStart,
        stop: newValue
      });
    }
  },
  computed: {
    yearNow() {
      return new Date().getFullYear();
    },
    dateNow() {
      return new Date().toISOString().split("T")[0];
    }
  },
  methods: {
    deletePair() {
      this.$emit("delete-pair", this.historyPair.id);
    }
  }
};
</script>

<style scoped>
.smallerMargins {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
</style>
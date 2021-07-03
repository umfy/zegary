<template>
<base-dialog :show="deleteDialogVisible" @close="toggleDeleteDialog">
      <h2>Czy na pewno chcesz usunąć ten wpis?</h2>
      <template v-slot:actions>
        <ion-grid>
          <ion-row>
            <ion-col class="ion-text-center">
              <ion-button color='secondary' @click="deletePair">Usuń</ion-button>
            </ion-col>
            <ion-col class="ion-text-center">
              <ion-button color='secondary' @click="toggleDeleteDialog">Cofnij</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </template>
    </base-dialog>
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
        </ion-row>
        <ion-row>
        <ion-col class="ion-text-center">
          <ion-button color='secondary' fill='clear' @click="moveUp">
            <ion-icon slot='icon-only' :icon='chevronUp'></ion-icon>
          </ion-button>
          </ion-col>
        <ion-col class="ion-text-center">
          <ion-button color='secondary' fill='clear' @click="moveDown">
            <ion-icon slot='icon-only' :icon='chevronDown'></ion-icon>
          </ion-button>
          </ion-col>
        <ion-col class="ion-text-center">
          <ion-button color='secondary' fill='clear' @click="toggleDeleteDialog">
            <ion-icon slot='icon-only' :icon='close'></ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>
    </base-card>
  </ion-grid>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonDatetime, IonButton, IonIcon, 
// IonButtons 
} from "@ionic/vue";
import {
  close,
  chevronUp,
  chevronDown
} from "ionicons/icons";
import BaseCard from "../base/BaseCard.vue";
import BaseDialog from "../base/BaseDialog.vue";

export default {
  props: {
    historyPair: Object
  },
  emits: ["delete-pair", "set-pair", 'move-pair-up', 'move-pair-down'],
  components: {
    BaseCard,
    IonGrid,
    IonRow,
    IonCol,
    IonDatetime,
    IonButton,
    IonIcon,
    BaseDialog
    // IonButtons
  },
  data() {
    return {
      editDateDialogVisible: false,
      inputStart: this.historyPair.start,
      inputStop: this.historyPair.stop,
      deleteDialogVisible: false,
      close,
      chevronUp,
      chevronDown
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
    },
    moveUp(){
      this.$emit('move-pair-up', this.historyPair.id)
    },
    moveDown(){
      this.$emit('move-pair-down', this.historyPair.id)
    },
    toggleDeleteDialog(){
      this.deleteDialogVisible = !this.deleteDialogVisible
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


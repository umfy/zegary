<template>
  <base-layout page-default-back-link="/clocks">
    <base-dialog :show="removeClockDialogVisible" @close="switchClockDialog">
      <h2>Czy na pewno chcesz usunąć ten zegar?</h2>
      <template v-slot:actions>
        <ion-grid>
          <ion-row>
            <ion-col class="ion-text-center">
              <ion-button @click="removeClock">Usuń</ion-button>
            </ion-col>
            <ion-col class="ion-text-center">
              <ion-button @click="switchClockDialog">Cofnij</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </template>
    </base-dialog>
    <template v-slot:actions-end>
      <ion-button class="ion-button-margins" @click="startStopClock">
        <ion-icon
          v-if="clockIsRunning"
          slot="icon-only"
          :icon="stopCircleOutline"
        ></ion-icon>
        <ion-icon v-else slot="icon-only" :icon="playCircleOutline"></ion-icon>
      </ion-button>
      <ion-button class="ion-button-margins" @click="updateClock">
        <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
      </ion-button>
      <ion-button class="ion-button-margins" @click="switchClockDialog">
        <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
      </ion-button>
    </template>
    <h2 v-if="!loadedClock">
      Nie odnaleziono zegara o takim id: {{ clockId }}
    </h2>
    <clock-overview
      v-else
      :title="loadedClock.title"
      :image="loadedClock.image"
      :description="loadedClock.description"
      :history="loadedClock.history"
    ></clock-overview>
  </base-layout>
</template>

<script>
import ClockOverview from "../components/clocks/ClockOverview.vue";
import {
  stopCircleOutline,
  playCircleOutline,
  trashOutline,
  createOutline
} from "ionicons/icons";
import { IonButton, IonIcon, IonGrid, IonRow, IonCol } from "@ionic/vue";
import BaseDialog from "../components/base/BaseDialog.vue";

export default {
  components: {
    ClockOverview,
    BaseDialog,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol
  },
  data() {
    return {
      clockId: this.$route.params.id,
      stopCircleOutline,
      trashOutline,
      createOutline,
      playCircleOutline,
      removeClockDialogVisible: false
    };
  },
  // created() {
  //   console.log("this.loadedClock", this.loadedClock);
  // },
  computed: {
    loadedClock() {
      return this.$store.getters.clock(this.clockId);
    },
    clockIsRunning() {
      if (
        this.loadedClock.history === undefined ||
        this.loadedClock.history.length === 0
      ) {
        return false;
      }
      if (
        this.loadedClock.history[0].start != "" &&
        this.loadedClock.history[0].stop == ""
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    removeClock() {
      this.$store.dispatch("removeClock", this.clockId);
      this.$router.replace("/clocks");
    },
    switchClockDialog() {
      this.removeClockDialogVisible = !this.removeClockDialogVisible;
    },
    updateClock() {
      this.$router.push(this.$route.path + "/update");
    },
    async startStopClock() {
      // create new empty history with todays date at start
      if (
        this.loadedClock.history === undefined ||
        this.loadedClock.history.length === 0
      ) {
        this.loadedClock.history = [
          {
            id: new Date().toISOString(),
            start: new Date().toISOString(),
            stop: ""
          }
        ];
      } else if (
        this.loadedClock.history[0].start != "" &&
        this.loadedClock.history[0].stop == ""
      ) {
        // create stop with current date
        this.loadedClock.history[0].stop = new Date().toISOString();
      } else {
        this.loadedClock.history.unshift({
          id: new Date().toISOString(),
          start: new Date().toISOString(),
          stop: ""
        });
      }
      await this.modifyClock(this.loadedClock);
    },
    async modifyClock(clockData) {
      const clockDataWithId = { id: this.clockId, ...clockData };
      await this.$store.dispatch("modifyClock", clockDataWithId);
    }
  }
};
</script>

<style scoped>
.ion-button-margins {
  margin-right: 3rem !important;
  margin-left: 3rem !important;
}
@media screen and (max-width: 500px) {
  .ion-button-margins {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
}
@media screen and (max-width: 425px) {
  .ion-button-margins {
    margin-right: 0.8rem !important;
    margin-left: 0.8rem !important;
  }
}
@media screen and (max-width: 350px) {
  .ion-button-margins {
    margin-right: 0rem !important;
    margin-left: 0rem !important;
  }
}
</style>
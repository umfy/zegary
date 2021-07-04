<template>
  <base-layout page-title="Analiza" page-default-back-link="/clocks">
    <h1 class="ion-text-center">{{ clock.title }}</h1>
    <clock-chart :values="tenValues" :labels="tenLabels"></clock-chart>
    <div>
      <ion-buttons>
        <ion-grid>
          <ion-row>
            <ion-col class="ion-text-center">
              <ion-button @click="moveLeft">
                <ion-icon slot="icon-only" :icon="chevronBack"></ion-icon>
              </ion-button>
            </ion-col>
            <ion-col class="ion-text-center">
              <ion-label
                >Zakres
                <ion-select
                  interface="popover"
                  v-model="chartSize"
                  placeholder="10"
                >
                  <ion-select-option value="10">10</ion-select-option>
                  <ion-select-option value="20">20</ion-select-option>
                  <ion-select-option value="30">30</ion-select-option>
                </ion-select>
              </ion-label>
            </ion-col>
            <ion-col class="ion-text-center">
              <ion-button @click="moveRight">
                <ion-icon slot="icon-only" :icon="chevronForward"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-buttons>
    </div>
    <div v-if="hasData">
      <h4>
        Średni czas chodu wynosi
        <base-badge :title="avgDays"></base-badge>
        dni.
      </h4>
      <h4>
        Zegar ten osiągnął rekordowy czas
        <base-badge :title="maxDays"></base-badge>
        dni.
      </h4>
    </div>
    <div v-else>
      <h4>Brak danych.</h4>
    </div>
  </base-layout>
</template>

<script>
import ClockChart from "../components/charts/ClockChart.vue";
import BaseBadge from "../components/base/BaseBadge.vue";

import {
  IonIcon,
  IonButton,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { chevronBack, chevronForward } from "ionicons/icons";

export default {
  components: {
    ClockChart,
    BaseBadge,
    IonIcon,
    IonButton,
    IonButtons,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
  },
  data() {
    return {
      clockId: this.$route.params.id,
      sliceBegin: -10,
      sliceEnd: 0,
      chartSize: 10,
      chevronBack,
      chevronForward,
    };
  },
  computed: {
    clock() {
      return this.$store.getters.clock(this.clockId);
    },
    labels() {
      if (this.clock.history === undefined || this.clock.history.length === 0){
        return []
      }
        let startDates = [];
      for (const pair of this.clock.history) {
        startDates.unshift(pair.start.split("T")[0]);
      }
      return startDates;
    },
    values() {
      if (this.clock.history === undefined || this.clock.history.length === 0){
        return []
      }
      let countDays = [];
      for (const pair of this.clock.history) {
        let start = new Date(pair.start);
        let stop = new Date(pair.stop);
        countDays.unshift(Math.floor((stop - start) / 86400000));
      }
      return countDays;
    },
    maxDays() {
      const filteredValues = this.values.filter((el) => !Number.isNaN(el));
      return Math.max(...filteredValues);
    },
    avgDays() {
      const filteredValues = this.values.filter((el) => !Number.isNaN(el));
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      return Math.floor(filteredValues.reduce(reducer) / filteredValues.length);
    },
    tenLabels() {
      if (this.labels.length > +this.chartSize) {
        return this.labels.slice(
          this.sliceBegin,
          this.sliceEnd > -1 ? undefined : this.sliceEnd
        );
      }
      return this.labels;
    },
    tenValues() {
      if (this.values.length > +this.chartSize) {
        return this.values.slice(
          this.sliceBegin,
          this.sliceEnd > -1 ? undefined : this.sliceEnd
        );
      }
      return this.values;
    },
    hasData() {
      const filteredValues = this.values.filter((el) => !Number.isNaN(el));
      return filteredValues.length > 0;
    },
  },
  methods: {
    moveRight() {
      if (this.sliceBegin < -this.chartSize) {
        this.sliceBegin += +this.chartSize;
        this.sliceEnd += +this.chartSize;
      }
      // console.log(this.sliceBegin, "-", this.sliceEnd);
    },
    moveLeft() {
      if (this.sliceBegin > -this.values.length) {
        this.sliceBegin += -this.chartSize;
        this.sliceEnd += -this.chartSize;
      }
      // console.log(this.sliceBegin, "-", this.sliceEnd);
    },
  },
  watch: {
    chartSize(newValue) {
      this.sliceBegin = -newValue;
      this.sliceEnd = 0;
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 2rem;
}
h3 {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  color: #424242;
}
h4 {
  font-size: 1.2rem;  
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  color: #bf3100;
}
</style>


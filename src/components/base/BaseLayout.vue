<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button
            text="Wróć"
            :default-href="pageDefaultBackLink"
          ></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons>
          <slot name="actions-title"></slot>
        </ion-buttons>
        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-buttons>
          <ion-grid>
            <ion-row>
              <ion-col class="ion-text-center">
                <ion-button router-link="/clocks">
                  <ion-icon slot="icon-only" :icon="home"></ion-icon>
                </ion-button>
              </ion-col>
              <ion-col class="ion-text-center">
                <ion-button router-link="/clocks/add">
                  <ion-icon slot="icon-only" :icon="addCircle"></ion-icon>
                </ion-button>
              </ion-col>
              <!-- <ion-col class="ion-text-center">
                <ion-button @click="klik">
                  <ion-icon slot="icon-only" :icon="settings"></ion-icon>
                </ion-button>
              </ion-col> -->
            </ion-row>
          </ion-grid>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonFooter,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import {
  home,
  addCircle,
  // settings,
} from "ionicons/icons";
export default {
  props: {
    pageTitle: String,
    pageDefaultBackLink: String,
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonFooter,
    IonIcon,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  },
  data() {
    return {
      home,
      addCircle,
      // settings,
    };
  },
};
</script>

<style scoped>
</style>
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
        <ion-button expand="full" @click="presentActionSheet">
          <ion-icon slot="icon-only" :icon="menuOutline"></ion-icon>
        </ion-button>
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
  actionSheetController,
  IonIcon,
  IonButton
} from "@ionic/vue";
import { caretForwardCircle, close, heart, menuOutline } from "ionicons/icons";
export default {
  props: {
    pageTitle: String,
    pageDefaultBackLink: String
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
    IonButton
  },
  data() {
    return {
      menuOutline
    };
  },
  methods: {
    async presentActionSheet() {
      const actionSheet = await actionSheetController.create({
        //header: "Albums",
        // cssClass: "my-custom-class",
        buttons: [
          {
            text: "Lista Zegarów",
            icon: caretForwardCircle,
            handler: () => {
              console.log("Play clicked");
              this.$router.push("/clocks");
            }
          },
          {
            text: "Dodaj Nowy",
            icon: heart,
            handler: () => {
              console.log("Favorite clicked");
              this.$router.push("/clocks/add");
            }
          },
          {
            text: "Zamknij",
            icon: close,
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          }
        ]
      });
      await actionSheet.present();

      const { role } = await actionSheet.onDidDismiss();
      console.log("onDidDismiss resolved with role", role);
    }
  }
};
</script>

<style scoped>
</style>
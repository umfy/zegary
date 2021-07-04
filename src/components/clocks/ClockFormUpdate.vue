<template>
  <form class="ion-padding" @submit.prevent="submitForm">
    <ion-item>
      <ion-label position="floating">Nazwa</ion-label>
      <ion-input type="text" required v-model="enteredTitle" />
    </ion-item>
    <ion-item>
      <ion-label position="floating">Opis</ion-label>
      <ion-textarea rows="5" v-model="enteredDescription"></ion-textarea>
    </ion-item>
    <ion-item>
      <!-- <ion-label position="floating">URL Obrazka</ion-label>
        <ion-input type="text" v-model="enteredImageUrl"></ion-input> -->
      <ion-thumbnail slot="start">
        <img :src="savedFileImage === null ? '' : savedFileImage.webviewPath" />
      </ion-thumbnail>
      <ion-button
        type="button"
        fill="clear"
        color="tertiary"
        @click="takePhoto"
      >
        <ion-icon slot="start" :icon="camera"> </ion-icon>
        Zrób zdjęcie
      </ion-button>
    </ion-item>
    <ion-button class="margins" type="submit" color="secondary" expand="block"
      >Zapisz</ion-button
    >
    <h2 class="marginTop">Historia Nakręceń:</h2>
    <div class="ion-text-center">
      <ion-button color="secondary" @click="addHistoryElement"
        >Dodaj element historii</ion-button
      >
    </div>
    <ion-item lines="none" v-for="pair in enteredHistory" :key="pair.id">
      <display-dates
        :historyPair="pair"
        @delete-pair="deletePair"
        @set-pair="setPair"
        @move-pair-up="movePairUp"
        @move-pair-down="movePairDown"
      ></display-dates>
    </ion-item>
  </form>
</template>




<script>
import {
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonThumbnail,
  IonIcon,
  IonButton,
} from "@ionic/vue";
import { camera } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
// import { Storage } from "@capacitor/storage";

// PWA for desktop
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import DisplayDates from "../ui/DisplayDates.vue";
defineCustomElements(window);

export default {
  props: {
    clock: Object,
  },
  components: {
    DisplayDates,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonThumbnail,
    IonIcon,
    IonButton,
  },
  data() {
    return {
      enteredTitle: this.clock.title,
      enteredDescription: this.clock.description,
      savedFileImage: this.clock.image,
      enteredHistory: this.clock.history,
      camera,
    };
  },
  emits: ["modify-clock"],
  // computed:{
  //   enteredHistory(){
  //     if(this.clock.history === undefined || this.clock.history.length === 0){
  //       return {}
  //       }
  //       return this.clock.history
  //   }
  // },
  methods: {
    submitForm() {
      const clockData = {
        title: this.enteredTitle,
        image: this.savedFileImage,
        description: this.enteredDescription,
        history: this.enteredHistory,
      };
      this.$emit("modify-clock", clockData);
    },
    addHistoryElement() {
      if (this.enteredHistory === undefined) {
        this.enteredHistory = [];
      }
      this.enteredHistory.unshift({
        id: new Date().toISOString(),
        start: "",
        stop: "",
      });
      console.log(this.enteredHistory);
      // console.log(typeof this.enteredHistory);
    },
    deletePair(id) {
      // console.log("deleting: ", id);
      this.enteredHistory = this.enteredHistory.filter((el) => el.id !== id);
    },
    setPair(data) {
      const index = this.enteredHistory.findIndex((el) => el.id === data.id);
      this.enteredHistory[index] = data;
    },
    movePairDown(id) {
      const index = this.enteredHistory.findIndex((el) => el.id === id);
      if (index < this.enteredHistory.length - 1) {
        const temp = this.enteredHistory[index + 1];
        this.enteredHistory[index + 1] = this.enteredHistory[index];
        this.enteredHistory[index] = temp;
      }
    },
    movePairUp(id) {
      const index = this.enteredHistory.findIndex((el) => el.id === id);
      if (index > 0) {
        const temp = this.enteredHistory[index - 1];
        this.enteredHistory[index - 1] = this.enteredHistory[index];
        this.enteredHistory[index] = temp;
      }
    },
    async takePhoto() {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource,
        quality: 100,
        saveToGallery: true,
        correctOrientation: false

      });

      // this.takenImageUrl = photo.webPath;
      const fileName = new Date().getTime() + ".jpeg";

      this.savedFileImage = {
        filepath: fileName,
        webviewPath: photo.webPath,
      };

      // save file
      await this.savePicture(photo, fileName);
    },
    async savePicture(photo, fileName) {
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      const base64 = await this.convertBlobToBase64(blob);

      console.log("blob", blob);
      console.log("base64", base64);

      await Filesystem.writeFile({
        data: base64,
        path: fileName,
        directory: Directory.Data,
      });
    },
    async convertBlobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 1.4rem;
  margin-left: 1.5rem;
}

.margins {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
</style>
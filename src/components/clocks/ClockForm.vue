<template>
  <form class="ion-padding" @submit.prevent="submitForm">
    <ion-list>
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
        <ion-input type="text" v-model="enteredImageUrl"></ion-input>-->
        <ion-thumbnail slot="start">
          <img :src="savedFileImage === null ? '' : savedFileImage.webviewPath" />
        </ion-thumbnail>
        <ion-button type="button" color="tertiary" fill="clear" @click="takePhoto">
          <ion-icon slot="start" :icon="camera"></ion-icon>Zrób zdjęcie
        </ion-button>
      </ion-item>
    </ion-list>

    <ion-button class="margins" type="submit" color="secondary" expand="block">Zapisz</ion-button>
  </form>
</template>

<script>
import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonThumbnail,
  IonIcon,
  IonButton
} from "@ionic/vue";
import { camera } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

// import { Storage } from "@capacitor/storage";

// PWA for desktop
import { defineCustomElements } from "@ionic/pwa-elements/loader";
defineCustomElements(window);

export default {
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonThumbnail,
    IonIcon,
    IonButton
  },
  data() {
    return {
      enteredTitle: "",
      enteredDescription: "",
      savedFileImage: null,
      trueImage: null,
      camera
    };
  },
  emits: ["save-clock"],
  methods: {
    submitForm() {
      const clockData = {
        title: this.enteredTitle,
        image: this.trueImage,
        description: this.enteredDescription
      };
      this.$emit("save-clock", clockData);
    },
    async takePhoto() {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource,
        quality: 100,
        correctOrientation: false
      });

      // this.takenImageUrl = photo.webPath;
      const fileName = new Date().getTime() + ".jpeg";

      this.savedFileImage = {
        filepath: fileName,
        webviewPath: photo.webPath
      };

      // save file
      await this.savePicture(photo, fileName);
    },
    async savePicture(photo, fileName) {
      let base64Data;

      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      base64Data = await this.convertBlobToBase64(blob);
      // console.log('this must be string data: ', typeof base64Data);

      this.trueImage = { filepath: fileName, data: base64Data };
    },
    async convertBlobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }
  }
};
</script>

<style scoped>
.margins {
  margin-top: 1rem;
}
</style>
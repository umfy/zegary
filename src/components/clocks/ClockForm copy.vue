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
        <ion-button type="button" color="tertiary" fill="clear" @click="takePhoto(filename)">
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
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import { ref, computed } from "vue";

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
  setup(props, { emit }) {
    const { photos, takePhoto } = usePhotoGallery();
    let enteredTitle = ref("");
    let enteredDescription = ref("");
    let filename = new Date().getTime() + ".jpeg";

    let savedFileImage = computed(() => {
      console.log("photos value", photos.value);
      console.log("local filename", filename);
      let recentPhoto = photos.value.find(x => {
        return x.filepath === filename;
      });
      if (recentPhoto) {
        console.log("znaleziono zdjęcie w photos");
        return recentPhoto;
      } else {
        console.log("nie znaleziono zdjęcia i jest ustawione na null");
        return null;
      }
    });

    let submitForm = function() {
      const clockData = {
        title: enteredTitle.value,
        description: enteredDescription.value,
        image: savedFileImage.value
      };
      emit("save-clock", clockData);
    };

    return {
      photos,
      takePhoto,
      camera,
      enteredTitle,
      enteredDescription,
      savedFileImage,
      submitForm,
      filename
    };
  }
  // emits: ["save-clock"],
};
</script>

<style scoped>
.margins {
  margin-top: 1rem;
}
</style>
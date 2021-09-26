import { ref, onMounted, watch } from 'vue';
import {
  Camera,
  CameraResultType,
  CameraSource,
  // Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { isPlatform } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';

// This is just an object (defined in TypeScript way) that takes string as a first argument and string as a second argument

// It's reactive array (vue's ref function) of UserPhoto objects.
const photos = ref([]);

const convertBlobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

const savePicture = async (photo, fileName) => {
  let base64Data;
  if (isPlatform('hybrid')) {
    // "hybrid" will detect mobile - iOS or Android
    const file = await Filesystem.readFile({
      path: photo.path,
    });
    base64Data = file.data;
  } else {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    base64Data = await convertBlobToBase64(blob);
    // console.log('this must be string data: ', typeof base64Data);
  }

  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data,
  });
  if (isPlatform('hybrid')) {
    // Display the new image by rewriting the 'file://' path to HTTP
    // Details: https://ionicframework.com/docs/building/webview#file-protocol
    return {
      filepath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  } else {
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  }
};

export function usePhotoGallery() {
  // loading photos
  const PHOTO_STORAGE = 'photos';

  const cachePhotos = () => {
    Storage.set({
      key: PHOTO_STORAGE,
      value: JSON.stringify(photos.value),
    });
  };
  watch(photos, cachePhotos);

  //taking photos
  const takePhoto = async (fileName) => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource,
      correctOrientation: false,
      quality: 100,
    });

    console.log('from takePhoto', fileName);
    // Save the file in an array
    // const fileName = new Date().getTime() + '.jpeg';
    // const savedFileImage = {
    //   filepath: fileName,
    //   webviewPath: cameraPhoto.webPath,
    // };
    const savedFileImage = await savePicture(cameraPhoto, fileName);

    photos.value = [savedFileImage, ...photos.value];
  };

  const loadSaved = async () => {
    const photoList = await Storage.get({ key: PHOTO_STORAGE });
    const photosInStorage = photoList.value ? JSON.parse(photoList.value) : [];

    // If running on the web...
    if (!isPlatform('hybrid')) {
      for (const photo of photosInStorage) {
        const file = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
      }
    }

    photos.value = photosInStorage;
  };

  onMounted(loadSaved);

  return {
    photos,
    takePhoto,
  };
}

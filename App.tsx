import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
// import logo from './assets/logo.png';

export default function App() {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage(pickerResult);
  };

  let openShareDialogAsync = async () => {
    if (Platform.OS === 'web') {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.uri);
  };

  if (selectedImage !== null) {
    console.log(selectedImage);
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.uri }} style={styles.thumbnail} />
        <TouchableOpacity
          onPress={openShareDialogAsync}
          style={styles.buttonBackground}
        >
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F04%2F23%2F22%2F00%2Ftree-736885__480.jpg&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fnature%2F&tbnid=DH7p1w2o_fIU8M&vet=12ahUKEwjUhOz32bv2AhVCuioKHQI0DvsQMygBegUIARC9AQ..i&docid=Ba_eiczVaD9-zM&w=771&h=480&q=image&ved=2ahUKEwjUhOz32bv2AhVCuioKHQI0DvsQMygBegUIARC9AQ',
        }}
        style={styles.logo}
      />
      <Text style={styles.instructions}>
        To share a photo, press the button below!
      </Text>
      <StatusBar style='auto' />
      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.buttonBackground}
      >
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 305, height: 159 },
  instructions: { color: 'red', fontSize: 18 },
  buttonBackground: { backgroundColor: 'blue' },
  buttonText: { fontSize: 20, color: '#fff' },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

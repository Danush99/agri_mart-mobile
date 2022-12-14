import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
  ToastAndroid
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import { SetProfilePicture,SetProfilePicture2 } from '../../helpers/UserProperties';


export default function UploadScreen() {
    const [image, setImage] = useState(null);
    const [File, setFile] = useState();
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const [galleryPermission, setGalleryPermission] = useState(null);
    const [imageUri, setImageUri] = useState(null);

    const setToastMsg = msg => {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

    const permisionFunction = async () => {

        const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        console.log(imagePermission.status);

        setGalleryPermission(imagePermission.status === 'granted');

        if (imagePermission.status !== 'granted') {
            setToastMsg('Permission for media access needed.');
        }
    }

    useEffect(() => {
        permisionFunction();
    }, []);

    const pick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.cancelled) {
            const source = { uri: result.uri };
            console.log(source);
            console.log("image object",result);
            setImage(source);
            setFile(result)
            setImageUri(result.uri);
        }
    }

    const removeImage = () => {
        setImageUri(null);
        setToastMsg('Image Removed');
    }

    const selectImage = () => {
        const options = {
          maxWidth: 2000,
          maxHeight: 2000,
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        };
        ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log(source);
            setImage(source);
          }
        });
    };

    const uploadImage = async () => {
        setTransferred(0);
        const response = await fetch(image.uri)
        const blob = await response.blob()
        SetProfilePicture2(image,blob)
        setUploading(true);
        setTransferred(100);
      };
      return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={pick}>
                <Text style={styles.buttonText}>Pick an image</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                {image?
                <Image source={{ uri: image.uri }} style={styles.imageBox} />
                :null}
            <View style={styles.progressBarContainer}>
                <Progress.Bar progress={transferred} width={300} />
            </View>
              <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                <Text style={styles.buttonText}>Upload image</Text>
              </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#bbded6'
    },
    selectButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#8ac6d1',
      alignItems: 'center',
      justifyContent: 'center'
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center'
    },
    progressBarContainer: {
      marginTop: 20
    },
    imageBox: {
      width: 300,
      height: 300
    }
  });
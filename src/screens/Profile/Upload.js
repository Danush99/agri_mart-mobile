import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ToastAndroid, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Button } from 'react-native-paper'

export default function Upload() {
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
            setImageUri(result.uri);
        }
    }

    const removeImage = () => {
        setImageUri(null);
        setToastMsg('Image Removed');
    }

    return (
        <View>
            <View style={styles.innerContainer}>
                <TouchableHighlight
                    onPress={pick}
                    underlayColor='rgba(0,0,0,0)'
                >
                    <Avatar.Image
                        size={250}
                        source={{ uri: imageUri }}
                    />
                </TouchableHighlight>
            </View>
            <View style={[styles.innerContainer, { marginTop: 25, flexDirection: 'row' }]}>
                <Button
                    mode='contained'
                    onPress={pick}
                >
                    Upload Image
                </Button>
                <Button
                    mode='contained'
                    onPress={() => removeImage()}
                    style={{ marginLeft: 20 }}
                >
                    Remove Image
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
});
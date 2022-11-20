import React, { useState,useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import AuthServices from "../services/AuthServices";
import FarmerServices from "../services/FarmerServices";
import BuyerServices from "../services/BuyerServices";


//Firebaser
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
    getFirestore,
    collection,
    setDoc,
    getDocs,
    getDoc,
    onSnapshot,
    doc,
    serverTimestamp,
  } from "firebase/firestore";
  import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
  } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0RI24kXEIqlHLTj-wcF1-muub1hMia4c",
    authDomain: "agri-mart-pid11.firebaseapp.com",
    projectId: "agri-mart-pid11",
    storageBucket: "agri-mart-pid11.appspot.com",
    messagingSenderId: "1074660201063",
    appId: "1:1074660201063:web:b4d5def494d3d170e03ac2",
    measurementId: "G-C064EHW3LC"
  };
//init firebase app
const firebaseApp = initializeApp(firebaseConfig);

//init services
const db = getFirestore();
//const auth = getAuth()

export { db };

const projectStorage = getStorage(firebaseApp);


export function getUserProfile(userType,typeId) {
  AuthServices.GetUserProfile({userType:userType ,typeId:typeId})
  .then((res) => {
    console.log("User profile getting is success");
    return res.user
  })
  .catch((err) => {
    console.log("backend error : ",err)
  });
}

export function SetProfilePicture(picture,file,userType,userID) {
    const { uri } = picture;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let url = null;
    const storageRef = ref(projectStorage, `profilePictures/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          url = downloadURL;
          AuthServices.ProfilePicUpload({userType:userType,userID:userID,imgUrl:downloadURL})
          .then((res) => {
            console.log("Successfully Uploaded");
          })
          .catch((err) => {
            console.log("backend error : ",err)
          });

        });
      }
    )
}

const addImgFirebase = async(filename,file) =>{
  const storageRef = ref(projectStorage, `profilePictures/${filename}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

      });
    }
  )
}

export function UpdateItemImg(uriArray,files,ItemId) {
  for(let x=0;x<files.length;x++){
    const filename = uriArray[x].substring(uriArray[x].lastIndexOf('/') + 1);
    const file = files[x]
    const storageRef = ref(projectStorage, `profilePictures/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("firebase Storage link is ",downloadURL)
          FarmerServices.UpdateItemImg(downloadURL,ItemId)
          .then((res) => {
              console.log("Successfully added item",res);
            })
            .catch((err) => {
              console.log("backend error : ",err)
            });
        });
      }
    )
  }
}



// AuthServices.ProfilePicUpload({userType:userType,userID:userID,imgUrl:downloadURL})
// .then((res) => {
//   console.log("Successfully Uploaded");
// })
// .catch((err) => {
//   console.log("backend error : ",err)
// });
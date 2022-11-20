import axios from "axios";
import token from "./Token";
import client from './client';
import {baseUrl} from './client'

//API endpoint
//const APIEndpoint = config.DOMAIN_NAME + '/auth';
const APIEndpoint = "http://localhost:5000/";

const LoginUser = (data) =>
  new Promise((resolve, reject) => {
    //const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = baseUrl+'/auth/login';
    axios
    .post(url, data)
    .then((res) => {
    if (res.data.success){
        resolve(res.data);
    } else {
        reject(res.data);
    }
    })
    .catch((err) => {
      reject(err);
    });
});

const RegisterFarmer = (data) =>
  new Promise((resolve, reject) => {
    //const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = baseUrl+'/auth/registerFarmer';
    axios
    .post(url, data)
    .then((res) => {
    if (res.data.success){
        resolve(res.data);
    } else {
        reject(res.data);
    }
    })
    .catch((err) => {
      reject(err);
    });
});

const RegisterBuyer = (data) =>
  new Promise((resolve, reject) => {
    //const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = baseUrl+'/auth/registerBuyer';
    axios
    .post(url, data)
    .then((res) => {
    if (res.data.success){
        resolve(res.data);
    } else {
        reject(res.data);
    }
    })
    .catch((err) => {
      reject(err);
    });
});

const ProfilePicUpload = (data) =>
  new Promise((resolve, reject) => {
    //const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = baseUrl+'/user/proPicUpload';
    axios
    .post(url, data)
    .then((res) => {
    if (res.data.success){
        resolve(res.data);
    } else {
        reject(res.data);
    }
    })
    .catch((err) => {
      reject(err);
    });
});


// const GetUserProfile =(data) =>
//   new Promise((resolve, reject) => {
//     //const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
//     const url = baseUrl+'/user/getProfile';
//     axios
//     .post(url, data)
//     .then((res) => {
//     if (res.data.success){
//         resolve(res.data);
//     } else {
//         reject(res.data);
//     }
//     })
//     .catch((err) => {
//       reject(err);
//     });
// }); 

const GetUserProfile = async (data) => {
  const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
  const res = await client.post('/user/getProfile',data);
  console.log("user profile data: ",res.data)
  if (res.data.success) {
      return(res.data);
  }else{
      return(res.data);
  }
}

const UpdateProfilee = async (data) => {
  const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
  const res = await client.post('/user/updateProfile',data);
  if (res.data.success) {
      return(res.data);
  }else{
      return(res.data);
  }
}

const UpdateProfile = (data) =>
  new Promise((resolve, reject) => {
    //const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = baseUrl+'/user/updateProfile';
    axios
    .post(url, data)
    .then((res) => {
    if (res.data.success){
        resolve(res.data);
    } else {
        reject(res.data);
    }
    })
    .catch((err) => {
      reject(err);
    });
});

const GetBiddings = async (_id,UserType) => {
  const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
  const res = await client.post('/user/getBiddings',{UserType:UserType,_id:_id});
  if (res.data.success) {
      return(res.data);
  }else{
      return(res.data);
  }
}

export default {
    RegisterFarmer ,
    RegisterBuyer,
    LoginUser,
    ProfilePicUpload,
    GetUserProfile,
    UpdateProfile,
    GetBiddings
  }
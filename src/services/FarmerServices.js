import axios from "axios";
import token from "./Token";
import client from './client';
import {baseUrl} from './client'

const GetFarmerProducts = async (data) => {
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const res = await client.post('/farmer/getProducts',data);
    if (res.data.success) {
        return(res.data);
    }else{
        return(res.data);
    }
}
  
const UpdateItem  = async (data,itemId,IsBiding) => {
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const res = await client.post('/farmer/updateItem',{data:data,itemId:itemId,IsBiding:IsBiding});
    if (res.data.success) {
        return(res.data);
    }else{
        return(res.data);
    }
}

const DeleteItem = async (itemId) => {
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const res = await client.post('/farmer/deleteItem',{itemId:itemId});
    if (res.data.success) {
        return(res.data);
    }else{
        return(res.data);
    }
}
  
const AddItem = async (data,IsBid,farmerID) => {
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const res = await client.post('/farmer/addItem',{data:data,IsBid:IsBid,farmerID:farmerID});
    if (res.data.success) {
        return(res.data);
    }else{
        return(res.data);
    }
}

const UpdateItemImg = async (URL,ItemId) => {
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const res = await client.post('/farmer/updateItemImg',{URL:URL,ItemId:ItemId});
    if (res.data.success) {
        return(res.data);
    }else{
        return(res.data);
    }
}

export default {
    GetFarmerProducts,
    UpdateItem,
    DeleteItem,
    AddItem,
    UpdateItemImg
}
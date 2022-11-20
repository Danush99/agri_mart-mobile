import axios from "axios";
import token from "./Token";
import client from './client';

//API endpoint
//const APIEndpoint = config.DOMAIN_NAME + '/auth';
const APIEndpoint = "http://localhost:5000/";

const GetMarketItems = async () => {
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const res = await client.get('/market/getItems',);
    if (res.data.success) {
        return(res.data);
    }else{
        return(res.data.message);
    }
}

const DirectBuying = async(data,item,UserTypeId) => {
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const res = await client.post('/market/directBuy',{data:data,item:item,UserTypeId:UserTypeId});
    if (res.data.success) {
        return(res.data);
    }else{
        return(res.data.message);
    }
}

const GetMarketOrders = async (userId,userType) => {
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const res = await client.post('/market/orders',{userId:userId,userType:userType});
    if (res.data.success) {
        return(res.data);
    }else{
        return(res.data.message);
    }
}

export default {
    GetMarketItems ,
    DirectBuying,
    GetMarketOrders
  }
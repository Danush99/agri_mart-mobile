import axios from "axios";
import token from "./Token";
import client from './client';

//API endpoint
//const APIEndpoint = config.DOMAIN_NAME + '/auth';
const APIEndpoint = "http://localhost:5000/";

const GetMarketItemss = () => 
  new Promise((resolve, reject) => {
    console.log("trying")
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = APIEndpoint+'market/getItems';
    axios
    .get(url,headers)
    .then((res) => {
    if (res.request.status === 200 || res.request.status === 201){
        console.log("Items here: ",res.data.items)
        resolve(res.data.items);
    } else {
        reject(res.data.message);
    }
    })
    .catch((err) => {
        reject(err);
    });
});

const getRandomId = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * 
        (max - min + 1)) + min).toString();
};

const getAdvice = () => {
    axios
        .get("http://api.adviceslip.com/advice/" + 
            getRandomId(1, 200))
        .then((response) => {
            setAdvice(response.data.slip.advice);
        });
    }

const GetMarketItems = async () => {
    const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const res = await client.get('/market/getItems',);
    if (res.data.success) {
        return(res.data);
    }else{
        return(res.data.message);
    }
}

export default {
    GetMarketItems ,
  }
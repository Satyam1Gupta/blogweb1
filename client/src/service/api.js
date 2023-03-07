import axios from 'axios';
import { api_notification_msg,service_urls } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';


const axiosInstance=axios.create({
    
        baseURL:'',//URL of the server(incase of local host it is:"http://localhost:8000")
        timeout: 10000,
       
        //headers: {'content-type': 'application/json'}
      
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
    // Do something before request is sent
    if(config.TYPE.params){
      config.params=config.TYPE.params;
    }else if(config.TYPE.query){
        config.url=config.url+'/'+config.TYPE.query;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  
  // Add a response interceptor
axiosInstance.interceptors.response.use(
    function (response) {
   //stop global loader
    return processResponse(response);
  }, function (error) {
   
    return Promise.reject(processError(error));
  });

  const processResponse = (response) =>{
    if(response?.status===200){
        return{ isSuccess:true, data:response.data}
    }else{
        return{
            isFailure: true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code
        }
    }
      }

  const processError=(error)=>{
    if(error.response){
    console.log('error in response ', error.toJSON())
    return{
        isError:true,
        msg:api_notification_msg.responseFailure,
        code:error.response.status
    }

    }else if(error.request){
        console.log('error in request ', error.toJSON())
        return{
            isError:true,
            msg:api_notification_msg.requestFailure,
            code:""
        }

    }else{
        console.log('error in network ', error.toJSON())
    return{
        isError:true,
        msg:api_notification_msg.networkError,
        code:""
    }
    }
  }

  const API={};

  for(const[key,value] of  Object.entries(service_urls)){
    API[key]=(body)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            data:body,
           // responseType:value.responseType
           headers:{
            authorization:getAccessToken()
            },
            TYPE: getType(value,body)
        })
    
}

export {API};

  
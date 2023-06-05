

export const getAccessToken=()=>{
    return sessionStorage.getItem('accessToken')
}

export const addEllipsis=(str,limit)=>{
    return str.length>limit? str.substring(0,limit)+'...':str;
}

export const getType=(value,body)=>{
    if(value.params){
        return{params:body}
    }else if(value.query){
       
        if(typeof body==='object'){
           // console.log("t: "+body._id)
            return {query:body._id}
        }else{
           // console.log("l: "+body)
            return {query:body}
        }
    }
    return {};
}
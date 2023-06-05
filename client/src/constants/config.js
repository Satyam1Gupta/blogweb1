//API NOTIFICATION MESSAGES:

export const api_notification_msg={
    loading:{
        title:'Loading...',
        message:'Data is being loaded please wait'
    },
    success:{
        title:'Success',
        message:'Data is successfully loaded'
    },
    responseFailure:{
        title:'Error',
        message:'An error occured while response from the server please try again later'
    },
    requestFailure:{
        title:'Error',
        message:'An error occured while parsing request data'
    },
    networkError:{
        title:'Erro',
        message:'Unable to connect with the server. please check internet connectivity.'
    }

}

//API SERVICE CALL:

//need service call:{url:'/',method:'POST/GET/PUT/DELETE', params: true/false,query: true/false}
export const service_urls={
    userSignup:{url:'/signup',method:'POST',contentType:'application/json'},
    googleSignup:{url:'/google_signup',method:'POST',contentType:'application/json'},
    userLogin:{url:'/login',method:'POST'},
    uploadFile:{url:'/file/upload',method:'POST',contentType:'multipart/form-data'},
    createPost:{url:'/create',method:'POST',contentType:'application/json'},
    getAllPosts:{url:'/posts',method:'GET',params:true},
    getPostById:{url:'/post',method:'GET',query:true},
    updatePost:{url:'/update',method:'PUT', query:true},
    deletePost:{url:'/delete',method:'DELETE', query:true},
    newComment:{url:'/comment/new',method:'POST'},
    getAllComments:{url:'/comments',method:'GET',query:true},
    deleteComment:{url:'/comment/delete',method:'DELETE',query:true},
    editComment:{url:'/comment/edit',method:'PUT',query:true},
    
    newConversation:{url:'/message_user',method:'POST'},
    getConversation:{url:'/message_get_user',method:'GET',query:true},
    getUserById:{url:'/get_user',method:'GET',query:true},
    getMessages:{url:'/get_messages',method:'GET',query:true},
    postMessages:{url:'/post_messages',method:'POST',contentType:'application/json'},
    getAllUser:{url:'/get_all_user',method:'GET'},
}
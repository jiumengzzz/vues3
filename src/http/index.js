//统一api管理
import { method } from "lodash-es";
import instance from "./axios";
// data json

export const queryName=(data)=>{
    return instance.request({
        url:`/mall/cms-topic-category/query/${data.name}`,
        method:'get',
        
    })
}

export const topic=(data)=>{
    return instance.request({
     url:'/mall/cms-topic/page', //url=baseURL+url
         method:'post',
         data
    })
 }
 export const topicDel=(data)=>{
    return instance.request({
     url:`/mall/cms-topic/del/${data.id}`, //url=baseURL+url
         method:'get',
    })
 }
 export const addtopic=(data)=>{
    return instance.request({
     url:'/mall/cms-topic/add', //url=baseURL+url
         method:'post',
         data
    })
 }
 export const edittopic=(data)=>{
    return instance.request({
     url:'/mall/cms-topic/edit', //url=baseURL+url
         method:'post',
         data
    })
 }

 export const topiccategory=(data)=>{
    return instance.request({
     url:'/mall/cms-topic-category/page', //url=baseURL+url
         method:'post',
         data
    })
 }
 export const topiccategoryDel=(data)=>{
    return instance.request({
     url:`/mall/cms-topic-category/del/${data.id}`, //url=baseURL+url
         method:'get',
    })
 }
 export const addtopiccategory=(data)=>{
    return instance.request({
     url:'/mall/cms-topic-category/add', //url=baseURL+url
         method:'post',
         data
    })
 }
 export const edittopiccategory=(data)=>{
    return instance.request({
     url:'/mall/cms-topic-category/edit', //url=baseURL+url
         method:'post',
         data
    })
 }
 export const topiccomment=(data)=>{
    return instance.request({
     url:'/mall/cms-topic-comment/page', //url=baseURL+url
         method:'post',
         data
    })
 }
 export const addtopiccomment=(data)=>{
    return instance.request({
     url:'/mall/cms-topic-comment/add', //url=baseURL+url
         method:'post',
         data
    })
 }
 export const edittopiccomment=(data)=>{
    return instance.request({
     url:'/mall/cms-topic-comment/edit', //url=baseURL+url
         method:'post',
         data
    })
 }
 export const delComment=(params)=>{
    return instance.request({
        url:`mall/cms-topic-comment/del/${params.id}`,
        method:'get',
    })
}
const userLogin=(data)=>{
    //返回Promise对象
   return instance.request({
        url:'api/mobile/elogin', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
        method:'post',
        data,
      
    })
}
const adminLogin=(data)=>{
   return instance.request({
    url:'', //url=baseURL+url
        method:'post',
        data
   })
}
const adCatePage=(data)=>{
   return instance.request({
    url:'api/adcate/page',
    method:'post',
    data
   })
}
const adCateDelId=(params)=>{
    return instance.request({
        url:'api/adcate/delete',
        params
    })
}
const adCateAdd=(data)=>{
    return instance.request({
        url:'api/adcate/add',
        method:'post',
        data
    })
}
const adCateEdit=(data)=>{
    return instance.request({
        url:'api/adcate/edit',
        method:'post',
        data
    })
}

// const isEven = n => n % 2 === 0;



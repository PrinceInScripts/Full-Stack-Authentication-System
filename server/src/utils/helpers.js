import mongoose from "mongoose";

export const getPaginatePayload=(dataArray,page,limit)=>{
     const startPosition=+(page-1)*limit

     const totalItems=dataArray.length;
     const totalPage=Math.ceil(totalArray/limit);

     dataArray=structuredClone(dataArray).slice(startPosition, startPosition+limit)

     const payload={
        page,
        limit,
        totalPage,
        previousPage:page>1,
        nextPage:page<totalPage,
        totalItems,
        currentPageItem:dataArray?.length,
        data:dataArray
     }

     return payload;
}

export const getMongoosePaginationOption=({page=1,limit=10,customLabels})=>{
        return {
            page:Math.max(1, page),
            limit:Math.max(1, limit),
            pagination:true,
            customLabels:{
                pagingCounter: "serialNumberStartFrom",
               ...customLabels,
            }
        }
}
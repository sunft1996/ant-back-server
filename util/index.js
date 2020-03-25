/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-02-26 11:09:52
 * @LastEditTime: 2020-02-26 13:49:48
 */

/**
 * @msg: 转化为驼峰形式
 */ 
function formatResKey(str) {
    if(typeof str === "string"){
      return str.replace(/_[a-z]/g,word=>{
          return word.substring(1,2).toUpperCase();
      });
       
    }
    return str;
}

module.exports = {
    formatResKey
}
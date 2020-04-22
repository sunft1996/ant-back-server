/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-02-26 11:09:52
 * @LastEditTime: 2020-04-15 16:56:05
 */
const CryptoJS = require('crypto-js');
/**
 * @msg: 转化为驼峰形式
 * @param {str} String
 */

function formatResKey(str) {
    if(typeof str === "string"){
        return str.replace(/_[a-z]/g,word=>{
            return word.substring(1,2).toUpperCase();
        });
       
    }
    return str;
}

/**
 * @msg: 加密
 * @param {before} String
 */

function encrypt(before) {
    const secretKey = 'com.sunft.foo.key';
    const afterEncrypt = CryptoJS.DES.encrypt(before, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    }).toString();
    return afterEncrypt;
}

/**
 * @msg: 解密
 * @param {before} String
 */

function decrypt(before) {
    const secretKey = 'com.sunft.foo.key';
    const afterDecrypt = CryptoJS.DES.decrypt(before, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
    return afterDecrypt;
}

module.exports = {
    formatResKey,
    encrypt,
    decrypt
}
import getCookieUserMail from "./getCookieUserMail";
import getEncryptedUserMail from "./getEncryptedUserMail";

const createCookieUserMail = (key, value, expirationDay)=> {
    var date = new Date(); 
    date.setTime(date.getTime() + (expirationDay*24*60*60*1000)); 
    var expires = "expires="+date.toUTCString(); 
    document.cookie = `${key}=${value};secure;${expires}`; 
}

const updateCookie = (key, value) =>{
    document.cookie = `${key}=${value};secure`;
}

const checkCookie = (cookieKey) => {
    var key = getCookieUserMail(cookieKey);
    if (key!=""){
        return true;
    }
    else{
        return false;
    }
}

export function cookieUserMail(url) {
    //const urlTest = "https://cloudcar.cl/emailtest/bXBvbmNlQGNsb3VkY2FyLmNs"
    const cookieKey = "userMail"
    const email = getEncryptedUserMail(url)

    if(checkCookie(cookieKey)){
        updateCookie(cookieKey, email)
    }
    else{
        createCookieUserMail(cookieKey, email, 1)
    }
}

export default cookieUserMail;
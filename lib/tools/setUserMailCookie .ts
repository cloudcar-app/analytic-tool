import getEncryptedUserMail from "./getEncryptedUserMail";
import {createCookie, updateCookie, checkIfdCookieExists} from "./cookieManager"

export function setUserMailCookie () {
    const cookieLifetimeInDays = 365;
    const cookieKey: string = "userMail";
    const email:string = getEncryptedUserMail();
    if (!email) { return };
    if(checkIfdCookieExists(cookieKey)){
        updateCookie(cookieKey, email);
    }
    else{
        createCookie(cookieKey, email, cookieLifetimeInDays);
    }
}

export default setUserMailCookie ;
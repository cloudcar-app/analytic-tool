import getEncryptedUserMail from "./getEncryptedUserMail";
import {createCookie, updateCookie, checkCookie} from "./cookieManagement"

export function cookieUserMail() {
    const cookieLifetimeInDays = 365;
    const cookieKey: string = "userMail";
    const email:string = getEncryptedUserMail();
    if (!email) { return };
    if(checkCookie(cookieKey)){
        updateCookie(cookieKey, email);
    }
    else{
        createCookie(cookieKey, email, cookieLifetimeInDays);
    }
}

export default cookieUserMail;
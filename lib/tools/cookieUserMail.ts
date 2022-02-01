import getEncryptedUserMail from "./getEncryptedUserMail";
import {createCookie, updateCookie, checkCookie} from "./cookieManagement"

export function cookieUserMail(url:string) {
    //const urlTest = "https://cloudcar.cl/emailtest/bXBvbmNlQGphamEuY2w="
    const cookieKey: string = "userMail"
    const email:string = getEncryptedUserMail(url)

    if(checkCookie(cookieKey)){
        updateCookie(cookieKey, email)
    }
    else{
        createCookie(cookieKey, email, 1)
    }
}

export default cookieUserMail;
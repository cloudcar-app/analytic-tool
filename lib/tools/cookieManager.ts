const createCookie = (key:string, value:string, expirationDay:number)=> {
    var date:Date = new Date(); 
    date.setTime(date.getTime() + (expirationDay*24*60*60*1000)); 
    var expires:string = "expires="+date.toUTCString(); 
    document.cookie = `${key}=${value};secure;${expires}`; 
}

const updateCookie = (key:string, value:string) =>{
    document.cookie = `${key}=${value};secure`;
}

const checkIfdCookieExists = (cookieName:string) => {
    var key:string = getCookieByName(cookieName);
    if (key!=""){
        return true;
    }
    else{
        return false;
    }
}

const getCookieByName = (cookieName: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2){
        return parts.pop()?.split(';').shift();
    }
}

export {
    createCookie,
    updateCookie,
    checkIfdCookieExists,
    getCookieByName
};
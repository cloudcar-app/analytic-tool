const createCookie = (key:string, value:string, expirationDay:number)=> {
    var date:Date = new Date(); 
    date.setTime(date.getTime() + (expirationDay*24*60*60*1000)); 
    var expires:string = "expires="+date.toUTCString(); 
    (
      window.top || window
    ).document.cookie = `${key}=${value};secure;${expires}`; 
}

const updateCookie = (key: string, value: string) => {
  (window.top || window).document.cookie = `${key}=${value};secure`;
};

const checkIfdCookieExists = (cookieName: string) => {
  var key: string = getCookieByName(cookieName);
  if (key != '') {
    return true;
  } else {
    return false;
  }
};

const getCookieByName = (cookieName: string) => {
  const value = `; ${(window.top || window).document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
};

function getSnowplowCookie(cookieName: string) {
    var matcher = new RegExp('_sp_' + 'id\\.[a-f0-9]+=([^;]+);?');
    var match = (window.top || window).document.cookie.match(matcher);
    if (match && match[1]) {
        if(cookieName == "duid"){
            return match[1].split('.')[0];
        }
        else if(cookieName == "sid"){
            return match[1].split('.')[5];
        }
        else{
            false
        }
    } else {
      return false;
    }
}

export {
    createCookie,
    updateCookie,
    checkIfdCookieExists,
    getCookieByName,
    getSnowplowCookie
};
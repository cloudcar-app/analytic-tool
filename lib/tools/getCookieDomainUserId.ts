export function getCookieDomainUserId(cookieName) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);
  if (parts.length === 2){
    return parts.pop()?.split(';').shift()?.split('.')[0]; 
  } 
}

export default getCookieDomainUserId;
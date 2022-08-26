import base64url from "base64url";

export function getEncryptedUserMail() {
  const params: URLSearchParams = new URLSearchParams(
    (window.top || window).document.location.search,
  );
  const encryptedMail:string = params.get("email");
  if(encryptedMail != null) {
    const mail:string = base64url.decode(encryptedMail);
    return mail;
  }
  else{
    return "";
  }
}
  
export default getEncryptedUserMail;
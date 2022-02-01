import base64url from "base64url";

export function getEncryptedUserMail(url:string) {
  const parts:string[] = url.split('/');
  const encryptedMail:string = parts.pop()!;
  if(encryptedMail != null) {
    const mail:string = base64url.decode(encryptedMail);
    return mail;
  }
  else{
    return "";
  }
}
  
export default getEncryptedUserMail;
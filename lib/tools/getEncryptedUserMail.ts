import base64url from "base64url";

export function getEncryptedUserMail(url:string) {
  const parts = url.split('/');
  const encryptedMail = parts.pop()
  if(encryptedMail != null) {
    const mail = base64url.decode(encryptedMail)
    return mail
  }
}
  
export default getEncryptedUserMail;
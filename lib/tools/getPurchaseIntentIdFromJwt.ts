import jwtDecode from 'jwt-decode';

interface JwtToken {
  'cognito:username'?: string;
  purchaseIntentId: string;
}

const getPurchaseIntentId = (): string => {
  const token = localStorage.getItem('AccessToken') as string;
  if (token) {
    const decodedToken: JwtToken = jwtDecode(token);
    return decodedToken.purchaseIntentId;
  }
  return '';
};

export default getPurchaseIntentId;

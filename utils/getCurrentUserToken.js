import Auth from "@aws-amplify/auth";

export default async function getCurrentUserToken() {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  return token;
}

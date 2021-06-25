import Auth from "@aws-amplify/auth";

export async function getCurrentUserToken() {
  const user = await Auth.currentAuthenticatedUser();
  const token = user.signInUserSession.idToken.jwtToken;
  return token;
}

export async function handleResponse(response) {
  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.message);
  }
  return response.json();
}

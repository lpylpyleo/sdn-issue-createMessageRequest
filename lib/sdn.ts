import sdk from 'sendingnetwork-js-sdk'
import useSWR from "swr";

export const useSdnClient = (sdnUserId: string, sdnAccessToken: string) => {
  const baseUrl = 'https://portal0101.sending.network';

  return useSWR('client', () => {
    return sdk.createClient({
      baseUrl,
      userId: sdnUserId,
      accessToken: sdnAccessToken,
    })
  })
}

// Input Parameters: { message: string }
// Output Parameters: signature string
const signWithDevKey = async ({message}: any) => {
  if (!message) return;
  // Make a request to your backend API to sign the message and retrieve the signature.
  // Note: This example demonstrates the concept; implement this API in your backend.
  const response = await fetch(
    'https://YOUR_KEY_SERVER/_api/appservice/sign',
    {
      method: 'POST',
      body: JSON.stringify({message}),
    },
  );
  const {signature} = await response.json();
  return signature;
};

// Pseudo Code for Login Flow
// const login = async () => {
//   // Other code logic, omitted here...
//   const {message: lMessage, updated, random_server} = await sdk.preDiDLogin(preloginParams);
//   const devSign = await window.signWithDevKey({message: lMessage});
//   const loginParams = {
//     // Other parameters, omitted here...
//     identifier: {
//       // Other parameters, omitted here...
//       app_token: devSign
//     }
//   }
//   const {access_token, user_id} = await this._client.DIDLogin(loginParams);
//   // Other code logic, omitted here...
// }

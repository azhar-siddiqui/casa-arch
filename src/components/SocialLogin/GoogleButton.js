import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyGetUserIdQuery, useLazyGetUserTypeQuery, useSocialLoginMutation } from '../../app/services/userServices'
import { updateIsLoggedIn, updateUserId, updateUserType } from '../../app/slices/user'
import { updateIsStepperVisible } from '../../app/slices/userStepper'
import ButtonField from '../ButtonsFields/ButtonField'
import GoogleIcon from "../../assets/socialIcons/google.svg";
import { GoogleLogin } from 'react-google-login'


export default function GoogleButton({ setVisible, handleLogout }) {

   const [socialLogin, socialLoginResp] = useSocialLoginMutation()
   const dispatch = useDispatch()
   const [fetchUserId, result] = useLazyGetUserIdQuery()
   const [fetchUserType, userTypeFetched] = useLazyGetUserTypeQuery()
   const { redirectToSteppers } = useSelector(state => state.user)

   const responseGoogle = async (googleData) => {
      let data = {
         // client_id: '150404684965-tqdd3gsmve64v2o63c86kc9igp7bq4ih.apps.googleusercontent.com',
         // client_secret: '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',
         client_id: 'Immucq4FCvfr93KsJc8wTYt1Z1zTNbPR0iuD3TcE',
         client_secret: '0u3kVQpS0JpU3NaQHr4tiCn6o70JrUCbeSI7Xf6oRt5NXIfW69YrshDdAnWS833YY7xJNaq3qUb8LC8895nBewmaBw9NjbU5bSfv3F8TBCKpQ7uieHvTxpaYj0R2Hm0o',
         grant_type: "convert_token",
         backend: "google-oauth2",
         token: googleData.accessToken, // which will get from google
      };
      // console.log(data)
      const accessToken = googleData.accessToken
      // console.log(accessToken)
      socialLogin(data)
         .then(res => {
            console.log(res.data.access_token)
            dispatch(updateIsLoggedIn(true))
            sessionStorage.setItem('access', res.data.access_token)
            fetchUserId(accessToken)
               .then((res) => {
                  console.log(res.data);
                  dispatch(updateUserId(res.data["user-id"]));
               })
            fetchUserType(accessToken)
               .then(res => {
                  console.log(res)

                  setVisible(false)

                  if (res.data['user-type'] === 'Professional') {
                     handleLogout()
                     alert('Cant login as the account is registered as Professional')
                     return
                  }
                  redirectToSteppers && dispatch(updateIsStepperVisible(true))
                  dispatch(updateUserType(res.data['user-type']))
               })
               .catch(err => {
                  console.log(err.response)
               })

         })

      // const res = await axios.post(`${domain}/social-auth/convert-token/`, data)
      // let response_data = await res.data
      // let token = JSON.stringify(response_data);
      // sessionStorage.setItem("access", token);
      // console.log(response_data)
      // setAuth(res.data);
      // window.location.reload();
   }

   return (

      <GoogleLogin
         // clientId={process.env.GOOGLE_CLIENT_ID}
         clientId='150404684965-tqdd3gsmve64v2o63c86kc9igp7bq4ih.apps.googleusercontent.com'
         buttonText="Sign up with Google"
         onSuccess={responseGoogle}
         onFailure={err => console.log(err)}
         cookiePolicy={"single_host_origin"}
         render={(renderProps) => {
            return (
               <>
                  <ButtonField
                     className="flex items-center justify-center text-white  bg-primaryRed border border-primaryRed hover:bg-primaryRed hover:text-white w-full px-2 py-1 font-medium outline-none focus:outline-none ease-linear transition-all duration-150 text-[9.75px]
              md:px-4 md:py-4 md:font-medium md:text-lg"
                     type="button"
                     onClick={renderProps.onClick}
                     children={
                        <>
                           <img className="mr-[6px] md:mr-4" src={GoogleIcon} />
                           Login via Google
                        </>
                     }
                  />
               </>
            );
         }}
      />
   )
}

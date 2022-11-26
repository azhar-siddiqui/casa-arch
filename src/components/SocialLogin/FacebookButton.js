import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyGetUserIdQuery, useLazyGetUserTypeQuery, useSocialLoginMutation } from '../../app/services/userServices'
import { updateIsLoggedIn, updateUserId, updateUserType } from '../../app/slices/user'
import { updateIsStepperVisible } from '../../app/slices/userStepper'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import ButtonField from '../ButtonsFields/ButtonField'
import FacebookIcon from "../../assets/socialIcons/fb.svg";


export default function FacebookButton({ setVisible, handleLogout }) {

   const [socialLogin, socialLoginResp] = useSocialLoginMutation()
   const dispatch = useDispatch()
   const [fetchUserId, result] = useLazyGetUserIdQuery()
   const [fetchUserType, userTypeFetched] = useLazyGetUserTypeQuery()
   const { redirectToSteppers } = useSelector(state => state.user)

   const responseFacebook = async (fbData) => {
      console.log(fbData)
      let data = {
         client_id: 'Immucq4FCvfr93KsJc8wTYt1Z1zTNbPR0iuD3TcE',
         client_secret: '0u3kVQpS0JpU3NaQHr4tiCn6o70JrUCbeSI7Xf6oRt5NXIfW69YrshDdAnWS833YY7xJNaq3qUb8LC8895nBewmaBw9NjbU5bSfv3F8TBCKpQ7uieHvTxpaYj0R2Hm0o',
         grant_type: "convert_token",
         backend: "facebook",
         token: fbData.accessToken, // which will get from google
      };
      const accessToken = fbData.accessToken
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
   }

   return (
      <FacebookLogin
         appId='3258956814394095'
         // autoLoad
         callback={responseFacebook}
         render={renderProps => (
            <ButtonField
               className="flex items-center  justify-center text-white bg-primaryBlue border border-primaryBlue hover:bg-primaryBlue hover:text-white w-full px-1 md:px-2 py-1  outline-none focus:outline-none ease-linear transition-all duration-150 mr-3  text-[9.75px] md:px-4 md:py-4 md:font-medium md:text-lg md:mr-8"
               type="button"
               onClick={renderProps.onClick}
               children={
                  <>
                     <img className="mr-1 md:mr-4" src={FacebookIcon} />
                     Login via Facebook
                  </>
               }
            />
         )}
      />

   )
}

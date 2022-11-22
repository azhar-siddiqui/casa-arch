import React, { useEffect } from 'react'
import AddIcon from '../../assets/Dashboard/add.svg'
import { useGetProjectDetailsQuery } from '../../app/services/userServices'
import { useSelector } from 'react-redux'

export default function Message({ handleClick, setRequirements, isRequirementPosted }) {

   const { isLoggedIn, userName } = useSelector(state => state.user)

   const projectDetails = useGetProjectDetailsQuery(isLoggedIn, {
      refetchOnMountOrArgChange: true
   })

   useEffect(() => {
      if (projectDetails.data === undefined) return
      setRequirements(projectDetails.data)
   }, [projectDetails])


   return (
      <div className='flex max-w-1224 mx-auto flex-col md:flex-row md:items-center md:justify-between py-5 md:py-6'>
         <div>
            <p className='text-2xl font-medium mb-3'>
               Hello,
               <span className='text-primaryOrange'>
                  {" "} {userName}
               </span>
            </p>
            <p className='font-medium text-sm text-slate-500 mb-6'>
               Welcome to your Personal Dashboard!
               You can use this Space to Track your Ongoing Projects!
            </p>
         </div>
         <div>
            <button className='flex w-full items-center justify-center px-5 py-2 bg-primaryOrange border-primaryOrange text-white font-medium outline-none focus:outline-none ease-linear transition-all duration-150 mr-2'
               onClick={handleClick}>
               <img src={AddIcon} className='mr-4' />
               Post requirement
            </button>
         </div>
      </div>
   )
}

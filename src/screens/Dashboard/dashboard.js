import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProjectDetailsQuery, useGetUserIdQuery } from '../../app/services/userServices'
import { updateUserId } from '../../app/slices/user'
import AddIcon from '../../assets/Dashboard/add.svg'
import DashboardRequirements from '../Frame/DashboardRequirements/DashboardRequirements'

export default function Dashboard() {

   const [requirementsVisible, setRequirementsVisible] = useState(false)
   const { isLoggedIn } = useSelector(state => state.user)
   const [isRequirementPosted, setIsRequirementPosted] = useState(false)

   const { data: projectDetails, error } = useGetProjectDetailsQuery(isLoggedIn, {
      refetchOnMountOrArgChange: isRequirementPosted
   })
   const { data: userId } = useGetUserIdQuery()

   const dispatch = useDispatch()
   console.log(projectDetails)
   console.log(error)

   useEffect(() => {
      dispatch(updateUserId(userId))
   }, [userId])

   const handleClick = () => setRequirementsVisible(!requirementsVisible)

   return (
      <div className='p-4 md:p-6'>

         {!requirementsVisible &&
            <div className='flex max-w-1224 mx-auto flex-col md:flex-row md:items-center md:justify-between py-5 md:py-6'>
               <div>
                  <p className='text-2xl font-medium mb-3'>
                     Hello,
                     <span className='text-primaryOrange'>
                        {" "} KARTHIKEYAN R
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
         }

         {
            requirementsVisible ? <DashboardRequirements isRequirementPosted={isRequirementPosted} setRequirementsVisible={setRequirementsVisible} /> :
               <div className='font-medium text-center text-slate-500 my-10'>
                  Requirements not added yet !
               </div>
         }

      </div>
   )
}

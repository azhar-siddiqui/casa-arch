import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProjectDetailsQuery, useLazyGetUserIdQuery } from '../../app/services/userServices'
import { updateUserId } from '../../app/slices/user'
import Requirement from '../../components/Requirement/Requirement'
import DashboardRequirements from '../Frame/DashboardRequirements/DashboardRequirements'
import Message from './Message'

export default function Dashboard() {

   const [requirementsVisible, setRequirementsVisible] = useState(false)
   const [isRequirementPosted, setIsRequirementPosted] = useState(false)
   const [requirements, setRequirements] = useState([])
   const { isLoggedIn } = useSelector(state => state.user)
   const [fetchUserId, result] = useLazyGetUserIdQuery()
   // const { data: userId } = useGetUserIdQuery()

   const dispatch = useDispatch()

   useEffect(() => {
      isLoggedIn && 
      fetchUserId()
      .then(res=>{
         if(res.error) return
         dispatch(updateUserId(res.data['user-id']))
      })
   }, [isLoggedIn])

   const handleClick = () => setRequirementsVisible(!requirementsVisible)

   return (
      <div className='p-4 md:p-6'>

         {!requirementsVisible &&
            <Message handleClick={handleClick} setRequirements={setRequirements} isRequirementPosted={isRequirementPosted} />
         }

         {
            requirementsVisible ? <DashboardRequirements isRequirementPosted={isRequirementPosted} setRequirementsVisible={setRequirementsVisible} /> :
               requirements.length < 1 ?
                  <div className='font-medium text-center text-slate-500 my-10'>
                     Requirements not added yet !
                  </div> :
                  <div>
                     {
                        requirements.map(req => {
                           return <Requirement key={req.id} {...req} />
                        })
                     }
                  </div>

         }

      </div>
   )
}

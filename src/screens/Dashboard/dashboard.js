import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProjectDetailsQuery, useLazyGetUserIdQuery } from '../../app/services/userServices'
import { updateUserId, updateUserName } from '../../app/slices/user'
import Requirement from '../../components/Requirement/Requirement'
import SuccessModal from '../../components/SuccessModal/SuccessModal'
import DashboardRequirements from '../Frame/DashboardRequirements/DashboardRequirements'
import Message from './Message'


const budgetValues = ['0-25000', '25K-50K', '50K-2L', '2L-5L']
const requirementValues = ['Bohemian', 'Classic']

export default function Dashboard() {

   const [requirementsVisible, setRequirementsVisible] = useState(false)
   const [isRequirementPosted, setIsRequirementPosted] = useState(false)
   const [requirements, setRequirements] = useState([])
   const { isLoggedIn } = useSelector(state => state.user)
   const [fetchUserId, result] = useLazyGetUserIdQuery()
   const [successModalActive, setSuccessModalActive] = useState(false)
   // const { data: userId } = useGetUserIdQuery()

   const displaySuccessModal = () => {
      setSuccessModalActive(true)
      setTimeout(() => {
         setSuccessModalActive(false)
      }, 3000);
   }
   const dispatch = useDispatch()

   useEffect(() => {
      isLoggedIn &&
         fetchUserId()
            .then(res => {
               if (res.error) return
               dispatch(updateUserId(res.data['user-id']))
               dispatch(updateUserName(res.data.name))
            })
   }, [isLoggedIn])

   const handleClick = () => setRequirementsVisible(!requirementsVisible)

   return (
      <>
         <div className='p-4 md:p-6'>

            {!requirementsVisible &&
               <Message handleClick={handleClick} setRequirements={setRequirements} isRequirementPosted={isRequirementPosted} />
            }

            {
               requirementsVisible ? <DashboardRequirements displaySuccessModal={displaySuccessModal} setIsRequirementPosted={setIsRequirementPosted} setRequirementsVisible={setRequirementsVisible} budgetValues={budgetValues} requirementValues={requirementValues} /> :
                  requirements.length < 1 ?
                     <div className='font-medium text-center text-slate-500 my-10'>
                        Requirements not added yet !
                     </div> :
                     <div>
                        {
                           requirements.map(req => {
                              return <Requirement key={req.id} {...req} budgetValues={budgetValues} requirementValues={requirementValues} />
                           })
                        }
                     </div>

            }
         </div>
         {
            successModalActive &&
            <SuccessModal massage={
               <p className='px-4 text-center'>
                  We have sent the mail, the professional will contact you soon
               </p>
            } />
         }
      </>
   )
}

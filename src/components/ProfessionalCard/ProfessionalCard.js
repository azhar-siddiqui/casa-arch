import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEnquireMutation } from '../../app/services/userServices'
import EmailIcon from '../../assets/ProfessionalList/email.svg'
import RightArrowIcon from '../../assets/ProfessionalList/rightArrow.svg'

export default function ProfessionalCard({ id, name, professional_type, area, pin_code, email, showSuccessModal, showEnquirySuccessModal }) {

   const [enquire, enquireResp] = useEnquireMutation()
   const navigate = useNavigate()

   const handleEnquire = () => {
      showEnquirySuccessModal()
      // enquire()
      //    .then(async res => {
      //       console.log(res)
      //       if (res.error) {
      //          alert(res.error.data.error_description)
      //          return
      //       }
      //       showSuccessModal()
      //    })
   }

   const handleNavigate = path => navigate(path)

   const showProfile = () => handleNavigate()

   return (
      <div className='py-6 border-b flex flex-col md:flex-row md:items-center justify-between' >
         <div className='mb-4'>
            <p className='font-semibold text-xl mb-1'>
               {name}
            </p>
            <p className='mb-1'>
               {professional_type === 0 ? 'Architect' : 'Interior Designer'}
            </p>
            <p className='text-sm text-gray-700	mb-2'>
               {area} {','} {pin_code}
            </p>
            <div className='flex items-center'>
               <img src={EmailIcon} className='mr-4.5' />
               <p className='font-semibold'> {email === undefined ? 'No Email' : email} </p>
            </div>
         </div>
         <div className='flex'>
            <Link to={`/professionals/list/${id}`}>
               <button className='px-5 py-2 bg-primaryOrange border-primaryOrange text-white font-medium outline-none focus:outline-none ease-linear transition-all duration-150 mr-2'
                  // onClick={showProfile}
                  >
                  View Profile
               </button>
            </Link>
            <button onClick={handleEnquire} className='flex items-center px-5 py-2 bg-white border border-primaryOrange text-primaryOrange font-medium outline-none focus:outline-none ease-linear transition-all duration-150'>
               Enquire
               <img src={RightArrowIcon} className='ml-2' />
            </button>
         </div>
      </div>
   )
}

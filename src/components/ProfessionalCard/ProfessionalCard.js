import React from 'react'
import EmailIcon from '../../assets/ProfessionalList/email.svg'
import RightArrowIcon from '../../assets/ProfessionalList/rightArrow.svg'

export default function ProfessionalCard({ name, title, address, email }) {

   return (
      <div className='py-6 border-b flex flex-col md:flex-row md:items-center justify-between' >
         <div className='mb-4'>
            <p className='font-semibold text-xl mb-1'>
               {name}
            </p>
            <p className='mb-1'>
               {title}
            </p>
            <p className='text-sm text-gray-700	mb-2'>
               {address}
            </p>
            <div className='flex items-center'>
               <img src={EmailIcon} className='mr-4.5' />
               <p className='font-semibold'> {email} </p>
            </div>
         </div>
         <div className='flex'>
            <button className='px-5 py-2 bg-primaryOrange border-primaryOrange text-white font-medium outline-none focus:outline-none ease-linear transition-all duration-150 mr-2'>
               View Profile
            </button>
            <button className='flex items-center px-5 py-2 bg-white border border-primaryOrange text-primaryOrange font-medium outline-none focus:outline-none ease-linear transition-all duration-150'>
               Enquire 
               <img src={RightArrowIcon} className='ml-2' />
            </button>
         </div>
      </div>
   )
}

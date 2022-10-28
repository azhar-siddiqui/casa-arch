import React from 'react'

export default function TermsHeader({text}) {
   

   return (
      <div className='py-5 px-2 bg-primaryOrange mb-8 md:py-15'>
         <p className='text-2xl font-semibold text-center text-white'>
            {text}
         </p>
      </div>
   )
}

import React from 'react'

export default function TermsContent({ body }) {


   return (
      <div className='font-semibold [&>*]:mb-5 text-sm md:last:content:mb-8' >
         {body}
      </div>
   )
}

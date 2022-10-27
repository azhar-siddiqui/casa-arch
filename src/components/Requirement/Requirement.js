import React from 'react'

export default function Requirement({
   project_budget, project_name, project_location, project_details, aesthetic_req, user
}) {

   return (
      <div className='px-3 py-5 border mb-5'>
         <p className='text-xl font-bold mb-4'>
            Project Info
         </p>
         <div className='grid grid-cols-2 grid-rows-2 md:grid-cols-3'>
            <div className='mb-6'>
               <p className='text-sm'>
                  {project_name}
               </p>
            </div>
            <div className='mb-6'>
               <p className='text-sm'>
                  {project_location}
               </p>
            </div>
            <div className='mb-6'>
               <p className='text-sm'>
                  {aesthetic_req}
               </p>
            </div>
            <div className='mb-6'>
               <p className='text-sm'>
                  {project_budget}
               </p>
            </div>
            <div className='mb-6 w-full col-span-2'>
               <p className='text-sm'>
                  {project_details}
               </p>
            </div>
         </div>
      </div>
   )
} 

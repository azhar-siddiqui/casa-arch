import React, { useState } from 'react'
import { useGetProfessionalsQuery } from '../../app/services/professionalServices'
import ProfessionalCard from '../../components/ProfessionalCard/ProfessionalCard'

const data = [
   {
      name: 'Krishna Sharma',
      title: 'Interior Design',
      address: 'Vinukonda, Guntur, Andhra Pradesh (Nationwide)',
      email: 'k****************1@g***l.com'
   },
   {
      name: 'Krishna Sharma',
      title: 'Interior Design',
      address: 'Vinukonda, Guntur, Andhra Pradesh (Nationwide)',
      email: 'k****************1@g***l.com'
   },
   {
      name: 'Krishna Sharma',
      title: 'Interior Design',
      address: 'Vinukonda, Guntur, Andhra Pradesh (Nationwide)',
      email: 'k****************1@g***l.com'
   },
]

export default function ProfessionalsList() {

   const [list, setList] = useState(data)

   const professionalsData = useGetProfessionalsQuery()
   console.log(professionalsData)

   return (
      <div className='p-4 max-w-973 md:mx-auto'>
         {list.map((prof, idx) => {
            return <ProfessionalCard key={idx} {...prof} />
         })}
      </div>
   )
}

import React, { useEffect, useState } from 'react'
import { useGetArchitectsQuery, useGetInteriorDesignersQuery } from '../../app/services/userServices'
import ProfessionalCard from '../../components/ProfessionalCard/ProfessionalCard'

const tempData = [
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

   const [list, setList] = useState([])

   const architects = useGetArchitectsQuery(undefined, {
      refetchOnMountOrArgChange: true
   })

   const interiorDesigners = useGetInteriorDesignersQuery(undefined, {
      refetchOnMountOrArgChange: true
   })

   useEffect(() => {
      if (architects.data === undefined) return
      setList(prev => {
         return [...prev, ...architects.data.data]
      })
      // console.log(architects.data.data)
   }, [architects])

   useEffect(() => {
      if (interiorDesigners.data === undefined) return
      setList(prev => {
         return [...prev, ...interiorDesigners.data.data]
      })
      // console.log(interiorDesigners.data.data)
   }, [interiorDesigners])

   console.log('list', list)
   return (
      <div className='p-4 max-w-973 md:mx-auto'>
         {list.length > 0 && list.map((prof, idx) => {
            return <ProfessionalCard key={idx} {...prof} />
         })}
      </div>
   )
}

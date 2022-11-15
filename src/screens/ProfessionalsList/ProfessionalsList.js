import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetArchitectsQuery, useGetInteriorDesignersQuery } from '../../app/services/userServices'
import ProfessionalCard from '../../components/ProfessionalCard/ProfessionalCard'
import SuccessModal from '../../components/SuccessModal/SuccessModal'

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
   const { searchedProfessional } = useSelector(state => state.userStepper)
   console.log(searchedProfessional)
   const [loading, setLoading] = useState(true)
   const [successModalActive, setSuccessModalActive] = useState(false)

   const architects = useGetArchitectsQuery(undefined, {
      refetchOnMountOrArgChange: true
   })

   const showSuccessModal = ()=>{
      setSuccessModalActive(true)
      setTimeout(() => {
        setSuccessModalActive(false)
      }, 3000);
   }

   const interiorDesigners = useGetInteriorDesignersQuery(undefined, {
      refetchOnMountOrArgChange: true
   })

   useEffect(() => {
   }, [])

   useEffect(() => {
      if (searchedProfessional === 'Interior') return
      if (architects.data === undefined) return
      setTimeout(() => {
         setLoading(false)
      }, 2000);
      setList(prev => {
         return [...prev, ...architects.data.data]
      })
      // console.log(architects.data.data)
   }, [architects])

   useEffect(() => {
      if (searchedProfessional === 'Architect') return
      if (interiorDesigners.data === undefined) return
      setTimeout(() => {
         setLoading(false)
      }, 2000);
      setList(prev => {
         return [...prev, ...interiorDesigners.data.data]
      })
      // console.log(interiorDesigners.data.data)
   }, [interiorDesigners])

   console.log('list', list)
   return (
      <>
         <div className='p-4 max-w-973 md:mx-auto'>
            {list.length > 0 && list.map((prof, idx) => {
               return <ProfessionalCard key={idx} {...prof} showSuccessModal={showSuccessModal} />
            })}
         </div>
         {loading ?
            <SuccessModal massage='Finding suitable professionals for you' />
            : <></>
         }
         {successModalActive && (
            <SuccessModal massage='We have sent the mail, the professional will contact you soon' />
         )}
      </>
   )
}

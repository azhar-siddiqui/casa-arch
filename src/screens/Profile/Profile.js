import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const data = {

}

export default function Profile() {
   const [profileData, setProfileData] = useState(data)
   const { id } = useParams()
   console.log(id)

   return (
      <div>
         Profile
      </div>
   )
}

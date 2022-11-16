import React from 'react'
import styles from './ServicesEx.module.css'
import HeadImg from '../../assets/services/services-main.svg'
import HeadImgSm from '../../assets/services/services-main-small.svg'
import { useLazyGetSingleServiceQuery } from '../../app/services/blogs'

const SingleService = ({ heading }) => {

   const [fetchService, response] = useLazyGetSingleServiceQuery()

   const [service, setService] = useState({})
   const { id } = useParams()

   useEffect(() => {
      fetchService(id)
         .then(res => {
            setService(res.data.data)
         })
   }, [id])

   console.log(service)

   const { cover, author, description, meta_title, title } = service

   const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

   return (
      <div className={styles.main_div}>
         <div className={styles.head_img}>
            <img src={HeadImg} className={styles.big_dev} alt="..." onClick={() => { console.log(heading) }} />
            <img src={HeadImgSm} alt="..." className={styles.small_dev} />
         </div>
         <div className={styles.content}>
            <h2>{capitalize(heading)}</h2>
            <p>Architecture began as rural, oral vernacular architecture that developed from trial and error to successful replication. Ancient urban architecture was preoccupied with building religious structures and buildings symbolizing the political power of rulers until Greek and Roman architecture shifted focus to civic virtues. Indian and Chinese architecture influenced forms all over Asia and Buddhist architecture in particular took diverse local flavors. In fact, During the European Middle Ages, pan-European styles of Romanesque and Gothic cathedrals and abbeys emerged while the Renaissance favored Classical forms implemented by architects known by name. Later, the roles of architects and engineers became separated. Modern architecture began after World War I as an avant-garde movement that sought to develop a completely new style appropriate for a new post-war social and economic order focused on meeting the needs of the middle and working classes. Emphasis was put on modern techniques, materials, and simplified geometric forms, paving the way for high-rise superstructures. Many architects became disillusioned with modernism which they perceived as ahistorical and anti-aesthetic, and postmodern and contemporary architecture developed. </p>
         </div>
      </div>
   )
}

export default SingleService
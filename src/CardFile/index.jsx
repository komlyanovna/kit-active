import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { api } from '../Api'

const FILE = ['FILE']
const fileId = (id) => FILE.concat(id)

export function CardFile() {
  const { user } = JSON.parse(localStorage.getItem('USER_TOKEN'))
  const { id } = useParams()
  const {
    data,
  } = useQuery({
    queryKey: fileId(id),
    queryFn: () => api.getAllFile(user, id),

  })

  // console.log(data)

  const str = `data:image/png;base64,${data}`
  console.log(str)
  return (
    <div>
      Детальная карточка
      <img id="imgEl" src={`data:image/png;base64,${data}`} alt="/" />
    </div>
  )
}

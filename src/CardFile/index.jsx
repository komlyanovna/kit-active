import { useParams } from 'react-router-dom'
import { api } from '../Api'

export function CardFile() {
  const { user } = JSON.parse(localStorage.getItem('USER_TOKEN'))
  const { id } = useParams()

  // eslint-disable-next-line no-return-await
  const result = api.getAllFile(user, id)
  console.log(result)

  return (
    <div>
      Детальная карточка
      {result && (
        <img id="imgEl" src={result} alt="/" />
      )}
    </div>
  )
}

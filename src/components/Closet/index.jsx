import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../Api'
import { Upload } from '../Upload'
import styleCloset from './styles.module.scss'
import { CardFile } from '../../CardFile'

const RENDER_FILE = ['RENDER_FILE']
const renderFiles = (i) => RENDER_FILE.concat(i)

export function Closet() {
  const navigate = useNavigate()

  const { user } = JSON.parse(localStorage.getItem('USER_TOKEN'))

  const logoutUser = () => {
    api.logout(user)
    localStorage.removeItem('USER_TOKEN')
    navigate('/signin')
  }

  const {
    data,
  } = useQuery({
    queryKey: renderFiles(user),
    queryFn: () => api.getAllFiles(user),
  })

  const deletedFile = (id) => api.deleteFile(user, id)

  return (
    <>
      <button
        className={styleCloset.button}
        type="button"
        onClick={() => logoutUser()}
      >
        Выход
      </button>
      <div className={styleCloset.wrapper}>
        <div className={styleCloset.container}>
          <Upload data={data} />
          {data && (
            <>
              <h2>
                Всего файлов загружено:
              </h2>
              <h2>{data.data.files.length}</h2>
            </>
          )}
          <div className={styleCloset.containerFiles}>
            {data && data.data.files ? data.data.files.map((el) => {
              return (
                <div key={el.id} id="FileId">
                  <p>{el.fileName}</p>
                  <CardFile el={el.id} mimeType={el.mimeType} />
                  <button
                    type="button"
                    onClick={() => deletedFile(el.id)}
                  >
                    Удалить
                  </button>
                </div>
              )
            }) : <h2>Файлы загружаются </h2>}
          </div>
        </div>
      </div>
    </>
  )
}

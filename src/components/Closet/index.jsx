import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../Api'
import { Upload } from '../Upload'
import styleCloset from './styles.module.scss'

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
    // enabled: !user,
  })

  const deletedFile = (id) => api.deleteFile(user, id)

  // const filesImg = (user, id) => api.getAllFile(user, id).then((dataImg) => console.log(`data:image/jpg;base64${dataImg}`))

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
                <>
                  <div key={el.id}>
                    <p>{el.fileName}</p>
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/closet/${el.id}`)
                      }}
                    >
                      Подробнее
                    </button>
                    <button
                      type="button"
                      onClick={() => deletedFile(el.id)}
                    >
                      Удалить
                    </button>
                  </div>
                  <img src={el.url} alt='/' />
                </>
              )
            }) : <h2>Файлы загружаются </h2>}
          </div>
        </div>
      </div>
    </>
  )
}

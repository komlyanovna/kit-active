import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../../main'
import { api } from '../../Api'
import { GET_FILE, Upload } from '../Upload'
import styleCloset from './styles.module.scss'
import { CardFile } from '../../CardFile'

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
    queryKey: GET_FILE,
    queryFn: () => api.getAllFiles(user),
  })

  const delitedFile = (id) => {
    api.deleteFile(user, id)
  }

  const { mutateAsync } = useMutation({
    mutationFn: (id) => {
      delitedFile(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_FILE })
    },
    onError: (error) => {
      alert(`Произошла ошибка:  ${error.response.data.message}`)
    },
  })

  const deleted = async (id) => {
    await mutateAsync(id)
  }

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
                    onClick={() => deleted(el.id)}
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

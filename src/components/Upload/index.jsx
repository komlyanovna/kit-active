import { useState, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import StyleUpload from './style.module.scss'
import { api } from '../../Api'
import { queryClient } from '../../main'

export const GET_FILE = ['GET_FILE']

export function Upload({ data }) {
  const filePicker = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const { user } = JSON.parse(localStorage.getItem('USER_TOKEN'))

  const handleChange = (e) => {
    setSelectedFile(e.target.files)
  }

  const handlePick = () => {
    filePicker.current.click()
  }

  const getFile = () => api.setFiles(selectedFile, user)

  const { mutateAsync } = useMutation({
    mutationFn: () => getFile(selectedFile, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GET_FILE })
    },
    onError: (error) => {
      alert(`Произошла ошибка:  ${error.response.data.message}`)
    },
  })

  const files = async () => {
    await mutateAsync(selectedFile, user)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Выберите файл')
    }
    const file = document.getElementById('file').files[0]

    if (file.size >= 1024 * 1024) {
      alert('Превышен допустимый размер файла')
    } else {
      files(selectedFile, user)
    }
  }

  return (
    <>
      <div className={StyleUpload.button}>
        {data && data.data.files.length === 20 ? (
          <button
            type="button"
            onClick={handlePick}
            disabled
          >
            Выбрать файл
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePick}
          >
            Выбрать файл
          </button>
        )}
        <button
          type="button"
          onClick={handleUpload}
        >
          Загрузить файл
        </button>
      </div>
      <input
        className={StyleUpload.hidden}
        id="file"
        type="file"
        ref={filePicker}
        onChange={handleChange}
      />
    </>
  )
}

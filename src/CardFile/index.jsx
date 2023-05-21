import { useEffect, useState } from 'react'
import styles from './style.module.scss'

export function CardFile({ el, mimeType }) {
  const [imageURL, setImageURL] = useState('')
  const { user } = JSON.parse(localStorage.getItem('USER_TOKEN'))

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = user

        const response = await fetch(`https://job.kitactive.ru/api/media/${el}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const blob = await response.blob()
          const url = URL.createObjectURL(blob)
          setImageURL(url)
        } else {
          console.error('Ошибка при получении картинки:', response.status)
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error)
      }
    }

    fetchImage()
  }, [])

  return (
    <>
      {mimeType === 'image.png' ? (
        <img className={styles.img} src={imageURL} alt="Картинка" />
      ) : (
        <div className={styles.icon}>
          <img src={imageURL} alt="" />
        </div>
      )}
      <button type="button">
        <a href={imageURL} download>
          Скачать
        </a>
      </button>
    </>
  )
}

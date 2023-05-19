import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useMutation } from '@tanstack/react-query'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { queryClient } from '../../main'
import styleForm from './styles.module.scss'
import { api } from '../../Api'

const SIGNUP = ['SIGNUP']

export function FormSignUp() {
  const navigate = useNavigate()

  const getSignUp = (email, password, name) => api.signUp(email, password, name)

  const { mutateAsync } = useMutation({
    mutationFn: (values) => getSignUp(values.email, values.password, values.name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SIGNUP })
      navigate('/signin')
    },
    onError: (error) => {
      alert(`Произошла ошибка:  ${error.response.data.message}`)
    },
  })

  const signUp = async (email, password, name) => {
    await mutateAsync(email, password, name)
  }

  return (
    <div className={styleForm.wrapper}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('Невалидный email адрес')
            .required('Поле обязательно к заполнению'),
          password: Yup.number()
            .required('Поле обязательно к заполнению'),
          name: Yup.string()
            .max(20, 'Превышено максимальное количество символов')
            .required('Поле обязательно к заполнению'),
        })}
        onSubmit={(values) => {
          signUp(values)
        }}
      >
        <Form
          className={styleForm.form__inputs}
        >
          <Field className={styleForm.input} name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" />

          <Field className={styleForm.input} name="password" type="password" placeholder="Пароль" />
          <ErrorMessage name="password" />

          <Field className={styleForm.input} name="name" type="text" placeholder="Имя" />
          <ErrorMessage name="name" />

          <button type="submit">Регистрация</button>
          <button type="button">
            <Link className={styleForm.home} to="/signin">Авторизация</Link>
          </button>
        </Form>
      </Formik>
    </div>
  )
}

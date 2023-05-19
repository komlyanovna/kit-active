import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { queryClient } from '../../main'
import styleForm from './styles.module.scss'
import { api } from '../../Api'
import Actions from '../../redux/actions/user'

const SIGNIN = ['SIGNIN']

export function FormSignin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getSignin = (email, password) => api.signIn(email, password)
    .then((data) => {
      console.log(data)
      dispatch(Actions.setUserToken(data.data.token))
      if (data.data.token) {
        navigate('/closet')
      }
    })

  const { mutateAsync } = useMutation({
    mutationFn: (values) => getSignin(values.email, values.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SIGNIN })
    },
    onError: (error) => {
      alert(`Произошла ошибка:  ${error.response.data.message}`)
    },
  })

  const signin = async (email, password) => {
    await mutateAsync(email, password)
  }

  return (
    <div className={styleForm.wrapper}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('Невалидный email адрес')
            .required('Поле обязательно к заполнению'),
          password: Yup.number()
            .required('Поле обязательно к заполнению'),
        })}
        onSubmit={(values) => {
          signin(values)
        }}
      >
        <Form
          className={styleForm.form__inputs}
        >
          <Field className={styleForm.input} name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" />

          <Field className={styleForm.input} name="password" type="password" placeholder="Пароль" />
          <ErrorMessage name="password" />

          <button type="submit">Авторизация</button>
          <button type="button">
            <Link className={styleForm.home} to="/">Регистрация</Link>
          </button>

          <button type="button">
            Войти в личный кабинет
          </button>
        </Form>
      </Formik>
    </div>
  )
}

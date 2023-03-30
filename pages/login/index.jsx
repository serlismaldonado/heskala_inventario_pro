import SubmitForm from '@/components/forms/form/SubmitForm'
import InputText from '@/components/forms/input/InputText'
import { useState, Suspense } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import LoadingSpinner from '@/components/utils/LoadingSpinner'

export default function Login(props) {
	const { onClick, children, validatedSession } = props
	const router = useRouter()
	const { data: session, status } = useSession()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rol, setRol] = useState('')

	const getEmail = (data) => setEmail(data)
	const getPassword = (data) => setPassword(data)
	const getRol = (data) => setRol(data)

	const handleLogin = async () => {
		const res = await fetch('http://localhost:3000/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})

		const data = await res.json()

		if (data.error) {
			alert(data.message)
			return
		}

		router.push('/')
	}

	if (status === 'loading') return <LoadingSpinner />

	return (
		<Suspense fallback={<LoadingSpinner />}>
			<div
				className=' flex 
			flex-col
			justify-center items-center h-screen
			bg-gradient-to-r from-violet-200 to-sky-300
		'>
				<h1 className='text-5xl font-bold text-sky-900'>Heskala Pro</h1>
				<SubmitForm
					title='Inicio de sesión'
					description='Ingresa tus datos para iniciar sesión'
					className='w-1/2'
					cta='Iniciar sesion'
					style='bg-transparent text-sky-700 '
					onSubmit={handleLogin}>
					<InputText
						name='email'
						label='Email'
						type='email'
						placeholder='Email'
						passData={getEmail}
					/>
					<InputText
						name='password'
						label='Password'
						type='password'
						placeholder='Contraseña'
						passData={getPassword}
					/>
				</SubmitForm>
			</div>
		</Suspense>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession(context)

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {
			validatedSession: session,
		},
	}
}

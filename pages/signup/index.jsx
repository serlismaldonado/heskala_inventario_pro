import SubmitForm from '@/components/forms/form/SubmitForm'
import InputText from '@/components/forms/input/InputText'
import InputSelect from '@/components/forms/select/InputSelect'
import { useState } from 'react'

export default function Registraion(props) {
	const { onClick, children } = props

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rol, setRol] = useState('')

	const getEmail = (data) => setEmail(data)
	const getPassword = (data) => setPassword(data)
	const getRol = (data) => setRol(data)

	const signUp = async () => {
		const user = await fetch('http://localhost:3000/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		}).then((res) => res.json())

		console.log(JSON.parse(user))
	}

	return (
		<div
			className='flex 
			flex-col
			justify-center items-center h-screen
			bg-gradient-to-r from-violet-200 to-sky-300
		'>
			<h1 className='text-5xl font-bold text-sky-900'>Heskala Pro</h1>
			<SubmitForm
				title='Registro de usuario'
				description='Ingresa tus datos para registrarte'
				className='w-1/2'
				cta='Registrarse'
				onSubmit={signUp}>
				<InputText
					name='email'
					label='Email'
					type='email'
					placeholder='Correo electronico'
					passData={getEmail}
				/>
				<InputText
					name='password'
					label='Password'
					type='password'
					placeholder='Contrase;a'
					passData={getPassword}
				/>
				<InputSelect
					name='rol'
					label='Rol'
					options={[
						{ value: 'Admin', label: 'Administrador' },
						{ value: 'User', label: 'Usuario' },
					]}
					passData={getRol}
				/>
			</SubmitForm>
		</div>
	)
}

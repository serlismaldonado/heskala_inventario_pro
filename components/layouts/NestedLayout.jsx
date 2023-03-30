// Layout para las páginas que se encuentran dentro de la aplicación
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import ProfileAvatar from '@/components/profile/ProfileAvatar'
import InputSelect from '@/components/forms/select/InputSelect'
import LoadingSpinner from '../utils/LoadingSpinner'

export default function NestedLayout({
	children,
	userPreferences,
	sessionUser,
	selectedBranch,
	setSelectBranch,
}) {
	const router = useRouter()

	const { data: session, status } = useSession()
	const [user, setUser] = useState({
		name: '',
		lastName: '',
		email: '',
	})
	const [branches, setBranches] = useState([])

	// Actualiza el arreglo de sucursales
	useEffect(() => {
		if (userPreferences) {
			setBranches(
				userPreferences.branches.map((e) => {
					return { value: e.id, label: e.name }
				}),
			)
		}
	}, [userPreferences])

	// Actualiza el usuario cuando se actualiza la sesión
	useEffect(() => {
		setUser({
			name: sessionUser.name,
			email: sessionUser.email,
		})
	}, [sessionUser])

	// configura el título de la página
	const title =
		useRouter().pathname.split('/')[1].charAt(0).toUpperCase() +
		useRouter().pathname.split('/')[1].slice(1)

	if (status === 'loading') return <LoadingSpinner />

	return (
		<div className='container-full w-screen flex flex-row gap-5 p-5 bg-slate-100 justify-between'>
			<div className='flex gap-5 items-center'>
				{/* Titulo superior de la aplicacion */}
				<h1 className='text-4xl font-bold text-center text-sky-700'>Heskala</h1>

				{/* Selector de Sucursales */}
				<InputSelect
					className='w-40'
					options={branches}
					passData={(e) => setSelectBranch(e)}
					defaultValue={selectedBranch}></InputSelect>
				<h2 className='text-2xl font-bold self-center text-sky-600'>{title}</h2>
			</div>
			{/* Seccion de datos de usuario */}
			<div className='justify-self-center flex items-center gap-3'>
				<h2 className='text-md font-bold text-sky-600'>
					{session ? String(user.email).split('@', 1) : ''}
				</h2>
				{/* Imagen de usuario. Si no existe se mostrara la inicial de correo */}
				<ProfileAvatar image={''} name={user?.email ? user?.email : ''} />
			</div>

			{children}
		</div>
	)
}

/* Verifica que el usuario tenga una sesión activa y que sea un usuario autorizado para ver la página
 Si no tiene una sesión activa, lo redirige a la página de login
 Si tiene una sesión activa, pero no es un usuario autorizado, lo redirige a la página de inicio */

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { validateUserSession } from '@/middlewares/auth'
import LoadingSpinner from '../utils/LoadingSpinner'

export default function PrivateLayout({ children }) {
	const router = useRouter()
	const { data: session, status } = useSession()

	if (status === 'loading') return <LoadingSpinner />
	if (!session) router.push('/login')

	return <div className='flex flex-col h-screen'>{children}</div>
}

export async function getServerSideProps(context) {
	return await validateUserSession(context)
}

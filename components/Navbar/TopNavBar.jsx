import ItemsNavBar from './ItemsNavBar'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function TopNavBar() {
	const router = useRouter()
	async function signOutHandler() {
		const res = await fetch('http://localhost:3000/api/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				refreshToken: Cookies.get('refreshToken'),
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					alert(data.message)
				} else {
					router.push('/login')
				}
			})
	}

	return (
		<div className='flex w-full items-center justify-between bg-gradient-to-tr  from-blue-100 via-sky-100  to-sky-100 p-2 mb-5'>
			{/* <ItemsNavBar title='Inicio' route='/inicio' /> */}
			<div className='flex w-100'>
				<ItemsNavBar title='Productos' route='/productos' />
				<ItemsNavBar title='Facturas' route='/facturas' />
				<ItemsNavBar title='Clientes' route='/clientes' />
			</div>
			<div
				onClick={() => signOutHandler()}
				className='flex flex-col gap-5 w-fit items-center self-center cursor-pointer'>
				<h2>Cerrar Sesion</h2>
			</div>
		</div>
	)
}

// Componentes de pagina requeridos
import Layout from '../../components/layouts/NavBarLayout'
import NestedLayout from '@/components/layouts/NestedLayout'
import PrivateLayout from '@/components/layouts/PrivateLayout'

// Componentes específicos de la pagina
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import ProductVersionTable from '@/components/productos/ProductVersionsTable'
import ProductTable from '@/components/productos/ProductTable'
import ProductModal from '@/components/productos/ProductModal'

// hooks y middlewares
import { useState, useEffect, Suspense, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { validateUserSession } from '@/middlewares/auth'

export default function Productos({ children, userPreferences, sessionUser }) {
	const [tables, setTables] = useState(userPreferences.role.tables || [])
	const [role, setRole] = useState(userPreferences.role.name || {})
	const [productTable, setProductTable] = useState([])
	const [user, setUser] = useState({})
	const [selectedBranch, setSelectBranch] = useState(
		userPreferences.branches[0].id,
	)
	const [isShowed, setIsShowed] = useState(false)

	const changeBrandSelected = (e) => setSelectBranch(e)

	useEffect(
		() => setProductTable(refreshTableProducts(tables, selectedBranch)),
		[selectedBranch, tables],
	)

	// Refresca la tabla de productos cuando se cambia de sucursal o se cambia el rol del usuario
	const refreshTableProducts = (tables, selectedBranch) =>
		tables.some((e) => e.table_name === 'product') ? (
			<ProductTable
				selectedBranch={selectedBranch}
				canRead={tables.some(
					(e) => e.table_name === 'product' && e.can_read === true,
				)}
				canCreate={tables.some(
					(e) => e.table_name === 'product' && e.can_create === true,
				)}
				canDelete={tables.some(
					(e) => e.table_name === 'product' && e.can_delete === true,
				)}
				canUpdate={tables.some(
					(e) => e.table_name === 'product' && e.can_update === true,
				)}
			/>
		) : (
			'No tienes permisos para ver esta tabla'
		)

	const { data: session, status } = useSession()

	useMemo(() => {
		if (session) setUser(session.user)
	}, [session])

	useMemo(() => {
		console.log('isShowed', isShowed)
	}, [isShowed])

	if (status === 'loading') {
		return <LoadingSpinner />
	}
	return (
		<div>
			<PrivateLayout>
				<Layout>
					<NestedLayout
						userPreferences={userPreferences}
						sessionUser={sessionUser}
						selectedBranch={selectedBranch}
						setSelectBranch={changeBrandSelected}
					/>
				</Layout>

				<Suspense fallback={<LoadingSpinner />}>
					<div className='md:container flex gap-3 p-5'>
						<div className='flex flex-col'>{productTable}</div>
					</div>
				</Suspense>

				{/* <div> */}
					{/* Se configura botón para mostrar un Modal */}
					{/* <button onClick={() => setIsShowed(true)}>Abrir modal</button>
					<ProductsModal action='' modalState={isShowed} changeState={setIsShowed} /> */}
				{/* </div> */}
			</PrivateLayout>
		</div>
	)
}

export async function getServerSideProps(context) {
	return await validateUserSession(context)
}

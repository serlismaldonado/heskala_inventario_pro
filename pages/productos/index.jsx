import Layout from '../../components/layouts/NavBarLayout'
import NestedLayout from '@/components/layouts/NestedLayout'
import ProductTable from '@/components/productos/ProductTable'
import { useState, useEffect, Suspense } from 'react'
import ProductVersionTable from '@/components/productos/ProductVersionsTable'
import PrivateLayout from '@/components/layouts/PrivateLayout'
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import { useSession } from 'next-auth/react'
import { validateUserSession } from '@/middlewares/auth'

export default function Productos({ children, userPreferences, sessionUser }) {
	const [tables, setTables] = useState(userPreferences.role.tables || [])
	const [role, setRole] = useState(userPreferences.role.name || {})
	const [productTable, setProductTable] = useState([])
	const [user, setUser] = useState({})

	const [selectedBranch, setSelectBranch] = useState({
		value: userPreferences.branches[0].id,
		label: userPreferences.branches[0].name,
	})

	const changeBrandSelected = (e) => {
		setSelectBranch(e)
	}

	useEffect(() => {
		setProductTable(refreshTableProducts(tables, selectedBranch))
	}, [selectedBranch, tables])

	// Refresca la tabla de productos cuando se cambia de sucursal o se cambia el rol del usuario
	const refreshTableProducts = (tables, selectedBranch) => {
		return tables.some((e) => e.table_name === 'product') ? (
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
	}

	const { data: session, status } = useSession()

	useEffect(() => {
		if (session) setUser(session.user)
	}, [session])

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
					<div className='md:container flex flex-col gap-3 p-5'>
						<div className='flex flex-col'>{productTable}</div>
					</div>
				</Suspense>
			</PrivateLayout>
		</div>
	)
}

export async function getServerSideProps(context) {
	return await validateUserSession(context)
}

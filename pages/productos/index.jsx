// Componentes de pagina requeridos
import Layout from '../../components/layouts/NavBarLayout'
import NestedLayout from '@/components/layouts/NestedLayout'
import PrivateLayout from '@/components/layouts/PrivateLayout'

// Componentes específicos de la pagina
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import ProductTable from '@/components/productos/ProductTable'
import ProductVersionsTable from '@/components/product-versions/ProductVersionsTable'

// hooks y middlewares
import { useState, Suspense, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { validateUserSession } from '@/middlewares/auth'

export default function Productos({ children, userPreferences, sessionUser }) {
	const [table, setTable] = useState(
		userPreferences.tables.find((e) => e.table_name === 'product') || [],
	)
	const [selectedBranch, setSelectBranch] = useState({
		value: userPreferences.preference.active_branch,
		label: 'Default',
	})
	const [user, setUser] = useState({})
	const { data: session, status } = useSession()

	useMemo(() => {
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
					/>
				</Layout>

				<Suspense fallback={<LoadingSpinner />}>
					<div className='md:container overflow-auto flex gap-3 p-5 m-3'>
						<div className='flex flex-col'>
							{
								<ProductTable
									selectedBranch={selectedBranch}
									canRead={table.can_read}
									canCreate={table.can_create}
									canDelete={table.can_delete}
									canUpdate={table.can_update}
								/>
							}
						</div>
					</div>
				</Suspense>

				<Suspense fallback={<LoadingSpinner />}>
					<div className='md:container overflow-auto flex gap-3 p-5 m-3'>
						<div className='flex flex-col'>
							{
								<ProductVersionsTable
									selectedBranch={selectedBranch}
									canRead={table.can_read}
									canCreate={table.can_create}
									canDelete={table.can_delete}
									canUpdate={table.can_update}
								/>
							}
						</div>
					</div>
				</Suspense>
			</PrivateLayout>
		</div>
	)
}

export async function getServerSideProps(context) {
	return await validateUserSession(context)
}

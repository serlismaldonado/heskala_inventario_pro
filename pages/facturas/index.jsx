import Layout from '../../components/layouts/NavBarLayout'
import NestedLayout from '@/components/layouts/NestedLayout'
import PrivateLayout from '@/components/layouts/PrivateLayout'
import { PrismaClient } from '@prisma/client'
import { useState, useEffect } from 'react'
import { validateUserSession } from '@/middlewares/auth'

export default function Facturas({ children, userPreferences, sessionUser }) {
	const [selectedBranch, setSelectBranch] = useState({
		value: userPreferences.branches[0].id,
		label: userPreferences.branches[0].name,
	})

	const changeBrandSelected = (e) => {
		setSelectBranch(e)
	}

	return (
		<PrivateLayout>
			<Layout>
				<NestedLayout
					userPreferences={userPreferences}
					sessionUser={sessionUser}
					selectedBranch={selectedBranch}
					setSelectBranch={changeBrandSelected}>
					{children}
				</NestedLayout>
			</Layout>
		</PrivateLayout>
	)
}

export async function getServerSideProps(context) {
	return await validateUserSession(context)
}

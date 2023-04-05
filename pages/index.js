import Layout from '@/components/layouts/NavBarLayout'
import NestedLayout from '@/components/layouts/NestedLayout'
import PrivateLayout from '@/components/layouts/PrivateLayout'
import { validateUserSession } from '@/middlewares/auth'
import { useState, useEffect, Suspense } from 'react'
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import { useSession } from 'next-auth/react'


export default function Inicio({ children, userPreferences, sessionUser }) {

	const [selectedBranch, setSelectBranch] = useState({
		value: userPreferences.preference.active_branch,
		label: "Default",
	})

	const { data: session, status } = useSession()

	
	if (status === 'loading') {
		return <LoadingSpinner />
	}

	return (<Suspense fallback={<LoadingSpinner />}>
    <PrivateLayout>
				<NestedLayout
					userPreferences={userPreferences}
					sessionUser={sessionUser}
					selectedBranch={selectedBranch}
					
				/>
		
		</PrivateLayout></Suspense>
	)
}

export async function getServerSideProps(context) {
	return await validateUserSession(context)
}
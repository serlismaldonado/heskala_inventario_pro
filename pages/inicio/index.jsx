import Layout from '../../components/layouts/Layout'
import NestedLayout from '@/components/layouts/NestedLayout'
import { PrismaClient } from '@prisma/client'
import { useContext } from 'react'
import { CompanyContext } from '@/components/layouts/Layout'

export default function Inicio({ children }) {
	const company = useContext(CompanyContext)
	console.log(company)
	return (
		<div>
			<Layout>
				<NestedLayout>{children}</NestedLayout>
			</Layout>
		</div>
	)
}

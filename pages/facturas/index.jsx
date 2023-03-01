import Layout from '../../components/layouts/Layout'
import NestedLayout from '@/components/layouts/NestedLayout'
import { PrismaClient } from '@prisma/client'
export default function Facturas({ children, invoices }) {
	return (
		<div>
			<Layout>
				<NestedLayout></NestedLayout>
			</Layout>
		</div>
	)
}

import Layout from '@/components/layouts/Layout'
import NestedLayout from '@/components/layouts/NestedLayout'
import { PrismaClient } from '@prisma/client'
export default function Clientes({ customers }) {
	return (
		<div>
			<Layout>
				<NestedLayout></NestedLayout>
			</Layout>
		</div>
	)
}

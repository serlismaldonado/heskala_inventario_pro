import { PrismaClient } from '@prisma/client'
import Layout from '../../components/layouts/Layout'
import NestedLayout from '@/components/layouts/NestedLayout'

export default function Productos({ children, products }) {
	return (
		<div>
			<Layout>
				<NestedLayout></NestedLayout>
			</Layout>
		</div>
	)
}

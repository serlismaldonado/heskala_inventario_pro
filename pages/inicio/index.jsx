import Layout from '../../components/layouts/Layout'
import NestedLayout from '@/components/layouts/NestedLayout'
export default function Page({ children }) {
	return (
		<div>
			<Layout>
				<NestedLayout></NestedLayout>
			</Layout>
		</div>
	)
}

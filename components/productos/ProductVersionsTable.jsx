import TableActions from '../tables/TableActions/TableActions'
import { useEffect, useState } from 'react'
import { Suspense } from 'react'
export default function ProductVersionTable({
	branch_id,
	children,
	canRead,
	canCreate,
	canDelete,
	canUpdate,
}) {
	const [_products, setProducts] = useState([])
	useEffect(() => {
		getProducts(user_id).then((data) => {
			setProducts(data)
		})
	}, [])

	return (
		<Suspense
			fallback={
				<div className='flex justify-center items-center'>
					<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'>
						Loading
					</div>
				</div>
			}>
			<div>
				<TableActions
					data={_products}
					canRead={canRead}
					canCreate={canCreate}
					canDelete={canDelete}
					canUpdate={canUpdate}
				/>
			</div>
		</Suspense>
	)
}

async function getProducts(branch_id) {
	const _products = await fetch('http://localhost:3000/api/product-versions', {
		method: 'GET',
	})

	// mapping witout ids
	const _mapProducts = await _products.json().then((data) => {
		return data.map((product) => {
			return {
				nombre: product.name,
				descripcion: product.description,
				precio: product.purchase_price,
				existencia: product.stock_quantity,
			}
		})
	})

	return _mapProducts
}
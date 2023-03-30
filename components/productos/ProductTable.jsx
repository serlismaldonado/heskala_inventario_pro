// Este componente es el encargado de mostrar la tabla de productos

import TableActions from '../tables/TableActions/TableActions'
import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import LoadingSpinner from '../utils/LoadingSpinner'
export default function ProductTable({
	children,
	selectedBranch,
	canRead,
	canCreate,
	canDelete,
	canUpdate,
}) {
	const [_products, setProducts] = useState([])
	const [branch, setBranch] = useState(selectedBranch.value)

	// Obtiene los productos de la sucursal seleccionada
	useEffect(() => {
		getProducts(branch).then((data) => {
			setProducts(data)
		})
	}, [branch])

	// Actualiza la sucursal seleccionada
	useEffect(() => {
		setBranch(selectedBranch.value)
	}, [selectedBranch])

	return (
		// Envuelve el componente TableActions en un Suspense para mostrar un spinner mientras se obtienen los datos
		<Suspense fallback={<LoadingSpinner />}>
			<TableActions
				data={_products}
				canRead={canRead}
				canCreate={canCreate}
				canDelete={canDelete}
				canUpdate={canUpdate}
			/>
		</Suspense>
	)
}

// Obtiene los productos de la sucursal seleccionada
async function getProducts(branch_id) {
	const route = `http://localhost:3000/api/products/${branch_id}`
	const _products = await fetch(route, {
		method: 'GET',
	})
	const _mapProducts = await _products.json().then((data) => {
		return data.map((product) => {
			return {
				name: product.name,
				description: product.description,
			}
		})
	})

	return _mapProducts
}

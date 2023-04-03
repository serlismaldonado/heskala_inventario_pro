// Este componente es el encargado de mostrar la tabla de productos

import TableActions from '../tables/TableActions/TableActions'
import { useMemo, useState } from 'react'
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
	const [branch, setBranch] = useState(selectedBranch)
	const [filterField, setFilterField] = useState('id')

	// Obtiene los productos de la sucursal seleccionada
	useMemo(() => {
		if (selectedBranch === '') return
		setBranch(selectedBranch)
	}, [selectedBranch])

	// Obtiene los productos de la sucursal seleccionada
	useMemo(() => {
		if (branch === '') return
		getProducts(branch).then((data) => {
			setProducts(data)
		})
	}, [branch])

	// Obtiene los productos de la sucursal seleccionada por condición

	const changeCondition = (e) => {
		if (branch === '') return
		getProductsByCondition(branch, e, filterField).then((data) => {
			setProducts(data)
		})
	}

	const changeFilterField = (e) => {
		setFilterField(e)
	}

	return (
		// Envuelve el componente TableActions en un Suspense para mostrar un spinner mientras se obtienen los datos
		<Suspense fallback={<LoadingSpinner />}>
			<TableActions
				data={_products}
				canRead={canRead}
				canCreate={canCreate}
				canDelete={canDelete}
				canUpdate={canUpdate}
				getCondition={changeCondition}
				getFilterField={changeFilterField}
			/>
		</Suspense>
	)
}

// Obtiene los productos de la sucursal seleccionada
async function getProducts(branch_id) {
	// Crea la ruta para obtener los productos de la sucursal seleccionada
	const route = `http://localhost:3000/api/products/${branch_id}`
	const _products = await fetch(route, {
		method: 'GET',
	})

	// Mapea los datos para que coincidan con los nombres de las columnas de la tabla
	const _mapProducts = await _products.json().then((data) => {
		return data.map((product) => {
			return {
				id: product.id,
				name: product.name,
				description: product.description,
			}
		})
	})

	return _mapProducts
}

async function getProductsByCondition(branch_id, condition, filterField) {
	filterField = filterField === '' ? 'id' : filterField
	if (condition === '') return getProducts(branch_id)
	// Crea la ruta para obtener los productos de la sucursal seleccionada por condición
	const route = `http://localhost:3000/api/products/${branch_id}/${filterField}/${condition}`
	console.log(route)
	const _products = await fetch(route, {
		method: 'GET',
	})

	// Mapea los datos para que coincidan con los nombres de las columnas de la tabla
	const _mapProducts = await _products.json().then((data) => {
		return data.map((product) => {
			return {
				id: product.id,
				name: product.name,
				description: product.description,
			}
		})
	})

	return _mapProducts
}

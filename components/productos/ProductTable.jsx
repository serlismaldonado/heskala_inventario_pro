// Este componente es el encargado de mostrar la tabla de productos

import TableActions from '../tables/TableActions/TableActions'
import { useMemo, useState, useEffect } from 'react'
import { Suspense } from 'react'
import LoadingSpinner from '../utils/LoadingSpinner'
import ProductsModal from './crud/ProductModal'

export default function ProductTable({
	children,
	selectedBranch,
	canRead,
	canCreate,
	canDelete,
	canUpdate,
}) {
	const [_products, setProducts] = useState([])
	const [filterField, setFilterField] = useState('id')
	const [condition, setCondition] = useState('')
	const [isShowed, setIsShowed] = useState(false)
	const [action, setAction] = useState('')

	// Modifica el campo por el que se filtrará
	useMemo(() => {
		getProductsByCondition(selectedBranch.value, condition, filterField).then(
			(data) => setProducts(data),
		)
	}, [condition])

	return (
		// Envuelve el componente TableActions en un Suspense para mostrar un spinner mientras se obtienen los datos
		<Suspense fallback={<LoadingSpinner />}>
			<TableActions
				data={_products}
				canRead={canRead}
				canCreate={canCreate}
				canDelete={canDelete}
				canUpdate={canUpdate}
				getCondition={setCondition}
				getFilterField={setFilterField}
				isShowed={isShowed}
				setIsShowed={setIsShowed}
				action={action}
				setAction={setAction}
			/>
			<ProductsModal
				action={action}
				modalState={isShowed}
				changeState={setIsShowed}
				branch={selectedBranch.value}
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
// Obtiene los productos de la sucursal seleccionada por condición
async function getProductsByCondition(branch_id, condition, filterField) {
	filterField = filterField === '' ? 'id' : filterField

	if (condition === '' || branch_id === '') return getProducts(branch_id)
	// Crea la ruta para obtener los productos de la sucursal seleccionada por condición

	const route = `http://localhost:3000/api/products/${branch_id}/${filterField}/${condition}`

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

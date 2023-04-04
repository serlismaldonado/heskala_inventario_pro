// Este componente es el encargado de mostrar la tabla de productos

import TableActions from '../tables/TableActions/TableActions'
import { useMemo, useState, useEffect } from 'react'
import { Suspense } from 'react'
import LoadingSpinner from '../utils/LoadingSpinner'
import ProductsModal from './ProductModal'

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
	const [condition, setCondition] = useState('')
	const [isShowed, setIsShowed] = useState(false)
	const [action, setAction] = useState('')
	// Obtiene los productos de la sucursal seleccionada
	useMemo(() => setBranch(selectedBranch), [selectedBranch])

	// Obtiene los productos de la sucursal seleccionada
	useMemo(() => {
		getProducts(branch).then((data) => {
			setProducts(data)
		})
	}, [branch])

	// Obtiene los productos de la sucursal seleccionada por condición

	// const changeCondition = (condition) => {
	// 	console.log('condition', condition)
	// 	console.log('filter', filterField)
	// 	console.log('branch', branch)
	// 	getProductsByCondition(branch, condition, filterField).then((data) =>
	// 		setProducts(data),
	// 	)
	// }
	// Modifica el campo por el que se filtrará
	const changeFilterField = (e) => setFilterField(e)

	useMemo(() => {
		console.log('condition', condition)
		console.log('filter', filterField)
		console.log('branch', branch)
		getProductsByCondition(branch, condition, filterField).then((data) =>
			setProducts(data),
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
				getFilterField={changeFilterField}
				isShowed = {isShowed}
				setIsShowed = {setIsShowed}
				action = {action}
				setAction = {setAction}
			/>
			<ProductsModal action={action} modalState={isShowed} changeState={setIsShowed} />
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
	// console.log(
	// 	'ejecutando getProductsByCondition',
	// 	branch_id,
	// 	condition,
	// 	filterField,
	// )
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


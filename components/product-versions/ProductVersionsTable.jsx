// Este componente es el encargado de mostrar la tabla de productos

import TableActions from '../tables/TableActions/TableActions'
import { useMemo, useState, useEffect } from 'react'
import { Suspense } from 'react'
import LoadingSpinner from '../utils/LoadingSpinner'
import ProductsVersionModal from './crud/ProductVersionsModal'
import SuccessAlert from '../Alerts/SuccessAlert'

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
	const [selectedIds, setSelectedIds] = useState([])

	// Modifica el campo por el que se filtrará
	useMemo(() => {
		getProductsByCondition(selectedBranch.value, condition, filterField).then((data) =>
			setProducts(data),
		)
		console.log(filterField)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [condition, action, selectedBranch, filterField])

	return (
		// Envuelve el componente TableActions en un Suspense para mostrar un spinner mientras se obtienen los datos
		<Suspense fallback={<LoadingSpinner />}>
			<div className='flex flex-wrap'>
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
					setSelectedIds={setSelectedIds}
					tittle={'Versiones de productos'}
					subTittle={'Versiones de productos de la sucursal'}
					fields={['id', 'nombre', 'detalle', 'precio', 'stock']}
				/>
				<ProductsVersionModal
					action={action}
					modalState={isShowed}
					changeState={setIsShowed}
					branch={selectedBranch.value}
					selectedIds={selectedIds}
					setAction={setAction}
					refreshProducts={getProductsByCondition}
					setSelectedIds={setSelectedIds}
				/>
			</div>
		</Suspense>
	)
}
async function getProductVersions(branch_id) {
	const _products = await fetch(`http://localhost:3000/api/productversions/${branch_id}`, {
		method: 'GET',
	})

	// Mapea los datos de los productos
	const _mapProducts = await _products.json().then((data) => {
		return data.map((product) => {
			return {
				id: product.id,
				name: product.name,
				description: product.description,
				price: String(product.purchase_price),
				stock_quantity: String(product.stock_quantity),
			}
		})
	})

	return _mapProducts
}

async function getProductsByCondition(branch_id, condition, filterField) {
	filterField = filterField === '' ? 'id' : filterField

	if (String(condition).trim() === '' || String(branch_id).trim() === '')
		return getProductVersions(branch_id)
	// Crea la ruta para obtener los productos de la sucursal seleccionada por condición

	const route = `http://localhost:3000/api/productversions/${branch_id}/${String(
		filterField,
	).trim()}/${condition.trim()}`

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
				price: Number(product.purchase_price),
				stock_quantity: Number(product.stock_quantity),
			}
		})
	})

	return _mapProducts
}

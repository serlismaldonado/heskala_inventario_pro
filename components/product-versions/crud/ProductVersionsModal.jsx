import { useEffect, useState } from 'react'
import ProductVersionsCreateForm from './ProductVersionsCreateForm'
import ProductVersionsUpdateForm from './ProductVersionsUpdateForm'
import ProductVersionsDeleteForm from './ProductVersionsDeleteForm'
import WarningAlert from '@/components/Alerts/WarningAlert'
import ModalCrud from '@/components/modal/ModalCrud'

export default function ProductVersionsModal({
	action,
	setAction,
	children,
	modalState,
	changeState,
	selectedIds,
	refreshProducts,
	setSelectedIds,
	branch,
}) {
	// const [modalAction, setModalAction] = useState('')
	const [selectedForm, setSelectedForm] = useState('')
	const [productCategories, setProductCategories] = useState([])
	const [propertiesCategories, setPropertiesCategories] = useState([])
	const [product, setProduct] = useState({})

	// Cierra el modal y limpia los datos seleccionados y la acción a realizar
	const closeModal = () => {
		setAction('')
		changeState(false)
	}

	// Obtiene los datos de las sucursales y las marcas
	useEffect(() => {
		getProductCategories(branch).then((data) => setProductCategories(data))
		getPropertiesCategories(branch).then((data) =>
			setPropertiesCategories(data),
		)
	}, [])

	// Evalúa la acción a realizar y muestra el formulario correspondiente
	useEffect(() => {
		if (action === 'Create') {
			getProductCategories(branch).then((data) => setProductCategories(data))
			setSelectedForm(refreshSelectedForm(action))
		}
		if (action === 'Update' && selectedIds.length > 0) {
			getProductCategories(branch).then((data) => setProductCategories(data))
			setSelectedForm(refreshSelectedForm(action))
		}

		if (action === 'Delete' && selectedIds.length > 0)
			setSelectedForm(refreshSelectedForm(action))

		if (action === '')
			setSelectedForm(
				<WarningAlert content='No ha seleccionado ningún elemento.' />,
			)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [action])

	// Obtiene el ultimo id seleccionado
	useEffect(() => {
		getProductVersionById(selectedIds[selectedIds.length - 1]).then((data) =>
			setProduct(data),
		)
		closeModal()
	}, [selectedIds])

	// Refresca el formulario seleccionado según la acción
	const refreshSelectedForm = (action) => {
		if (action === 'Create') {
			return (
				<ModalCrud modalState={modalState} changeState={changeState}>
					<ProductVersionsCreateForm
						closeModal={closeModal}
						productCategories={productCategories}
						propertiesCategories={propertiesCategories}
						branch_id={branch}
					/>
				</ModalCrud>
			)
		}
		if (action === 'Update' && selectedIds.length > 0) {
			return (
				<ModalCrud modalState={modalState} changeState={changeState}>
					<ProductVersionsUpdateForm
						closeModal={closeModal}
						categories={categories}
						refreshProducts={refreshProducts}
					/>
				</ModalCrud>
			)
		}
		if (action === 'Delete' && selectedIds.length > 0) {
			return (
				<ModalCrud modalState={modalState} changeState={changeState}>
					<ProductVersionsDeleteForm
						products={selectedIds}
						refreshProducts={refreshProducts}
						closeModal={closeModal}
						setSelectedIds={setSelectedIds}
					/>
				</ModalCrud>
			)
		}
	}
	// Retorna el formulario seleccionado
	if (modalState === true && action !== '') return selectedForm
}
// Obtiene los productos
const getProductCategories = async (branch_id) => {
	const res = await fetch(`http://localhost:3000/api/products/${branch_id}`, {
		method: 'GET',
	})
	const mapProducts = await res.json().then((data) => {
		return data.map((product) => {
			return {
				value: product.id,
				label: product.name,
			}
		})
	})
	return mapProducts
}

// Obtiene las propiedades
const getPropertiesCategories = async () => {
	const res = await fetch(`http://localhost:3000/api/categories`, {
		method: 'GET',
	})
	const mapProperties = await res.json().then((data) => {
		return data.map((property) => {
			return {
				value: property.id,
				label: property.name,
			}
		})
	})
	return mapProperties
}

// Obtiene el producto seleccionado
const getProductVersionById = async (id) => {
	const res = await fetch(
		`http://localhost:3000/api/productversions/crud/${id}`,
		{
			method: 'GET',
		},
	)
	const data = await res.json()
	return data
}

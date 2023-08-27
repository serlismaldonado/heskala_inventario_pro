import Modal from 'components/modal/ModalActions'
import { useEffect, useState } from 'react'
import ProductCreateForm from './ProductCreateForm'
import ProductUpdateForm from './ProductUpdateForm'
import ProductDeleteForm from './ProductDeleteForm'
import WarningAlert from '@/components/Alerts/WarningAlert'
import ModalCrud from '@/components/modal/ModalCrud'

export default function ProductsModal({
	action,
	setAction,
	children,
	modalState,
	changeState,
	selectedIds,
	refreshProducts,
	setSelectedIds,
}) {
	// const [modalAction, setModalAction] = useState('')
	const [selectedForm, setSelectedForm] = useState('')
	const [branches, setBranches] = useState([])
	const [brands, setBrands] = useState([])
	const [product, setProduct] = useState({})

	// Cierra el modal y limpia los datos seleccionados y la acción a realizar
	const closeModal = () => {
		setAction('')
		changeState(false)
	}

	// Obtiene los datos de las sucursales y las marcas
	useEffect(() => {
		getBranches().then((data) => setBranches(data))
		getBrands().then((data) => setBrands(data))
	}, [])

	// Evalúa la acción a realizar y muestra el formulario correspondiente
	useEffect(() => {
		if (action === 'Create') {
			getBranches().then((data) => setBranches(data))
			getBrands().then((data) => setBrands(data))
			setSelectedForm(refreshSelectedForm(action))
		}
		if (action === 'Update' && selectedIds.length > 0) {
			getBranches().then((data) => setBranches(data))
			getBrands().then((data) => setBrands(data))
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
		getProduct(selectedIds[selectedIds.length - 1]).then((data) =>
			setProduct(data),
		)
		closeModal()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedIds])

	// Refresca el formulario seleccionado según la acción
	const refreshSelectedForm = (action) => {
		if (action === 'Create') {
			return (
				<ModalCrud modalState={modalState} changeState={changeState}>
					<ProductCreateForm
						closeModal={closeModal}
						branches={branches}
						brands={brands}
					/>
				</ModalCrud>
			)
		}
		if (action === 'Update' && selectedIds.length > 0) {
			return (
				<ModalCrud modalState={modalState} changeState={changeState}>
					<ProductUpdateForm
						closeModal={closeModal}
						branches={branches}
						brands={brands}
						product={product}
						refreshProducts={refreshProducts}
					/>
				</ModalCrud>
			)
		}
		if (action === 'Delete' && selectedIds.length > 0) {
			return (
				<ModalCrud modalState={modalState} changeState={changeState}>
					<ProductDeleteForm
						products={selectedIds}
						refreshProducts={refreshProducts}
						closeModal={closeModal}
					/>
				</ModalCrud>
			)
		}
	}
	// Retorna el formulario seleccionado
	if (modalState === true && action !== '') return selectedForm
}
// Obtiene las sucursales
const getBranches = async () => {
	const res = await fetch('http://localhost:3000/api/branches', {
		method: 'GET',
	})

	const mapBranches = await res.json().then((data) => {
		return data.map((branch) => {
			return {
				value: branch.id,
				label: branch.name,
			}
		})
	})

	return mapBranches
}
// Obtiene las marcas
const getBrands = async () => {
	const res = await fetch('http://localhost:3000/api/brands', { method: 'GET' })
	const mapBrands = await res.json().then((data) => {
		return data.map((brand) => {
			return {
				value: brand.id,
				label: brand.name,
			}
		})
	})
	return mapBrands
}
// Obtiene el producto seleccionado
const getProduct = async (id) => {
	const res = await fetch(`http://localhost:3000/api/products/crud/${id}`, {
		method: 'GET',
	})
	const data = await res.json()

	return data
}

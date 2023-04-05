import Modal from 'components/modal/ModalActions'
import { useEffect, useMemo, useState } from 'react'
import ProductCreateForm from './ProductCreateForm'

export default function ProductsModal({
	action,
	children,
	modalState,
	changeState,
}) {
	// const [modalAction, setModalAction] = useState('')
	const [selectedForm, setSelectedForm] = useState('')
	const [branches, setBranches] = useState([])
	const [brands, setBrands] = useState([])
	const closeModal = () => changeState(false)

	useEffect(() => {
		setSelectedForm(refreshSelectedForm(action))
		getBranches().then((data) => setBranches(data))
		getBrands().then((data) => setBrands(data))
	}, [action])

	const refreshSelectedForm = (action) => {
		if (action === 'Create')
			return (
				<ProductCreateForm
					closeModal={closeModal}
					branches={branches}
					brands={brands}
				/>
			)
	}
	return modalState ? (
		<div className='fixed top-0 left-0 z-[1055]  flex items-center justify-center bg-black bg-opacity-80 h-full w-full overflow-y-auto overflow-x-hidden outline-none'>
			<Modal modalState={modalState} changeState={changeState}>
				{selectedForm}
			</Modal>
		</div>
	) : null
}

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

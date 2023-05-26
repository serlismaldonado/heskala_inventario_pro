import { Suspense, useState, useEffect, useMemo } from 'react'
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import SubmitForm from '@/components/forms/form/SubmitForm'
import BtnCancel from '@/components/buttons/BtnCancel/BtnCancel'
import InputSelect from '@/components/forms/select/InputSelect'
import InputText from '@/components/forms/input/InputText'
export default function ProductUpdateForm({
	closeModal,
	branches,
	brands,
	product,
}) {
	const [name, setName] = useState(product.name)
	const [description, setDescription] = useState(product.description)
	const [brand, setBrand] = useState(product.brand_id)
	const [branch, setBranch] = useState(product.branch_id)
	const [id, setId] = useState(product.id)

	useEffect(() => {
		setId(product.id)
		setName(product.name)
		setDescription(product.description)
		setBrand(product.brand_id)
		setBranch(product.branch_id)
	}, [product])

	const getName = (e) => setName(e)
	const getDescription = (e) => setDescription(e)
	const getBrand = (e) => setBrand(e)
	const getBranch = (e) => setBranch(e)

	const saveProduct = async () => {
		console.log(id, name, description, brand, branch)
		if (
			id !== '' &&
			name !== '' &&
			description !== '' &&
			branch !== '' &&
			brand !== ''
		) {
			const product = await fetch('http://localhost:3000/api/products/', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: id,
					name: name,
					description: description,
					branch_id: branch,
					brand_id: brand,
				}),
			})
			const data = await product.json()

			if (data.error) {
				alert(data.message)
				return
			}

			closeModal()
			return data
		}

		return
	}

	return (
		<Suspense fallback={<LoadingSpinner />}>
			<SubmitForm
				title='Actualizar producto'
				description='Actualiza los datos del producto'
				style='px-[40px] py-4 bg-slate-50 rounded-md'
				onSubmit={saveProduct}
				onCancel={closeModal}
				cta='Guardar'>
				<InputText
					placeholder='Nombre'
					type='text'
					passData={getName}
					defaultValue={name}
				/>
				<InputText
					placeholder='Descripcion'
					type='text'
					defaultValue={description}
					passData={getDescription}
				/>
				<InputSelect
					placeholder='Sucursal'
					type='text'
					options={branches}
					passData={getBranch}
					defaultValue={branch}
				/>
				<InputSelect
					placeholder='Marca'
					type='text'
					options={brands}
					passData={getBrand}
					defaultValue={brand}
				/>
			</SubmitForm>
		</Suspense>
	)
}

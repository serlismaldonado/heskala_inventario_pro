import { Suspense, useState, useEffect, useMemo } from 'react'
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import SubmitForm from '@/components/forms/form/SubmitForm'
import BtnCancel from '@/components/buttons/BtnCancel/BtnCancel'
import InputSelect from '@/components/forms/select/InputSelect'
import InputText from '@/components/forms/input/InputText'
import WarningAlert from '@/components/Alerts/WarningAlert'
export default function ProductCreateForm({ closeModal, branches, brands }) {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [brand, setBrand] = useState('')
	const [branch, setBranch] = useState('')

	const getName = (e) => setName(e)
	const getDescription = (e) => setDescription(e)
	const getBrand = (e) => setBrand(e)
	const getBranch = (e) => setBranch(e)

	useEffect(() => {
		setBrand(brands[0].value)
		setBranch(branches[0].value)
	}, [branches, brands])

	const saveProduct = async () => {
		console.log(name, description, brand, branch)
		if (name !== '' && description !== '' && branch !== '' && brand !== '') {
			const product = await fetch('http://localhost:3000/api/products/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
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
		}
	}

	return (
		<Suspense fallback={<LoadingSpinner />}>
			<SubmitForm
				title='Crear Categoría de producto'
				description='Agrega una nueva categoría de producto'
				style='px-[40px] py-4 bg-slate-50 rounded-md'
				onSubmit={saveProduct}
				onCancel={closeModal}
				cta='Guardar'>
				<InputText placeholder='Nombre' type='text' passData={getName} required={true} />
				<InputText
					placeholder='Descripción'
					type='text'
					passData={getDescription}
					required={true}
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

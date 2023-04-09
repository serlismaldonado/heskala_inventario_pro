import { Suspense } from 'react'
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import SubmitForm from '@/components/forms/form/SubmitForm'

export default function ProductDeleteForm({
	products,
	closeModal,
	refreshProducts,
}) {
	const deleteProducts = async () => {
		console.log(products)
		if (products.length > 0) {
			const product = await fetch('http://localhost:3000/api/products/', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					products: products,
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
				title='Eliminado Productos'
				description={`Has seleccionado (${products.length}) productos a eliminar`}
				style='px-[20px] py-4 bg-slate-50 rounded-md text-red-700'
				onSubmit={deleteProducts}
				onCancel={closeModal}
				cta='Eliminar'>
				<div className='flex flex-col max-w-xs text-gray-900 gap-2'>
					<p>
						<span className='font-bold text-red-700'>Importante: </span>También
						se eliminaran todas las versiones de productos asociadas asociadas.
					</p>
					<p className='text-red-700'>¿Deseas continuar?</p>
				</div>
			</SubmitForm>
		</Suspense>
	)
}

import { Suspense, useState, useEffect, useMemo } from 'react'
import LoadingSpinner from '@/components/utils/LoadingSpinner'
import SubmitForm from '@/components/forms/form/SubmitForm'
import BtnCancel from '@/components/buttons/BtnCancel/BtnCancel'
import InputSelect from '@/components/forms/select/InputSelect'
import InputText from '@/components/forms/input/InputText'
import WarningAlert from '@/components/Alerts/WarningAlert'
import BtnCreate from '@/components/buttons/BtnCreate/BtnCreate'
import BtnSubmit from '@/components/buttons/BtnSubmit/BtnSubmit'
import BtnIconDelete from '@/components/buttons/BtnDelete/BtnIconDelete'
import BtnIconCreate from '@/components/buttons/BtnCreate/BtnIconCreate'
import TableActions from '@/components/tables/TableSearch'
import TableSearch from '@/components/tables/TableSearch'
export default function ProductCreateForm({
	closeModal,
	productCategories,
	propertiesCategories,
	branch_id,
}) {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [purchasePrice, setPurchasePrice] = useState('')
	const [salePrice, setSalePrice] = useState('')
	const [stock, setStock] = useState('')
	const [productCategory, setProductCategory] = useState('')
	const [propertiesCategory, setPropertiesCategory] = useState(
		propertiesCategories[0].value,
	)
	const [property, setProperty] = useState('')
	const [value, setValue] = useState('')
	const [clean, setClean] = useState(false)
	const [propertiesList, setPropertiesList] = useState([])
	const [propertiesCatalog, setPropertiesCatalog] = useState([])
	const [productSearch, setProductSearch] = useState('')
	const [filterField, setFilterField] = useState('id')
	const [condition, setCondition] = useState('')
	const [foundedData, setFoundedData] = useState([])
	const [selectedId, setSelectedId] = useState('')

	const getName = (e) => setName(e)
	const getDescription = (e) => setDescription(e)
	const getPurchasePrice = (e) => setPurchasePrice(e)
	const getSalePrice = (e) => setSalePrice(e)
	const getStock = (e) => setStock(e)
	const getProductCategory = (e) => setProductCategory(e)
	const getPropertiesCategory = (e) => setPropertiesCategory(e)
	const getProperty = (e) => setProperty(e)
	const getValue = (e) => setValue(e)

	useMemo(() => {
		getProductsByCondition(branch_id, condition, filterField).then((data) =>
			setFoundedData(data),
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [condition, filterField])

	// Add property to list
	const addProperty = () => {
		if (property !== '' && value !== '' && propertiesCategory !== '') {
			setPropertiesList([
				...propertiesList,
				{ name: property, value, id_category: propertiesCategory },
			])
			setPropertiesCategory('')
			setValue('')
			setClean(true)
		}
	}

	// Delete property from list
	const deleteProperty = (index) => {
		const newList = propertiesList.filter((item, i) => i !== index)
		setPropertiesList(newList)
	}

	useEffect(() => {
		setProductCategory(productCategories[0].value)
		setPropertiesCategory(propertiesCategories[0].value)
	}, [productCategories, propertiesCategories])

	useEffect(() => {
		getPropertiesByCategory(propertiesCategory).then((data) => {
			setPropertiesCatalog(data)
		})
	}, [propertiesCategory])

	const saveProduct = async () => {
		console.log(
			name,
			description,
			purchasePrice,
			salePrice,
			stock,
			selectedId,
			propertiesList,
		)
		if (name !== '' && description !== '') {
			console.log('entro')
			const product = await fetch(
				'http://localhost:3000/api/productversions/',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name,
						description,
						purchasePrice,
						salePrice,
						stock,
						product_id: selectedId,
						properties: propertiesList,
					}),
				},
			)
			const data = await product

			if (data.error) {
				alert(data.message)
				return
			}
			console.log(data.status)
			return data
		}
	}

	return (
		<Suspense fallback={<LoadingSpinner />}>
			<div>
				<SubmitForm
					title='Nuevo Producto'
					description='Agrega tu nuevo producto aqui'
					style='p-5 bg-slate-100 rounded-md gap-2 m-10 '
					onSubmit={saveProduct}
					onCancel={closeModal}
					cta='Guardar'>
					<div className='flex gap-2'>
						<TableSearch
							title={'Categoria de producto'}
							description={'Seleccione una categoria para buscar un producto'}
							data={foundedData}
							getCondition={setCondition}
							getFilterField={setFilterField}
							setSelectedId={setSelectedId}
						/>
						{selectedId !== '' && (
							<div className='w-full flex gap-3 flex-col bg-white rounded-md p-5 shadow-md '>
								<div className='flex gap-2 w-full items-start flex-col'>
									<h1 className='text-2xl font-bold text-gray-600'>
										Descripcion del producto
									</h1>
									<p className='text-gray-500'>
										LLena la descripcion del producto
									</p>
								</div>
								<InputText
									placeholder='Nombre'
									type='text'
									passData={getName}
									required={true}
								/>
								<InputText
									placeholder='Descripcion'
									type='text'
									passData={getDescription}
									required={true}
								/>
								<div className='flex gap-2'>
									<InputText
										placeholder='Precio de compra'
										type='number'
										passData={getPurchasePrice}
										required={true}
									/>
									<InputText
										placeholder='Precio de venta'
										type='number'
										passData={getSalePrice}
										required={true}
									/>
									<InputText
										placeholder='Stock'
										type='number'
										passData={getStock}
										required={true}
										defaultValue={100}
									/>
								</div>
							</div>
						)}
						{name !== '' &&
							selectedId !== '' &&
							description !== '' &&
							purchasePrice !== '' &&
							salePrice !== '' && (
								<div className='w-full flex gap-3 flex-col bg-white rounded-md p-5 shadow-md '>
									<div className='flex gap-2 w-full items-start flex-col'>
										<h1 className='text-2xl font-bold text-gray-600'>
											Propiedades del producto
										</h1>
										<p className='text-gray-500'>
											Ingresa las propiedades del producto
										</p>
									</div>
									<div className='flex gap-2 w-full items-start flex-col'>
										<div className='flex gap-2 items-start'>
											<div className='flex flex-col gap-2'>
												<InputSelect
													placeholder='Propiedad'
													type='text'
													options={propertiesCategories}
													passData={getPropertiesCategory}
													defaultValue={propertiesCategory}
												/>
												{/* <InputSelect
											placeholder='Propiedad'
											type='text'
											options={propertiesCatalog}
											passData={getProperty}
										/>
										<BtnIconCreate onClick={() => console.log('create')} /> */}
											</div>
											<div className='flex flex-col items-start gap-2'>
												<InputText
													placeholder='Clave'
													type='text'
													passData={getProperty}
													cleaner={clean}
													setCleaner={setClean}
												/>
												<InputText
													placeholder='Valor'
													type='text'
													passData={getValue}
													cleaner={clean}
													setCleaner={setClean}
												/>
												<BtnSubmit onClick={addProperty}>Agregar</BtnSubmit>
											</div>
										</div>
									</div>
									<div className='flex gap-2 items-center'>
										<table className='rounded-md table-auto border-collapse'>
											<thead>
												<tr>
													<th className='text-gray-400 p-3 rounded-sm'>
														Propiedad
													</th>
													<th className='text-gray-400 p-3 rounded-sm '>
														Valor
													</th>
													<th className='text-gray-400 p-3 rounded-sm '>
														Acciones
													</th>
												</tr>
											</thead>
											<tbody>
												{propertiesList.map((property, index) => (
													<tr
														key={index}
														className='bg-gray-50 border rounded hover:bg-gray-100'>
														<td className='text-center text-gray-600 text-sm p-2'>
															{property.name}
														</td>
														<td className='text-center text-gray-600 text-sm p-2'>
															{property.value}
														</td>
														<td className='text-center text-gray-600 text-sm p-2 flex items-center justify-center'>
															<BtnIconDelete
																onClick={() => deleteProperty(index)}
															/>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							)}
					</div>
				</SubmitForm>
			</div>
		</Suspense>
	)
}

const getPropertiesByCategory = async (idCategory) => {
	const properties = await fetch(
		`http://localhost:3000/api/properties/${idCategory}/`,
	)
	const data = await properties.json().then((data) =>
		data.map((item) => {
			return { value: item.id, label: `${item.name}` }
		}),
	)
	return data
}
async function getProductsByCondition(branch_id, condition, filterField) {
	filterField = filterField === '' ? 'id' : filterField

	if (String(condition).trim() === '') {
		const products = await fetch(
			`http://localhost:3000/api/products/${branch_id}`,
			{
				method: 'GET',
			},
		)

		const _mapProducts = await products.json().then((data) => {
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

	// Crea la ruta para obtener los productos de la sucursal seleccionada por condición

	const route = `http://localhost:3000/api/products/${branch_id}/${String(
		filterField,
	).trim()}/${String(condition).trim()}`

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

import Modal from 'components/modal/ModalActions'
import BtnSubmit from '../buttons/BtnSubmit/BtnSubmit'
import SubmitForm from '../forms/form/SubmitForm'
import { useEffect, useState } from 'react'
import InputText from '../forms/input/InputText'
import InputSelect from '../forms/select/InputSelect'
import { Router } from 'next/router'

export default function ProductsModal({action, children, modalState, changeState }) {
	// const [modalAction, setModalAction] = useState('')
	const [selectedForm, setSelectedForm] = useState('')
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [brand, setBrand] = useState('')
	const [branch, setBranch] = useState('')
	const [branches, setBranches] = useState([])

	const getName = (e)=> setName(e)
	const getDescription = (e)=> setDescription(e)
	const getBrand = (e)=> setBrand(e)
	const getBranch = (e)=> setBranch(e)
	const closeModal = () => changeState(false) 
	

	getBranches().then(data => setBranches(data))
 	useEffect(
		()=> setSelectedForm(refreshSelectedForm(action))
		, [action])

	const refreshSelectedForm = (action)=>{
		console.log(action)
		if(action === 'Create')	{
		console.log('Creando..')
				return(<SubmitForm title='Nuevo Producto' description='Agrega tu nuevo producto aqui' style = 'px-[40px] py-4 bg-slate-200' onSubmit={saveProduct} onCancel={closeModal} cta='Guardar'>
					<InputText placeholder='Nombre' type='text' passData = {getName}/>
					<InputText placeholder='Descripcion' type='text' passData={getDescription}/>
					<InputSelect placeholder='Sucursal' type='text' options={
							branches
						} passData = {getBranch}/>
					<InputSelect placeholder='Marca' type='text' options={
				branches
						} passData={getBrand}/>
				</SubmitForm>)
			}
		if(action === 'Delete')		
				return(<SubmitForm onSubmit={deleteProduct} cta='Eliminar'></SubmitForm>)
		if(action === 'Update')
				return(<SubmitForm onSubmit={updateProduct} cta='Actualizar'></SubmitForm>)
	}


	return modalState ? (
		<div className='fixed top-0 left-0 z-[1055] flex items-center justify-center bg-black bg-opacity-80 h-full w-full overflow-y-auto overflow-x-hidden outline-none'>
			<Modal modalState={modalState} changeState={changeState}>
				{selectedForm}
			</Modal>
		</div>
	) : null

	async function saveProduct(){
		const product = await fetch('http://localhost:3000/api/productos',
		{method: 'POST', body:JSON.stringify({name: name, description:description, branch_id: branch, brand_id: brand})})
		
		const data = await product.json()

		if(data.error){
			alert(data.message)
			return
		}
	
		return
	}
	function deleteProduct(){
		console.log('Borrar (no mas hola mundo)')
	}
	function updateProduct(){
		console.log('Actualizar ')
	}
}


const getBranches = async()=>{
	const res = await fetch('http://localhost:3000/api/branches', {method: 'GET'})
	
	const mapBranches = await res.json().then((data)=>{
		return data.map( branch => {
			return{
				value: branch.id,
				label: branch.name
			}
		})
	})

	return mapBranches
}
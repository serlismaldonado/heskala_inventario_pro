/* Plantilla para crear TABLAS con acciones de CRUD */

import BtnIconCreate from '@/components/buttons/BtnCreate/BtnIconCreate'
import BtnIconDelete from '@/components/buttons/BtnDelete/BtnIconDelete'
import BtnIconUpdate from '@/components/buttons/BtnUpdate/BtnIconUpdate'
import InputText from '@/components/forms/input/InputText'
import InputSelect from '@/components/forms/select/InputSelect'
import { useState, useEffect, useMemo } from 'react'

function TableHeader({ columns }) {
	const [selectedRow, setSelectedRow] = useState('')

	return (
		<thead className=''>
			<tr>
				<th className='text-gray-400 p-3 rounded-sm'>
					<input type='checkbox' name='' id='' />
				</th>
				{columns
					.filter((e) => e != 'id')
					.map((heading, i) => (
						<th className='text-gray-500 p-2 rounded-sm text-start' key={i}>
							{heading.slice(0, 1).toUpperCase() + heading.slice(1)}
						</th>
					))}
			</tr>
		</thead>
	)
}

function TableBody({ data, columns, setSelectedIds }) {
	const [selectedRows, setSelectedRows] = useState([])

	const handleSelectRow = (e) => {
		const { checked, value } = e.target

		if (checked) {
			setSelectedRows([...selectedRows, value])
		} else {
			setSelectedRows(selectedRows.filter((row) => row !== value))
		}
	}

	useEffect(() => {
		setSelectedIds(selectedRows)
	}, [selectedRows])

	return (
		<tbody className=' rounded-md'>
			{data.length != 0 ? (
				data.map((row, index) => (
					<tr className='bg-gray-50 border rounded hover:bg-gray-100 ' key={index}>
						<td className='text-center text-gray-600 text-sm p-2 '>
							<input
								type='checkbox'
								name=''
								id=''
								value={columns.map((column) => row[column])[0]}
								onChange={handleSelectRow}
							/>
						</td>

						{columns
							.filter((e) => e != 'id')
							.map((column, i) => (
								<td className=' text-gray-600 text-sm' key={i}>
									{row[column]}
								</td>
							))}
					</tr>
				))
			) : (
				<tr>
					<td
						className='text-center text-gray-600 text-sm p-2'
						colSpan={columns.length + 1}>
						No hay datos que mostrar
					</td>
				</tr>
			)}
		</tbody>
	)
}

function TableFooter({ data, columns }) {
	return (
		<tfoot>
			<tr>
				<td colSpan={columns.length + 1} className='text-right text-gray-500 text-sm pt-3'>
					{data.length} de {data.length}
				</td>
			</tr>
		</tfoot>
	)
}

export default function TableActions({
	data,
	getCondition,
	canRead,
	canUpdate,
	canDelete,
	canCreate,
	getFilterField,
	isShowed,
	setIsShowed,
	action,
	setAction,
	setSelectedIds,
	tittle,
	subTittle,
	fields,
}) {
	// Estados de los permisos de CRUD para la tabla (por defecto false)
	const [canReadState, setCanReadState] = useState(canRead || +false)
	const [canUpdateState, setCanUpdateState] = useState(canUpdate || +false)
	const [canDeleteState, setCanDeleteState] = useState(canDelete || +false)
	const [canCreateState, setCanCreateState] = useState(canCreate || +false)
	const [param, setParam] = useState('')
	const [filterField, setFilterField] = useState('id')

	// Actualiza los estados de los permisos de CRUD para la tabla
	useEffect(() => {
		setCanReadState(canRead)
		setCanUpdateState(canUpdate)
		setCanDeleteState(canDelete)
		setCanCreateState(canCreate)
	}, [canRead, canUpdate, canDelete, canCreate])

	const getParam = (data) => setParam(data)
	const getField = (data) => setFilterField(data)

	//Funciones para manejar estados de modal
	const onClickCreate = () => {
		setIsShowed(true)
		setAction('Create')
	}
	const onClickDelete = () => {
		setIsShowed(true)
		setAction('Delete')
	}
	const onClickUpdate = () => {
		setIsShowed(true)
		setAction('Update')
	}

	useEffect(() => {
		getCondition(param)
	}, [param])

	useEffect(() => {
		getFilterField(filterField)
	}, [filterField])

	// Obtiene las columnas de la tabla
	const columns = useMemo(() => Object.keys(data[0] || []), [data])

	// Retorna la tabla si se puede leer
	return canReadState ? (
		<div className='w-full flex gap-3 flex-col bg-white rounded-md p-6 shadow-md'>
			<div>
				<h1 className='font-bold text-lg text-slate-700'>{tittle}</h1>
				<p>{subTittle}</p>
			</div>
			<div className='flex gap-2'>
				<InputText
					name='buscar'
					label='Buscar'
					type='text'
					placeholder='Buscar...'
					passData={getParam}
				/>
				<InputSelect
					name='rol'
					label='Rol'
					defaultValue='id'
					options={columns
						.map((column) => ({
							value: column,
							label:
								String(fields[columns.indexOf(column)]).slice(0, 1).toUpperCase() +
								String(fields[columns.indexOf(column)]).slice(1),
						}))
						.filter((e) => e.label !== 'Undefined')}
					passData={getField}
				/>
				<div className='flex justify-center gap-2 p-1'>
					{canDelete && <BtnIconDelete onClick={onClickDelete} />}
					{canUpdate && <BtnIconUpdate onClick={onClickUpdate} />}
					{canCreate && <BtnIconCreate onClick={onClickCreate} />}
				</div>
			</div>
			<table className='w-full rounded-md table-auto border-collapse'>
				<TableHeader columns={fields} />
				<TableBody
					data={data}
					columns={columns}
					canUpdate={canUpdateState}
					canDelete={canDeleteState}
					canCreate={canCreateState}
					setSelectedIds={setSelectedIds}
				/>
				<TableFooter data={data} columns={columns} />
			</table>
		</div>
	) : null
}

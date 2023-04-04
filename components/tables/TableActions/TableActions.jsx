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
						<th className='text-gray-500 p-2 rounded-sm' key={i}>
							{heading.slice(0, 1).toUpperCase() + heading.slice(1)}
						</th>
					))}
			</tr>
		</thead>
	)
}

function TableBody({ data, columns }) {
	const [selectedRows, setSelectedRows] = useState([])

	const handleSelectRow = (e) => {
		const { checked, value } = e.target

		if (checked) {
			setSelectedRows([...selectedRows, value])
		} else {
			setSelectedRows(selectedRows.filter((row) => row !== value))
		}
	}

	useEffect(() => {}, [selectedRows])

	return (
		<tbody className='bg-transparent '>
			{data.length != 0 ? (
				data.map((row, index) => (
					<tr
						className='bg-gray-100 border rounded hover:bg-gray-200'
						key={index}>
						<td className='text-center text-gray-600 text-sm p-2'>
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
								<td className='text-center text-gray-600 text-sm' key={i}>
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
				<td
					colSpan={columns.length + 1}
					className='text-right text-gray-500 text-sm pt-3'>
					{data.length} de {data.length}
				</td>
			</tr>
		</tfoot>
	)
}

export default function TableActions({
	onClickUpdate,
	onClickDelete,
	onClickCreate,
	data,
	getCondition,
	canRead,
	canUpdate,
	canDelete,
	canCreate,
	getFilterField,
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

	useMemo(() => {
		getCondition(param)
	}, [param])

	useMemo(() => {
		getFilterField(filterField)
	}, [filterField])

	// Obtiene las columnas de la tabla
	const columns = Object.keys(data[0] || [])

	// Retorna la tabla si se puede leer
	return canReadState ? (
		<div className='w-full flex gap-3 flex-col bg-slate-50 p-5 shadow-md'>
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
					options={columns.map((column) => ({
						value: column,
						label:
							String(column).slice(0, 1).toUpperCase() +
							String(column).slice(1),
					}))}
					passData={getField}
				/>
				<div className='flex justify-center gap-2 p-1'>
					{canDelete && <BtnIconDelete onClick={onClickDelete} />}
					{canUpdate && <BtnIconUpdate onClick={onClickUpdate} />}
					{canCreate && <BtnIconCreate onClick={onClickCreate} />}
				</div>
			</div>
			<table className='w-full rounded-md table-auto border-collapse'>
				<TableHeader columns={columns} />
				<TableBody
					data={data}
					columns={columns}
					canUpdate={canUpdateState}
					canDelete={canDeleteState}
					canCreate={canCreateState}
				/>
				<TableFooter data={data} columns={columns} />
			</table>
		</div>
	) : null
}

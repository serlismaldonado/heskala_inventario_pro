/* Plantilla para crear TABLAS con acciones de CRUD */

import BtnIconCreate from '@/components/buttons/BtnCreate/BtnIconCreate'
import BtnIconDelete from '@/components/buttons/BtnDelete/BtnIconDelete'
import BtnIconUpdate from '@/components/buttons/BtnUpdate/BtnIconUpdate'
import InputText from '@/components/forms/input/InputText'
import InputSelect from '@/components/forms/select/InputSelect'
import ProductsModal from '@/components/productos/crud/ProductModal'
import { useState, useEffect, useMemo } from 'react'

function TableHeader({ columns }) {
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

function TableBody({ data, columns, setSelectedId }) {
	const [selectedRow, setSelectedRow] = useState('')

	const handleSelectRow = (e) => {
		const { checked, value } = e.target

		if (checked) {
			setSelectedRow(value)
		} else {
			setSelectedRow('')
		}
	}

	useEffect(() => setSelectedId(selectedRow), [selectedRow])

	return (
		<tbody className=' rounded-md'>
			{data.length != 0 ? (
				data.map((row, index) => (
					<tr
						className='bg-gray-50 border rounded hover:bg-gray-100 '
						key={index}>
						<td className='text-center text-gray-600 text-sm p-2 '>
							<input
								type='checkbox'
								name=''
								id=''
								value={row.id}
								checked={selectedRow == row.id}
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

export default function TableSearch({
	data,
	getCondition,
	getFilterField,
	setSelectedId,
	title,
	description,
}) {
	// Estados de los permisos de CRUD para la tabla (por defecto false)
	const [param, setParam] = useState('')
	const [filterField, setFilterField] = useState('id')

	// Actualiza los estados de los permisos de CRUD para la tabla

	const getParam = (data) => setParam(data)
	const getField = (data) => setFilterField(data)

	useEffect(() => {
		getCondition(param)
	}, [param])

	useEffect(() => {
		getFilterField(filterField)
	}, [filterField])

	// Obtiene las columnas de la tabla
	const columns = Object.keys(data[0] || [])

	// Retorna la tabla si se puede leer
	return (
		<div className='w-full flex gap-3 flex-col bg-white rounded-md p-5 shadow-md'>
			<div className='flex gap-2 w-full items-start flex-col'>
				<h1 className='text-2xl font-bold text-gray-600'>{title}</h1>
				<p className='text-gray-500'>{description}</p>
			</div>

			<div className='flex gap-2 w-full'>
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
					options={columns.map((column) => ({
						value: column,
						label:
							String(column).slice(0, 1).toUpperCase() +
							String(column).slice(1),
					}))}
					passData={getField}
				/>
			</div>
			<table className='w-full rounded-md table-auto border-collapse'>
				<TableHeader columns={columns} />
				<TableBody
					data={data}
					columns={columns}
					setSelectedId={setSelectedId}
				/>
				<TableFooter data={data} columns={columns} />
			</table>
		</div>
	)
}

/* Plantilla para crear TABLAS con acciones de CRUD */

import BtnIconCreate from '@/components/buttons/BtnCreate/BtnIconCreate'
import BtnIconDelete from '@/components/buttons/BtnDelete/BtnIconDelete'
import BtnIconUpdate from '@/components/buttons/BtnUpdate/BtnIconUpdate'
import { useState, useEffect } from 'react'

function TableHeader({ columns }) {
	return (
		<thead className='bg-slate-200'>
			<tr>
				{columns.map((heading, i) => (
					<th className='text-gray-500 p-2 rounded-sm' key={i}>
						{heading.slice(0, 1).toUpperCase() + heading.slice(1)}
					</th>
				))}
				<th colSpan={3} className='text-gray-500'>
					Acciones
				</th>
			</tr>
		</thead>
	)
}

function TableBody({
	data,
	columns,
	canUpdate,
	canDelete,
	canCreate,
	onClickUpdate,
	onClickDelete,
	onClickCreate,
}) {
	return (
		<tbody>
			{data.map((row, index) => (
				<tr className='bg-gray-100 p-2' key={index}>
					{columns.map((column, i) => (
						<td className='text-center text-gray-600 text-sm' key={i}>
							{row[column]}
						</td>
					))}
					<td className='flex justify-center gap-2 p-1'>
						{canDelete && <BtnIconDelete onClick={onClickDelete} />}
						{canUpdate && <BtnIconUpdate onClick={onClickUpdate} />}
						{canCreate && <BtnIconCreate onClick={onClickCreate} />}
					</td>
				</tr>
			))}
		</tbody>
	)
}

export default function TableActions({
	onClickUpdate,
	onClickDelete,
	onClickCreate,
	data,
	canRead,
	canUpdate,
	canDelete,
	canCreate,
}) {
	// Estados de los permisos de CRUD para la tabla (por defecto false)
	const [canReadState, setCanReadState] = useState(canRead || false)
	const [canUpdateState, setCanUpdateState] = useState(canUpdate || false)
	const [canDeleteState, setCanDeleteState] = useState(canDelete || false)
	const [canCreateState, setCanCreateState] = useState(canCreate || false)

	// Actualiza los estados de los permisos de CRUD para la tabla
	useEffect(() => {
		setCanReadState(canRead)
		setCanUpdateState(canUpdate)
		setCanDeleteState(canDelete)
		setCanCreateState(canCreate)
	}, [canRead, canUpdate, canDelete, canCreate])

	// Obtiene las columnas de la tabla
	const columns = Object.keys(data[0] || [])

	// Retorna la tabla si se puede leer
	return canReadState ? (
		<div>
			<table className='shadow-md'>
				<TableHeader columns={columns} />
				<TableBody
					data={data}
					columns={columns}
					canUpdate={canUpdateState}
					canDelete={canDeleteState}
					canCreate={canCreateState}
					onClickUpdate={onClickUpdate}
					onClickDelete={onClickDelete}
					onClickCreate={onClickCreate}
				/>
			</table>
		</div>
	) : null
}

/*
model invoices {
  id                String @id @default(uuid())
  sale_id           String
  total_sale_amount Float
  invoice_date      String
}
*/

import Layout from '../../components/layouts/Layout'
import NestedLayout from '@/components/layouts/NestedLayout'
import { PrismaClient } from '@prisma/client'
export default function Page({ children, invoices }) {
	return (
		<div>
			<Layout>
				<NestedLayout>
					{/* Mostrar todas las facturas en un tabla */}
					<p>Lista de Facturas</p>
					<div className='container-md flex flex-row  items-center'>
						<table className='table-auto'>
							<thead>
								<tr className='bg-gray-100'>
									<th className='px-4 py-2'>ID</th>
									<th className='px-4 py-2'>Venta</th>
									<th className='px-4 py-2'>Monto</th>
									<th className='px-4 py-2'>Fecha</th>
									<th className='px-4 py-2'>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{invoices.map((invoice) => (
									<tr className='p-5' key={invoice.id}>
										<td>{invoice.id}</td>
										<td>{invoice.sale_id}</td>
										<td>{invoice.total_sale_amount}</td>
										<td>{invoice.invoice_date}</td>
										<td className='flex flex-row gap-3'>
											<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
												Editar
											</button>
											<button
												className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
												onClick={() => deleteInvoice(invoice.id)}>
												Eliminar
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</NestedLayout>
			</Layout>
		</div>
	)
}

export async function getStaticProps() {
	const prisma = new PrismaClient()

	const invoices = await prisma.invoices.findMany()

	return {
		props: {
			invoices: JSON.parse(JSON.stringify(invoices)),
		},
	}
}

// delete invoice using fetch with body
export async function deleteInvoice(id) {
	const res = await fetch('/api/invoices', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id: id }),
	})
	const data = await res.json()
	console.log(data)
}

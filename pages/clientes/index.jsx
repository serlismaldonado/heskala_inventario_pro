import Layout from '@/components/layouts/Layout'
import NestedLayout from '@/components/layouts/NestedLayout'
import { PrismaClient } from '@prisma/client'
export default function Page({ customers }) {
	return (
		<div>
			<Layout>
				<NestedLayout>
					<p>Lista de clientes</p>
					<div className='container-md flex flex-row  items-center'>
						<table className='table-auto'>
							<thead>
								<tr className='bg-gray-100'>
									<th className='px-4 py-2'>Nombre</th>
									<th className='px-4 py-2'>Direccion</th>
									<th className='px-4 py-2'>Email</th>
									<th className='px-4 py-2'>Telefono</th>
									<th className='px-4 py-2'>Ventas</th>
									<th className='px-4 py-2'>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{customers.map((customer) => (
									<tr className='p-5' key={customer.id}>
										<td className='border px-4 py-2'>{customer.name}</td>
										<td className='border px-4 py-2'>{customer.address}</td>
										<td className='border px-4 py-2'>{customer.email}</td>
										<td className='border px-4 py-2'>{customer.phone}</td>
										<td className='border px-4 py-2'>
											{customer.sales
												? customer.sales.map((sale) => {
														{
															sale.id
														}
												  })
												: 'Sin Ventas'}
										</td>

										<td className='flex flex-row gap-3'>
											<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
												Editar
											</button>
											<button
												className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
												onClick={() => deleteProduct(product.id)}>
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

/* Este es el modelo de datos de la tabla de clientes
model customers {
  id      String @id @default(uuid())
  name    String
  address String
  email   String
  phone   String
  sales   sales[]
}
*/

export async function getStaticProps() {
	const prisma = new PrismaClient()
	const customers = await prisma.customers.findMany()
	return {
		props: {
			customers: JSON.parse(JSON.stringify(customers)),
		},
	}
}

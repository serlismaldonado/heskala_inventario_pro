import { PrismaClient } from '@prisma/client'
import Layout from '../../components/layouts/Layout'
import NestedLayout from '@/components/layouts/NestedLayout'

export default function Page({ children, products }) {
	return (
		<div>
			<Layout>
				<NestedLayout>
					{/* Mostrar todos los productos en un tabla */}
					<p>Lista de clientes</p>
					<div className='container-md flex flex-row items-center'>
						<table className='table-auto'>
							<thead>
								<tr className='bg-gray-100'>
									<th className='px-4 py-2'>Nombre</th>
									<th className='px-4 py-2'>Precio de venta</th>
									<th className='px-4 py-2'>Precio de compra</th>
									<th className='px-4 py-2'>Cantidad</th>
									<th className='px-4 py-2'>Ultima modificacion</th>
									<th className='px-4 py-2'>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr className='p-5' key={product.id}>
										<td>{product.name}</td>
										<td>{product.sale_price}</td>
										<td>{product.purchase_price}</td>
										<td>{product.stock_quantity}</td>
										<td>{product.last_stock_update_date}</td>
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

export async function getStaticProps() {
	const prisma = new PrismaClient()

	const products = await prisma.products.findMany()

	return {
		props: {
			products: JSON.parse(JSON.stringify(products)),
		},
	}
}

export async function deleteProduct(id) {
	const deleted = await fetch(`http://localhost:3000/api/products/`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id }),
	})
	const deletedJson = await deleted.json()
	console.log(deletedJson)
}

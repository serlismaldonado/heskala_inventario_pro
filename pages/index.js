export default function Home({ branch, company }) {
  return (
    <div>
    </div>
  )
}




// export async function getStaticProps() {
// 	const prisma = new PrismaClient()
// 	const companyID = '70a600d5-7e2a-4dcc-991d-f414b337f47f'
// 	const company = await prisma.company.findUnique({
// 		where: {
// 			id: companyID,
// 		},
// 		include: {
// 			branches: true,
// 			customers: true,
// 		},
// 	})
// 	const branch = await prisma.branch.findFirst({
// 		where: {
// 			id: company.branches[0].id,
// 		},
// 		include: {
// 			company: true,
// 			products: true,
// 			employees: true,
// 			users: true,
// 		},
// 	})
// 	return {
// 		props: {
// 			branch: JSON.parse(JSON.stringify(branch)),
// 			company: JSON.parse(JSON.stringify(company)),
// 		},
// 	}
// }

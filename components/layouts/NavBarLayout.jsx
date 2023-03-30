/*  */
import { createContext } from 'react'
import { Poppins } from 'next/font/google'
import TopNavBar from '../Navbar/TopNavBar'
import { validateUserSession } from '@/middlewares/auth'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '700'],
})
export const CompanyContext = createContext()
export default function Layout({ children, userPreferences }) {
	return (
		<div className={poppins.className}>
			<div>{children}</div>
			<div className='flex'>
				<TopNavBar />
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	return await validateUserSession(context)
}

import Navbar from '../Navbar/component'
import { useContext } from 'react'
import { CompanyContext } from './Layout'
export default function Header({ children }) {
	const name = useContext(CompanyContext)
	return (
		<>
			<header>
				<Navbar />
				{name}
			</header>
		</>
	)
}

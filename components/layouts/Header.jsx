import Navbar from '../Navbar/NavBar'
import { useContext } from 'react'
import { CompanyContext } from './NavBarLayout'
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

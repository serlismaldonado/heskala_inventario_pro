import Navbar from '../Navbar/component'
export default function Header({ children }) {
	return (
		<header>
			<Navbar />
			{children}
		</header>
	)
}

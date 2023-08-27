import { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<nav className='bg-gray-800'>
			<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
				<div className='flex flex-col items-center justify-between h-16'>
					<div className='flex items-center'>
						<Link
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
							href='/inicio'>
							Inicio
						</Link>
						<Link
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
							href='/productos'>
							Productos
						</Link>
						<Link
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
							href='/clientes'>
							Clientes
						</Link>
						<Link
							className='text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
							href='/facturas'>
							Facturas
						</Link>
					</div>
					<div className='-mr-2 flex items-center sm:hidden'>
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							type='button'
							className='bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
							aria-controls='mobile-menu'
							aria-expanded='false'>
							<span className='sr-only'>Open main menu</span>
							<svg
								className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
							<svg
								className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{isMenuOpen && (
				<div className='sm:hidden' id='mobile-menu'>
					<div className='px-2 pt-2 pb-3 space-y-1'>
						<Link
							className='text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
							href='/inicio'>
							Inicio
						</Link>
						<Link
							className='text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
							href='/productos'>
							Productos
						</Link>
						<Link
							className='text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
							href='/contact'>
							Facturas
						</Link>
					</div>
				</div>
			)}
		</nav>
	)
}

export default Navbar

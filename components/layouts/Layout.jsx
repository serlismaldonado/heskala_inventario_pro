import Head from 'next/head'
import Header from './Header'
export default function Layout({ children }) {
	return (
		<div className='w-full'>
			<Head>
				<title>My page</title>
			</Head>
			<Header />
			{children}
		</div>
	)
}

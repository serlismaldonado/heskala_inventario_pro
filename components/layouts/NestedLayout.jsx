import { useRouter } from 'next/router'
export default function NestedLayout({ children }) {
	const title =
		useRouter().pathname.split('/')[1].charAt(0).toUpperCase() +
		useRouter().pathname.split('/')[1].slice(1)

	return (
		<div className='container'>
			<h1 className='text-4xl font-bold'>{title}</h1>
			{children}
		</div>
	)
}

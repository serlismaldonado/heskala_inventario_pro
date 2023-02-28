import { useRouter } from 'next/router'
export default function NestedLayout({ children }) {
	const title =
		useRouter().pathname.split('/')[1].charAt(0).toUpperCase() +
		useRouter().pathname.split('/')[1].slice(1)

	return (
		<div className='container-full w-screen flex flex-col gap-5 p-5 bg-slate-100'>
			<h1 className='text-4xl font-bold self-start'>{title}</h1>
			{children}
		</div>
	)
}

import Link from 'next/link'
export default function ItemsNavBar({ title, route }) {
	return (
		<div className='p-3 rounded-sm'>
			<Link href={route}>{title}</Link>
		</div>
	)
}

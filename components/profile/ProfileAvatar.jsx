import Image from 'next/image'
export default function ProfileAvatar({ children, image, name }) {
	return (
		<div className='flex flex-col items-center'>
			<div className='flex justify-center items-center rounded-full bg-sky-200'>
				{image ? (
					<Image src={image} alt={''} width={50} height={50} />
				) : (
					<div className='flex justify-center items-center rounded-full bg-sky-200 w-12 h-12'>
						{String(name).charAt(0).toUpperCase()}
					</div>
				)}
			</div>
		</div>
	)
}

// import style from './style.module.css'
import { useState, useEffect } from 'react'
export default function InputText(props) {
	const { onChange, defaultValue, placeholder, type, required, passData } =
		props
	const [value, setValue] = useState(defaultValue || '')
	const [pattern, setPattern] = useState('')
	const [isRequired, setIsRequired] = useState(required || false)
	const [style, setStyle] = useState({
		input_text:
			'border border-gray-300 focus:text-gray-500 text-gray-400  focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-transparent rounded-md focus:shadow-sm shadow-blue-400 px-4 py-2 outline-none transition duration-200 ease-in-out backdrop-filter backdrop-blur-sm w-full',
		input_text_error:
			'border border-red-300  focus:ring-red-400 focus:ring-1 focus:ring-red-300 focus:border-transparent rounded-md focus:shadow-sm shadow-red-400 px-4 py-2 outline-none transition duration-200 ease-in-out backdrop-filter backdrop-blur-sm text-red-400 focus:text-red-500 w-full ',
	})

	useEffect(() => passData(value), [value])

	useEffect(() => {
		if (type === 'email') {
			setPattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
		} else if (type === 'password') {
			setPattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
		} else if (type === 'text') {
			setPattern('[a-zA-Z0-9]{3,}')
		} else if (type === 'number') {
			setPattern('[0-9]{3,}')
		} else if (type === 'tel') {
			setPattern('[0-9]{3,}')
		} else if (type === 'date') {
			setPattern('[0-9]{3,}')
		} else if (type === 'time') {
			setPattern('[0-9]{3,}')
		} else if (type === 'url') {
			setPattern('[0-9]{3,}')
		} else if (type === 'week') {
			setPattern('[0-9]{3,}')
		} else if (type === 'month') {
			setPattern('[0-9]{3,}')
		}
	}, [type])

	return (
		<div className='flex flex-col gap-0 m-0'>
			<input
				className={
					isRequired && value === '' ? style.input_text_error : style.input_text
				}
				onChange={(e) => {
					setValue(e.target.value)
					if (e.target.value === '') {
					}
				}}
				value={value}
				placeholder={placeholder}
				type={type}
				required={required}
				pattern={pattern}
			/>
			{value === '' && isRequired ? (
				<span className='relative flex h-2 w-2 right-2 left-[94%] bottom-6'>
					<span className='animate-ping absolute  h-full w-full rounded-full bg-red-300 opacity-75'></span>
					<span className=' rounded-full h-2 w-2 bg-red-300'></span>
				</span>
			) : null}
		</div>
	)
}

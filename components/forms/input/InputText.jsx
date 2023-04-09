import style from './style.module.css'
import { useState, useEffect } from 'react'
export default function InputText(props) {
	const { onChange, defaultValue, placeholder, type, required, passData } =
		props
	const [value, setValue] = useState(defaultValue || '')
	const [pattern, setPattern] = useState('')

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
		<div>
			<input
				className={style.input_text}
				onChange={(e) => setValue(e.target.value)}
				value={value}
				placeholder={placeholder}
				type={type}
				required={required}
				pattern={pattern}
			/>
		</div>
	)
}

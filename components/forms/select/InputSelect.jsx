// import style from './style.module.css'
import { useState, useEffect } from 'react'
export default function InputSelect(props) {
	const { placeholder, type, options, passData, defaultValue } = props
	const [selectedOption, setSelectedOption] = useState(defaultValue)
	const [style, setStyle] = useState({
		input_select:
			'border bg-gray-100 border-gray-300 focus:text-gray-500 text-gray-400  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent rounded-md focus:shadow-sm shadow-blue-400 px-4 py-2 outline-none transition duration-200 ease-in-out backdrop-filter backdrop-blur-sm w-full',
		input_select_error:
			'border bg-gray-100 border-red-300 focus:text-gray-500 text-gray-400 shadow-red-400 focus:ring-red-400 focus:ring-2 focus:ring-red-300 focus:border-transparent rounded-md focus:shadow-sm shadow-red-400 px-4 py-2 outline-none transition duration-200 ease-in-out backdrop-filter backdrop-blur-sm  w-full ',
	})
	useEffect(() => passData(selectedOption), [selectedOption])

	return (
		<div className='w-full'>
			<select
				className={style.input_select}
				onChange={(e) => {
					setSelectedOption(e.target.value)
				}}
				defaultValue={selectedOption}
				placeholder={placeholder}
				type={type}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}

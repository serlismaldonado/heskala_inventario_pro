import style from './style.module.css'
import { useState, useEffect } from 'react'
export default function InputSelect(props) {
	const { placeholder, type, options, passData } = props

	const [selectedOption, setSelectedOption] = useState('')
	useEffect(() => passData(selectedOption), [selectedOption])
	return (
		<div>
			<select
				className={style.input_select}
				onChange={(e) => {
					setSelectedOption(e.target.value)
				}}
				value={selectedOption}
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

import style from './style.module.css'

export default function BtnCancel(props) {
	const { onClick, children } = props

	return (
		<div>
			<button
				className={
					'px-4 py-2 rounded-md text-gray-500 bg-gradient-to-tr from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300'
				}
				onClick={onClick}
				type='submit'>
				{children}
			</button>
		</div>
	)
}

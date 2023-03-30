import style from './style.module.css'

export default function BtnSubmit(props) {
	const { onClick, children } = props

	return (
		<div>
			<button
				className={
					' text-white font-bold py-2 px-4 rounded-md bg-gradient-to-tr from-violet-400 to-sky-500 hover:from-violet-500 hover:to-sky-600  '
				}
				onClick={() => onClick()}
				type='button'>
				{children}
			</button>
		</div>
	)
}

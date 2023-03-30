import style from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function BtnIconCreate(props) {
	const { onClick, children } = props

	return (
		<div>
			<button
				className='p-1 rounded-md flex gap-1 items-center text-sky-300  hover:text-sky-400'
				onClick={onClick}>
				<FontAwesomeIcon icon={faPlus} />
				{children}
			</button>
		</div>
	)
}

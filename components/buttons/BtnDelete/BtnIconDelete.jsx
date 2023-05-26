import style from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function BtnIconDelete(props) {
	const { onClick, children } = props

	return (
		<div>
			<button
				className=' p-1 rounded-md flex gap-1 items-center text-red-300 hover:text-red-400'
				type='button'
				onClick={onClick}>
				<FontAwesomeIcon icon={faTrash} />
				{children}
			</button>
		</div>
	)
}

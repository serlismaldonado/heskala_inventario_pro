import style from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export default function BtnIconUpdate(props) {
	const { onClick, children } = props

	return (
		<div>
			<button
				className='p-1 rounded-md flex gap-1 items-center text-violet-300 hover:text-violet-400 '
				onClick={onClick}>
				<FontAwesomeIcon icon={faPen} />
				{children}
			</button>
		</div>
	)
}

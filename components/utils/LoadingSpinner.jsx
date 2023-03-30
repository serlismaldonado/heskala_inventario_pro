import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
export default function LoadingSpinner() {
	return (
		<div
			className='flex flex-col items-center justify-center h-screen
        '>
			<div className='animate-spin'>
				<FontAwesomeIcon className='text-indigo-600 fa-2xl' icon={faSpinner} />
			</div>
		</div>
	)
}

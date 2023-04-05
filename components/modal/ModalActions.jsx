import { useState, useMemo } from 'react'
export default function Modal({ modalState, changeState, children }) {
	const [modalOpen, setModalOpen] = useState(false)

	useMemo(() => {
		setModalOpen(modalState)
	}, [modalState])

	// const closeModal = () => {
	// 	setModalOpen(false)
	// 	changeModalState(false)
	// }

	return (
		<>
			{modalOpen ? (
				<div className=''>
					<div className=''>{children}</div>
				</div>
			) : null}
		</>
	)
}

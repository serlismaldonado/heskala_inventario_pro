import { useState, useMemo } from 'react'
export default function Modal({ modalState, changeState, children }) {
	const [modalOpen, setModalOpen] = useState(false)

	const changeModalState = (state) => {
		setModalOpen(state)
		changeState(state)
	}

	useMemo(() => {
		setModalOpen(modalState)
	}, [modalState])

	const closeModal = () => {
		setModalOpen(false)
		changeModalState(false)
	}

	return (
		<>
			{modalOpen ? (
				<div className=''>
					<div className=''>
						{children}
						<button onClick={closeModal}>Cerrar</button>
					</div>
				</div>
			) : null}
		</>
	)
}

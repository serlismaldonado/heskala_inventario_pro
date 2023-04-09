import { useEffect, useState } from 'react'
import AlertMessage from './AlertMessage'

export default function SuccessAlert({ children, content }) {
	const [modalOpen, setModalOpen] = useState(true)

	const modalChange = (state) => {
		setModalOpen(state)
	}
	return modalOpen ? (
		<>
			<AlertMessage
				modalState={modalOpen}
				changeState={modalChange}
				delay={5000}
				type={'Success'}>
				{children} {content}
			</AlertMessage>
		</>
	) : null
}

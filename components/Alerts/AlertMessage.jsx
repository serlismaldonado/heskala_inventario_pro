import { useState, useMemo } from 'react'
export default function AlertMessage({
	modalState,
	changeState,
	type,
	children,
	delay,
}) {
	const [modalOpen, setModalOpen] = useState(modalState)

	const modalChange = (state) => {
		setModalOpen(state)
	}

	useMemo(() => {
		if (type === 'Success') {
			setTimeout(() => {
				setModalOpen(false)
				changeState(false)
			}, delay)
		}
		if (type === 'Error') {
			setTimeout(() => {
				setModalOpen(false)
				changeState(false)
			}, delay)
		}
		if (type === 'Warning') {
			setTimeout(() => {
				setModalOpen(false)
				changeState(false)
			}, delay)
		}
	}, [])

	if (type === 'Success') {
		return (
			<div className='fixed bottom-5 left-0 self-center w-full flex items-center justify-center bg-opacity-40 outline-none'>
				<div
					className='bg-green-600 p-4 text-white rounded-md shadow-md bg-opacity-80'
					role='alert'>
					{children}
				</div>
			</div>
		)
	}
	if (type === 'Error') {
		return (
			<div className='fixed bottom-5 left-0 self-center w-full flex items-center justify-center bg-opacity-40 outline-none'>
				<div
					className='bg-red-600  p-4 text-white rounded-md shadow-md bg-opacity-80'
					role='alert'>
					{children}
				</div>
			</div>
		)
	}
	if (type === 'Warning') {
		return (
			<div className='fixed bottom-5 left-0 self-center w-full flex items-center justify-center bg-opacity-40 outline-none'>
				<div
					className='bg-yellow-600  p-4 text-white rounded-md shadow-md bg-opacity-80'
					role='alert'>
					{children}
				</div>
			</div>
		)
	}
}

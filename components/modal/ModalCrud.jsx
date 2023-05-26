import Modal from './ModalActions'
export default function ModalCrud({ children, modalState, changeState }) {
	return (
		<div className='fixed top-0 left-0 z-[1055]  flex items-center justify-center bg-black bg-opacity-80 h-full w-full overflow-y-auto overflow-x-hidden outline-none'>
			<Modal modalState={modalState} changeState={changeState}>
				{children}
			</Modal>
		</div>
	)
}

import Modal from 'components/modal/ModalActions'
import BtnSubmit from '../buttons/BtnSubmit/BtnSubmit'

export default function ModalActions({ children, modalState, changeState }) {
	return modalState ? (
		<div className='fixed top-[50%] left-[50%] z-[1055] flex self-center h-full w-full overflow-y-auto overflow-x-hidden outline-none'>
			<Modal modalState={modalState} changeState={changeState}>
				{children}
				<BtnSubmit onClick={() => console.log('Guardar')}>Guardar</BtnSubmit>
			</Modal>
		</div>
	) : null
}

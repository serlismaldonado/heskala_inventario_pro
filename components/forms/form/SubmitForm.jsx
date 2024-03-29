import style from './style.module.css'
import BtnSubmit from '@/components/buttons/BtnSubmit/BtnSubmit'
import BtnCancel from '@/components/buttons/BtnCancel/BtnCancel'
export default function SubmitForm(props) {
	const { onSubmit, onCancel, title, description, cta, style, children } = props

	return (
		<div className={'p-2 ' + style}>
			<form method='GET' className={'flex gap-3 flex-col '}>
				<div className='flex flex-col gap-1 text-center p-3'>
					<h1 className={'text-2xl font-bold'}>{title}</h1>
					<p className={'text-sm'}>{description}</p>
				</div>
				<div className='flex flex-col gap-2 text-center p-3'>{children}</div>
				<div className={'flex gap-3 pt-2 justify-end'}>
					<BtnCancel onClick={onCancel}>Cancelar</BtnCancel>
					<BtnSubmit onClick={onSubmit}>{cta}</BtnSubmit>
				</div>
			</form>
		</div>
	)
}

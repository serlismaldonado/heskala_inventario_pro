import style from './style.module.css'

export default function BtnCreate(props) {
	const { onClick, children } = props

	return (
		<div>
			<button className={style.btn_create} onClick={onClick}>
				{children}
			</button>
		</div>
	)
}

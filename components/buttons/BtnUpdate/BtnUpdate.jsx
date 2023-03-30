import style from './style.module.css'

export default function BtnUpdate(props) {
	const { onClick, children } = props

	return (
		<div>
			<button className={style.btn_update} onClick={onClick}>
				{children}
			</button>
		</div>
	)
}

import style from './style.module.css'

export default function BtnDelete(props) {
	const { onClick, children } = props

	return (
		<div>
			<button className={style.btn_delete} onClick={onClick}>
				{children}
			</button>
		</div>
	)
}

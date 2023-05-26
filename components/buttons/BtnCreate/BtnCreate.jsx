import style from './style.module.css'

export default function BtnCreate(props) {
	const { onClick, children, cta } = props

	return (
		<div>
			<button className={style.btn_create} onClick={onClick}>
				{children} {cta}
			</button>
		</div>
	)
}

import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import alertActions from '../../store/Alert/actions'
const { close } = alertActions

export default function Alert() {

    const visible = useSelector(store=> store.alert.visible)
    const icon = useSelector(store=> store.alert.icon)
    const text = useSelector(store=> store.alert.text)
    const dispatch = useDispatch()

    if (visible) {
        Swal.fire({
            icon: icon,
            text: text,
        }).then(res => dispatch(close({icon: 'success',text:''})))
    }

    return <></>

}
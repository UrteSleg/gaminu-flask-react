import { useEffect } from 'react';
import { useGlobalDispatch} from '../../globalContext';

export default function UserHoc({ children, ...rest }) {
    const dispatch = useGlobalDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token) {
            dispatch({type: "LOGIN", payload: token})
        }
    }, [])

    return children;
}


import { InputWrapper } from './style'

interface InputProps {
    type?: string,
    disable?: boolean,
    states?: any
}


export const StyledInput = (props: InputProps) => {
    const { type, disable, states } = props
    return (
        <>
            <InputWrapper type={type} disabled={disable} state={states} />
        </>
    )
}

import { FormEvent } from "react"

export const handlePesoInput = (e: FormEvent) => {
    // @ts-ignore
    const value = e.target.value
    if (!/^[0-9]*[.,]?[0-9]*$/.test(value)) {
        e.preventDefault()
    }
}


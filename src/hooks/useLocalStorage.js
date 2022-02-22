import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
    const initialVal = localStorage.getItem(key) || defaultValue;

    const [state, setState ] = useState(initialVal);

    useEffect(()=> {
        !state ? localStorage.removeItem(key) : localStorage.setItem(key, state)
    }, [key, state])

    return [state, setState]

}

export default useLocalStorage
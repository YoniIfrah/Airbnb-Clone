"use client";
import React,{useState, useEffect, Children} from 'react'


interface ClientOnlyProps {
    children: React.ReactNode
}

const ClientOnly:React.FC<ClientOnlyProps> = ({children}) => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        setHasMounted(true)

    }, []);
    if(!hasMounted){
        return null
    }

  return (
    <>
    {children}
    </>
  )
}

export default ClientOnly
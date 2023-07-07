import  { useState } from 'react'

const useDisclose = () => {
    const [isOpen, setIsOpen] = useState(false);
    const Open = () =>{
        setIsOpen(true);
    }
    const onClose =() =>{
        setIsOpen(false)
    }  
  return {Open, onClose,isOpen }
}

export default useDisclose
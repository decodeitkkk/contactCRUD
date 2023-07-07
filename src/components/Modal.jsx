import React from 'react';
import { createPortal } from 'react-dom';
import {AiOutlineCloseCircle} from "react-icons/ai";

const Modal = ({isOpen, onClose, children}) => {
  return createPortal  (
    <>
        {isOpen && (
            <div  className=" absolute top-0 z-40 h-screen w-screen backdrop-blur">
            <div className=" relative z-50 min-h-[200px]  max-w-[80%] bg-white  p-4  m-auto my-4 ">
            <div className="flex justify-end ">
              <AiOutlineCloseCircle className="text-2xl self-end  cursor-pointer " onClick={onClose} />
            </div>
            {children}
            </div>
            
        </div>)}
    </>
  ,document.getElementById("modal-root"))
}

export default Modal
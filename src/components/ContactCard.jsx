import React from 'react';
import {IoIosContact} from "react-icons/io";
import {TbEditCircle} from "react-icons/tb";
import {MdDelete} from "react-icons/md";
import { deleteDoc, doc } from 'firebase/firestore';
import {db} from "../config/firebase";
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclose from '../hooks/useDisclose';
import { toast } from 'react-toastify';


const ContactCard = ({contacts}) => {
  const {isOpen, Open, onClose} = useDisclose();
  
  const deleteContact = async(id)=>{
    try {
      await deleteDoc(doc(db,"collectionID2163",id));
      toast.success("Item deleted successfully")
    } catch (error) {
      console.log(error)
      
    }
  }
  return (

    <>
      <div 
    key={contacts.id}
    className=" bg-red-400 mt-4 rounded-md p-2  items-center justify-between flex-grow"
    >
      <div className="flex justify-between">
      <div className="flex gap-2 ">
      <IoIosContact className="text-5xl text-white"  />
      <div className="flex flex-col ">
        <h2 className="font-bold text-4xl`" > {contacts.name} </h2>
        <p className="text-sm" > {contacts.email} </p>
      </div>
      </div>
      <div className="flex gap-1" >
        <TbEditCircle onClick={Open} className="text-5xl cursor-pointer" />
        <MdDelete onClick={()=>deleteContact(contacts.id)} className="text-5xl text-orange  cursor-pointer" />
      </div>
      </div>
    </div>
    <AddAndUpdateContact contacts={contacts} isOpen={isOpen} onClose={onClose} />
    </>
  
)}

export default ContactCard
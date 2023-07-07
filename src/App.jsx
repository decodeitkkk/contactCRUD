import {FiSearch} from "react-icons/fi"
import {BsPlusCircleFill} from "react-icons/bs"
import {IoIosContact} from "react-icons/io"
import {TbEditCircle} from "react-icons/tb"
import {MdDelete} from "react-icons/md"
import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard"
import Modal from "./components/Modal"
import AddAndUpdateContact from "./components/AddAndUpdateContact"
import useDisclose from "./hooks/useDisclose"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [contacts, setContacts] = useState([]);

  const {isOpen, Open, onClose} = useDisclose();

  
  useEffect(() => {
    const getContacts = async() =>{
      try {
        const contactsCollection = collection(db,"collectionID2163")
        // const contactSnapshot = await getDocs(contactsCollection);

        onSnapshot(contactsCollection,(snapshot)=>{
          const contactList = snapshot.docs.map((doc)=>{
            return{
              id:doc.id,
              ...doc.data()
            }
          })
          
  
          // console.log(contactList[0].name)
          setContacts(contactList)
        })

        

      } catch (error) {
        console.log(error)
      }

    }
    getContacts();
  }, []);

    const filteredContact = (e) =>{
      const value = e.target.value
      const contactsCollection = collection(db,"collectionID2163")
        

        onSnapshot(contactsCollection,(snapshot)=>{
          const contactList = snapshot.docs.map((doc)=>{
            return{
              id:doc.id,
              ...doc.data()
            }
          })
          
          const filteredContact = contactList.filter((contacts)=>contacts.name.toLowerCase().includes(value.toLowerCase()))
        
          setContacts(filteredContact)
          return filteredContact;
        })
    }

  return (
    <>
      <div className="max-w-[400px] m-auto px-4 ">
        <Navbar />

      <div className="flex gap-2 ">

        <div className="relative flex items-center flex-grow" >
          <FiSearch  className="absolute  ml-1  text-white text-3xl" />
          <input onChange={filteredContact} type="text" className="bg-transparent border-white border h-10 rounded-md  flex-grow pl-10 text-white " name="" id="" />
        </div>
        <BsPlusCircleFill onClick={Open} className="text-white text-4xl cursor-pointer " />
      </div>

        {
          contacts.map((contacts)=>(
          <ContactCard contacts={contacts} />
          ))
        }
      
      </div>
      <AddAndUpdateContact contacts={contacts} isUpdate isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
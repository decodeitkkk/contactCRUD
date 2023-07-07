import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { toast } from 'react-toastify'
import * as Yup from "yup";


const contactSchemaValidation = Yup.object().shape({
  name:Yup.string().required("Name is required"),
  email:Yup.string().email("Invalid email format").required("Email is required")
})


const AddAndUpdateContact = ({contacts, isUpdate, isOpen,onClose}) => {
  // console.log(contacts.name)
  const addContact = async(contacts) =>{
      try {
        const contactRef = collection(db,"collectionID2163");
        await addDoc(contactRef,contacts)
        onClose()
        toast.success("New Item added successfull")
      } catch (error) {
        console.log(error)
        
      }
  }

  const updateContact = async(contacts,id) =>{
    try {
      const contactRef = doc(db,"collectionID2163",id);
      await updateDoc(contactRef,contacts)
      onClose()
      toast.success("update successfull")
    } catch (error) {
      console.log(error)
    }
}
  return (
   <>
      <Modal 
      isOpen={isOpen}
      onClose = {onClose}
      >
      <Formik
      validationSchema={contactSchemaValidation}
      initialValues = {
        !isUpdate 
        ?{
          name:contacts.name,
          email:contacts.email,
        }
       :{
          name:"",
          email:"",
      }}
      onSubmit={(v)=>{
        console.log(v)
        !isUpdate 
        ? updateContact(v,contacts.id) 
        : addContact(v);
      }}
      >
        <Form>
        <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className='text-xl' htmlFor="name">Name</label>
          <Field className="h-10 border border-black rounded-lg" type="text" name="name" ></Field>
          <div className="text-red-500 text-xs ">
            <ErrorMessage name="name" />

          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className='text-xl' htmlFor="name">Email</label>
          <Field className="h-10 border border-black rounded-lg" type="email" name="email" ></Field>
          <div className="text-red-500 text-xs ">
            <ErrorMessage name="email" />

          </div>
        </div>
        <button className='bg-red-500 text-white border self-end px-3 py-1.5' >{!isUpdate ?"Update":"Add"} Contact</button>
        </div>

        </Form>
      </Formik>
      </Modal>

   </>
  )
}

export default AddAndUpdateContact
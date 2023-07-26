
import Head from "next/head";
import { BiSolidUserPlus, BiPlus} from "react-icons/bi";
import Table from "../components/table_propietario";
import Form from "../components/form_propietario";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, deleteAction } from "../redux/reducer";
import {deleteUser, getUsers} from '../lib/helper'
import { useQueryClient } from "react-query";

export default function Home() {

  const visible1 = useSelector((state)=> state.app?.client.toggleForm)
  const deleteId = useSelector(state => state.app.client.deleteId)
  const queryclient = useQueryClient();


  const dispatch = useDispatch()

  const handler = ()=>{
    dispatch(toggleChangeAction())
  }

  const deletehandler = async ()=>{
    if(deleteId){
      await deleteUser(deleteId);
      await queryclient.prefetchQuery('users',getUsers)
      await dispatch(deleteAction(null))
    }
  }

  const cancelhandler =  async()=>{
  
    await dispatch(deleteAction(null))
  }


  return (
    <section>
      <Head>
        <title>Taller John Doe & Doe</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
        <img className=" max-w-3xl h-auto mx-auto mt-9 rounded-md" src="assets/img/banner.png" alt="image description"/>


        <div className='container mx-auto flex justify-between py-5 border-b'>
          <div className='left flex gap-3'>
            <button onClick={handler} className='flex bg-red-800 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-red-800 hover:text-white-800'>
              Agregar registro <span className='px-1'><BiPlus size={23}></BiPlus></span>
            </button>
          </div>
          {deleteId ? DeleteComponent({deletehandler, cancelhandler}) : <></>}
        </div>

      
          {visible1 ? <Form></Form> : <></>}
       

        
        
        <div className="container mx-auto mb-10">
          <Table></Table>
        </div>      
  
      </main>
    </section>
  )
}

function DeleteComponent({deletehandler, cancelhandler}){
  return(
    <div className="flex gap-5">
      <button>Estas seguro de eliminar este registro?</button>
      <button onClick={deletehandler} className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50">Si</button>
      <button onClick={cancelhandler} className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-500 hover:border-green-500 hover:text-gray-50">No</button>


    </div>
  )
}

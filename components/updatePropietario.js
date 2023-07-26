import {useReducer} from "react"
import Success from "./success"
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUser, updateUser, getUsers } from "../lib/helper";


export default function UpdatePropietario({formId, formData, setFormData}){

    const queryClient = useQueryClient()
    const {isLoading, isError, data, error}= useQuery(['users', formId],()=> getUser(formId))
    const UpdateMutation = useMutation((newData)=>updateUser(formId,newData),{
        onSuccess:async(data)=>{
            //queryClient.setQueryData('users',(old)=>[data])
            queryClient.prefetchQuery('users',getUsers)
            // queryClient.prefetchQuery('users',updateUser)
        }
    })
    
    if(isLoading)return<div>Loading...</div>
    if(isError)return<div>Error</div>
    
    const {nombre, cedula, email, telefono, marca, placa, fecha, tipo} = data;


    const handleSubmit = async(e) => {
        e.preventDefault();
        let updated = Object.assign({},data,formData)
        console.log(updated)
        await UpdateMutation.mutate(updated)
    } 


    return(
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div>
                <input type="text" onChange={setFormData} defaultValue={nombre} name="nombre" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="Nombre"/>
            </div>
            <div>
                <input type="number"  onChange={setFormData} defaultValue={cedula}  name="cedula" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="Cedula"/>
            </div>
            <div>
                <input type="text"  onChange={setFormData} defaultValue={email}  name="email" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="Email"/>
            </div>
            <div>
                <input type="number"  onChange={setFormData} defaultValue={telefono}  name="telefono" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="telefono"/>
            </div>
            <div>
                <input type="text"  onChange={setFormData} defaultValue={marca}  name="marca" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="Marca del Vehiculo"/>
            </div>
            <div>
                <input type="text"  onChange={setFormData} defaultValue={placa}  name="placa" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="Placa del Vehiculo"/>
            </div>
            <div>
                <input type="date"  onChange={setFormData} defaultValue={fecha}  name="fecha" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="Fecha"/>
            </div>
            <div className="flex gap-10 items-center">
            <div className="form-check">
                <input type="radio" onChange={setFormData} defaultChecked={tipo=="Preventivo"} value="Preventivo" id="radioDefauld1" name="tipo" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"/>
                <label htmlFor="radioDefauld1" className="inline-block text-gray-800">
                    Preventivo
                </label>
            </div>
            <div className="form-check">
                <input type="radio" onChange={setFormData} defaultChecked={tipo!=="Preventivo"}  value="Correctivo" id="radioDefauld2" name="tipo" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"/>
                <label htmlFor="radioDefauld2" required className="inline-block text-gray-800">
                    Correctivo
                </label>
            </div>
        </div>

            <button className="flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:border-yellow-400 hover:text-yellow-400">Actualizar</button>
        </form>
    )
}
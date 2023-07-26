import {useReducer} from "react"
import Success from "./success"
import { useQueryClient, useMutation } from "react-query"
import { addUser,getUsers } from "../lib/helper"


export default function AddPropietario({formData, setFormData}){
    
    const queryClient = useQueryClient()
    const addMutation = useMutation(addUser, {
        onSuccess:() => {
            queryClient.prefetchQuery('users',getUsers)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.keys(formData).length==0)return console.log("Dont have form Data");
        let {nombre, cedula, email, telefono, marca, placa, fecha, tipo} = formData;
        const model = {
            nombre, cedula, email, telefono, marca, placa, fecha, tipo
        }
        

        addMutation.mutate(model)
    } 

    if(addMutation.isLoading)return<div>Loading!</div>
    if(addMutation.isSuccess)return <Success message={"Registro Agregado"}></Success>

    return(
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
            <div>
                <input type="text" onChange={setFormData} name="nombre" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="Nombre"/>
            </div>
            <div>
                <input type="number"  onChange={setFormData}  name="cedula" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="Cedula"/>
            </div>
            <div>
                <input type="text"  onChange={setFormData}  name="email" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="Email"/>
            </div>
            <div>
                <input type="number"  onChange={setFormData}  name="telefono" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="telefono"/>
            </div>
            <div>
            <input type="text" onChange={setFormData} name="marca" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="Marca del Vehiculo"/>
        </div>
        <div>
            <input type="text" onChange={setFormData} name="placa" required className="border w-full px-5 py-3 focus:outile-none rounded-md" placeholder="Placa del vehiculo"/>
        </div>
        <div>
            <input type="date" onChange={setFormData} name="fecha" required className="border px-4 py-4 focus:outline-none rounded-md" placeholder="Fecha"/>
        </div>
        <div className="flex gap-10 items-center">
            <div className="form-check">
                <input type="radio" onChange={setFormData} value="Preventivo" id="radioDefauld1" name="tipo" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"/>
                <label htmlFor="radioDefauld1" className="inline-block text-gray-800">
                    Preventivo
                </label>
            </div>
            <div className="form-check">
                <input type="radio" onChange={setFormData}  value="Correctivo" id="radioDefauld2" name="tipo" className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"/>
                <label htmlFor="radioDefauld2" className="inline-block text-gray-800">
                    Correctivo
                </label>
            </div>
        </div>
            <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:border-green-500 hover:text-green-500">Agregar</button>
        </form>
    )
}
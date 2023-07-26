import {BiEdit, BiTrashAlt} from "react-icons/bi";
import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {toggleChangeAction, updateAction, deleteAction} from '../redux/reducer'

export default function Table(){

    
    
    const {isLoanding, isError, data, error} = useQuery('users',getUsers)

    if(isLoanding) return <div>Employee is loading</div>
    if(isError) return <div>Got Error {error}</div>


    return(
        <div className=" overflow-x-auto">
            <table className="min-w-full-table-auto mx-auto w-full max-w-full">
                <thead>
                    <tr className="bg-gray-800 px-16">
                        <th className="px-2 py-2">
                            <span className="text-gray-200">Nombre</span>
                        </th>
                        <th className="px-2 py-2">
                            <span className="text-gray-200">Cedula</span>
                        </th>
                        <th className="px-2 py-2">
                            <span className="text-gray-200">Email</span>
                        </th>
                        <th className="px-2 py-2">
                            <span className="text-gray-200">Telefono</span>
                        </th>
                        <th className="px-2 py-2">
                            <span className="text-gray-200">Marca del Vehiculo</span>
                        </th>
                        <th className="px-2 py-2">
                            <span className="text-gray-200">Placa del Vehiculo</span>
                        </th><th className="px-2 py-2">
                            <span className="text-gray-200">Fecha del Mantenimiento</span>
                        </th>
                        <th className="px-2 py-2">
                            <span className="text-gray-200">Tipo de Mantenimiento</span>
                        </th>
                        <th className="px-2 py-2">
                            <span className="text-gray-200">Accion</span>
                        </th>
        
                    </tr>
                </thead>
                <tbody className="bg-gray-200">
                    {
                        data?.map((obj,i)=> <Tr{...obj}key={i}/>)
                    }
                </tbody>
                
            </table>

        </div>

        
    )
}

function Tr({_id, nombre, cedula, email, telefono, marca, placa, fecha, tipo}){
    
    const visible = useSelector((state)=>{state.app.client.toggleForm})
    const  dispatch = useDispatch()

    const onUpdate = ()=>{
        dispatch(toggleChangeAction(_id))
        if(visible){
            dispatch(updateAction(_id))
        }
    }

    const onDelete = () =>{
        if(!visible){
            dispatch(deleteAction(_id))
        }
    }

    return(
        <tr className="bg-gray-50 text-center">
            <td className="px-2 py-2 flex flex-row items-center">
                <span className="text-center md-2 font-semibold">{nombre || "Unknown"}</span>
            </td>
            <td className="px-2 py-2">
                <span>{cedula || "Unknown"}</span>
            </td>
            <td className="px-2 py-2">
                <span>{email || "Unknown"}</span>
            </td>
            <td className="px-2 py-2">
                <span>{telefono || "Unknown"}</span>
            </td>
            <td className="px-2 py-2">
                <span>{marca || "Unknown"}</span>
            </td>
            <td className="px-2 py-2">
                <span>{placa || "Unknown"}</span>
            </td>
            <td className="px-2 py-2">
                <span>{fecha || "Unknown"}</span>
            </td>
            <td className="px-2 py-2">
                <span>{tipo || "Unknown"}</span>
            </td>
            <td className="px-2 py-2 flex justify-around gap-5">
                <button onClick={onUpdate} className="cursor"> <BiEdit size={25}color="rgb(34,197,94)"></BiEdit> </button>
                <button onClick={onDelete} className="cursor"> <BiTrashAlt size={25}color="rgb(244,63,94)"></BiTrashAlt> </button>
            </td>
        </tr>
    )
}



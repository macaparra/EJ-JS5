import AddPropietario from "./addPropietario";
import UpdatePropietario from "./updatePropietario";
import { useSelector } from "react-redux";
import { useReducer } from "react";

const formReducer = (state, event)=>{
    return{
        ...state,
        [event.target.name]:event.target.value
    }
}

export default function Form(){
    const[formData, setFormData] = useReducer(formReducer, {})

    const formId = useSelector((state)=> state.app.client.formId)
   

    return(
        <div className="container mx-auto py-5">
            {formId ? UpdatePropietario({formId, formData, setFormData}):AddPropietario({formData, setFormData})}
        </div>
    )
}
import React from "react"
import Input from "../Input/Input"
interface GroupInputProps{
    label:string,
    placeholder?:string
    type:string,
    name:string,
    value:string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) =>void
}
export default function GroupInput({label,type, onChange, name,value, placeholder}: GroupInputProps):React.ReactElement{
    return(
        <div>
            <label>{label}</label>
            <Input placeholder={placeholder} type={type} onChange={(e)=>onChange(e)} name={name} value={value} />
        </div>
    )
}
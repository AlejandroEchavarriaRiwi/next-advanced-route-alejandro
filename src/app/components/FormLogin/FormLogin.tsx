"use client"
import GroupInput from "../ui/GroupInput/groupInput";
import Button from "../ui/Button/Button";
import IFormData from "@/interfaces/formDataInterface";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FormLogin():React.ReactElement{
    const traduction = useTranslations("LoginView")
    const initialFormData: IFormData = {
        name: "",
        email: "",
        password: ""
    };
    const [formData, setFormData] = useState<IFormData>(initialFormData);
    const handleLogin = (e:React.FormEvent):void =>{
        e.preventDefault();
        console.log("Login")
    };
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        const {name,value} = e.target;
        setFormData({...formData, [name]:value});
    }
    return(
        <form>
            <h1>{traduction("title")}</h1>
            <GroupInput label={traduction("username")} type="name" onChange={(e)=>handleChange(e)} name="name" value={formData.name} />
            <GroupInput label={traduction("email")} type="email" onChange={(e)=>handleChange(e)} name="email" value={formData.email} />
            <GroupInput label={traduction("password")} type="password" onChange={(e)=>handleChange(e)} name="password" value={formData.password} />
            <Button label={traduction("submit")} onClick={(e)=>handleLogin(e)} />
        </form>
    )
}
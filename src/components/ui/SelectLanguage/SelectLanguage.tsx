'use client'

import React from "react"
import Cookies from "js-cookie"
import styled from "styled-components"
import { useRouter } from "next/navigation"


const Div = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    `
const Button = styled.button`
    background-color: gray;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 20px;
    :hover{
        background-color: white;
        color: gray;
    }
    `

export default function SelectLanguage():React.ReactElement{
    const router = useRouter()

    const handleClick = (e:any): void => {
        Cookies.set("locale", e.target.value)
        router.refresh()
    }

    return (
        <Div>
            <Button value={"en"} onClick={(e)=>handleClick(e)}>🇺🇸</Button>
            <Button value={"es"} onClick={(e)=>handleClick(e)}>🇪🇸</Button>
        </Div>
    )
}
'use client'
import Link from "next/link";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import SelectLanguage from "../SelectLanguage/SelectLanguage";

const Nav = styled.nav`
    display: flex;
    width: 100%;
    justify-content: space-around;
    height: 100px;
    background-color: gray;
    align-items: center;

    a {
        text-decoration: none;
        color: #0c0c0c;
        font-size: 20px;
    }

    a:hover{
        color: white;
    }

    `

const DivLogo = styled.div`
    display: flex;
    width: 50%;
    justify-content: center;
    align-items: center;
    text-align: center;

    h1{
        font-size: 44px;
        font-weight: bold;
        text-align: center;
    }

    span{
        font-size: 34px;
        color: white;
        margin-left: 5px;
    }
    
    `

const DivLinks = styled.div`
    display: flex;
    justify-content: space-around;
    width: 50%;


    `

export default function NavBar():React.ReactElement{
    const traduction = useTranslations("NavBar")
    return(
        <Nav>   
            <DivLogo><h1>Riwi<span>Shop</span></h1></DivLogo>
            <DivLinks>
                <Link href="/">{traduction("home")}</Link>
                <Link href="/auth/signin">{traduction("login")}</Link>
            </DivLinks>
            <div><SelectLanguage /></div>
        </Nav>
    )
}
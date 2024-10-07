'use client'
import Link from "next/link";
import styled from "styled-components";

const Nav = styled.nav`
    display: flex;
    justify-content: space-around;
    
    `

export default function NavBar(){
    return(
        <Nav>
                <Link href="#">Inicio</Link>
                <Link href="/auth/signin">Entrar</Link>
        </Nav>
    )
}
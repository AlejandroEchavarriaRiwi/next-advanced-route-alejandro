import Link from "next/link";

export default function NavBar(){
    return(
        <nav>
                <Link href="#">Inicio</Link>
                <Link href="/login">Entrar</Link>
        </nav>
    )
}
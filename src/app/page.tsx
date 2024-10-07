'use client'
import NavBar from "../components/ui/NavBar/NavBar";
import { useTranslations } from "next-intl";
import styled from "styled-components";
const DivHero = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

export default function Home() {
  const traduction = useTranslations("Home")
  return (
    <div>
      <NavBar />
      <DivHero>      
        <h1>{traduction("title")}</h1>
        <h3>{traduction("description")}</h3>
      </DivHero>
    </div>
  )
}
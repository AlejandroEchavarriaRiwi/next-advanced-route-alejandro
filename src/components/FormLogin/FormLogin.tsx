'use client';

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import NavBar from "../ui/NavBar/NavBar";
import styled from "styled-components";
import Link from "next/link";

const Div = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;

    h2{
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 30px;
    }

    h4{
        margin-top: 30px;
    }

    a{  
        text-decoration: none;
        color: #333333;
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;

    button{
        width: 200px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: gray;
        color: white;
        font-size: 15px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        cursor: pointer;
        
        :hover{
            background-color: white;
            color: gray;
        }
    }
`
const DivInput = styled.div`
    margin-bottom: 20px;
    display: flex;
    text-align: center;
    flex-direction: column;

    input{
        width: 200px;
        padding: 10px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
`

export default function LoginForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                username: formData.username,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <NavBar />
        <Div>
        <h2>Sign in to your account</h2>
        <Form onSubmit={handleSubmit}>
            <DivInput>
                <label htmlFor="username">Username </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    disabled={isLoading} />
            </DivInput>
            <DivInput>
                <label htmlFor="password">Password </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading} />
            </DivInput>
            {error && <p>{error}</p>}
            <button
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
        </Form>

        <h4><Link href="/register">No tienes una cuenta? Registrate Aqui</Link></h4>
        </Div>
        </>
    );
}
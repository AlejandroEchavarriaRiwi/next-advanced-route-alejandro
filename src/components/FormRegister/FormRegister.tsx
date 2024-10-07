'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../ui/NavBar/NavBar';
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
        width: 300px;
        padding: 10px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
`
const SignupForm = () => {
    const [formData, setFormData] = useState({
      email: '',
      username: '',
      password: '',
      name: '',
      phone: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
  
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Signup failed');
        }
  
        console.log('Signup successful:', data);
        router.push('/auth/signin');
      } catch (error) {
        console.error('Signup error:', error);
      }
    };
  
    return (
    
    <>
    <NavBar />
    <Div>
        <h2 >Sign Up</h2>
          <Form onSubmit={handleSubmit}>
              
              {error && <p>{error}</p>}
              <DivInput>
                  <label htmlFor="email">Email </label>
                  <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required />
              </DivInput>
              <DivInput>
                  <label htmlFor="username">Username </label>
                  <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required />
              </DivInput>
              <DivInput>
                  <label htmlFor="password">Password </label>
                  <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required />
              </DivInput>
              <DivInput>
                  <label htmlFor="name">Full Name </label>
                  <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required />
              </DivInput>
              <DivInput>
                  <label htmlFor="phone">Phone </label>
                  <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required />
              </DivInput>
                  <button type="submit">Sign Up</button>
          </Form>
      </Div>
      </>
  );
};

export default SignupForm;
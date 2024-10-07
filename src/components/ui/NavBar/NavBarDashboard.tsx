'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import SelectLanguage from '../SelectLanguage/SelectLanguage';

const Nav = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-around;
  height: 100px;
  background-color: gray;
  align-items: center;
`;

const DivLogo = styled.div`
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    font-size: 44px;
    font-weight: bold;
    text-align: center;
    color: #0c0c0c;
  }

  span {
    font-size: 34px;
    color: white;
    margin-left: 5px;
  }
`;

const DivLinks = styled.div`
  display: flex;
  justify-content: space-around;
  width: 40%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #0c0c0c;
  font-size: 20px;

  &:hover {
    color: white;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 16px;
`;

const LogoutButton = styled.button`
  background-color: #ff4136;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 16px;

  &:hover {
    background-color: #dc352d;
  }
`;

const DivSelect = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
`
const NavbarDashboard = () => {
  const { data: session } = useSession();
  const t = useTranslations('NavBarDashboard');

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/auth/signin' });
  };

  return (
    <Nav>
      <DivLogo>
        <h1>Riwi<span>Shop</span></h1>
      </DivLogo>
      <DivLinks>
        <StyledLink href="/dashboard">{t('dashboard')}</StyledLink>
        {session?.user && (
          <UserInfo>
            {t('welcome')}, {session.user.name || session.user.email}
            <LogoutButton onClick={handleLogout}>
              {t('logout')}
            </LogoutButton>
          </UserInfo>
        )}
      </DivLinks>
      <DivSelect>
        <SelectLanguage />
      </DivSelect>
    </Nav>
  );
};

export default NavbarDashboard;
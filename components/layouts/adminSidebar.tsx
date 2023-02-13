import { Dashboard } from '@styled-icons/boxicons-solid';
import { NoteAdd } from '@styled-icons/fluentui-system-regular';
import { StyledIconBase } from '@styled-icons/styled-icon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

import Logo from '../Logo';

const SideNav = styled.nav`
    width: 15rem;
    height: 100vh;

    padding: 2.5rem 2rem 2rem 0;
    ul {
        list-style: none;
        height: calc(100% - 2rem);
        border-right: 1px solid #ccc;
        li {
            font-size: 0.9rem;
            margin: 2rem 0;

            &:first-of-type {
                padding-top: 2rem;
            }
        }
    }
`;

const LogoWrapper = styled.div`
    width: 100%;
    /* height: 2rem; */
`;

const StyledLink = styled(Link)<{ pathname?: string }>`
    display: block;
    position: relative;
    color: ${(props) => (props.href === props.pathname ? props.theme.colors.green : props.theme.colors.black)};
    text-decoration: none;
    ${StyledIconBase} {
        width: 1.2rem;
        vertical-align: middle;
        margin-right: 0.5rem;
    }
    &:hover {
        color: ${(props) => props.theme.colors.green};
    }
    &::after {
        position: absolute;
        right: 0;
        top: 0;
        content: '';
        width: 0.5rem;
        height: 100%;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        background-color: ${(props) => props.theme.colors.green};
        display: ${(props) => (props.href === props.pathname ? 'inline' : 'none')};
    }
`;

const AdminSidebar = () => {
    const { pathname } = useRouter();
    const [pathName, setPathName] = useState<string>(pathname);
    const newPathName = () => {
        setPathName(pathname);
    };

    return (
        <SideNav>
            <LogoWrapper>
                <Logo height={35} />
            </LogoWrapper>
            <ul>
                <li>
                    <StyledLink href="/admin/dashboard" onClick={newPathName} pathname={pathName}>
                        <Dashboard title="dashboard" />
                        <span>Dashboard</span>
                    </StyledLink>
                </li>
                <li>
                    <StyledLink href="/admin/create-election" onClick={newPathName} pathname={pathName}>
                        <NoteAdd title="Create election" />
                        <span>Create Election</span>
                    </StyledLink>
                </li>
            </ul>
        </SideNav>
    );
};

export default AdminSidebar;

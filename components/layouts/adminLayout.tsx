import { NextPage } from 'next';
import React from 'react';

// import AdminSignatureModal from '../AdminSignatureModal';
import Container from '../styled/Container';
import Flex from '../styled/Flex';
import AdminSidebar from './adminSidebar';

interface IAdminLayout {
    children: React.ReactNode;
}

const AdminLayout: NextPage<IAdminLayout> = ({ children }) => {
    return (
        <Container>
            <Flex>
                <AdminSidebar />
                {children}
            </Flex>
            {/* <AdminSignatureModal /> */}
        </Container>
    );
};

export default AdminLayout;

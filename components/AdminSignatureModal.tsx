import { Dialog } from '@headlessui/react';
import { Sora } from '@next/font/google';
import { useState } from 'react';
import styled from 'styled-components';

const StyledDialog = styled.div`
    position: relative;
    z-index: 10;
`;

const PanelWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
`;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.7;
`;

const StyledDialogPanel = styled.div`
    /* w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all */
    width: 100%;
    max-width: 400px;
    overflow: hidden;
    border-radius: 1rem;
    background-color: #fff;
    padding: 1.2rem;
    text-align: left;
    box-shadow: 1px 2px 3px 4px #eeeeee;
`;

const SignInButton = styled.button`
    display: block;
    width: 100%;
    margin-top: 2rem;
    font-weight: 700;
    background-color: ${(props) => props.theme.colors.green};
    color: #fff;
    padding: 0.8rem;
    border-radius: 0.8rem;
`;

const sora = Sora({ subsets: ['latin'] });

const AdminSignatureModal = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <Dialog as={StyledDialog} open={isOpen} onClose={() => setIsOpen(false)}>
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <Backdrop aria-hidden="true" />
            <div className={sora.className}>
                <PanelWrapper>
                    <Dialog.Panel as={StyledDialogPanel}>
                        <Dialog.Title>Sign in as admin</Dialog.Title>
                        <Dialog.Description>
                            in order to have access to this page as an admin, you are required to sign a message from
                            your wallet
                        </Dialog.Description>

                        <SignInButton onClick={() => setIsOpen(false)}>sign</SignInButton>
                    </Dialog.Panel>
                </PanelWrapper>
            </div>
        </Dialog>
    );
};

export default AdminSignatureModal;

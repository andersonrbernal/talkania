import { Modal } from '@mantine/core';
import PostShare from '../PostShare';

interface Props {
    modalOpened: boolean,
    setModalOpened: React.Dispatch<React.SetStateAction<boolean>>
}

function ShareModal({ modalOpened, setModalOpened }: Props) {
    return (
        <>
            <Modal size="lg" opened={modalOpened} onClose={() => setModalOpened(false)}>
                <PostShare />
            </Modal>
        </>
    );
}

export default ShareModal
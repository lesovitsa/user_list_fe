import { Alert, Divider, Modal, Input } from 'antd';
import { useState } from 'react';

const Alerter = ({ show }) => {
    if (show) {
        return (
            <div>
                <Alert message='Failed to edit user' type='error' />
                <Divider />
            </div>
        );
    }
}

const UserEditModal = ({ shown, setShown, user }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(true);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);

    const handleOk = () => {
        fetch('http://localhost:3000/users/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone
            }),
        })
        .then((res) => {
            setSuccess(res.ok);
        })

        
        if(!success) {
            setTimeout(() => setShowAlert(false), 30000);
            setShowAlert(true);
        }
        else {
            setShown(false);
        }
    }

    const handleCancel = () => {
        setShown(false);
    }

    return (
        <Modal title='Edit user' open={shown} onOk={handleOk} onCancel={handleCancel}>
            <Alerter show={showAlert} />
            <Input defaultValue={name} onChange={(e) => setName(e.target.value)} />
            <Input defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
            <Input defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
        </Modal>
    );
};

export default UserEditModal;
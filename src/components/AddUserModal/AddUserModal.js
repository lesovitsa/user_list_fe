import { Alert, Divider, Modal, Input, Form } from 'antd';
import { useState, useEffect } from 'react';

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

const validateName = (name) => {
    const pattern = /^[a-zA-Z]+((\s|\-)[a-zA-Z]+)*$/;
    return pattern.test(name);
}

const validateEmail = (email) => {
    const pattern = /^[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+$/;
    return pattern.test(email);
}

const validatePhone = (phone) => {
    const pattern = /^((\+\d{10,12})|(\d{10}))$/;
    return pattern.test(phone);
}

const UserEditModal = ({ shown, setShown }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleOk = () => {
        if(!(validateName(name) && validateEmail(email) && validatePhone(phone))) {
            setTimeout(() => setShowAlert(false), 30000);
            setShowAlert(true);
            return;
        }

        fetch('http://localhost:3000/users/add', {
            method: 'POST',
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
            window.location.reload();
        }
    }

    const handleCancel = () => {
        setShown(false);
    }

    return (
        <Modal title='Add user' open={shown} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
            <Alerter show={showAlert} />
            <Form>
                <Form.Item label='Name'>
                    <Input status={validateName(name) ? '' : 'error'} defaultValue={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item label='Email'>
                    <Input status={validateEmail(email) ? '' : 'error'} defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item label='Phone number'>
                    <Input status={validatePhone(phone) ? '' : 'error'} defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserEditModal;
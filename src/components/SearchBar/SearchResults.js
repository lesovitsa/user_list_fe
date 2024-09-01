import { Table, Button, Space, Typography, Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Column } = Table;
const { Title } = Typography;

const SearchResults = ({ show, setShow, result, search }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState({});

    if (!show)
        return;

    const data = result.map((user) => {
        return {
            key: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
    }});


    const handleEditPress = (user) => {
        setUserToEdit(user);
        console.log(userToEdit)
        setShowEditModal(true);
    }

    const handleDelete = (user) => {
        fetch('http://localhost:3000/users/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: user.id,
            }),
        })
        
        window.location.reload();
    }

    return (
        <Space direction='vertical' size='middle'>
            <Title level={2}>Search results for {search}</Title>
            <Table dataSource={data} pagination={false}>
                <Column title='Name' dataIndex='name' />
                <Column title='Email' dataIndex='email' />
                <Column title='Phone' dataIndex='phone' />
                <Column title='Action' dataIndex='action'
                    render={(_, record) => (
                        <Space align='center' size='middle'>
                            <Button onClick={() => handleEditPress(record.user)} icon={<EditOutlined />}>
                                Edit
                            </Button>
                            <Button type='primary' onClick={() => handleDelete(record.user)} icon={<DeleteOutlined />} danger>
                                Delete
                            </Button>
                        </Space>
                    )} />
            </Table>
            <Space size='large'>
                <Button type='primary' onClick={() => setShow(false)} danger>Cancel</Button>
            </Space>
            <Divider />
        </Space>
    );
};

export default SearchResults;
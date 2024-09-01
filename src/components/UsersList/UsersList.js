import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import UserEditModal from '../UserEditModal/UserEditModal';

const UsersList = ({ users }) => {
    const [showModal, setShowModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(false);

    const handleEditPress = (user) => {
        setUserToEdit(user);
        setShowModal(true);
    }

    const handleDelete = (user) => {}

    const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },{
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },{
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
        },{
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space align='center' size='middle'>
                    <Button onClick={handleEditPress(record)} icon={<EditOutlined />}>Edit</Button>
                    <Button type='primary' onClick={handleDelete(record)} icon={<DeleteOutlined />} danger>Delete</Button>
                </Space>
            )
        },
    ]

    return (
        <div>
            <UserEditModal shown={showModal} setShown={setShowModal} user={userToEdit} />
            <Table columns={columns} dataSource={users} />
        </div>
    );
}

export default UsersList;
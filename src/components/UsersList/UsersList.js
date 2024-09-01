import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import UserEditModal from '../UserEditModal/UserEditModal';
import AddUserModal from '../AddUserModal/AddUserModal';

const { Column } = Table;

const LoadMore = ({ visible, users, setUsers, currPage, setCurrPage }) => {
    const [newUsers, setNewUsers] = useState([]);

    if(!visible)
        return;

    const onClick = () => {
        fetch('http://localhost:3000/users/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page: currPage + 1
            }),
        })
        .then((data) => {
          setCurrPage(data.page);
          setNewUsers(data.users);
        });

        const newSet = users.concat(newUsers);
        setUsers(newSet);
        window.location.reload();
    };
    
    return (<Button onClick={onClick} type='link'>Load more...</Button>)
}

const UsersList = ({ users, setUsers, currPage, setCurrPage }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState({});
    const [loadMore, setLoadMore] = useState(true);
    useEffect(() => setLoadMore(users.length % 10 == 0));

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

    const data = users.map((user) => {
        return {
            key: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            user: user,
        }})

    return (
        <Space direction='vertical' size='middle'>
            <UserEditModal shown={showEditModal} setShown={setShowEditModal} user={userToEdit} />
            <AddUserModal shown={showAddModal} setShown={setShowAddModal} />
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
                <Button type='primary' onClick={() => setShowAddModal(true)}>Add New User</Button>
                <LoadMore visible={loadMore} users={users} setUsers={setUsers} currPage={currPage} setCurrPage={setCurrPage} />
            </Space>
        </Space>
    );
}

export default UsersList;
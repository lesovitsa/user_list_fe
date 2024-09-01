import { Table, Button, Space, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import UserEditModal from '../UserEditModal/UserEditModal';
import AddUserModal from '../AddUserModal/AddUserModal';
import SearchBar from '../SearchBar/SearchBar';

const { Column } = Table;

const UsersList = ({ users, setUsers, currPage, setCurrPage }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState({});
    const [total, setTotal] = useState();
    useEffect(() => {
        fetch('http://localhost:3000/users/count')
        .then((res) => { return res.json() })
        .then((data) => setTotal(data.page_count))});

    const onChangePage = (page, _) => {
        fetch('http://localhost:3000/users/all', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page: page,
            }),
          })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setCurrPage(data.page);
            setUsers(data.users);
          });
    };

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
            <SearchBar />
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
                <Pagination defaultCurrent={currPage} total={total} onChange={onChangePage} simple />
            </Space>
        </Space>
    );
}

export default UsersList;
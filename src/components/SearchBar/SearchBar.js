import { Input, Space } from 'antd';
import { useState } from 'react';
import SearchResults from './SearchResults';

const { Search } = Input;

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const onSearch = () => {
        fetch('http://localhost:3000/users/search', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: search,
            }),
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setShowResult(true);
            setSearchResult(data.users);
        });
    }

    return (
        <Space direction='vertical'>
            <Search placeholder='Search by name' onSearch={onSearch} onChange={(e) => setSearch(e.target.value)} />
            <SearchResults show={showResult} setShow={setShowResult} result={searchResult} search={search} />
        </Space>
    );
};

export default SearchBar;
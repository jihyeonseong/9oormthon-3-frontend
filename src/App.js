import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// API URL 설정 (ConfigMap에서 읽거나 기본값 사용)
const API_URL = process.env.REACT_APP_API_URL || 
  (window.ENV && window.ENV.REACT_APP_API_URL) || 
  'https://goormthon-3.goorm.training/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dbStatus, setDbStatus] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // DB 연결 상태 확인
  useEffect(() => {
    api.get('/health/db')
      .then(response => {
        setDbStatus({ connected: true, message: response.data.message });
      })
      .catch(err => {
        setDbStatus({ connected: false, message: err.message });
      });
  }, []);

  // 사용자 목록 조회
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/users');
      const data = response.data;
      // 응답이 배열인지 확인 후 세팅 (아니면 빈 배열)
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      setUsers([]); // 에러 시에도 map 에러 방지
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 사용자 생성
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // 브라우저에서 POST가 막혀 있어 GET으로 우회 (백엔드에서 처리)
      await api.get('/users/create', { params: newUser });
      setNewUser({ name: '', email: '' });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create user');
    }
  };

  // 사용자 삭제
  const handleDeleteUser = async (id) => {
    setError(null);
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to delete user');
    }
  };

  return (
    <div className="App">
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>User Management System</h1>
        
        {/* DB 연결 상태 */}
        <div style={{ 
          padding: '15px', 
          marginBottom: '20px',
          backgroundColor: dbStatus?.connected ? '#d4edda' : '#f8d7da',
          border: `1px solid ${dbStatus?.connected ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px'
        }}>
          <strong>Database Status:</strong> {dbStatus?.connected ? '✅ Connected' : '❌ Disconnected'}
          {dbStatus?.message && <div style={{ marginTop: '5px', fontSize: '0.9em' }}>{dbStatus.message}</div>}
        </div>

        {/* 사용자 생성 폼 */}
        <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <h2>Add New User</h2>
          <form onSubmit={handleCreateUser}>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
                style={{ width: '200px', padding: '8px', marginRight: '10px' }}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
                style={{ width: '250px', padding: '8px', marginRight: '10px' }}
              />
              <button 
                type="submit" 
                style={{ padding: '8px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Add User
              </button>
            </div>
          </form>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div style={{ 
            color: '#721c24', 
            backgroundColor: '#f8d7da',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #f5c6cb'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* 사용자 목록 */}
        <div>
          <h2>Users ({Array.isArray(users) ? users.length : 0})</h2>
          {loading ? (
            <div>Loading...</div>
          ) : !Array.isArray(users) || users.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              No users found. Add a user to get started!
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.map(user => (
                  <tr key={user.id}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.id}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.name}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        style={{ 
                          padding: '5px 15px', 
                          backgroundColor: '#dc3545', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


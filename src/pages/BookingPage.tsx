import './BookingPage.css';
import React, { useState, useEffect } from 'react';


type User = {
  id: number;
  profession: string;
  hairTypes?: string[];
  nailType?: string;
  price: number;
  location: string;
  contact: string;
};

const BookingPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState({ profession: '', hairType: '', price: 0 });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchedUsers: User[] = [
      { id: 1, profession: 'Hair Stylist', hairTypes: ['1a', '1b', '2a', '3c'], price: 50, location: 'New York, NY', contact: '555-1234' },
      { id: 2, profession: 'Nail Technician', nailType: 'Designs & Extensions', price: 40, location: 'Brooklyn, NY', contact: '555-5678' },
      { id: 3, profession: 'Hair Stylist', hairTypes: ['3b', '4c'], price: 70, location: 'Queens, NY', contact: '555-9101' },
      { id: 4, profession: 'Barber', hairTypes: ['1a', '1b', '2b'], price: 45, location: 'Manhattan, NY', contact: '555-1122' },
    ];
    setUsers(fetchedUsers);
    setFilteredUsers(fetchedUsers);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = users;
    if (filters.profession) {
      filtered = filtered.filter(user => user.profession.includes(filters.profession));
    }
    if (filters.hairType) {
      filtered = filtered.filter(user => user.hairTypes && user.hairTypes.includes(filters.hairType));
    }
    if (filters.price > 0) {
      filtered = filtered.filter(user => user.price <= filters.price);
    }
    setFilteredUsers(filtered);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className="booking-page">
      <h1>Book Your Service</h1>
      {selectedUser ? (
        <div className="user-details">
          <button onClick={handleBackClick} className="back-button">Back to List</button>
          <h2>{selectedUser.profession}</h2>
          {selectedUser.hairTypes && <p>Hair Types: {selectedUser.hairTypes.join(', ')}</p>}
          {selectedUser.nailType && <p>Nail Type: {selectedUser.nailType}</p>}
          <p>Price: ${selectedUser.price}</p>
          <p>Location: {selectedUser.location}</p>
          <p>Contact: {selectedUser.contact}</p>
        </div>
      ) : (
        <>
          <div className="filter-section">
            <select name="profession" value={filters.profession} onChange={handleFilterChange}>
              <option value="">Select Profession</option>
              <option value="Hair Stylist">Hair Stylist</option>
              <option value="Nail Technician">Nail Technician</option>
              <option value="Barber">Barber</option>
            </select>
            <select name="hairType" value={filters.hairType} onChange={handleFilterChange}>
              <option value="">Select Hair Type</option>
              <option value="1a">1a</option>
              <option value="1b">1b</option>
              <option value="1c">1c</option>
              <option value="2a">2a</option>
              <option value="2b">2b</option>
              <option value="2c">2c</option>
              <option value="3a">3a</option>
              <option value="3b">3b</option>
              <option value="3c">3c</option>
              <option value="4a">4a</option>
              <option value="4b">4b</option>
              <option value="4c">4c</option>
            </select>
            <input
              type="number"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              placeholder="Max Price"
            />
            <button onClick={applyFilters}>Apply Filters</button>
          </div>
          <div className="users-container">
            {filteredUsers.map(user => (
              <div key={user.id} className="user-card" onClick={() => handleUserClick(user)}>
                <h3>{user.profession}</h3>
                {user.hairTypes && <p>Hair Types: {user.hairTypes.join(', ')}</p>}
                {user.nailType && <p>Nail Type: {user.nailType}</p>}
                <p>Price: ${user.price}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BookingPage;
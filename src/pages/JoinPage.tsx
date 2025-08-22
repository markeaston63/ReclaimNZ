import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_HOST } from '../config/apiConfig';
import SocialShare from '../components/SocialShare'; 

const JoinPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    email: '',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stats state
  const [stats, setStats] = useState({ total_subscribers: 0, last_created_at: null });


  // Fetch stats on mount and after successful join
  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_HOST}/php_api/api/subscribers.php`);
      setStats(response.data);
    } catch (error) {
      setStats({ total_subscribers: 0, last_created_at: null });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${API_HOST}/php_api/api/join.php`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage(response.data.message || 'Successfully joined the mailing list!');
      setFormData({ firstName: '', lastName: '', city: '', email: '' });
      await fetchStats(); // Refresh stats after join
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Error joining. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Join the Protest
      </h2>
      <div className="paragraph-text">
        <p>
          Please encourage your like minded friends/contacts/associates to join Reclaim NZ.
        </p>
        <br></br>
        <div className="bg-blue-100 border border-blue-300 text-blue-900 p-4 mb-6 rounded-md flex justify-center items-center text-center">
          <div>
            <span className="font-semibold">Number of people who have joined the protest:</span>{' '}
            {stats.total_subscribers}
          </div>
        </div>
      </div>
      <SocialShare />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Join Now'}
          </button>
        </div>
        {message && (
          <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-blue-500'}`}>
            {message}
          </p>
        )}
      </form>
      <br></br>
      <div className="relative my-6 rounded-lg border-4 border-blue-300 shadow-xl overflow-hidden">
        <img
          src="/assets/bees-swarm.jpg"
          alt="Bee protest"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40 flex flex-col justify-center items-center px-4">
          <p className="text-white text-1xl md:text-2xl font-serif font-bold text-center drop-shadow mb-4">
            A single bee is ignored but when millions come together, even the bravest run in fear.
          </p>
          <p className="text-white text-1xl md:text-2xl font-serif font-bold text-center drop-shadow">
            The one thing the government fears is the day we stand together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
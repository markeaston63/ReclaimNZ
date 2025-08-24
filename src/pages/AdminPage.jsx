import React from 'react';
import SubscribersTable from '../components/SubscribersTable';

const AdminPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl font-bold text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Admin Panel
      </h2>

      <div className="paragraph-text"> 
        <p className="text-gray-700 leading-relaxed mb-6">
          Welcome to the Admin Panel. This area is restricted to logged-in admin users only.
        </p>

        <h3 className="text-xl font-semibold text-blue-800 mt-8 mb-4">Subscriber Management</h3>
        <SubscribersTable />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> This area is protected and only accessible to authenticated admin users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

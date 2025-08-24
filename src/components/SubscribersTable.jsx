import React, { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { API_HOST } from '../config/apiConfig';

const columnHelper = createColumnHelper();


const createColumns = () => [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue(),
    size: 50
  }),
  columnHelper.accessor('first_name', {
    header: 'First Name',
    cell: info => info.getValue() || '-',
    size: 50
  }),
  columnHelper.accessor('last_name', {
    header: 'Last Name',
    cell: info => info.getValue() || '-',
    size: 50
  }),
  columnHelper.accessor('city', {
    header: 'City',
    cell: info => info.getValue() || '-',
    size: 50
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
    size: 50
  }),
  columnHelper.accessor('created_at', {
    header: 'Joined',
    cell: info => {
      const value = info.getValue();
      if (!value) return '-';
      try {
        const date = new Date(value);
        return date.toLocaleDateString('en-NZ', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      } catch (error) {
        return '-';
      }
    },
    size: 50
  })
];

const SubscribersTable = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');


  // CSV Export function
  const exportToCSV = () => {
    if (subscribers.length === 0) return;

    const headers = ['ID', 'First Name', 'Last Name', 'City', 'Email', 'Joined'];
    const csvContent = [
      headers.join(','),
      ...subscribers.map(sub => [
        sub.id,
        `"${(sub.first_name || '').replace(/"/g, '""')}"`,
        `"${(sub.last_name || '').replace(/"/g, '""')}"`,
        `"${(sub.city || '').replace(/"/g, '""')}"`,
        `"${sub.email.replace(/"/g, '""')}"`,
        `"${new Date(sub.created_at).toLocaleDateString('en-NZ')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Create columns - memoized to prevent recreation
  const columns = useMemo(() => createColumns(), []);

  // Fetch subscribers data
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_HOST}/php_api/api/subscribers_list.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch subscribers');
        }
        const data = await response.json();
        setSubscribers(data.subscribers || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching subscribers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  // Create table instance
  const table = useReactTable({
    data: subscribers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading subscribers...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading subscribers: {error}</p>
      </div>
    );
  }


  return (
    <div className="space-y-4">
      {/* Header with stats and search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Subscribers</h3>
          <p className="text-sm text-gray-600">
            Total: {subscribers.length} subscribers
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search subscribers..."
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={exportToCSV}
            disabled={subscribers.length === 0}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Export CSV
          </button>
        </div>
      </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="divide-y divide-gray-200" style={{ minWidth: '1000px', width: '1000px' }}>
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                                     {headerGroup.headers.map(header => (
                                           <th
                        key={header.id}
                        className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center space-x-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span className="text-gray-400">
                              {header.column.getIsSorted() === 'asc' ? '↑' : 
                               header.column.getIsSorted() === 'desc' ? '↓' : '↕'}
                            </span>
                          )}
                        </div>
                      </th>
                   ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                                     {row.getVisibleCells().map(cell => (
                                           <td 
                        key={cell.id} 
                        className="py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                   ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <span>Page</span>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </strong>
              <span>|</span>
              <span>
                Showing {table.getRowModel().rows.length} of{' '}
                {table.getFilteredRowModel().rows.length} results
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribersTable;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/analytics/field-statistics');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!stats) return <div>No data available</div>;

  const cropData = Object.entries(stats.cropDistribution).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Fields</h3>
          <p className="text-3xl font-bold">{stats.totalFields}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Total Area</h3>
          <p className="text-3xl font-bold">{stats.totalArea.toFixed(2)} acres</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Crop Types</h3>
          <p className="text-3xl font-bold">{Object.keys(stats.cropDistribution).length}</p>
        </div>
      </div>

      {/* Crop Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Crop Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cropData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cropData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link
              to="/fields"
              className="block p-4 bg-green-50 rounded-lg hover:bg-green-100"
            >
              <h3 className="font-semibold">Manage Fields</h3>
              <p className="text-sm text-gray-600">Add or update your fields</p>
            </Link>
            <Link
              to="/subscription"
              className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              <h3 className="font-semibold">Subscription Plans</h3>
              <p className="text-sm text-gray-600">View and manage your subscription</p>
            </Link>
            <Link
              to="/payments"
              className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100"
            >
              <h3 className="font-semibold">Payment History</h3>
              <p className="text-sm text-gray-600">View your payment history</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
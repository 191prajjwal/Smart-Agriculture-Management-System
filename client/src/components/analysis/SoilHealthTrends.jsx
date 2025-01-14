import React, { useState, useEffect } from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  Tooltip,
  Legend
} from 'recharts';
import api from '../../utils/api';

const SoilHealthTrends = ({ fieldId }) => {
  const [trendsData, setTrendsData] = useState([]);
  const [timespan, setTimespan] = useState('6months');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fieldId) {
      console.error('No fieldId provided to SoilHealthTrends component');
      return;
    }
    fetchTrendsData();
  }, [fieldId, timespan]);

  const fetchTrendsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/api/analytics/soil-health/${fieldId}?timespan=${timespan}`);
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid data format received from API');
      }

     
      const processedData = response.data.map(item => ({
        ...item,
        ph: parseFloat(item.ph) || 0,
        moisture: parseFloat(item.moisture) || 0,
        nitrogen: parseFloat(item.nitrogen) || 0,
        phosphorus: parseFloat(item.phosphorus) || 0,
        potassium: parseFloat(item.potassium) || 0,
        date: new Date(item.date).toLocaleDateString()
      }));
      
      setTrendsData(processedData);
    } catch (error) {
      console.error('Error fetching trends data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-center">Loading trends data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Error Loading Trends</h2>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchTrendsData}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!trendsData || trendsData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Soil Health Trends</h2>
        <p className="text-gray-500">No trend data available for the selected time period</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Soil Health Trends</h2>
        <select 
          className="border rounded p-2"
          value={timespan}
          onChange={(e) => setTimespan(e.target.value)}
        >
          <option value="1month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>
      
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendsData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{
                fontSize: 12,
                dy: 20
              }}
            />
            <YAxis
              tick={{
                fontSize: 12
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px'
              }}
              formatter={(value) => value.toFixed(2)}
            />
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="center"
              wrapperStyle={{
                paddingBottom: '20px'
              }}
            />
            <Line
              type="monotone"
              dataKey="ph"
              stroke="#8884d8"
              name="pH"
              strokeWidth={2}
              connectNulls={true}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="moisture"
              stroke="#82ca9d"
              name="Moisture %"
              strokeWidth={2}
              connectNulls={true}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="nitrogen"
              stroke="#ffc658"
              name="Nitrogen"
              strokeWidth={2}
              connectNulls={true}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="phosphorus"
              stroke="#ff7300"
              name="Phosphorus"
              strokeWidth={2}
              connectNulls={true}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="potassium"
              stroke="#0088fe"
              name="Potassium"
              strokeWidth={2}
              connectNulls={true}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SoilHealthTrends;
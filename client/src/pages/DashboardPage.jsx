import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card  from '../components/shared/Card';
import { Activity, Leaf, Droplet, Sun } from 'lucide-react';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { fields } = useSelector(state => state.fields);
  const { currentAnalysis } = useSelector(state => state.analysis);

  const stats = [
    {
      name: 'Total Fields',
      value: fields?.length || 0,
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Average Soil Health',
      value: '85%',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Moisture Level',
      value: '72%',
      icon: Droplet,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
    },
    {
      name: 'Growth Index',
      value: '93%',
      icon: Sun,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <span className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 mt-4 mr-4">
              <stat.icon
                className={`h-8 w-8 ${stat.color} ${stat.bgColor} rounded-full p-1.5`}
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{stat.name}</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-700">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Add more dashboard sections here */}
    </div>
  );
};

export default DashboardPage;
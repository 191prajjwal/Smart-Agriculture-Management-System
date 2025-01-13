import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFields, setLoading } from '../../features/fieldSlice';
import api from '../../services/api';
import { Map, Calendar, Ruler, Grain } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';

const FieldList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fields, loading } = useSelector(state => state.fields);

  useEffect(() => {
    const fetchFields = async () => {
      dispatch(setLoading());
      try {
        const { data } = await api.get('/fields');
        dispatch(setFields(data));
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };

    fetchFields();
  }, [dispatch]);

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      fallow: 'bg-yellow-100 text-yellow-800',
      preparation: 'bg-blue-100 text-blue-800',
      harvested: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.active;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Fields</h1>
        <Button onClick={() => navigate('/fields/new')}>
          Add New Field
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading fields...</div>
      ) : fields.length === 0 ? (
        <Card className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900">No fields added yet</h3>
          <p className="mt-2 text-gray-600">Add your first field to start monitoring</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field) => (
            <Card 
              key={field._id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/fields/${field._id}`)}
            >
              <div className="relative">
                <div className="absolute top-0 right-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(field.status)}`}>
                    {field.status}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-gray-900">{field.name}</h3>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Map className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {field.location.latitude.toFixed(6)}, {field.location.longitude.toFixed(6)}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Ruler className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {field.area.value} {field.area.unit}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Grain className="h-4 w-4 mr-2" />
                    <span className="text-sm">{field.cropType}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      Planted: {new Date(field.plantingDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FieldList;
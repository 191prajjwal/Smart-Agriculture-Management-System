import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addField, updateField } from '../../features/fieldSlice';
import api from '../../services/api';
import Card from '../shared/Card';
import Button from '../shared/Button';

const FieldForm = ({ field = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: field?.name || '',
    location: {
      latitude: field?.location?.latitude || '',
      longitude: field?.location?.longitude || ''
    },
    area: {
      value: field?.area?.value || '',
      unit: field?.area?.unit || 'acres'
    },
    cropType: field?.cropType || '',
    soilType: field?.soilType || '',
    status: field?.status || 'active',
    plantingDate: field?.plantingDate ? new Date(field.plantingDate).toISOString().split('T')[0] : '',
    expectedHarvestDate: field?.expectedHarvestDate ? new Date(field.expectedHarvestDate).toISOString().split('T')[0] : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (field) {
        const { data } = await api.put(`/fields/${field._id}`, formData);
        dispatch(updateField(data));
      } else {
        const { data } = await api.post('/fields', formData);
        dispatch(addField(data));
      }
      navigate('/fields');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {field ? 'Edit Field' : 'Add New Field'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Field Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              name="location.latitude"
              value={formData.location.latitude}
              onChange={handleChange}
              step="any"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="number"
              name="location.longitude"
              value={formData.location.longitude}
              onChange={handleChange}
              step="any"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Area Value</label>
            <input
              type="number"
              name="area.value"
              value={formData.area.value}
              onChange={handleChange}
              min="0"
              step="any"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Area Unit</label>
            <select
              name="area.unit"
              value={formData.area.unit}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="acres">Acres</option>
              <option value="hectares">Hectares</option>
              <option value="squareMeters">Square Meters</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Crop Type</label>
            <input
              type="text"
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Soil Type</label>
            <input
              type="text"
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="active">Active</option>
            <option value="fallow">Fallow</option>
            <option value="preparation">Preparation</option>
            <option value="harvested">Harvested</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Planting Date</label>
            <input
              type="date"
              name="plantingDate"
              value={formData.plantingDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Harvest Date</label>
            <input
              type="date"
              name="expectedHarvestDate"
              value={formData.expectedHarvestDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/fields')}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : field ? 'Update Field' : 'Add Field'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default FieldForm;
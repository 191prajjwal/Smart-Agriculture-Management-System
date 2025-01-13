import React, { useState, useEffect } from 'react';

const FieldForm = ({ field, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    cropType: '',
    soilType: '',
    area: {
      value: '',
      unit: 'acres'
    },
    location: {
      latitude: '',
      longitude: ''
    },
    status: 'active'
  });

  useEffect(() => {
    if (field) {
      setFormData(field);
    }
  }, [field]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {field ? 'Edit Field' : 'Add New Field'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Crop Type</label>
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
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
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Area Value</label>
                <input
                  type="number"
                  name="area.value"
                  value={formData.area.value}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit</label>
                <select
                  name="area.unit"
                  value={formData.area.unit}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                >
                  <option value="acres">Acres</option>
                  <option value="hectares">Hectares</option>
                  <option value="squareMeters">Square Meters</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                <input
                  type="number"
                  name="location.latitude"
                  value={formData.location.latitude}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                  required
                  step="any"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                <input
                  type="number"
                  name="location.longitude"
                  value={formData.location.longitude}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                  required
                  step="any"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
              >
                <option value="active">Active</option>
                <option value="fallow">Fallow</option>
                <option value="preparation">Preparation</option>
                <option value="harvested">Harvested</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {field ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldForm;
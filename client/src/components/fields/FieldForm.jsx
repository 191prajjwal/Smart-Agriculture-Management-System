import React, { useState, useEffect } from 'react';

const FieldForm = ({ field, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    cropType: '',
    soilType: '',
    area: {
      value: undefined,
      unit: 'acres'
    },
    location: {
      latitude: undefined,
      longitude: undefined
    },
    status: 'active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (field) {
      setFormData(field);
    }
  }, [field]);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Field name is required';
        if (value.length > 100) return 'Field name must be less than 100 characters';
        break;
      case 'cropType':
        if (!value.trim()) return 'Crop type is required';
        if (value.length > 50) return 'Crop type must be less than 50 characters';
        break;
      case 'soilType':
        if (!value.trim()) return 'Soil type is required';
        if (value.length > 50) return 'Soil type must be less than 50 characters';
        break;
      case 'area.value':
        if (value <= 0) return 'Area must be greater than 0';
        if (value > 10000) return 'Area must be less than 10,000';
        break;
      case 'location.latitude':
        if (value < -90 || value > 90) return 'Latitude must be between -90 and 90';
        break;
      case 'location.longitude':
        if (value < -180 || value > 180) return 'Longitude must be between -180 and 180';
        break;
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                // Convert to number for numeric fields
                [child]: ['value', 'latitude', 'longitude'].includes(child) 
                    ? Number(value)
                    : value
            }
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // Validate and set error
    const error = validateField(name, value);
    setErrors(prev => ({
        ...prev,
        [name]: error
    }));
};

  const validateForm = () => {
    const newErrors = {};
    
    // Validate all fields
    newErrors.name = validateField('name', formData.name);
    newErrors.cropType = validateField('cropType', formData.cropType);
    newErrors.soilType = validateField('soilType', formData.soilType);
    newErrors['area.value'] = validateField('area.value', formData.area.value);
    newErrors['location.latitude'] = validateField('location.latitude', formData.location.latitude);
    newErrors['location.longitude'] = validateField('location.longitude', formData.location.longitude);

    // Remove null/undefined errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <p className="text-red-500 text-sm mt-1">{errors[fieldName]}</p>
    ) : null;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
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
                className={`mt-1 px-3 block w-full rounded border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                required
              />
              {renderError('name')}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Crop Type</label>
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                className={`mt-1 px-3 block w-full rounded border ${errors.cropType ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                required
              />
              {renderError('cropType')}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Soil Type</label>
              <input
                type="text"
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className={`mt-1 block px-3 w-full rounded border ${errors.soilType ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                required
              />
              {renderError('soilType')}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Area Value</label>
                <input
                  type="number"
                  name="area.value"
                  value={formData.area.value}
                  onChange={handleChange}
                  className={`mt-1 px-3 block w-full rounded border ${errors['area.value'] ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                  required
                  min="0"
                  max="10000"
                  step="0.01"
                />
                {renderError('area.value')}
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
                  className={`mt-1 px-3 block w-full rounded border ${errors['location.latitude'] ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                  required
                  step="0.000001"
                  min="-90"
                  max="90"
                />
                {renderError('location.latitude')}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                <input
                  type="number"
                  name="location.longitude"
                  value={formData.location.longitude}
                  onChange={handleChange}
                  className={`mt-1 px-3 block w-full rounded border ${errors['location.longitude'] ? 'border-red-500' : 'border-gray-300'} shadow-sm`}
                  required
                  step="0.000001"
                  min="-180"
                  max="180"
                />
                {renderError('location.longitude')}
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
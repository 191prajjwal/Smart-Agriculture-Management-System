import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import FieldForm from './FieldForm';

const FieldManagement = () => {
  const [fields, setFields] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await api.get('/api/fields');
      setFields(response.data);
    } catch (error) {
      console.error('Error fetching fields:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this field?')) {
      try {
        await api.delete(`/api/fields/${id}`);
        setFields(fields.filter(field => field._id !== id));
      } catch (error) {
        console.error('Error deleting field:', error);
      }
    }
  };

  const handleSubmit = async (fieldData) => {
    try {
      if (selectedField) {
        await api.put(`/api/fields/${selectedField._id}`, fieldData);
      } else {
        await api.post('/api/fields', fieldData);
      }
      fetchFields();
      setIsFormOpen(false);
      setSelectedField(null);
    } catch (error) {
      console.error('Error saving field:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Field Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add New Field
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => (
          <div key={field._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{field.name}</h3>
            <p className="text-gray-600">Crop: {field.cropType}</p>
            <p className="text-gray-600">Area: {field.area.value} {field.area.unit}</p>
            <div className="mt-4 flex justify-between">
              <Link 
                to={`/analysis/${field._id}`}
                className="text-blue-500 hover:text-blue-600"
              >
                View Analysis
              </Link>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setSelectedField(field);
                    setIsFormOpen(true);
                  }}
                  className="text-green-500 hover:text-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(field._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <FieldForm
          field={selectedField}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedField(null);
          }}
        />
      )}
    </div>
  );
};

export default FieldManagement;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Legend } from 'recharts';

const AnalysisView = () => {
  const { fieldId } = useParams();
  const [field, setField] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [soilHealthTrends, setSoilHealthTrends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [fieldId]);

  const fetchData = async () => {
    try {
      const [fieldRes, analysisRes, trendsRes] = await Promise.all([
        api.get(`/api/fields/${fieldId}`),
        api.get(`/api/analysis/fields/${fieldId}/latest`),
        api.get(`/api/analytics/soil-health/${fieldId}`)
      ]);

      setField(fieldRes.data);
      setAnalysis(analysisRes.data);
      setSoilHealthTrends(trendsRes.data);
    } catch (error) {
      console.error('Error fetching analysis data:', error);
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = async () => {
    try {
      const response = await api.post(`/api/analysis/fields/${fieldId}/analyze`);
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error running analysis:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!field || !analysis) return <div>No data available</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{field.name} - Analysis</h1>
        <button
          onClick={runAnalysis}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Run New Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Soil Health Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Soil Health</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">pH Level</p>
              <p className="text-xl">{analysis.soilHealth.ph.value} ({analysis.soilHealth.ph.status})</p>
            </div>
            <div>
              <p className="text-gray-600">Nutrients</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm">Nitrogen</p>
                  <p>{analysis.soilHealth.nutrients.nitrogen}</p>
                </div>
                <div>
                  <p className="text-sm">Phosphorus</p>
                  <p>{analysis.soilHealth.nutrients.phosphorus}</p>
                </div>
                <div>
                  <p className="text-sm">Potassium</p>
                  <p>{analysis.soilHealth.nutrients.potassium}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-600">Moisture</p>
              <p>{analysis.soilHealth.moisture.percentage}% ({analysis.soilHealth.moisture.status})</p>
            </div>
          </div>
        </div>

        {/* Crop Health Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Crop Health</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">NDVI</p>
              <p className="text-xl">{analysis.cropHealth.ndvi.value} ({analysis.cropHealth.ndvi.status})</p>
            </div>
            <div>
              <p className="text-gray-600">Growth Stage</p>
              <p>{analysis.cropHealth.growth.stage} - {analysis.cropHealth.growth.status}</p>
            </div>
            <div>
              <p className="text-gray-600">Risk Assessment</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm">Pest Risk: {analysis.cropHealth.pestRisk.level}</p>
                  <p className="text-xs text-gray-500">{analysis.cropHealth.pestRisk.details}</p>
                </div>
                <div>
                  <p className="text-sm">Disease Risk: {analysis.cropHealth.diseaseRisk.level}</p>
                  <p className="text-xs text-gray-500">{analysis.cropHealth.diseaseRisk.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {soilHealthTrends && (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">Soil Health Trends</h2>
          <div className="w-full h-64">
            <LineChart
              width={800}
              height={300}
              data={soilHealthTrends}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ph" stroke="#8884d8" name="pH" />
              <Line type="monotone" dataKey="moisture" stroke="#82ca9d" name="Moisture %" />
              <Line type="monotone" dataKey="nitrogen" stroke="#ffc658" name="Nitrogen" />
            </LineChart>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <ul className="list-disc pl-5 space-y-2">
          {analysis.recommendations.map((recommendation, index) => (
            <li key={index} className="text-gray-700">{recommendation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisView;
'use client'
import React, { useEffect, useState } from 'react';

const crops = {
  0: 'Arecanut',
  1: 'Arhar/Tur',
  8: 'Castor seed',
  9: 'Coconut',
  11: 'Cotton(lint)',
  13: 'Dry chillies',
  16: 'Gram',
  21: 'Jute',
  23: 'Linseed',
  24: 'Maize',
  26: 'Mesta',
  29: 'Niger seed',
  31: 'Onion',
  32: 'Other Rabi pulses',
  37: 'Potato',
  39: 'Rapeseed &Mustard',
  40: 'Rice',
  43: 'Sesamum',
  44: 'Small millets',
  46: 'Sugarcane',
  48: 'Sweet potato',
  49: 'Tapioca',
  50: 'Tobacco',
  51: 'Turmeric',
  53: 'Wheat',
  2: 'Bajra',
  5: 'Black pepper',
  6: 'Cardamom',
  10: 'Coriander',
  14: 'Garlic',
  15: 'Ginger',
  17: 'Groundnut',
  19: 'Horse-gram',
  20: 'Jowar',
  38: 'Ragi',
  7: 'Cashewnut',
  3: 'Banana',
  45: 'Soyabean',
  4: 'Barley',
  22: 'Khesari',
  25: 'Masoor',
  27: 'Moong(Green Gram)',
  34: 'Other Kharif pulses',
  41: 'Safflower',
  42: 'Sannhamp',
  47: 'Sunflower',
  52: 'Urad',
  36: 'Peas & beans (Pulses)',
  54: 'other oilseeds',
  33: 'Other Cereals',
  12: 'Cowpea(Lobia)',
  30: 'Oilseeds total',
  18: 'Guar seed',
  35: 'Other Summer Pulses',
  28: 'Moth'
};

const seasons = {
  4: 'Whole Year',
  1: 'Kharif',
  2: 'Rabi',
  0: 'Autumn',
  3: 'Summer',
  5: 'Winter'
};

const states = {
  2: 'Assam',
  12: 'Karnataka',
  13: 'Kerala',
  17: 'Meghalaya',
  29: 'West Bengal',
  21: 'Puducherry',
  6: 'Goa',
  0: 'Andhra Pradesh',
  24: 'Tamil Nadu',
  20: 'Odisha',
  3: 'Bihar',
  7: 'Gujarat',
  14: 'Madhya Pradesh',
  15: 'Maharashtra',
  18: 'Mizoram',
  22: 'Punjab',
  27: 'Uttar Pradesh',
  8: 'Haryana',
  9: 'Himachal Pradesh',
  26: 'Tripura',
  19: 'Nagaland',
  4: 'Chhattisgarh',
  28: 'Uttarakhand',
  11: 'Jharkhand',
  5: 'Delhi',
  16: 'Manipur',
  10: 'Jammu and Kashmir',
  25: 'Telangana',
  1: 'Arunachal Pradesh',
  23: 'Sikkim'
};

const YieldEstimationForm = () => {
  const [formData, setFormData] = useState({
    crop: '',
    season: '',
    state: '',
    area: '',
    production: '',
    annual_rainfall: '',
    fertilizer: '',
    pesticide: ''
  });

  const [result, setResult] = useState('');

  useEffect(() => {
    // Initialize form data on component mount if necessary
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = 'http://localhost:5000/get_yield';
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setResult("Estimated Yield: " + JSON.stringify(data));
      } else {
        setResult("Error: " + data.error);
      }
    } catch (error) {
      setResult("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-lime-500 text-white p-4 mb-4">
        <h1 className="text-2xl font-bold">Yield Estimation</h1>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-lime-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="crop" className="block text-gray-700">Crop:</label>
          <select id="crop" name="crop" onChange={handleChange} className="input input-bordered rounded-sm w-full max-w-xs">
            {Object.entries(crops).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="season" className="block text-gray-700">Season:</label>
          <select id="season" name="season" onChange={handleChange} className="input input-bordered rounded-sm w-full max-w-xs">
            {Object.entries(seasons).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700">State:</label>
          <select id="state" name="state" onChange={handleChange} className="input input-bordered rounded-sm w-full max-w-xs">
            {Object.entries(states).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="area" className="block text-gray-700">Area (Hectares):</label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            className="input input-bordered rounded-sm w-full max-w-xs"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="production" className="block text-gray-700">Production (Metric tons):</label>
          <input
            type="text"
            id="production"
            name="production"
            value={formData.production}
            onChange={handleChange}
            required
            className="input input-bordered rounded-sm w-full max-w-xs"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="annual_rainfall" className="block text-gray-700">Annual Rainfall (Millimeter):</label>
          <input
            type="text"
            id="annual_rainfall"
            name="annual_rainfall"
            value={formData.annual_rainfall}
            onChange={handleChange}
            required
            className="input input-bordered rounded-sm w-full max-w-xs"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fertilizer" className="block text-gray-700">Fertilizer (Kilogram):</label>
          <input
            type="text"
            id="fertilizer"
            name="fertilizer"
            value={formData.fertilizer}
            onChange={handleChange}
            required
            className="input input-bordered rounded-sm w-full max-w-xs"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pesticide" className="block text-gray-700">Pesticide (Kilogram):</label>
          <input
            type="text"
            id="pesticide"
            name="pesticide"
            value={formData.pesticide}
            onChange={handleChange}
            required
            className="input input-bordered rounded-sm w-full max-w-xs"
          />
        </div>

        <button type="submit" className="btn bg-lime-600 hover:bg-lime-500 border-0 rounded-sm text-white w-full">Submit</button>
      </form>

      {result && <div id="result" className="mt-4">
        <h3 className="text-xl font-semibold">Yield (Metric ton / Hectare)</h3>
        <div className="col-span-2 mt-4 p-4 bg-lime-200 text-lime-900 text-lg rounded-md text-center">
          {result}
        </div>
      </div>}
    </div>
  );
};

export default YieldEstimationForm;

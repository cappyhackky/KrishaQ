'use client'
import React, { useState } from 'react';

const CropRecommendationForm = () => {
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        Humidity: '',
        ph: '',
        rainfall: ''
    });

    const [response, setResponse] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const API_URL = 'http://localhost:5000/get_recommendation';
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setResponse('Recommended Crop: ' + data.predicted_crop);
            } else {
                setResponse('Error: ' + data.error);
            }
        } catch (error) {
            setResponse('Error: ' + error.message);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <div className="bg-lime-500 text-white p-4 mb-4">
                <h1 className="text-2xl font-bold">Crop Recommendation</h1>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-lime-100 p-6 rounded-lg shadow-md">
                <div className="form-control">
                    <label htmlFor="N" className="label">
                        <span className="label-text">Ratio of Nitrogen (N)</span>
                    </label>
                    <input
                        type="text"
                        id="N"
                        name="N"
                        value={formData.N}
                        onChange={handleChange}
                        className="input input-bordered rounded-sm w-full"
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="P" className="label">
                        <span className="label-text">Ratio of Phosphorus (P)</span>
                    </label>
                    <input
                        type="text"
                        id="P"
                        name="P"
                        value={formData.P}
                        onChange={handleChange}
                        className="input input-bordered rounded-sm w-full"
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="K" className="label">
                        <span className="label-text">Ratio of Potassium (K)</span>
                    </label>
                    <input
                        type="text"
                        id="K"
                        name="K"
                        value={formData.K}
                        onChange={handleChange}
                        className="input input-bordered rounded-sm w-full"
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="temperature" className="label">
                        <span className="label-text">Temperature (℃)</span>
                    </label>
                    <input
                        type="text"
                        id="temperature"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleChange}
                        className="input input-bordered rounded-sm w-full"
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="Humidity" className="label">
                        <span className="label-text">Humidity (%)</span>
                    </label>
                    <input
                        type="text"
                        id="Humidity"
                        name="Humidity"
                        value={formData.Humidity}
                        onChange={handleChange}
                        className="input input-bordered rounded-sm w-full"
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="ph" className="label">
                        <span className="label-text">pH Level</span>
                    </label>
                    <input
                        type="text"
                        id="ph"
                        name="ph"
                        value={formData.ph}
                        onChange={handleChange}
                        className="input input-bordered rounded-sm w-full"
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="rainfall" className="label">
                        <span className="label-text">Rainfall (mm)</span>
                    </label>
                    <input
                        type="text"
                        id="rainfall"
                        name="rainfall"
                        value={formData.rainfall}
                        onChange={handleChange}
                        className="input input-bordered rounded-sm w-full"
                        required
                    />
                </div>
                <div className="form-control col-span-2">
                    <button type="submit" className="rounded-sm md:w-1/2 mx-auto btn bg-lime-600 hover:bg-lime-500 borde-0 text-white w-full">
                        Submit
                    </button>
                </div>
                {response && (
                    <div className="col-span-2 mt-4 p-4 bg-lime-200 text-lime-900 text-lg rounded-md text-center">
                        <pre>{response}</pre>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CropRecommendationForm;

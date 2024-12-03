import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EntryForm.css';

const EntryForm = () => {
    const [formData, setFormData] = useState({
        city: '',
        name: '',
        email: '',
        phone: '',
        referredBy: '',
        termsAccepted: false
    });

    const [passes, setPasses] = useState([{ passType: '', quantity: 1 }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const cities = [
        'Choose',
        'Hisar, Haryana',
        'Mohali, Chandigarh',
        'Jaipur, Rajasthan',
        'Dheradun, Uttrakhand',
        'Indore, Madhya Pradesh',
        'Bhopal, Madhya Pradesh',
        'Lucknow, Uttar Pradesh',
        'Hyderabad, Telangana',
        'Chennai, Tamil Nadu',
        'Bengaluru, Karnataka',
        'New Delhi, Delhi',
        'Mumbai, Maharashtra'
    ];

    const passOptions = [
        { 
            id: 'single', 
            name: 'Single Standing Pass (per person)', 
            description: '₹200 for two-day festival including Live Music performances!' 
        },
        { 
            id: 'couple', 
            name: 'Couple Standing Pass (two persons)', 
            description: '₹300 for two-day festival including Live Music performances!' 
        },
        { 
            id: 'family', 
            name: 'Family Standing Pass (Max 4 Adults | Children below 5 years Free)', 
            description: '₹400 for two-day festival including Live Music performances!' 
        },
        { 
            id: 'vipCouple', 
            name: 'VIP Couple Standing Pass (two persons)', 
            description: '₹600 for two-day festival including Live Music performances!' 
        },
        { 
            id: 'vipFamily', 
            name: 'VIP Family Standing Pass (Max 4 Adults | Children below 5 years Free)', 
            description: '₹800 for two-day festival including Live Music performances!' 
        }
    ];
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = () => {
        setFormData({ ...formData, termsAccepted: !formData.termsAccepted });
    };

    const handlePassChange = (index, field, value) => {
        const updatedPasses = passes.map((pass, idx) =>
            idx === index ? { ...pass, [field]: field === 'quantity' ? parseInt(value) : value } : pass
        );
        setPasses(updatedPasses);
    };

    const addPass = () => {
        setPasses([...passes, { passType: '', quantity: 1 }]);
    };

    const removePass = (index) => {
        setPasses(passes.filter((_, idx) => idx !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('http://192.168.1.12:5000/api/entries', {
                ...formData,
                passes
            });
            setSuccess('Form submitted successfully!');
            setFormData({
                city: '',
                name: '',
                email: '',
                phone: '',
                referredBy: '',
                termsAccepted: false
            });
            setPasses([{ passType: '', quantity: 1 }]);
        } catch (error) {
            setError('Error submitting the form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="body">
            <div className="main-container m-2">
                <div className="head">
                    <div className="overlay text-center" style={{fontFamily: 'Sour Gummy'}}>
                        <h4 style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Sour Gummy', fontSize:'32px' }}>ABResh Events</h4>
                        <h6 style={{ color: 'black', fontWeight: 'bold' }}>presents</h6>
                        <h1 style={{ color: 'black', fontSize:'30px' }}>ArtScape</h1>
                        {/* <h5 style={{ color: 'black' }}>Entry Passes</h5> */}
                    </div>
                </div>

                <div className="container form-container mt-2 mb-3 pt-3 pb-3">
                    <div className="form-header text-center">
                        <h1>Entry Passes</h1>
                        <p className="h6">Seats are filling fast, Book NOW!</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 rounded shadow mt-2">
                        <div className="mb-3">
                            <label className="form-label">City*</label>
                            <select
                                className="form-select"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            >
                                {cities.map((city, index) => (
                                    <option key={index} value={city === 'Choose' ? '' : city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Complete Name*</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email Address*</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone Number*</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="e.g., 9876543210"
                                required
                            />
                        </div>

                        {passes.map((pass, index) => (
                            <div key={index} className="mb-3">
                                <label className="form-label">Passes*</label>
                                <select
                                    className="form-select"
                                    value={pass.passType}
                                    onChange={(e) => handlePassChange(index, 'passType', e.target.value)}
                                    required
                                >
                                    <option value="">Select Pass Type</option>
                                    {passOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name} - {option.description}
                                        </option>
                                    ))}
                                </select>

                                <label className="form-label mt-2">Number of Passes*</label>
                                <div className="input-group">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        style={{color:'#FFFFFF', backgroundColor:'#FF5733'}}
                                        onClick={() => handlePassChange(index, 'quantity', Math.max(1, pass.quantity - 1))}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="none"
                                        className="form-control text-center"
                                        value={pass.quantity}
                                        onChange={(e) => handlePassChange(index, 'quantity', Math.min(10, Math.max(1, e.target.value)))}
                                        min="1"
                                        max="10"
                                        required
                                        style={{ maxWidth: '50px', appearance:'none', MozAppearance:'textfield', WebkitAppearance:'none'}}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        style={{color:'#FFFFFF', backgroundColor:'#FF5733'}}
                                        onClick={() => handlePassChange(index, 'quantity', Math.min(10, pass.quantity + 1))}
                                    >
                                        +
                                    </button>
                                </div>

                                {passes.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-sm mt-2"
                                        onClick={() => removePass(index)}
                                        style={{
                                            fontSize: '12px',
                                            padding: '5px 10px',
                                            color: '#FFFFFF',
                                            backgroundColor: '#dc3545',
                                            border: 'none',
                                            borderRadius: '4px',
                                            transition: 'background-color 0.3s ease',
                                            cursor: 'pointer',
                                        }}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#c82333')}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
                                    >
                                        Remove Pass
                                    </button>
                                )}
                            </div>
                        ))}

                        
                        <button
                            type="button"
                            className="btn btn-secondary mb-3"
                            onClick={addPass}
                            style={{ fontSize: '12px', backgroundColor: '#e64e1b' }} // Corrected style
                        >
                            Add More Passes
                        </button>


                        <div className="mb-3">
                            <label className="form-label">Discount Code (if any)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="referredBy"
                                value={formData.referredBy}
                                onChange={handleChange}
                                placeholder="Enter the referrer's Code"
                                style={{width:'43%'}}
                            />
                        </div>

                        <div className="mb-4 entry-payment-info">
                            <h5>Entry Passes Payment</h5>
                            <div className="qr-code">
                                <img src="/path/to/qr-code.png" alt="QR Code" />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Terms and Conditions*</label>
                            <div className="form-check mb-4">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={formData.termsAccepted}
                                    onChange={handleCheckboxChange}
                                    required
                                />
                                <label className="form-check-label">I agree to the Terms and Conditions</label>
                            </div>
                        </div>

                        
                        <div className='d-flex justify-content-center' style={{alignItems:'center'}}>
                            <button type="submit" className="btn btn-primary w-40" disabled={loading} style={{width:'40%'}}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>

                        {success && <p className="text-success mt-3">{success}</p>}
                        {error && <p className="text-danger mt-3">{error}</p>}

                        <div className="support mt-2 ">
                            <label className="form-label" style={{ fontSize: '14px' }}>Need Support?</label>
                            <p>
                                For further information, email us at <a href="mailto:artscape@abresh.com">artscape@abresh.com</a> or contact us via WhatsApp at (91) 9873-01-02-02.
                            </p>
                        </div>
                    </form>
                    
                </div>
                
            </div>
        </div>
    );
};

export default EntryForm;


{/* {passes.map((pass, index) => (
                            <div key={index} className="mb-3">
                                <label className="form-label">Pass Type*</label>
                                <select
                                    className="form-select"
                                    value={pass.passType}
                                    onChange={(e) => handlePassChange(index, 'passType', e.target.value)}
                                    required
                                >
                                    <option value="">Select Pass Type</option>
                                    {passOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name} - {option.description}
                                        </option>
                                    ))}
                                </select>

                                <label className="form-label mt-2">Number of Passes*</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={pass.quantity}
                                    onChange={(e) => handlePassChange(index, 'quantity', e.target.value)}
                                    min="1"
                                    max="10"
                                    required
                                />

                                {passes.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-sm mt-2"
                                        onClick={() => removePass(index)}
                                        style={{
                                            fontSize: '12px', // smaller text size
                                            padding: '5px 10px', // smaller padding
                                            color: '#FFFFFF', // white text color
                                            backgroundColor: '#dc3545', // appealing red background
                                            border: 'none',
                                            borderRadius: '4px',
                                            transition: 'background-color 0.3s ease', // smooth color transition
                                            cursor: 'pointer',
                                        }}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#c82333')} // hover effect
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
                                    >
                                        Remove Pass
                                    </button>
                                )}
                            </div>
                        ))} */}


{/* {passes.map((pass, index) => (
                            <div key={index} className="mb-3">
                                <label className="form-label">Pass Type*</label>
                                <select
                                    className="form-select"
                                    value={pass.passType}
                                    onChange={(e) => handlePassChange(index, 'passType', e.target.value)}
                                    required
                                >
                                    <option value="">Select Pass Type</option>
                                    {passOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name} - {option.description}
                                        </option>
                                    ))}
                                </select>
                                <label className="form-label mt-2">Quantity*</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={pass.quantity}
                                    onChange={(e) => handlePassChange(index, 'quantity', e.target.value)}
                                    min="1"
                                    max="10"
                                    required
                                />
                                {passes.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-danger mt-2"
                                        onClick={() => removePass(index)}
                                    >
                                        Remove Pass
                                    </button>
                                )}
                            </div>
                        ))} */}



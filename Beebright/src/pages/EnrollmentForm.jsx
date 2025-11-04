import React, { useState } from 'react';
import logo from '../assets/beebrightlogo.jpg';

const EnrollmentForm = ({ onBack, enrollmentType }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    age: '',
    grade: '',
    school: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    address: '',
    schedule: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // 🟢 added for submit state
  const [error, setError] = useState(null); // 🟢 added for error handling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🟢 Updated handleSubmit to send data to backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit enrollment');
      }

      const data = await response.json();
      console.log('✅ Enrollment submitted:', data);
      setSubmitted(true);
    } catch (err) {
      console.error('❌ Error submitting form:', err);
      setError('Failed to submit enrollment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // --- SUCCESS MESSAGE SCREEN ---
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-2xl border-4 border-green-200 text-center">
          <div className="text-7xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Enrollment Submitted!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Thank you for enrolling at BeeBright! We've received your application.
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
            <p className="text-gray-700 font-semibold mb-2">📧 What's Next?</p>
            <p className="text-gray-600 mb-4">
              Our admin team will review your enrollment within 1–2 business days.
              You'll receive an email with your login credentials once approved!
            </p>
            <div className="bg-white rounded-xl p-4 mt-4 border-2 border-blue-300">
              <p className="text-sm text-gray-600 mb-2">
                <strong>📨 Credentials will be sent to:</strong>
              </p>
              <p className="text-blue-600 font-semibold">{formData.parentEmail}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-3">
              Already have an account from a previous enrollment?
            </p>
            <button
              onClick={() => window.location.href = '/login'}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition mb-3"
            >
              🔐 Login to Dashboard
            </button>
          </div>

          <button
            onClick={onBack}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            Back to Home 🏠
          </button>
        </div>
      </div>
    );
  }

  // --- FORM SCREEN ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-amber-200 mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 font-semibold mb-4 flex items-center gap-2"
          >
            ← Back to Home
          </button>
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="BeeBright Logo" className="w-16 h-16 rounded-full border-2 border-yellow-400" />
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                {enrollmentType === 'student' ? 'Student' : 'Parent'} Enrollment
              </h1>
              <p className="text-gray-600">Join the BeeBright family!</p>
            </div>
          </div>
        </div>

        {/* 🟢 Error message display */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4 text-center font-semibold border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* --- your existing form fields --- */}
          {/* (no change needed in your form structure) */}

          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl p-8 text-center shadow-xl">
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-gray-900 px-12 py-4 rounded-2xl font-black text-xl hover:shadow-2xl transform hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Enrollment Form 🚀'}
            </button>
            <p className="text-white mt-4 text-sm">
              By submitting, you agree to our terms and conditions
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentForm;

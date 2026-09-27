import { useState } from 'react';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { eligibilityAPI } from '../services/api';

const initialForm = {
  age: '',
  gender: 'MALE',
  annualIncome: '',
  state: '',
  occupation: '',
  category: 'GENERAL',
  isDisabled: false,
  isStudent: false,
  isFarmer: false,
  isWidow: false,
  isSeniorCitizen: false,
};

const indianStates = [
  'Andhra Pradesh', 'Bihar', 'Gujarat', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal',
];

export default function EligibilityChecker() {
  const [form, setForm] = useState(initialForm);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    try {
      const payload = {
        ...form,
        age: form.age ? parseInt(form.age, 10) : null,
        annualIncome: form.annualIncome ? parseFloat(form.annualIncome) : null,
      };
      const { data } = await eligibilityAPI.check(payload);
      setResults(data);
    } catch (err) {
      toast.error('Could not check eligibility. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const flagFields = [
    { name: 'isStudent', label: 'I am a student' },
    { name: 'isFarmer', label: 'I am a farmer' },
    { name: 'isWidow', label: 'I am a widow' },
    { name: 'isSeniorCitizen', label: 'I am a senior citizen (60+)' },
    { name: 'isDisabled', label: 'I have a disability' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <span className="eyebrow">Eligibility checker</span>
      <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-navy-900">Find out what you qualify for</h1>
      <p className="mt-3 text-navy-700/70 max-w-2xl">
        Fill in your details below. Nothing is saved unless you're logged in and choose to save results.
      </p>

      <div className="mt-10 grid lg:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="card p-8 space-y-5 h-fit">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="label-text" htmlFor="age">Age</label>
              <input id="age" name="age" type="number" min="0" max="120" required className="input-field"
                value={form.age} onChange={handleChange} />
            </div>
            <div>
              <label className="label-text" htmlFor="gender">Gender</label>
              <select id="gender" name="gender" className="input-field" value={form.gender} onChange={handleChange}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label-text" htmlFor="annualIncome">Annual family income (₹)</label>
            <input id="annualIncome" name="annualIncome" type="number" min="0" required className="input-field"
              placeholder="e.g. 150000" value={form.annualIncome} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="label-text" htmlFor="state">State</label>
              <select id="state" name="state" className="input-field" value={form.state} onChange={handleChange}>
                <option value="">Select state</option>
                {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label-text" htmlFor="category">Category</label>
              <select id="category" name="category" className="input-field" value={form.category} onChange={handleChange}>
                <option value="GENERAL">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label-text" htmlFor="occupation">Occupation</label>
            <input id="occupation" name="occupation" className="input-field" placeholder="e.g. Farmer, Student, Self-employed"
              value={form.occupation} onChange={handleChange} />
          </div>

          <fieldset className="pt-2">
            <legend className="label-text">Does any of this apply to you?</legend>
            <div className="grid grid-cols-2 gap-3 mt-1">
              {flagFields.map((f) => (
                <label key={f.name} className="flex items-center gap-2 text-sm text-navy-700">
                  <input type="checkbox" name={f.name} checked={form[f.name]} onChange={handleChange}
                    className="rounded border-navy-300 text-navy-700 focus:ring-navy-600" />
                  {f.label}
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Checking…' : 'Check my eligibility'}
          </button>
        </form>

        <div>
          {!results && !loading && (
            <div className="card p-10 text-center text-navy-700/60 h-full flex items-center justify-center">
              Your results will appear here after you submit the form.
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-4 border-navy-100 border-t-navy-700 rounded-full animate-spin" />
            </div>
          )}

          {results && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-navy-900">{results.filter(r => r.eligible).length} of {results.length} schemes matched</h2>
              {results.map((r) => (
                <div key={r.schemeId} className={`card p-5 border-l-4 ${r.eligible ? 'border-l-indiagreen-500' : 'border-l-navy-200'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-navy-900">{r.schemeName}</h3>
                      <p className="mt-1 text-sm text-navy-700/70">{r.reason}</p>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      {r.eligible ? (
                        <HiCheckCircle className="text-2xl text-indiagreen-500" />
                      ) : (
                        <HiXCircle className="text-2xl text-navy-300" />
                      )}
                      <span className="mt-1 text-xs font-mono text-navy-600/60">{r.matchScore}% match</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { HiOutlineSearch, HiOutlineExternalLink } from 'react-icons/hi';
import { schemeAPI } from '../services/api';

export default function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchSchemes = async (kw = '', pg = 0) => {
    setLoading(true);
    setError('');
    try {
      const { data } = kw ? await schemeAPI.search(kw, pg) : await schemeAPI.getAll(pg);
      setSchemes(data.content || []);
      setTotalPages(data.totalPages || 0);
      setPage(pg);
    } catch (err) {
      setError('Could not load schemes. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSchemes(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSchemes(keyword, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <span className="eyebrow">Government schemes</span>
      <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-navy-900">Browse welfare schemes</h1>
      <p className="mt-3 text-navy-700/70 max-w-2xl">
        Search by name, department, or keyword. Every scheme's eligibility rules feed directly into the eligibility checker.
      </p>

      <form onSubmit={handleSearch} className="mt-8 flex gap-3 max-w-xl">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 text-lg" />
          <input
            className="input-field pl-11"
            placeholder="Search schemes (e.g. farmer, student, pension)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">Search</button>
      </form>

      <div className="mt-10">
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-navy-100 border-t-navy-700 rounded-full animate-spin" />
          </div>
        )}

        {!loading && error && (
          <div className="card p-6 text-center text-navy-700/70">{error}</div>
        )}

        {!loading && !error && schemes.length === 0 && (
          <div className="card p-6 text-center text-navy-700/70">No schemes matched your search.</div>
        )}

        {!loading && !error && schemes.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme) => (
              <div key={scheme.id} className="card p-6 flex flex-col">
                <span className="text-xs font-mono uppercase tracking-wide text-navy-600/60">{scheme.department}</span>
                <h3 className="mt-2 text-lg font-semibold text-navy-900">{scheme.name}</h3>
                <p className="mt-2 text-sm text-navy-700/70 leading-relaxed flex-1">{scheme.description}</p>
                <div className="mt-4 text-sm text-indiagreen-600 font-medium">{scheme.benefits}</div>
                {scheme.officialLink && (
                  <a href={scheme.officialLink} target="_blank" rel="noopener noreferrer"
                     className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 hover:text-saffron-600">
                    Official site <HiOutlineExternalLink />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => fetchSchemes(keyword, i)}
                className={`w-9 h-9 rounded-md text-sm font-medium ${
                  i === page ? 'bg-navy-700 text-white' : 'bg-white border border-navy-100 text-navy-700 hover:bg-navy-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

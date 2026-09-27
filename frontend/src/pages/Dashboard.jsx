import { useAuth } from '../context/AuthContext';
import { HiOutlineDocumentText, HiOutlineClipboardCheck, HiOutlineBell } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <span className="eyebrow">Dashboard</span>
      <h1 className="mt-2 text-3xl font-semibold text-navy-900">Welcome, {user?.fullName}</h1>
      <p className="mt-2 text-navy-700/70">Here's a snapshot of your account.</p>

      <div className="mt-10 grid sm:grid-cols-3 gap-6">
        <div className="card p-6">
          <HiOutlineClipboardCheck className="text-3xl text-navy-700" />
          <div className="mt-4 text-2xl font-semibold text-navy-900">0</div>
          <div className="text-sm text-navy-700/70">Applications submitted</div>
        </div>
        <div className="card p-6">
          <HiOutlineDocumentText className="text-3xl text-navy-700" />
          <div className="mt-4 text-2xl font-semibold text-navy-900">0</div>
          <div className="text-sm text-navy-700/70">Documents uploaded</div>
        </div>
        <div className="card p-6">
          <HiOutlineBell className="text-3xl text-navy-700" />
          <div className="mt-4 text-2xl font-semibold text-navy-900">0</div>
          <div className="text-sm text-navy-700/70">Unread notifications</div>
        </div>
      </div>

      <div className="mt-10 card p-8 text-center">
        <h2 className="text-xl font-semibold text-navy-900">Haven't checked your eligibility yet?</h2>
        <p className="mt-2 text-navy-700/70">Find out which schemes you qualify for in under two minutes.</p>
        <Link to="/eligibility" className="btn-primary mt-6 inline-flex">Check eligibility now</Link>
      </div>

      <p className="mt-8 text-sm text-navy-700/50 text-center">
        Profile editing, document upload, and application history are part of the next build phase.
      </p>
    </div>
  );
}

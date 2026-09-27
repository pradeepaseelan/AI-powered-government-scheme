import { Link } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineDocumentText, HiOutlineChatAlt2, HiOutlineShieldCheck } from 'react-icons/hi';

const steps = [
  { title: 'Tell us about yourself', desc: 'Age, income, state, occupation — a two-minute form, no login required.' },
  { title: 'See your matches', desc: 'Our rules engine scores every scheme against your profile instantly.' },
  { title: 'Apply with confidence', desc: 'Know exactly which documents you need before you start.' },
];

const features = [
  { icon: HiOutlineSearch, title: 'Search every scheme', desc: 'Browse central and state welfare schemes in one place, filterable by category.' },
  { icon: HiOutlineShieldCheck, title: 'Instant eligibility scoring', desc: 'A transparent match score — not a black box — explains exactly why you qualify.' },
  { icon: HiOutlineChatAlt2, title: 'Ask the AI assistant', desc: 'Get plain-language answers about procedures, documents, and benefits.' },
  { icon: HiOutlineDocumentText, title: 'Track applications', desc: 'Upload documents once, track status, download reports as PDF.' },
];

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-chakra pointer-events-none" />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full border border-saffron-500/20" />
        <div className="absolute -right-10 top-10 w-72 h-72 rounded-full border border-indiagreen-500/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow text-saffron-400">Smart India Hackathon · Mini Project</span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08]">
              Every scheme you're owed,<br className="hidden sm:block" /> in one search.
            </h1>
            <p className="mt-6 text-lg text-navy-100/80 max-w-xl">
              Scheme Setu matches your age, income, occupation, and status against
              India's welfare schemes — and tells you exactly why you qualify, or what's missing.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/eligibility" className="btn-accent">Check my eligibility</Link>
              <Link to="/schemes" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-navy-900">
                Browse all schemes
              </Link>
            </div>
            <p className="mt-6 text-sm text-navy-100/60">No login needed to check eligibility or search schemes.</p>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/15 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full bg-white/5 backdrop-blur border border-white/10 flex flex-col items-center justify-center text-center px-6">
                <span className="text-5xl font-display font-semibold text-saffron-400">5+</span>
                <span className="text-sm text-navy-100/70 mt-1">welfare schemes indexed and growing</span>
                <span className="mt-4 text-3xl font-display font-semibold text-indiagreen-500">11</span>
                <span className="text-sm text-navy-100/70 mt-1">eligibility factors weighed per check</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <span className="eyebrow">How it works</span>
        <h2 className="mt-2 text-3xl font-semibold text-navy-900">From question to qualification in three steps</h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="relative pl-6 border-l-2 border-saffron-500">
              <span className="font-mono text-sm text-saffron-600">Step {i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-navy-700/80 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-navy-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="eyebrow">What you get</span>
          <h2 className="mt-2 text-3xl font-semibold text-navy-900">Built around the citizen, not the paperwork</h2>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card p-6">
                <f.icon className="text-3xl text-navy-700" />
                <h3 className="mt-4 font-semibold text-navy-900">{f.title}</h3>
                <p className="mt-2 text-sm text-navy-700/70 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-navy-900">Ready to see what you qualify for?</h2>
        <p className="mt-4 text-navy-700/80 max-w-xl mx-auto">
          It takes about two minutes, and you'll get a ranked list with reasons — not just a yes or no.
        </p>
        <Link to="/eligibility" className="btn-primary mt-8">Start the eligibility check</Link>
      </section>
    </div>
  );
}

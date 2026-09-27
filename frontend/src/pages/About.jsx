export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <span className="eyebrow">About the project</span>
      <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-navy-900">Why Scheme Setu exists</h1>
      <div className="mt-6 space-y-5 text-navy-700/80 leading-relaxed">
        <p>
          Millions of Indians qualify for government welfare schemes they never hear about,
          because eligibility rules are scattered across department websites, PDFs, and notices
          written for officials rather than citizens.
        </p>
        <p>
          Scheme Setu — "setu" meaning bridge — brings those rules into a single, searchable
          eligibility engine. Enter your details once, and see every matching scheme ranked by
          how well you fit, with plain-language reasons instead of legal fine print.
        </p>
        <p>
          This project was built as a Smart India Hackathon 2025 mini project submission,
          demonstrating a full-stack architecture: a Spring Boot + MySQL backend serving a
          rules-based eligibility engine over REST APIs, and a React + Tailwind frontend.
        </p>
      </div>
    </div>
  );
}

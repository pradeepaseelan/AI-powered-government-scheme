import { HiOutlineChatAlt2 } from 'react-icons/hi';

export default function AiAssistant() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <HiOutlineChatAlt2 className="text-5xl text-navy-700 mx-auto" />
      <h1 className="mt-4 text-3xl font-semibold text-navy-900">AI Assistant</h1>
      <p className="mt-3 text-navy-700/70">
        The Gemini-powered chatbot (scheme guidance, document checklists, and FAQs) ships in the next
        build phase, alongside the chat_history backend module. The eligibility checker and scheme
        search are live now.
      </p>
    </div>
  );
}

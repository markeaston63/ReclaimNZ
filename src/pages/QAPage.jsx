import React, { useState } from 'react';

const QAPage = () => {
  // State to manage which answer is currently open.
  // We'll use an array of booleans, one for each Q&A, initialized to false (all closed).
  const [openAnswers, setOpenAnswers] = useState(Array(6).fill(false)); // Assuming 6 Q&A items

  // Function to toggle the open/closed state of an answer
  const toggleAnswer = (index) => {
    setOpenAnswers(prev => prev.map((isOpen, i) => (i === index ? !isOpen : isOpen)));
  };

  // Define your Q&A content as an array of objects
  const qaContent = [
    {
      question: "Are New Zealanders ready for a nationwide ‘Do Nothing’ protest?",
      answer: (
        <>
          <p>YES</p>
          <p>The Maori advancement is happening daily.</p>
          <p>The Maori Sovereignty Movement (MSM) grows more belligerent by the day.</p>
          <p>The pro-Maori - Anti-Colonist indoctrination in our education system is turning out thousands of brainwashed younger converts to MSM every year.</p>
          <p>Older citizens who have lived through the pre 1970s that see what is happening and who know the truth are dying off.</p>
          <p>If already not too late, there never will be a better time to act.</p>
          <p>We have the Act Party valiantly trying to stem the increasing flow of the Maori takeover, so by and large the public are aware of the Maori creep.</p>
        </>
      ),
    },
    {
      question: "How will the ‘Do Nothing’ protest be promoted?",
      answer: (
        <>
          <p>Initially on social media. It is hoped that the major players (NZCPR, Hobson’s Pledge, Democracy Action and Stop Co-Governance, Brian Tamaki etc) will support and promote it through their networks and websites.</p>
        </>
      ),
    },
    {
      question: "What about people with finance commitments (mortgages etc), and putting food on the table?",
      answer: (
        <>
          <p>In New Zealand, employees are entitled to 10 days of paid sick leave per year. This applies to all employees, including part-time and casual workers (There are conditions to this though).</p>
          <p className="font-semibold mt-2">Tip: Sick leave can be used for any illness or injury, including stress (Treaty stress?).</p>
          <p>Also in New Zealand, employees are entitled to at least four weeks of paid annual leave each year - maybe this could be used.</p>
          <p className="mt-2">In any conflict there will always be 'collateral damage' - this is a small price to pay compared to losing the New Zealand way of life and our tried and true Democracy to racist tribalism.</p>
        </>
      ),
    },
    {
      question: "Will Reclaim NZ become a political party?",
      answer: (
        <>
          <p>NO</p>
          <p>The aim is to change the Maori preference ideology of our elected Government.</p>
        </>
      ),
    },
    {
      question: "Is the 'Do Nothing Days nationwide strike', over the top?",
      answer: (
        <>
          <p>NO</p>
          <p>Reclaim NZ believes that nothing less will stop the push for Maori control of New Zealand by activist Maori, which to date has been supported by our elected successive Government/s since 1974.</p>
        </>
      ),
    },
    {
      question: "Will Reclaim NZ get widespread support?",
      answer: (
        <>
          <p>IT MUST</p>
          <p>To get widespread support, the concept needs to be cleverly promoted in a positive light - ie: That it is removing racism in New Zealand, that it is unifying our society, that it is preventing full blown tribalism (the antithesis of Democracy). - After all, it is the agenda driven tribalists that are dividing our society.</p>
        </>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl font-bold text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Q&A
      </h2>

      <div className="space-y-4"> {/* Adds vertical space between Q&A items */}
        {qaContent.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="flex justify-between items-center w-full p-4 bg-blue-100 hover:bg-blue-200 focus:outline-none text-left text-blue-800 font-semibold text-lg"
              onClick={() => toggleAnswer(index)}
              aria-expanded={openAnswers[index]}
              aria-controls={`answer-${index}`}
            >
              <span>{item.question}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  openAnswers[index] ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {openAnswers[index] && (
              <div
                id={`answer-${index}`}
                className="p-4 bg-white text-gray-700 border-t border-gray-200"
              >
                <div className="space-y-3"> {/* Added space between paragraphs in the answer */}
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QAPage;

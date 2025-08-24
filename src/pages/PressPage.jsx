import React from 'react';

const PressPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl font-bold text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Press
      </h2>

      <div className="paragraph-text"> 
        {/* Press Release */}
        <article className="mb-12">
          <div className="border-l-4 border-blue-600 pl-6 mb-6">
                         <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
               Reclaim New Zealand Launches Nationwide <span className="text-blue-600 font-extrabold">Do Nothing Days</span> Campaign
             </h3>
            <div className="text-sm text-gray-600 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                Press Release
              </span>
              <span className="ml-4 text-gray-500">August 2024</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Reclaim New Zealand, a pro–one-law-for-all movement, has successfully completed two major promotions for its upcoming Do Nothing Day/s nationwide protest.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              The first promotion appeared in the Whangarei LetterBox monthly newsletter, reaching approximately 12,500 households across the region.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              The second rollout began on Tuesday, 19 August, when 10,000 flyers were collected from the printer. Within hours, a call went out to Reclaim NZ's national database seeking volunteer distributors. The response was immediate and overwhelming. By Thursday afternoon, all 10,000 flyers had been dispatched via NZ Post couriers to patriotic volunteers across the country, ready to be delivered into letterboxes nationwide.
            </p>

            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 my-6 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                Geoff Parker, Reclaim NZ Coordinator, praised the groundswell of support and shows how deeply New Zealanders care about protecting democracy and racial equality:
              </p>
              
              <blockquote className="text-lg italic text-gray-800 border-l-4 border-blue-400 pl-4 ml-4">
                "The response was incredible. Within days we had volunteers stepping up from all corners of New Zealand to get these flyers into people's homes. It's a powerful start to our campaign to stop the tribal takeover of our country. New Zealanders need to know what's at stake — from 580 overlapping tribal claims on our entire coastline, to tribal moves to control freshwater resources through the courts, to the push for undemocratic, separatist Māori wards in local government and much more."
              </blockquote>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-gray-700">
                <strong>For more information:</strong> Contact <a href="mailto:geoff@reclaimnz.kiwi" className="text-blue-600 hover:text-blue-800 underline">geoff@reclaimnz.kiwi</a> or visit <a href="https://www.reclaimnz.kiwi" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">www.reclaimnz.kiwi</a>
              </p>
            </div>
          </div>
        </article>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600 text-center">
            More press releases will be added here as they become available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PressPage;

import React, { useState } from 'react';

const DisclaimerPage = () => {

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Disclaimer
      </h2>

      <div className="paragraph-text">
        <p>
          Throughout this website and the ReclaimNZ campaign, the term ‘Maori’ is used in reference to individuals who are more accurately described as ‘part-Maori,’ as no full-blooded Maori are believed to exist today. This terminology reflects 
          the perspective presented in Rob Paterson’s article ‘Ethnicity Anomalies’ (see our <a href="/blog">Blog</a>).
        </p>
        <p>
          ReclaimNZ rejects racism in all forms and stands for equal democratic rights for all New Zealanders. Any criticism expressed on this site is directed at policies or ideologies — not at individuals or groups based on race.
        </p>
        {/* Styled Quote Section */}
        <div className="my-6">
          <p className="font-semibold text-gray-700 mb-2">John Ansell says:</p>
          <blockquote className="bg-blue-50 border-l-4 border-blue-500 text-gray-800 p-4 rounded-lg italic shadow-sm">
            <p>
                Non-Maori New Zealanders do not tar all Maori with the same brush. We socialise with harmonious Maori every day and relate to them simply as people.
            </p>
            <p>
                Our problem is with the whining, self-entitled neotribal con artists who have the nerve to blame their every failing on the supposedly evil white man."
            </p>
          </blockquote>
        </div>
      </div>
      <div className="mt-10">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-xs text-blue-900 text-center shadow-sm">
          Authorised by Mary Josephine Bullock, 133d Constable Street, Newtown, Wellington 6021.
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;

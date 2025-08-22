import React, { useState } from 'react';

const DonatePage = () => {

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Donate
      </h2>

      <div className="paragraph-text">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-6 mb-6 shadow-md">
          <h3 className="text-xl font-semibold text-blue-900 mb-4 text-center">PLEASE SUPPORT THE CAUSE – TODAY</h3>
          <p className="mb-2 text-blue-900 text-center">
            We’re working hard to make a <span className="font-bold">REAL difference</span>, but we can’t do it alone.
          </p>
          <p className="mb-2 text-blue-900 text-center">
            If you believe in what we’re doing and want to help us grow, please consider making a donation—big or small, every contribution counts.
          </p>
          <div className="bg-white border border-blue-300 rounded-md p-4 my-4 shadow-sm text-center">
            <span className="font-semibold text-blue-700">ASB: 12-3602-0666575-00  Geoffrey Parker</span>
          </div>
          <p className="mb-2 text-blue-900 text-center font-semibold">
            A big THANK YOU for standing with us.
          </p>
          <p className="mb-2 text-blue-900 text-center">
            If you would like acknowledgement of your donation, please send an email to <a href="mailto:info@reclaimnz.kiwi" className="text-blue-700 underline">info@reclaimnz.kiwi</a> stating the amount and reference.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 shadow-sm">
          <h4 className="text-md font-bold text-blue-900 mb-2">Costs incurred to date:</h4>
          <ul className="list-disc list-inside text-blue-900 mb-4">
            <li>New functional website - building, hosting, registration</li>
            <li>Facebook Advertising</li>
          </ul>
          <h4 className="text-md font-bold text-blue-900 mb-2">Future costs:</h4>
          <ul className="list-disc list-inside text-blue-900">
            <li>Flyers - printing, distribution etc</li>
            <li>Mailing and/or Courier costs etc</li>
            <li>Bulk emailing App (mailmerge)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;

import React from 'react';
import SocialShare from '../components/SocialShare'; 

const HomePage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Welcome to Reclaim NZ
      </h2>

      <div className="my-10 p-6 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-yellow-800 mb-2 text-center">
          MISSION STATEMENT
        </h3>
        <p className="text-lg text-yellow-900 text-center">
          To uphold one law for all, ensure true racial equality, and promote a single standard of citizenship — fostering unity and harmony for all New Zealanders.
        </p>
      </div>

      <div className="mt-8 mb-12 flex justify-center">
        <a href="/join"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-lg transition duration-300 transform hover:scale-105">
          Join the Protest
        </a>
      </div>

      <SocialShare />

      <div className="paragraph-text">
        <p>
          My name is Geoff Parker.
        </p>
        <p>
          I'm a retired Kiwi of modest means and working-class roots. Over the years, I’ve worked as an agricultural contractor, developed a small farm, and owned a small manufacturing business.
        </p>
        <p>
          I see myself as an average man in the street - in fact, I’m probably the last person that should be running a nationwide action and therefore need all the help and support I can get in doing so.
        </p>
        <p>
          While other groups are doing great work in disseminating factual information, creating awareness and raising the alarm here and there, issue by issue, I believe the time has come for one bold, nationwide, united stand.
        </p>
        <p>
          Like many New Zealanders, I’m deeply saddened, angry and frustrated about the direction Maori activists, self serving politicians, aided by a leftist media, are taking our country. I have been monitoring the Maori Sovereignty Movement furtive takeover attempts for the last 15 years.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 my-6 rounded-md shadow-md">
          <p className="text-lg md:text-xl leading-relaxed">
            That’s why I’m proposing “Do Nothing Day's” to get the Government’s attention - a nationwide co-ordinated strike action by heartland New Zealanders who have had enough of the Maori preference and maorification of New Zealand - as a final, decisive step to stop the tribal capture of governance and restore, racial harmony, unity, equality and one law for all.
          </p>
        </div>
        <p>
          Please, for the sake of our descendants stand with me.
        </p>
      </div>

      <div className="flex justify-center mt-8 mb-4">
        <p className="text-lg font-bold text-gray-700 mr-2">Page Views:</p>
        <div className="flex items-center">
          <a href="http://www.amazingcounters.com" target="_blank" rel="noopener noreferrer">
            <img border="0" src="https://cc.amazingcounters.com/counter.php?i=3303913&c=9912052" alt="AmazingCounters.com" />
          </a>
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

export default HomePage;
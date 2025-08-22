import React from 'react'; // Removed useState as it's not used in this component

const LinksPage = () => {
  const externalLinks = [
    { name: 'Treaty 4 Dummies', url: 'https://sites.google.com/site/treaty4dummies/home' },
    { name: 'Kiwi Frontline', url: 'https://sites.google.com/view/kiwifrontline/home' },
    { name: 'NZCPR (NZ Centre for Political Research)', url: 'https://www.nzcpr.com/' },
    { name: 'Breaking Views NZ', url: 'https://breakingviewsnz.blogspot.com/' },
    { name: 'Democracy Action', url: 'https://www.democracyaction.org.nz/' },
    { name: 'Hobson\'s Pledge', url: 'https://www.hobsonspledge.nz/' },
    { name: 'Stop Co-Governance', url: 'https://stopcogovernance.kiwi/' },
    { name: 'Tross Publishing', url: 'https://trosspublishing.com/' },
    { name: '100 Days', url: 'http://www.100days.co.nz/' },
    { name: 'Whangarei Tim (YouTube)', url: 'https://www.youtube.com/@WhangareiTim/videos' },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl font-bold text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Links
      </h2>
      <div className="paragraph-text">
        <p>
          On the internet there is a stack of information in relation to this campaign, so there is no need to reiterate it on this site.
        </p>
        <p>
          Leading sites (in random order) are listed below to help you understand the gravity of the situation.
        </p>
      </div>
      <br></br>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider rounded-tl-lg"
              >
                Resource Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider rounded-tr-lg"
              >
                Link
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {externalLinks.map((link, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {link.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {/* Moved color classes directly to the <a> tag */}
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">
                    Visit Website
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinksPage;

import React from 'react';

const SocialShare = () => {
  const shareUrl = "https://reclaimnz.kiwi"; // Replace with your actual website URL
  const shareTitle = "Reclaim NZ - Stand for one law for all"; 
  const shareText = "Join the movement to Reclaim NZ! We're making a stand for one law for all, racial equality, and a single standard of citizenship. Find out more here:";
  
  return (
    <div className="flex justify-center items-center space-x-6 my-8">
      <span className="font-semibold text-gray-700">Share this page:</span>
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-md transition-colors duration-300"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.77 7.46H16.2v-.89c0-.66.6-1.04 1.13-1.04h1.44V2.05H16.2c-2.45 0-3.95 1.58-3.95 4.14v2.27H9.28v3.25h2.97v8.58h3.95v-8.58h2.64l.4-3.25z"/>
        </svg>
      </a>
      <a 
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-white bg-blue-400 hover:bg-blue-500 p-2 rounded-full shadow-md transition-colors duration-300"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          {/* Restored old Twitter bird logo path */}
          <path d="M22.46 6c-.84.37-1.74.62-2.67.73.96-.58 1.7-1.5 2.04-2.58-.9.53-1.9.92-2.92 1.13-.85-.9-2.06-1.46-3.41-1.46-2.58 0-4.68 2.1-4.68 4.68 0 .37.04.73.1 1.07-3.89-.2-7.34-2.06-9.65-4.88-.4.69-.62 1.5-.62 2.37 0 1.62.82 3.05 2.07 3.89-.76-.02-1.47-.23-2.09-.58v.06c0 2.27 1.61 4.16 3.74 4.59-.39.11-.8.17-1.22.17-.3 0-.58-.03-.86-.09.59 1.85 2.29 3.2 4.3 3.23-1.6 1.25-3.62 2-5.83 2-.38 0-.76-.02-1.13-.07 2.07 1.33 4.5 2.1 7.1 2.1 8.52 0 13.17-7.05 13.17-13.17 0-.2-.01-.4-.02-.6.9-.65 1.68-1.47 2.3-2.4z"/>
        </svg>
      </a>
      <a 
        href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + " " + shareUrl)}`} 
        className="text-white bg-gray-500 hover:bg-gray-600 p-2 rounded-full shadow-md transition-colors duration-300"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      </a>
    </div>
  );
};

export default SocialShare;
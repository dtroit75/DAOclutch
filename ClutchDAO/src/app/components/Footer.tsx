

'use client';
interface FooterProps {}
const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-bold mb-3">About Clutch DAO</h3>
            <p className="text-gray-300 text-sm mb-3">
              A blockchain-based platform that connects basketball with environmental impact. 
              Each token represents real-world action tied to environmental impact.
            </p>
            <p className="text-gray-300 text-sm">
              Clutch Tokens connect environmental action with tangible rewards. By turning plastic 
              segregation into a tokenized asset, we create a circular economy that benefits both 
              the planet and the people.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3">The Token Economy</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start">
                <span className="mr-2">🎁</span>
                <span><strong>Redeem:</strong> Use tokens to access basketball gear, transport passes, game tickets, and other exclusive rewards.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">💝</span>
                <span><strong>Donate:</strong> Support grassroots basketball court projects, clean-up events, and recycling awareness campaigns.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📊</span>
                <span><strong>Stake:</strong> Stake tokens to vote for projects that deserve funding — from local youth teams to green urban spaces.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚖️</span>
                <span><strong>Governance:</strong> Join the Clutch DAO and participate in shaping how rewards, rules, and community goals evolve over time.</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://tokenhoops-49.lovable.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  🏀 Visit Clutch Platform
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/clutchdaoke" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Twitter (X)
                </a>
              </li>
              <li>
                <a 
                  href="https://tokenhoops-49.lovable.app/documentation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4 text-center">
          <a 
            href="https://tokenhoops-49.lovable.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-green-600 px-4 py-2 rounded-lg font-medium mb-4 hover:bg-gray-100 hover:scale-105 transition-all duration-200 text-sm"
          >
            🏀 Transform Your Plastic Into Impact — Join Clutch Today!
          </a>
          
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Clutch DAO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
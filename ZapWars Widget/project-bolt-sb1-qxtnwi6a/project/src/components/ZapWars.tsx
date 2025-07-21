import React, { useState, useEffect } from 'react';
import { Zap, Trophy, Bitcoin } from 'lucide-react';
import VoteButton from './VoteButton';

interface Meme {
  id: string;
  url: string;
  title: string;
  votes: number;
}

const BITCOIN_MEMES: Meme[] = [
  {
    id: '1',
    url: '/WhatsApp Image 2025-07-19 at 19.13.10_394b3caf.jpg',
    title: 'Bitcoin Fixes This',
    votes: 0
  },
  {
    id: '2',
    url: '/WhatsApp Image 2025-07-19 at 19.13.08_b7389f45.jpg',
    title: 'Have Fun Staying Poor',
    votes: 0
  },
  {
    id: '3',
    url: '/WhatsApp Image 2025-07-19 at 19.13.10_b8b6a639.jpg',
    title: 'Not Your Keys Not Your Coins',
    votes: 0
  },
  {
    id: '4',
    url: '/WhatsApp Image 2025-07-19 at 19.13.11_bbfa7560.jpg',
    title: 'Few Understand',
    votes: 0
  },
  {
    id: '5',
    url: '/WhatsApp Image 2025-07-19 at 19.13.09_2b922cbe.jpg',
    title: 'Laser Eyes Activated',
    votes: 0
  },
  {
    id: '6',
    url: '/WhatsApp Image 2025-07-19 at 19.13.10_394b3caf.jpg',
    title: 'HODL Forever',
    votes: 0
  }
];

const ZapWars: React.FC = () => {
  const [battleMemes, setBattleMemes] = useState<[Meme, Meme]>([
    { ...BITCOIN_MEMES[0] },
    { ...BITCOIN_MEMES[1] }
  ]);
  const [availableMemes, setAvailableMemes] = useState<Meme[]>(
    BITCOIN_MEMES.slice(2)
  );
  const [isVoting, setIsVoting] = useState<string | null>(null);
  const [showSatsModal, setShowSatsModal] = useState<string | null>(null);
  const [satsAmount, setSatsAmount] = useState<number>(10);
  const [battleCount, setBattleCount] = useState<number>(1);
  const [winner, setWinner] = useState<string | null>(null);

  const handleVoteClick = (memeId: string) => {
    setShowSatsModal(memeId);
  };

  const simulateLightningPayment = async (sats: number): Promise<boolean> => {
    try {
      // Try to use webln if available
      if (window.webln) {
        await window.webln.enable();
        // Mock invoice for demo purposes
        const mockInvoice = `lnbc${sats}u1p0...mock_invoice_for_${sats}_sats`;
        console.log(`🟡 Lightning Payment Initiated: ${sats} sats`);
        console.log(`📄 Invoice: ${mockInvoice}`);
        
        // Simulate payment delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log(`✅ Payment Successful: ${sats} sats paid`);
        return true;
      } else {
        // Fallback mock payment
        console.log(`⚡ Mock Lightning Payment: ${sats} sats`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`✅ Mock Payment Confirmed`);
        return true;
      }
    } catch (error) {
      console.error('Payment failed:', error);
      return false;
    }
  };

  const confirmVote = async () => {
    if (!showSatsModal) return;

    setIsVoting(showSatsModal);
    setShowSatsModal(null);

    const paymentSuccess = await simulateLightningPayment(satsAmount);
    
    if (paymentSuccess) {
      const votes = Math.floor(satsAmount / 10) || 1;
      
      setBattleMemes(prev => 
        prev.map(meme => 
          meme.id === showSatsModal 
            ? { ...meme, votes: meme.votes + votes }
            : meme
        ) as [Meme, Meme]
      );

      // Show winner effect
      setWinner(showSatsModal);
      setTimeout(() => setWinner(null), 2000);

      // Check if we need to replace a meme (after 3+ votes difference)
      setTimeout(() => {
        setBattleMemes(prev => {
          const [meme1, meme2] = prev;
          const voteDiff = Math.abs(meme1.votes - meme2.votes);
          
          if (voteDiff >= 3 && availableMemes.length > 0) {
            const loser = meme1.votes < meme2.votes ? meme1 : meme2;
            const winnerMeme = meme1.votes >= meme2.votes ? meme1 : meme2;
            
            // Get new challenger
            const newChallenger = { ...availableMemes[0], votes: 0 };
            
            // Update available memes
            setAvailableMemes(prev => [
              ...prev.slice(1),
              { ...loser, votes: 0 }
            ]);
            
            setBattleCount(prev => prev + 1);
            
            return winnerMeme.id === meme1.id 
              ? [winnerMeme, newChallenger]
              : [newChallenger, winnerMeme];
          }
          
          return prev;
        });
      }, 2500);
    }

    setIsVoting(null);
  };

  const resetBattle = () => {
    setBattleMemes([
      { ...BITCOIN_MEMES[0], votes: 0 },
      { ...BITCOIN_MEMES[1], votes: 0 }
    ]);
    setAvailableMemes(BITCOIN_MEMES.slice(2).map(meme => ({ ...meme, votes: 0 })));
    setBattleCount(1);
    setWinner(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Bitcoin className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            ZapWars
          </h1>
          <Zap className="w-8 h-8 text-blue-500" />
        </div>
        <p className="text-gray-600">Battle #{battleCount} • Vote with Lightning ⚡</p>
      </div>

      {/* Battle Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {battleMemes.map((meme, index) => (
          <div
            key={meme.id}
            className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
              winner === meme.id ? 'ring-4 ring-yellow-400 scale-105' : 'hover:shadow-lg'
            }`}
          >
            {/* Winner Crown */}
            {winner === meme.id && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10">
                <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />
              </div>
            )}

            {/* Meme Image */}
            <div className="aspect-square relative overflow-hidden">
              <img
                src={meme.url}
                alt={meme.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300" />
            </div>

            {/* Meme Info */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{meme.title}</h3>
              
              {/* Vote Count */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-xl text-gray-800">
                    {meme.votes} votes
                  </span>
                </div>
                {meme.votes > 0 && (
                  <div className="text-sm text-gray-500">
                    {meme.votes * 10} sats
                  </div>
                )}
              </div>

              {/* Vote Button */}
              <VoteButton
                onClick={() => handleVoteClick(meme.id)}
                disabled={isVoting === meme.id}
                loading={isVoting === meme.id}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stats & Reset */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="text-sm text-gray-600">
          Total battles: {battleCount} • Remaining memes: {availableMemes.length}
        </div>
        <button
          onClick={resetBattle}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
        >
          Reset Battle
        </button>
      </div>

      {/* Sats Amount Modal */}
      {showSatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold text-center mb-4">Choose Sats Amount</h3>
            <p className="text-gray-600 text-center mb-4">10 sats = 1 vote</p>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[10, 50, 100, 250, 500, 1000].map(amount => (
                <button
                  key={amount}
                  onClick={() => setSatsAmount(amount)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    satsAmount === amount
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <input
                type="number"
                value={satsAmount}
                onChange={(e) => setSatsAmount(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Custom amount"
                min="1"
              />
            </div>

            <div className="text-center text-sm text-gray-600 mb-4">
              = {Math.floor(satsAmount / 10) || 1} vote{Math.floor(satsAmount / 10) !== 1 ? 's' : ''}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSatsModal(null)}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmVote}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-lg hover:from-orange-600 hover:to-blue-700 transition-all"
              >
                Zap ⚡
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZapWars;
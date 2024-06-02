'use client'
import { useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import PhotoNFT from '../artifacts/contracts/Nft.sol/PhotoNFT.json';

const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  const handleGenerateImage = async () => {
    try {
      const response = await axios.post('/api/generate-image', { prompt });
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleMintNFT = async () => {
    if (!web3 || !contract) return;

    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods.mintNFT(imageUrl).send({ from: accounts[0] });

    console.log('Minted NFT:', result);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const _web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWeb3(_web3);
      const _contract = new _web3.eth.Contract(PhotoNFT.abi, contractAddress);
      setContract(_contract);
    } else {
      alert('Please install MetaMask to use this feature');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={connectWallet} className="mb-4 p-2 bg-blue-500 text-white rounded">Connect Wallet</button>

      <div className="flex flex-col items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt for the AI"
          className="mb-4 p-2 border rounded"
        />
        <button onClick={handleGenerateImage} className="mb-4 p-2 bg-green-500 text-white rounded">Generate Image</button>
      </div>

      {imageUrl && (
        <div className="flex flex-col items-center">
          <img src={imageUrl} alt="Generated" className="mb-4" />
          <button onClick={handleMintNFT} className="p-2 bg-purple-500 text-white rounded">Mint as NFT</button>
        </div>
      )}
    </main>
  );
}

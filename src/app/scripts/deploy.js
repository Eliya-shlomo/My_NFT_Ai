const hre = require("hardhat");
const ethers  = require("hardhat");
import axios from 'axios';

async function main() {
  console.log("start proccess");
  const provider = await new  hre.ethers.WebSocketProvider("ws://127.0.0.1:8545");
  console.log("succsses initialize provider");
  const wallet = new ethers.Wallet(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80, provider);
  console.log("succsses initialize wallet");
  const PhotoNFTfactory = await hre.ethers.getContractFactory("PhotoNFT",wallet);
  console.log("succsses initialize contract factory");
  const PhotoNFTcontract = await PhotoNFTfactory.deploy();
  await PhotoNFTcontract.deploymentTransaction().wait(2);
  console.log("succsses initialize contract instance");



  const photoURL = "URL_OF_YOUR_PHOTO";
  const tx = await contract.mintNFT(photoURL);
  await tx.wait();

  console.log("NFT minted successfully!");


  console.log("PhotoNFT deployed to:", tx.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  async function generateImage(prompt) {
    try {
      // Send a POST request to your handler with the prompt
      const response = await axios.post('/api/handler', { prompt });
  
      // Return the generated image URL from the response
      return response.data.imageUrl;
    } catch (error) {
      // Handle any errors
      console.error('Failed to generate image:', error);
      throw new Error('Failed to generate image');
    }
  }
  
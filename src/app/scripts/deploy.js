//contract address 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853

const hre = require("hardhat");
const ethers  = require("hardhat");
const axios = require('axios');

async function main() {
  console.log("start proccess");
  const provider = await new  hre.ethers.WebSocketProvider("wss://eth-sepolia.g.alchemy.com/v2/cn5RDhtPtfHG5JS_OQUprmQkypgmfozd");
  console.log("succsses initialize provider");
  const wallet = await new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
  console.log("succsses initialize wallet");
  const PhotoNFTfactory = await hre.ethers.getContractFactory("PhotoNFT",wallet);
  console.log("succsses initialize contract factory");
  const PhotoNFTcontract = await PhotoNFTfactory.deploy();
  await PhotoNFTcontract.deploymentTransaction();
  console.log("succsses initialize contract instance");
  const contract_addres = PhotoNFTcontract.target;
  console.log("contract address",contract_addres);

  const imageDescriberd = "Astronaut kicks a ball on the beach";
  const photoURL = generateImage(imageDescriberd);
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
  
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PhotoNFT is ERC721 {
    address public owner;
    uint256 public tokenIdCounter;
    mapping(uint256 => string) public tokenURIs;

    event TokenMinted(uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("PhotoNFT", "PHOTO") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function mintNFT(string memory _photoURI) external onlyOwner {
        uint256 tokenId = tokenIdCounter;
        tokenIdCounter++;
        _safeMint(msg.sender, tokenId);
        tokenURIs[tokenId] = _photoURI;
        emit TokenMinted(tokenId, _photoURI);
    }
}

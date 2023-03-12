// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @author Ismael Bautista
/// @title Call Permit NFT
/// @dev The smart contract uses the Call Permit precompile to implement Lazy Minting pattern
/// @custom:precompileaddress 0x000000000000000000000000000000000000080a
contract CallPermitNFT is ERC721URIStorage{

    /// @dev Address of message signer
    address immutable SIGNER_WALLET;
    /// @dev An incrementable counter to track NFT token ids
    uint256 counter;
    /// @dev An IPFS uri in the format ipfs://{CID}/{metadata}.json
    string private URI;

    constructor(address signer, string memory _uri) 
        ERC721("LazyMint", "lmNFT")         
    {        
        SIGNER_WALLET = signer;
        URI = _uri;
    }    


    /// @dev expects sender to be SIGNER_WALLET            
    modifier onlyAllowedBySigner(){
        require(msg.sender == SIGNER_WALLET);
        _;
    }

    /// @dev Mints an NFT Token using the Permit Call precompile    
    /// If successful the EIP712 nonce is increased to prevent this permit to be replayed.    
    /// @dev tx.origin = sender of the dispatch call
    /// @dev msg.sender = signer of the message/ "from" argument in dispatch call
    /// @custom:selector 24b04905
    /// @custom:minter tx.origin
    /// @custom:signer msg.sender
    function gift() public onlyAllowedBySigner{
        uint256 tokenId = counter;        
        _mint(tx.origin, tokenId);                
        _setTokenURI(tokenId, URI);
        counter++;
    }

}
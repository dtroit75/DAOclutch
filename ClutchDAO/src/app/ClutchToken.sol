
// SPDX-License-Identifier: MIT

pragma solidity 0.8.28; 

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MemeCoin 
 * @dev A simple meme coin token contract for educational purposes
 * @dev Don't use on a commercial scale as it is not audited.
 */

contract ClutchToken  is ERC20, Ownable {
    // Events to track token transfers, burns and mints
    event TokensSent(address indexed from, address indexed to, uint256 amount);
    event TokensBurned(address indexed burner, uint256 amount);
    event TokensMinted(address indexed recipient, uint256 amount);

    // Maximum supply of tokens (21 million with 18 decimals)
    uint256 public constant MAX_SUPPLY =  21_000_000e18
;

    constructor(string memory name,
                 string memory symbol) ERC20(name,symbol) Ownable(msg.sender) {
        // Mint initial supply to contract deployer (2 million tokens)
        _mint(msg.sender, 2_000_000e18);
    }

    /**
     * @dev Allows users to send tokens to another address
     * @param to The address to send tokens to
     * @param amount The amount of tokens to send
     * @return success Whether the transfer was successful
     */
    function sendTokens(address to, uint256 amount) public returns (bool success) {
        require(to != address(0), "Cannot send to zero address");
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Not enough tokens to send");

        _transfer(msg.sender, to, amount);
        emit TokensSent(msg.sender, to, amount);
        return true;
    }

    /**
     * @dev Allows users to send tokens to multiple addresses at once
     * @param recipients Array of addresses to send tokens to
     * @param amounts Array of token amounts to send
     */
    function multiSend(address[] calldata recipients, uint256[] calldata amounts) public {
        require(recipients.length == amounts.length, "Arrays must be same length");
        require(recipients.length > 0, "Must send to at least one recipient");

        uint256 totalAmount = 0;
        for(uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }

        require(balanceOf(msg.sender) >= totalAmount, "Insufficient balance for multi-send");

        for(uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "Cannot send to zero address");
            _transfer(msg.sender, recipients[i], amounts[i]);
            emit TokensSent(msg.sender, recipients[i], amounts[i]);
        }
    }

    /**
     * @dev Check the token balance of any address
     * @param account The address to check
     * @return The token balance of the address
     */
    function checkBalance(address account) public view returns (uint256) {
        return balanceOf(account);
    }

    /**
     * @dev Owner can mint new tokens up to MAX_SUPPLY
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");

        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Allows users to burn their own tokens
     * @param amount The amount of tokens to burn
     */
    function burn(uint256 amount) public {
        require(amount > 0, "Cannot burn zero tokens");
        require(balanceOf(msg.sender) >= amount, "Not enough tokens to burn");

        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }


    /**
     * @dev Get token information
     * @return name_ Token name
     * @return symbol_ Token symbol
     * @return decimals_ Token decimals
     * @return supply_ Current total supply
     */
    function getTokenInfo() public view returns (
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        uint256 supply_
    ) {
        return (
            name(),
            symbol(),
            decimals(),
            totalSupply()
        );
    }
}

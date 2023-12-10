// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;

import {MasalaWallet} from "contracts/MasalaWallet.sol";
import {ProofDS} from "contracts/Verifier.sol";

interface IVerifier {
    function verifyTx(
        ProofDS.Proof memory proof,
        uint[3] memory input
    ) external view returns (bool);
}

interface IMasalaWallet {
    function executeExternalTx(
        address callee,
        uint256 value,
        bytes memory data
    ) external returns (bytes memory bytesValues);
}

contract MasalaMaster {
    /************************************************
     *  STORAGE
     ***********************************************/

    // Struct storing all relevant info for a username
    struct UserInfo {
        bool registered;
        address walletAddress;
    }
    /// @notice map usernames to a struct storing all required info
    mapping(string => UserInfo) public usernameInfo;
    /// @notice map used nonces of usernames
    mapping(string => mapping(uint => bool)) private nonceUsedByUsername;
    /// @notice address of the verifier contract
    address public verifierContract;

    /// @notice map the usernames to the password hash
    mapping(string => uint256[2]) public userPasswordHash;

    event WalletDeployed(address indexed newWallet, string indexed username);
    event WalletTxExecuted(
        string indexed username,
        address indexed walletAddress,
        uint blocknumber,
        bytes executedData
    );

    constructor(address _verifierContract) {
        verifierContract = _verifierContract;
    }

    function newWallet(
        string memory _username,
        uint256[2] memory _passwordHash
    ) public returns (address) {
        require(
            usernameInfo[_username].registered == false,
            "Username is already taken"
        );
        address _walletAddress = _deployWalletContract(_username);
        usernameInfo[_username] = UserInfo(true, _walletAddress);
        // usernameRegistered[_username] = true;
        userPasswordHash[_username] = _passwordHash;
        // walletAddressOfUsername[_username] = _walletAddress;
        emit WalletDeployed(_walletAddress, _username);
        return _walletAddress;
    }

    function _deployWalletContract(
        string memory _username
    ) internal returns (address) {
        // Create a new instance of the MasalaWallet contract
        MasalaWallet newWalletContract = new MasalaWallet(_username);
        // Return the address of the newly deployed wallet contract
        return address(newWalletContract);
    }

    function executeWalletTx(
        ProofDS.Proof memory proof,
        string memory _username,
        uint256 nonce,
        address callee,
        uint256 value,
        bytes memory data
    ) public returns (bytes memory) {
        require(
            usernameInfo[_username].registered == true,
            "Username is not registered"
        );
        require(
            nonceUsedByUsername[_username][nonce] == false,
            "Invalid nonce"
        );
        UserInfo memory details = usernameInfo[_username];
        uint[3] memory inputs = [
            userPasswordHash[_username][0],
            userPasswordHash[_username][1],
            nonce
        ];
        bool verificationSuccess = IVerifier(verifierContract).verifyTx(
            proof,
            inputs
        );
        require(verificationSuccess, "zkSNARK verification failed");

        IMasalaWallet contractInstance = IMasalaWallet(details.walletAddress);
        bytes memory result = contractInstance.executeExternalTx(
            callee,
            value,
            data
        );

        nonceUsedByUsername[_username][nonce] = true;
        emit WalletTxExecuted(
            _username,
            details.walletAddress,
            block.number,
            data
        );

        return result;
    }
}

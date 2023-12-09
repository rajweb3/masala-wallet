// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import {IERC721Receiver} from "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/token/ERC721/IERC721Receiver.sol";
import {IERC1155Receiver} from "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/token/ERC1155/IERC1155Receiver.sol";
import {ReentrancyGuard} from "contracts/ReentrancyGuard.sol";

contract MasalaWallet is ReentrancyGuard, IERC721Receiver, IERC1155Receiver {
    /************************************************
     *  STORAGE
     ***********************************************/

    /// @notice master contract
    address public masterContract;
    /// @notice username of wallet owner
    string public username;

    /************************************************
     *  MODIFIERS & EVENTS
     ***********************************************/

    modifier onlyMaster() {
        require(msg.sender == masterContract, "only master");
        _;
    }

    /// @notice emitted when an external transaction/transfer is executed
    event TransactionExecuted(
        address indexed callee,
        uint256 value,
        bytes data
    );

    constructor(string memory _username) {
        masterContract = msg.sender;
        username = _username;
    }

    /************************************************
     *  External Transaction Execution
     ***********************************************/

    /**
     * @notice Allows owner to execute an arbitrary transaction
     * @dev to transfer ETH to an EOA, pass in empty string for data parameter
     * @param callee - contract/EOA to call/transfer to
     * @param value - value to pass to callee from wallet balance
     * @param data - data to pass to callee
     * @return result of the external call
     */

    function executeExternalTx(
        address callee,
        uint256 value,
        bytes memory data
    ) external onlyMaster nonReentrant returns (bytes memory) {
        (bool success, bytes memory result) = callee.call{value: value}(data);
        require(success, "external call reverted");
        emit TransactionExecuted(callee, value, data);
        return result;
    }

    /************************************************
     *  Receiver Standards
     ***********************************************/

    /**
     * @inheritdoc IERC721Receiver
     */
    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /**
     * @inheritdoc IERC1155Receiver
     */
    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    /**
     * @inheritdoc IERC1155Receiver
     */
    function onERC1155BatchReceived(
        address,
        address,
        uint256[] calldata,
        uint256[] calldata,
        bytes calldata
    ) external pure returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    /**
     * @dev Support for EIP 165
     * not really sure if anyone uses this though...
     */
    function supportsInterface(bytes4 interfaceId)
        external
        pure
        returns (bool)
    {
        if (
            interfaceId == 0x01ffc9a7 || // ERC165 interfaceID
            interfaceId == 0x150b7a02 || // ERC721TokenReceiver interfaceID
            interfaceId == 0x4e2312e0 // ERC1155TokenReceiver interfaceID
        ) {
            return true;
        }
        return false;
    }

    fallback() external payable {}

    receive() external payable {}
}

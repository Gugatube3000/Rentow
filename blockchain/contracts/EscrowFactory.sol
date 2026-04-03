// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RentEscrow.sol";

/**
 * @title EscrowFactory
 * @notice Factory contract that creates and tracks RentEscrow instances.
 *         Users call createEscrow() with ETH to deploy a new escrow contract.
 */
contract EscrowFactory {
    // ── State ───────────────────────────────────────────────
    address[] public allEscrows;
    mapping(address => address[]) public userEscrows; // wallet → escrow[]

    // ── Events ──────────────────────────────────────────────
    event EscrowCreated(
        address indexed escrowAddress,
        address indexed tenant,
        address indexed landlord,
        uint256 amount,
        uint256 durationSeconds,
        uint256 yieldPercent
    );

    // ── Core ────────────────────────────────────────────────

    /**
     * @notice Deploy a new RentEscrow contract funded with msg.value.
     * @param _landlord        Wallet that receives rent on release
     * @param _durationSeconds Seconds until the refund deadline
     * @param _yieldPercent    Yield % returned to tenant on release
     */
    function createEscrow(
        address _landlord,
        uint256 _durationSeconds,
        uint256 _yieldPercent
    ) external payable returns (address) {
        require(msg.value > 0, "Must send ETH as deposit");
        require(_landlord != address(0), "Invalid landlord address");
        require(_landlord != msg.sender, "Landlord cannot be tenant");

        // Deploy the escrow — constructor is payable, forwards msg.value
        RentEscrow escrow = new RentEscrow{value: msg.value}(
            _landlord,
            _durationSeconds,
            _yieldPercent
        );

        address escrowAddr = address(escrow);

        // Track the escrow
        allEscrows.push(escrowAddr);
        userEscrows[msg.sender].push(escrowAddr);   // tenant
        userEscrows[_landlord].push(escrowAddr);     // landlord

        emit EscrowCreated(
            escrowAddr,
            msg.sender,
            _landlord,
            msg.value,
            _durationSeconds,
            _yieldPercent
        );

        return escrowAddr;
    }

    // ── Views ───────────────────────────────────────────────

    /// @notice Get all escrow addresses ever created
    function getAllEscrows() external view returns (address[] memory) {
        return allEscrows;
    }

    /// @notice Get escrow addresses linked to a particular wallet
    function getEscrows(address _user) external view returns (address[] memory) {
        return userEscrows[_user];
    }

    /// @notice Total number of escrows created
    function totalEscrows() external view returns (uint256) {
        return allEscrows.length;
    }
}

import hre from "hardhat";

async function main() {
  const { ethers } = await hre.network.connect();
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy the EscrowFactory
  const factory = await ethers.deployContract("EscrowFactory");
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();

  console.log("");
  console.log("═══════════════════════════════════════════════════");
  console.log("  ✅ EscrowFactory deployed at:", factoryAddress);
  console.log("═══════════════════════════════════════════════════");
  console.log("");
  console.log("Set this in your environment:");
  console.log(`  FACTORY_ADDRESS=${factoryAddress}`);
  console.log(`  NEXT_PUBLIC_FACTORY_ADDRESS=${factoryAddress}`);
  console.log("");

  // Optional: create a demo escrow for testing
  const landlordAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const durationSeconds = 7 * 24 * 60 * 60; // 7 days
  const yieldPercent = 3;
  const depositAmount = ethers.parseEther("1");

  console.log("Creating demo escrow...");
  const tx = await factory.createEscrow(
    landlordAddress,
    durationSeconds,
    yieldPercent,
    { value: depositAmount }
  );
  const receipt = await tx.wait();

  // Parse EscrowCreated event from receipt
  const event = receipt.logs.find(
    (log) => {
      try {
        return factory.interface.parseLog(log)?.name === "EscrowCreated";
      } catch { return false; }
    }
  );
  
  if (event) {
    const parsed = factory.interface.parseLog(event);
    console.log("  📝 Demo escrow at:", parsed.args.escrowAddress);
    console.log("  👤 Tenant:", parsed.args.tenant);
    console.log("  🏠 Landlord:", parsed.args.landlord);
    console.log("  💰 Amount:", ethers.formatEther(parsed.args.amount), "ETH");
  }

  console.log("");
  console.log("Total escrows:", (await factory.totalEscrows()).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
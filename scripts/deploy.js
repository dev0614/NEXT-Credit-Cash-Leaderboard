async function main() {
    const HelloWorld = await ethers.getContractFactory("ERC20");
 
    // Start deployment, returning a promise that resolves to a contract object
    const erc20 = await HelloWorld.deploy("ERC20");
    console.log("Contract deployed to address:", erc20.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
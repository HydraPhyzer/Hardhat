const { ethers } = require("hardhat");

async function main(){
    const [deployer]=await ethers.getSigners();
    
    const Token=await ethers.getContractFactory("Token");
    const Instance=await Token.deploy();
    console.log("Contrac Adress is ",Instance.address);
}

main().then(()=>process.exit(0))
.catch((Err)=>{
    console.log(Err);
    process.exit(1);
})
const {expect}=require("chai")

describe("Token Contract", function(){
    let Token;
    let HardHatToken;
    let Owner,Add1,Add2,Address;

    beforeEach(async function(){
        Token=await ethers.getContractFactory("Token");
        [Owner,Add1,Add2,Address]=await ethers.getSigners();
        HardHatToken=await Token.deploy();
    })

    describe("Deployment", function(){
        it("Should Set Right Owner",async()=>{
            expect(await HardHatToken.Manager()).to.equal(Owner.address);
        })
        it("Shpuld Assign Total Supply to Owner",async()=>{
            expect(await HardHatToken.Balance(Owner.address)).to.equal(await HardHatToken.Supply());
        })
    })
    describe("Transaction",async()=>{
        it("Should Transfer Tokens Between Accounts",async()=>{
            await HardHatToken.Transfer(Add1.address,50)
            expect(await HardHatToken.Balance(Add1.address)).to.equal(50)

            await HardHatToken.connect(Add1).Transfer(Add2.address,10)
            expect(await HardHatToken.Balance(Add2.address)).to.equal(10)

            expect(await HardHatToken.Balance(Add1.address)).to.equal(40)
            expect(await HardHatToken.Balance(Owner.address)).to.equal(await HardHatToken.Supply()-50)
        })
        it("Should Fail If Not Enoug Tokens",async()=>{
            const InitialBalance=await HardHatToken.Balance(Owner.address) //1000
            await expect(HardHatToken.connect(Add1).Transfer(Add2.address,1))
            .to.be.revertedWith("Not Enough Balance") //Sould Fail, Bez Initially Add2 Have 0 Token
            expect(await HardHatToken.Balance(Owner.address)).to.equal(InitialBalance)
        })
    })
    it("Should Update Balance After Transactions",async()=>{
        const InitialBalance=await HardHatToken.Balance(Owner.address) //1000
        await HardHatToken.Transfer(Add1.address,5)
        await HardHatToken.Transfer(Add2.address,10)

        expect(await HardHatToken.Balance(Owner.address)).to.equal(InitialBalance-15)
        expect(await HardHatToken.Balance(Add1.address)).to.equal(5)
        expect(await HardHatToken.Balance(Add2.address)).to.equal(10)

    })
})
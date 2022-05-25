const { expect } = require("chai");
const {ethers} = require("hardhat")

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    let Token = await ethers.getContractFactory("TMAC");

    Token = await Token.deploy("1000");

    const ownerBalance = await Token.balanceOf(owner.address);
    expect(await Token.totalSupply()).to.equal(ownerBalance);
  });
});

describe("Token contract", function () {
    it("transfer function should work when num_tokens<balance of the sender", async function () {
      const [owner,receipient] = await ethers.getSigners();
  
      let Token = await ethers.getContractFactory("TMAC");
  
      Token = await Token.deploy("1000");

      const num_tokens=100;
    
      await Token.transfer(receipient.address,num_tokens)
  
      const receipientBalance = await Token.balanceOf(receipient.address);
      expect(num_tokens).to.equal(receipientBalance);
    });
  });

  describe("Token contract", function () {
    it("transfer function should fail when num_tokens>balance of the sender", async function () {
      const [owner,receipient] = await ethers.getSigners();
  
      let Token = await ethers.getContractFactory("TMAC");
  
      Token = await Token.deploy("1000");

      const num_tokens=100000;
    
      await Token.transfer(receipient.address,num_tokens)
  
      const receipientBalance = await Token.balanceOf(receipient.address);
      expect(0).to.equal(receipientBalance);
    });
  });

  describe("Token contract", function () {
    it("transferFrom function should work when num_tokens<allowed[owner][sender]", async function () {
      const [owner,sender,receipient] = await ethers.getSigners();
  
      let Token = await ethers.getContractFactory("TMAC");
  
      Token = await Token.deploy("1000");

      const num_tokens=100;

      await Token.approve(sender.address,num_tokens)

      await Token.connect(sender).transferFrom(owner.address,receipient.address,num_tokens);
  
      const receipientBalance = await Token.balanceOf(receipient.address);
      expect(num_tokens).to.equal(receipientBalance);
    });
  });

  describe("Token contract", function () {
    it("transferFrom function should fail when num_tokens>allowed[owner][sender]", async function () {
      const [owner,sender,receipient] = await ethers.getSigners();
  
      let Token = await ethers.getContractFactory("TMAC");
  
      Token = await Token.deploy("1000");

      const num_tokens=100000;

      await Token.approve(sender.address,num_tokens)

      await Token.connect(sender).transferFrom(owner.address,receipient.address,num_tokens);
  
      const receipientBalance = await Token.balanceOf(receipient.address);
      expect(0).to.equal(receipientBalance);
    });
  });

  describe("Token contract", function () {
    it("changeOwner function should work only when msg.sender is owner", async function () {
      const [owner,add1] = await ethers.getSigners();
  
      let Token = await ethers.getContractFactory("TMAC");
  
      Token = await Token.deploy("1000");

      

      await Token.changeOwner(add1.address);

      const newOwner = await Token.owner();
      expect(newOwner).to.equal(add1.address);
    });
  });

  describe("Token contract", function () {
    it("changeOwner function should fail  when msg.sender is not owner", async function () {
      const [owner,add1] = await ethers.getSigners();
  
      let Token = await ethers.getContractFactory("TMAC");
  
      Token = await Token.deploy("1000");

      

      await Token.connect(add1).changeOwner(add1.address);

      const newOwner = await Token.owner();
      expect(newOwner).to.equal(owner.address);
    });
  });

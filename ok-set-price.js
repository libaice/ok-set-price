const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(
    `https://exchainrpc.okex.org`
);

const ERC20_ABI = [
    "function setPriceInner(address[] memory underlying, uint[] memory price) public ",
];

const privateKey = "";
const wallet = new ethers.Wallet(privateKey, provider);

const oracleAddress = "0xE22Cb9130Bd80Fc423F201a7F24fAF4E2D63Aa17";
const PriceOracle = new ethers.Contract(oracleAddress, ERC20_ABI, provider);


const ETHK = '0xef71ca2ee68f45b9ad6f72fbdb33d707b872315c'

const main = async () => {
    const contractWallet = PriceOracle.connect(wallet);
    const tx = await contractWallet.setPriceInner([ETHK], [ethers.utils.parseEther('1525.83')])
    await tx.wait()
    console.log(tx.hash());
};

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

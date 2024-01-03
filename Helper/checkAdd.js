import web3 from "@solana/web3.js";

const connection = new web3.Connection("https://go.getblock.io/b10d6168df744bd9b8f1e0f9acf18644");

const checkAdd = (address) => {
    let publicKey;
    try{
   publicKey = new web3.PublicKey(address);
    }catch(err){
        return false;
    }
  return connection
    .getAccountInfo(publicKey)
    .then((accountInfo) => accountInfo !== null)
    .catch(() => false);
};

export default checkAdd;

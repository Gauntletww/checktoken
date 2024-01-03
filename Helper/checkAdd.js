import web3 from "@solana/web3.js";

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));

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

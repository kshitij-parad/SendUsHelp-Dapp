// import { ethers } from "ethers";

import Buy from "./components/Buy";
import Memos from "./components/Memos";

import { useState, useEffect } from "react";
import abi from "./contractAbi/sendHelp.json"

import donate from "./donate.jpg"
import './App.css';

const ethers = require(`ethers`)

function App() {

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const [account, setAccount] = useState("None");
  const [totalDonation, setTotalDonation] = useState(0);

  useEffect(() => {
    const connectionWallet = async () => {
      const contractAdd = "0xF89865C6A7BDdf5DA6BcaaA3B372e2271D09dC1A";
      const contractAbi = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);

          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAdd, contractAbi, signer);

          setAccount(account);
          setState({ provider, signer, contract })

          const totalDonationBigNum = await contract.getContactBal();
          const totalDonationH = ethers.utils.formatEther(totalDonationBigNum);
          setTotalDonation(totalDonationH);
          console.log(ethers.utils.formatEther(totalDonationBigNum));

        }
        else {
          alert("Install Metamask");
        }
      }
      catch (error) {
        console.log(error);
      }
    };
    connectionWallet();
  }, []);
  return (
    <>
      <div className="App"></div>
      <img src={donate} className="img-fluid" alt=".." height="10" />

      <div className="jumbotron">
        <h1 className="display-5">Total Donation : {totalDonation + " .ETH"}</h1>
        
      </div>
      <div className="jumbotron">
        <h1 className="display-5">Connect Accounts : {account}</h1>
      </div>
      <Buy state={state}></Buy>
      <Memos state={state}></Memos>
    </>
  );
}

export default App;


// 0x7876a5cc6462b99fc73047602190d43ef7c2c6f0
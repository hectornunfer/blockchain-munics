import React, { useCallback, useEffect, useState } from "react";
import './App.css';
import { create } from 'kubo-rpc-client'
import { ethers } from "ethers"
import logo from "./meteorLogo.png"
import { addresses, abis } from "./contracts"
import TopBar from './components/TopBar'; // Import the TopBar component


const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000";

const defaultProvider = new ethers.providers.Web3Provider(window.ethereum);
const ipfsContract = new ethers.Contract(
  addresses.ipfs,
  abis.ipfs,
  defaultProvider
);

async function readCurrentUserFile() {
  const result = await ipfsContract.userFiles(
    defaultProvider.getSigner().getAddress()
  );
  console.log({ result });
  return result;
}

function App() {
  const [ipfsHash, setIpfsHash] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    window.ethereum.enable();
  }, []);


  useEffect(() => {
    async function readFile() {
      const file = await readCurrentUserFile();
      if (file !== ZERO_ADDRESS) setIpfsHash(file);
    }
    readFile();
  }, []);

  async function setFileIPFS(hash) {
    const ipfsWithSigner = ipfsContract.connect(defaultProvider.getSigner());
    console.log("TX contract");
    const tx = await ipfsWithSigner.setFileIPFS(hash);
    console.log({ tx });
    setIpfsHash(hash);
    setFile(null);
    setIsSubmitting(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSubmitting && file) {
      setIsSubmitting(true);
    }

    try {
      console.log(file)
      // conectar a la instancia en local de ipfs
      const client = await create('/ip4/127.0.0.1/tcp/5001')
      // añadir le archivo a ipfs
      const result = await client.add(file)
      // añadir al fs del nodo ipfs en local para poder visualizarlo en el dashboard
      await client.files.cp(`/ipfs/${result.cid}`, `/${result.cid}`)
      console.log(result.cid)
      // añadir el CID de ipfs a ethereum a traves del smart contract
      await setFileIPFS(result.cid.toString());
    } catch (error) {
      alert("Imposible enviar las mediciones");
      setFile(null);
      setIsSubmitting(false);
    }
  };
  const handleFileChange = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    }
    e.preventDefault();
  }
  return (
    <div className="App">
      <header className="App-header">
        <TopBar />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Upload a file to store it on IPFS and save the hash on ethereum.
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <input type="file" name="data" onChange={handleFileChange} accept=".csv"/>
          <button type="submit" className="btn" disabled={!file || isSubmitting}>Upload</button>
          {file && (
            <div className="selected-file-preview">
              <p>Selected File: {file.name}</p>
              <p>File Size: {file.size} bytes</p>
            </div>
          )}
        </form>
      </header>
    </div>
  );
}

export default App;

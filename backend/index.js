import { ethers } from "ethers";
import { runDeployment } from "./scripts/deploy";

function App() {
  const deployContract = async () => {
    await runDeployment(); // This will call your deployment function
  };

  return (
    <div>
      <button onClick={deployContract}>Deploy Contract</button>
    </div>
  );
}

export default App;

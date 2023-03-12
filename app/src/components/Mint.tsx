import { useContractWrite, usePrepareContractWrite } from "wagmi";
import PRECOMPILE_ABI from "@/utils/abi/CallPermit.json";
import SpinnerIcon from "./Icons/SpinnerIcon";
import ErrorIcon from "./Icons/ErrorIcon";
import SuccessIcon from "./Icons/SuccessIcon";
import {ethers} from "ethers";

export default function Mint({ info }: { info: BackendResponse }) {
    const { config, error } = usePrepareContractWrite({
      address: "0x000000000000000000000000000000000000080a",
      abi: PRECOMPILE_ABI.abi,
      functionName: "dispatch",
      args: [
        info.message.from,
        info.message.to,
        info.message.value,
        info.message.data,
        info.message.gaslimit,
        info.message.deadline,
        info.signature.v,
        info.signature.r,
        info.signature.s,
      ],
      overrides:{
        gasLimit: ethers.BigNumber.from(100_000)
      }
    });

    const { write, isLoading, isSuccess, isError, error:contractWriteError } = useContractWrite(config);
    

      return (
        <div className="grid grid-cols-2">
          <button
            onClick={()=>write?.()}
            disabled={!write}
            className={'disabled:opacity-25 w-full text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'}
          >
            Mint            
          </button>       
          <div className="flex items-center justify-center flex-wrap">
            {isLoading &&  <span className="text-sm text-orange-400 flex flex-wrap"><SpinnerIcon color="orange"/> Waiting...</span>}
            {isError && <span className="text-sm text-red-400 flex flex-wrap"><ErrorIcon/> {contractWriteError?.message}</span>}
            {isSuccess && <span className="text-sm text-green-400 flex flex-wrap"><SuccessIcon/>Transaction sent!</span>}
          </div>   
          
        </div>
      )


  }
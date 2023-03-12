import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function NFTInfo(){
    const [state,setState] = useState({
      name:"",
      description:"",
      image:""
    })
    const [loaded,setLoaded] = useState(false);
  
    useEffect(() => {    
      const fetchData = async () => {
        try {
          
          const res = await fetch(process.env.NEXT_PUBLIC_NFT_URI);
          const json = await res.json();
          const hash = json.image.split("/")[2]
          const fileName = json.image.split("/")[3]
          setState({image:`https://${hash}.ipfs.dweb.link/${fileName}`,name:json.name, description:json.description})                    
          setLoaded(true)
        } catch (error) {
          
        } finally{        
        }
        
      };
      fetchData();
    }, []);
  
    if(!loaded){
      return <Loading />
    }
  
    return(
      <div className="border-2 rounded-lg shadow-lg p-2.5 flex flex-col items-center">
        <p className="text-sm mb-4">The following NFT will be minted</p>
        <Image src={state.image ? state.image : "/images/blurPlaceholder.gif"} alt="nft image" width={256} height={256} placeholder="blur" blurDataURL="/images/blurPlaceholder.gif" className="rounded-lg shadow-2xl"/>      
        <p className="text-2xl text-gray-600 drop-shadow"><span className="">{state.name}</span></p>
        <p className="text-xl text-gray-600 drop-shadow">{state.description}</p>      
      </div>
    )
  }
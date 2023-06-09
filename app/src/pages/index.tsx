import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import NFTInfo from "@/components/NFTInfo";
import MintContainer from "@/components/MintContainer";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";

export default function Home() {  
  const [data, setData] = useState<BackendResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/nonce");
      const json = (await res.json()) as BackendResponse;
      setData(json);
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Permit Precompile Example</title>
        <meta name="description" content="An example on how to use Call Permit precompile using hardhat and next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto p-2">
        <Header />
        <div className="my-2 text-center p-4 ">
          <p className="text-xl ">This is a demo showing how to create a Lazy Minting pattern on Moonbeam/Moonriver/Moonbase Alpha using the Permit Precompile</p>          
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <NFTInfo/>
          {data ? <MintContainer info={data} /> : <Loading />}
        </div>
        <Footer />
      </div>
    </>
  );
}

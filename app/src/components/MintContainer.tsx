import Mint from "./Mint";

export default function MintContainer({ info }: { info: BackendResponse }) {
    return (
      <div className="">
        <Mint info={info}/>
        <div className="border p-2 rounded-lg shadow">
          <p className="text-xl">
            Dispatch call to Permit Precompile to Mint an NFT
          </p>
            <div className="grid grid-cols-2 gap-1">
              {Object.keys(info.message).map((key) => (
                <label
                  key={key}
                  className="flex flex-wrap flex-col text-sm"
                >
                  <span className="font-medium">{key}</span> 
                  <input
                    value={info.message[key as keyof CallPermitMessage].toString()}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1"
                  />
                </label>
              ))}
              {Object.keys(info.signature).map((key) => (
                <label
                  key={key}
                  className="flex flex-wrap flex-col text-sm"
                >
                  <span className="font-medium">{key}</span> 
                  <input
                    value={info.signature[
                      key as keyof CustomSignatureType
                    ].toString()}
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1"
                  />
                </label>
              ))}
            </div>
        </div>
      </div>
    );
  }
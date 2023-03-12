declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key:string]:string
            RPC:string
            PRIVATE_KEY:string
            ERC721_ADDRESS:string
            NEXT_PUBLIC_NFT_URI:string
        }
    }
}

export {}
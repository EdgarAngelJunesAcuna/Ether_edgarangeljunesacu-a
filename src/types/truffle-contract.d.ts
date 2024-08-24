declare module '@truffle/contract' {
    interface TruffleContractInstance {
      address: string;
      sendTransaction(options: any): Promise<any>;
      // Puedes agregar más métodos y propiedades según tus necesidades.
    }
  
    interface TruffleContract {
      setProvider(provider: any): void;
      deployed(): Promise<TruffleContractInstance>;
      at(address: string): Promise<TruffleContractInstance>;
    }
  
    export default function(contract: any): TruffleContract;
  }
  
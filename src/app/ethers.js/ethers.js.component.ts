import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ethers, providers, utils } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Component({
  selector: 'app-ethers-js',
  templateUrl: './ethers.js.component.html',
  styleUrls: ['./ethers.js.component.css']
})
export class EthersJsComponent implements OnInit {
  account: string | undefined;
  balance: string | undefined;
  provider: providers.Web3Provider | undefined;
  signer: ethers.Signer | undefined;
  connectionMessage: string | undefined;  // Nueva propiedad para el mensaje

  constructor(private cd: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      this.provider = new providers.Web3Provider(window.ethereum);
      await this.connectMetaMask();
    } else {
      console.error('MetaMask is not installed.');
    }
  }

  async connectMetaMask() {
    if (this.provider) {
      try {
        const accounts = await this.provider.send("eth_requestAccounts", []);
        this.account = accounts[0];
        console.log(`Connected account: ${this.account}`);

        this.signer = this.provider.getSigner();

        if (this.account) {
          console.log('Fetching balance for account:', this.account);
          const balanceBigNumber = await this.provider.getBalance(this.account);
          console.log('Raw balance:', balanceBigNumber.toString());
          this.balance = utils.formatEther(balanceBigNumber);
          console.log(`Formatted balance: ${this.balance} ETH`);

          // Mostrar un mensaje de éxito al conectar MetaMask
          this.connectionMessage = "Conexión exitosa: ¡Recompensa reclamada!";
          
          // Forzar la detección de cambios
          this.cd.detectChanges();
        }
      } catch (error) {
        console.error('Error connecting MetaMask:', error);
        this.connectionMessage = "Error al conectar MetaMask.";
      }
    } else {
      alert('MetaMask not detected!');
    }
  }

  async sendTransaction() {
    if (this.signer) {
      try {
        const tx = await this.signer.sendTransaction({
          to: "0xRecipientAddressHere", // Reemplaza con la dirección del destinatario
          value: utils.parseEther("0.01") // Cantidad de ETH a enviar
        });
        console.log('Transaction hash:', tx.hash);
        await tx.wait();
        console.log('Transaction confirmed:', tx);
      } catch (error) {
        console.error('Error sending transaction:', error);
      }
    }
  }
}

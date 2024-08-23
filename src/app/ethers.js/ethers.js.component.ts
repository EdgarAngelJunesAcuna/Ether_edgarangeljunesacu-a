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
  connectionMessage: string | undefined;
  lastClaimTime: number | undefined;
  targetAccount: string = '';

  private readonly REWARD_INTERVAL = 3600000; // 1 hora en milisegundos
  private readonly REWARD_AMOUNT = "0.01"; // Cantidad de ETH a enviar como recompensa

  constructor(private cd: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      this.provider = new providers.Web3Provider(window.ethereum);
    } else {
      console.error('MetaMask is not installed.');
    }
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.targetAccount = inputElement.value;
  }

  async connectMetaMask() {
    if (this.provider) {
      try {
        const accounts = await this.provider.send("eth_requestAccounts", []);
        this.account = accounts[0].toLowerCase(); // Convertir a minúsculas
        const targetAccountNormalized = this.targetAccount.toLowerCase(); // Convertir a minúsculas

        console.log(`Connected account: ${this.account}`);

        if (this.account === targetAccountNormalized) {
          const now = Date.now();

          if (!this.lastClaimTime || (now - this.lastClaimTime) > this.REWARD_INTERVAL) {
            this.signer = this.provider.getSigner();
            const balanceBigNumber = await this.provider.getBalance(this.account);
            this.balance = utils.formatEther(balanceBigNumber);

            // Enviar la recompensa (ETH)
            const tx = await this.signer.sendTransaction({
              to: this.targetAccount, // La cuenta objetivo que ingresó el usuario
              value: utils.parseEther(this.REWARD_AMOUNT) // Cantidad de ETH a enviar
            });

            console.log('Transaction hash:', tx.hash);
            await tx.wait(); // Esperar a que la transacción se confirme

            this.connectionMessage = "Conexión exitosa: ¡Recompensa reclamada! Vuelva en 1 hora para reclamar su siguiente recompensa.";
            this.lastClaimTime = now;
          } else {
            this.connectionMessage = "Ya has reclamado tu recompensa. Vuelve en 1 hora.";
          }
        } else {
          this.connectionMessage = "Cuenta no válida. Conéctese con la cuenta correcta para reclamar su recompensa.";
        }

        this.cd.detectChanges();

      } catch (error) {
        console.error('Error connecting MetaMask or sending transaction:', error);
        this.connectionMessage = "Error al conectar MetaMask o enviar la recompensa.";
        this.cd.detectChanges();
      }
    } else {
      alert('MetaMask not detected!');
    }
  }
}

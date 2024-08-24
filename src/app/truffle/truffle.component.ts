import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Web3 from 'web3';
import MyContractArtifact from '../../../build/contracts/SimpleStorage.json';
import { CommonModule } from '@angular/common'; // Importa CommonModule

declare global {
  interface Window {
    ethereum: any;
  }
}

@Component({
  selector: 'app-truffle',
  standalone: true, // Marca el componente como standalone
  imports: [CommonModule], // Importa CommonModule aquí
  templateUrl: './truffle.component.html',
  styleUrls: ['./truffle.component.css']
})
export class TruffleComponent implements OnInit {
  account: string | undefined;
  balance: string | undefined;
  web3: Web3 | undefined;
  myContract: any;
  transactionCount: number | undefined;
  loading: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask está instalado.');
      this.web3 = new Web3(window.ethereum);
    } else {
      console.error('MetaMask no está instalado.');
    }
  }

  async fetchAccountInfo() {
    if (this.web3 && this.account) {
      this.loading = true;
      try {
        const balanceWei = await this.web3.eth.getBalance(this.account);
        this.balance = this.web3.utils.fromWei(balanceWei, 'ether');
        const transactionCountBigInt = await this.web3.eth.getTransactionCount(this.account);
        this.transactionCount = Number(transactionCountBigInt);
        this.cd.detectChanges();
      } catch (error) {
        console.error('Error al obtener la información de la cuenta:', error);
      } finally {
        this.loading = false;
        this.cd.detectChanges();
      }
    }
  }

  onAccountInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.account = inputElement.value;
  }
}

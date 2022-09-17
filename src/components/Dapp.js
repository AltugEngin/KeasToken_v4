import React from "react";

import { ethers } from "ethers";

import TokenArtifact from "./Token.json";
import contractAddress from "./contract-address.json";

import { NoWalletDetected } from "./NoWalletDetected";
import { ConnectWallet } from "./ConnectWallet";
import { Loading } from "./Loading";
import { Transfer } from "./Transfer";
import { AddApprover } from "./AddApprover";
import { RemoveApprover } from "./RemoveApprover";
import { ReadApproversCount } from "./ReadApproversCount";
import { TransactionErrorMessage } from "./TransactionErrorMessage";
import { WaitingForTransactionMessage } from "./WaitingForTransactionMessage";
import { NoTokensMessage } from "./NoTokensMessage";
import { AddKaizen } from "./AddKaizen";
import { Pay } from "./Pay";
import { Vote } from "./Vote";
import { supabase } from "../supabaseClient";
import { TableData } from "./Read";

const HARDHAT_NETWORK_ID = "5";

const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

export class Dapp extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      tokenData: undefined,

      selectedAddress: undefined,
      balance: undefined,

      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
      approversCount: undefined,
    };

    this.state = this.initialState;
  }

  render() {
    if (window.ethereum === undefined) {
      return <NoWalletDetected />;
    }

    if (!this.state.selectedAddress) {
      return (
        <ConnectWallet
          connectWallet={() => this._connectWallet()}
          networkError={this.state.networkError}
          dismiss={() => this._dismissNetworkError()}
        />
      );
    }

    if (!this.state.tokenData || !this.state.balance) {
      return <Loading />;
    }

    if (
      this.state.selectedAddress == "0x58fbbd0b6a3c57232a652e18d21671d88df0cd5e"
    ) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h5>
                {this.state.tokenData.name} ({this.state.tokenData.symbol})
              </h5>
              <p>
                Hoşgeldin <b>{this.state.selectedAddress}</b>,
              </p>
              <p>
                <b>
                  {this.state.balance.toString()} {this.state.tokenData.symbol}
                </b>
                'ın var.
              </p>
              <h5>
                Kaizen önerisi onaylayıcı sayısı:{" "}
                {this.state.approversCount.toString()}
              </h5>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {/* 
           
          */}
              {this.state.txBeingSent && (
                <WaitingForTransactionMessage txHash={this.state.txBeingSent} />
              )}

              {/* 
           
          */}
              {this.state.transactionError && (
                <TransactionErrorMessage
                  message={this._getRpcErrorMessage(
                    this.state.transactionError
                  )}
                  dismiss={() => this._dismissTransactionError()}
                />
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <AddApprover
                _addApprover={(_approver, _name, _surname) =>
                  this._addApprover(_approver, _name, _surname)
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {/*
            
          */}

              <RemoveApprover
                _removeApprover={(_approver) => this._removeApprover(_approver)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {/*
            
          */}

              <AddKaizen
                _addKaizen={(_kaizen, _aciklama) =>
                  this._addKaizen(_kaizen, _aciklama)
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {/*
            
          */}

              <Vote _vote={(_kaizen) => this._vote(_kaizen)} />
            </div>
          </div>
          <div className="row">
            <div className="col-12"></div>
            <TableData></TableData>
          </div>
        </div>
      );
    }

    return (
      <div className="container p-4">
        <div className="row">
          <div className="col-12">
            <h5>
              {this.state.tokenData.name} ({this.state.tokenData.symbol})
            </h5>
            <p>
              Hoşgeldin <b>{this.state.selectedAddress}</b>,
            </p>
            <p>
              <b>
                {this.state.balance.toString()} {this.state.tokenData.symbol}
              </b>
              'ın var.
            </p>
            <h5>
              Kaizen önerisi onaylayıcı sayısı:{" "}
              {this.state.approversCount.toString()}
            </h5>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {/* 
              
            */}
            {this.state.txBeingSent && (
              <WaitingForTransactionMessage txHash={this.state.txBeingSent} />
            )}

            {/* 
             
            */}
            {this.state.transactionError && (
              <TransactionErrorMessage
                message={this._getRpcErrorMessage(this.state.transactionError)}
                dismiss={() => this._dismissTransactionError()}
              />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {/*
              
            */}

            <AddKaizen
              _addKaizen={(_kaizen, _aciklama) =>
                this._addKaizen(_kaizen, _aciklama)
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {/*
              
            */}

            <Vote _vote={(_kaizen) => this._vote(_kaizen)} />
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this._stopPollingData();
  }

  async _connectWallet() {
    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!this._checkNetwork()) {
      return;
    }

    this._initialize(selectedAddress);

    window.ethereum.on("accountsChanged", ([newAddress]) => {
      this._stopPollingData();

      if (newAddress === undefined) {
        return this._resetState();
      }

      this._initialize(newAddress);
    });

    window.ethereum.on("chainChanged", ([networkId]) => {
      this._stopPollingData();
      this._resetState();
    });
  }

  _initialize(userAddress) {
    this.setState({
      selectedAddress: userAddress,
    });

    this._initializeEthers();
    this._getTokenData();
    this._startPollingData();
    this._getApproversCount();
  }

  async _initializeEthers() {
    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    this._token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      this._provider.getSigner(0)
    );
  }

  _startPollingData() {
    this._pollDataInterval = setInterval(() => this._updateBalance(), 1000);

    this._updateBalance();
  }

  _stopPollingData() {
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  async _getTokenData() {
    const name = await this._token.name();
    const symbol = await this._token.symbol();

    this.setState({ tokenData: { name, symbol } });
  }

  async _getApproversCount() {
    const approversCount = await this._token.readApproversCount();
    this.setState({ approversCount });
  }

  async _updateBalance() {
    const balance = await this._token.balanceOf(this.state.selectedAddress);
    this.setState({ balance });
  }

  async _transferTokens(to, amount) {
    try {
      this._dismissTransactionError();

      const tx = await this._token.transfer(to, amount);
      this.setState({ txBeingSent: tx.hash });

      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }

      await this._updateBalance();
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      this.setState({ txBeingSent: undefined });
    }
  }

  _dismissTransactionError() {
    this.setState({ transactionError: undefined });
  }

  _dismissNetworkError() {
    this.setState({ networkError: undefined });
  }

  _getRpcErrorMessage(error) {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  _resetState() {
    this.setState(this.initialState);
  }

  _checkNetwork() {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    this.setState({
      networkError: "Please connect Metamask to Goerli Network",
    });

    return false;
  }

  async _addApprover(_approver, _name, _surname) {
    try {
      const tx = await this._token.addApprover(_approver);
      await supabase.from("Addresses").insert({
        address: _approver,
        name: _name,
        surname: _surname,
      });
    } catch (error) {
    } finally {
    }
  }

  async _removeApprover(_approver) {
    try {
      const tx = await this._token.removeApprover(_approver);
      await supabase.from("Addresses").delete().match({ address: _approver });
    } catch (error) {
    } finally {
    }
  }

  async _addKaizen(_kaizen, _aciklama) {
    try {
      const tx = await this._token.addKaizen(_kaizen);
      await supabase.from("Kaizens").insert({
        Bildirim: _kaizen,
        Aciklama: _aciklama,
      });
    } catch (error) {
    } finally {
    }
  }

  async _Pay(_kaizen) {
    try {
      const tx = await this._token.pay(_kaizen);
    } catch (error) {
    } finally {
    }
  }
  async _vote(_kaizen) {
    try {
      const tx = await this._token.voteKaizen(_kaizen);
    } catch (error) {
    } finally {
    }
  }
}

# KEAS Kaizen Dapp

This application is a User Interface to a smart contract called [KEAS Kaizen Dapp]. This proposed Dapp allow users (employees of the company KEAS) to save their SAP Kaizen Notifications Number into smart contract. These notifications will then be voted by the voters (kaizen committee of the company KEAS). The user who gained greater than %50 of the total number of voters' votes will receive automatically a token called "KEAS TOKEN". It is proposed that KEAS TOKEN can then be used within KEAS company.

## Basic roles are listed below

### Role-1 : Contract Owner

[owner_ui]
Contract owner is basically the person who deploys the contract to the network. Only contract owner has right to add or remove voters with their names and addresses to the contract (names of the voters are stored in a cloud database not in the contract). After successfully completion of deployment contract owner recevies 1000000 KEAS TOKEN.

### Role-2 : Voters

[user_ui]
Voter is a person who has a right to vote to any Kaizen Notification.

### Role-3 : User

[user_ui]
The user will enter his/her Kaizen Notification Number with description (Descriptions are stored in a cloud database not in the smart contract)

## Basic rules are listed below

- The same notification number can not be entered again
- Voter can not vote to the same Kaizen again
- Notification number entered must be within the limits of the system.

## How use?

First all voters and users must have a [Metamask] installed in their laptop or mobile. Upon completion of the installation user will create a wallet and receive an Ethereum Address. The Smart Contract knows all roles listed above only by their Ethereum addresses. User/voter or owner can then browse to [KEAS Kaizen Dapp] with Metamask connected and go!

## **Important Notes**

-[KEAS Kaizen Dapp] was deployed a test network called "Goerli". This is a test network which developers can test their contracts before deploying to main ethereum network. So user/voter or owner must select Goerli network in their Metamask wallet.
-Since adding or removing voters, entering a new notification to smart contract and voting is a kind of transaction, it requires user must have some GoerliETH in his/her wallet in order to make this transaction. GoerliETH is freely available from any available faucets. **This GoerliETH has no value. We need them just to make transactions in test network This is not Ethereum**

[metamask]: https://metamask.io/
[keas kaizen dapp]: https://keas.netlify.app/
[owner_ui]: owner_user_interface.png
[user_ui]: user_voter_user_interface.PNG

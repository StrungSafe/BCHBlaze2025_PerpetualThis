# BCHBlaze2025
BCH Hackathon

## Chipnet Example

The service can be seen running on this [contract](https://chipnet.chaingraph.cash/address/bchtest:rw5lkgygt2dzftxytcdqzhwjp7sf9qnr2svs66zrd2zsgk344x9wcg5gpyhdz)

## Dependencies

Node v22.17.0
Yarn v1.22.22

## How to Run

1. After cloning this repo, open a command line and navigate to the clone directory
1. Run `yarn build` 

### Run Client

1. `cd ./client`
1. `yarn start`
1. The client by default binds to http://localhost:3000

### TODO

1. Implement a timelock (able to exhaustively run)
1. API and background service to complete the executor SAAS
1. Design Improvements

### Potential Enhancements

1. Adjustable payout rate
1. Adjustable fee rate or fixed
1. Use BCH to pay executor instead of cashtokens

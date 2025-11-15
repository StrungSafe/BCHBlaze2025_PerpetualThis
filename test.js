import { Contract, MockNetworkProvider, SignatureTemplate, TransactionBuilder, randomUtxo } from 'cashscript';
import {
    generatePrivateKey,
    instantiateSecp256k1,
    binToHex,
} from '@bitauth/libauth';

import perpetual from './art/perpetual.json' with { type: 'json' };

const secp256k1 = await instantiateSecp256k1();

const ensureSuccess = async build => {
    const transaction = build();
    await transaction.send();
};

const ensureFailure = async build => {
    const transaction = build();
    let fail = false;
    try {
        await transaction.send();
    } catch(error) {
        fail = true;
    }
    if(!fail) {
        throw new Error("Test Failure");
    }
}

const generateWallet = () => {
    const privateKey = generatePrivateKey();
    const pubKeyBin = secp256k1.derivePublicKeyCompressed(privateKey);
    const pubKeyHex = binToHex(pubKeyBin);
    const signatureTemplate = new SignatureTemplate(privateKey);
    return { privateKey, pubKeyHex, signatureTemplate };
};

const user = generateWallet();
const attacker = generateWallet();

const provider = new MockNetworkProvider({ updateUtxoSet: false });
const contract = new Contract(perpetual, [user.pubKeyHex], { provider, addressType: 'p2sh20' });
const mockUtxo = randomUtxo();

provider.addUtxo(contract.address, mockUtxo);

ensureSuccess(() => new TransactionBuilder({ provider })
    .addInput(mockUtxo, contract.unlock.release(user.signatureTemplate))
    .addOutput({ to: contract.address, amount: 10000n })
);

ensureFailure(() => new TransactionBuilder({ provider })
    .addInput(mockUtxo, contract.unlock.release(attacker.signatureTemplate))
    .addOutput({ to: contract.address, amount: 10000n })
);
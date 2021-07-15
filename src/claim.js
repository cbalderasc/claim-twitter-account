import 'regenerator-runtime/runtime'

import { initContract, login, logout, isAccountTaken } from './utils'
import { generateSeedPhrase } from 'near-seed-phrase'
import * as nearAPI from "near-api-js"

import getConfig from './config'
const { networkId, nodeUrl, walletUrl } = getConfig(process.env.NODE_ENV || 'development')

const {
    KeyPair,
    InMemorySigner,
    transactions: {
        addKey, deleteKey, fullAccessKey
    },
    utils: {
        PublicKey,
        format: {
            parseNearAmount, formatNearAmount
        }
    }
} = nearAPI

document.querySelector('#gnt-seed').onclick = seedPhrase;
document.querySelector('#claim-button').onclick = claim;

function getQueryParameters() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
}

function seedPhrase() {
    const { accountId, key } = getQueryParameters();

    if (accountId && key) {
        const { seedPhrase, publicKey } = generateSeedPhrase()
        localStorage.setItem('SEED_PHRASE', seedPhrase);
        localStorage.setItem('PUB_KEY', publicKey);
        console.log("Seed phrase: " + seedPhrase);
        console.log("publicKey seedPhrase: " + publicKey);
        console.log("key: " + key);
        document.querySelector("#seed-phrase").value = seedPhrase;
    }
}

window.onbeforeunload = function(){
    return 'Are you sure you want to leave?';
};

async function claim() {
    const { accountId, key } = getQueryParameters();

    const keyPair = KeyPair.fromString(key);
    const signer = await InMemorySigner.fromKeyPair(networkId, accountId, keyPair);
    const near = await nearAPI.connect({
        networkId, nodeUrl, walletUrl, deps: { keyStore: signer.keyStore },
    });
    
    const publicKey = localStorage.getItem('PUB_KEY');
    console.log("Public key from localstorage: " + publicKey);
    const account = new nearAPI.Account(near.connection, accountId);
    const accessKeys = await account.getAccessKeys();
    const actions = [
        deleteKey(PublicKey.from(accessKeys[0].public_key)),
        addKey(PublicKey.from(publicKey), fullAccessKey())
    ]
    const result = await account.signAndSendTransaction({
        receiverId: `${accountId}.testnet`,
        actions: actions
    });
    console.log(result);
}

export const hasKey = async (key, accountId, near) => {
    const keyPair = KeyPair.fromString(key)
    const pubKeyStr = keyPair.publicKey.toString()

    if (!near) {
        const signer = await InMemorySigner.fromKeyPair(networkId, accountId, keyPair)
        near = await nearAPI.connect({
            networkId, nodeUrl, walletUrl, deps: { keyStore: signer.keyStore },
        });
    }
    const account = new nearAPI.Account(near.connection, accountId);
    try {
        const accessKeys = await account.getAccessKeys()
        if (accessKeys.length > 0 && accessKeys.find(({ public_key }) => public_key === pubKeyStr)) {
            return true
        }
    } catch (e) {
        console.warn(e)
    }
    return false
}


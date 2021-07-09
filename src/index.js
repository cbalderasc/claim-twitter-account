import 'regenerator-runtime/runtime'

import { initContract, login, logout, isAccountTaken } from './utils'
import * as nearAPI from "near-api-js"

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

const { KeyPair, utils: {
	PublicKey,
	format: {
		parseNearAmount, formatNearAmount
	}
}, } = nearAPI;

document.querySelector('#sign-in-button').onclick = login
document.querySelector('#sign-out-button').onclick = logout
/*
document.querySelector('#btn-create').onclick = createAccount;
*/

// Display the signed-out-flow container
function signedOutFlow() {
	//   document.querySelector('#signed-out-flow').style.display = 'block'
}

// Displaying the signed in flow container and fill in account-specific data
export const signedInFlow = async () => {
	const account = window.account;
	const balance = formatNearAmount((await account.getAccountBalance()).available);
	document.querySelector('#account-id').innerHTML = window.accountId;
	document.querySelector('#balance').innerHTML = balance + " NEAR";
  let ud = await window.contract.get_user_data();
  console.log(ud);
}

async function createAccount(list){
	const recipient = list[0].trim();
	const account = window.wallet;
	const taken = await isAccountTaken(recipient);
	
	const contract = await new nearAPI.Contract(account.account(), 'testnet', {
		changeMethods: ['send', 'create_account', 'create_account_and_claim', 'save_user_data_for_claiming'],
	});

  const keyPair = KeyPair.fromRandom('ed25519');
  const formattedKeyPair = keyPair.publicKey.toString();
  let link = `?accountId=${recipient}&key=${formattedKeyPair}`;

  await window.contract.save_user_data_for_claiming({accountId: recipient, key: formattedKeyPair, link: link, claimed: false});
	await contract.create_account({ new_account_id: recipient, new_public_key: keyPair.publicKey.toString() }, '200000000000000', parseNearAmount('1'))
}

// update global currentGreeting variable; update DOM with it
// async function fetchGreeting() {
//   currentGreeting = await contract.getGreeting({ accountId: window.accountId })
//   document.querySelectorAll('[data-behavior=greeting]').forEach(el => {
//     // set divs, spans, etc
//     el.innerText = currentGreeting

//     // set input elements
//     el.value = currentGreeting
//   })
// }

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
.then(() => {
	if (window.walletConnection.isSignedIn()) signedInFlow()
	else signedOutFlow()
})
.catch(console.error)

document.getElementById('username-list').onchange = function(){
	var file = this.files[0];
	var reader = new FileReader();
	reader.onload = function(progressEvent){
		var usernames = this.result.split('\n');
		//console.log("x:"+usernames[0]);
		let list = document.getElementById("list-rendered-inner");
		
		for(var i = 0; i < usernames.length; i++) {
			let element = document.createElement('li');
			element.innerHTML = usernames[i];
			list.append(element);
		}
		document.getElementById("list-rendered").setAttribute("style", "display: block");

		document.getElementById("process-list").addEventListener("click", function() {
			console.log("Aqui");
			createAccount(usernames);
		});
	};
	reader.readAsText(file);
};

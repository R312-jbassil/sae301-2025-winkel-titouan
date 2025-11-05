import PocketBase from 'pocketbase';

let path = '';

if (import.meta.env.MODE === 'development') {
    path = 'http://localhost:8090'; // Serveur local
} else {
    path = 'https://sae301.titouan-winkel.fr:443'; // Serveur distant
}

const pb = new PocketBase(path);

export default pb;

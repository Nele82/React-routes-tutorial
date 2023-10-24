import { initializeApp } from "firebase/app"
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyCRZfEWe8kcG-lvfnl0DKBXXs2PQmKmLOE",
  authDomain: "vanlife-sean.firebaseapp.com",
  projectId: "vanlife-sean",
  storageBucket: "vanlife-sean.appspot.com",
  messagingSenderId: "465557258923",
  appId: "1:465557258923:web:1674fece7b861302f52dee"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const colRef = collection(db, 'vans')

// VANS & HOST VANS

export async function getVans() {
    let vansArr = []
    const vansDocs = await getDocs(colRef)
    vansDocs.docs.forEach((doc) => {
        vansArr.push({...doc.data(), id: doc.id})
    })
    return vansArr
}

// VAN DETAILS & HOST VAN DETAILS

export async function getVan(id) {
    const singleVanRef = doc(db, 'vans', id)
    const singleVan = await getDoc(singleVanRef)
    return singleVan.data()
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
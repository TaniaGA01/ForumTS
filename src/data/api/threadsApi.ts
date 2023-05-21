import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebase'
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import type { ThreadI } from '@/data/data.interfaces'

const app = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(app);
const dataBase = collection(db, 'threads')

export const allThreads = async (): Promise<unknown> => {
    try{
        const getThreads = await getDocs(dataBase);
        const threadsList = getThreads.docs.map((doc) => {
          const threads = {...doc.data(), id: doc.id} //get id item
          return threads
        })
        
        return threadsList as ThreadI[]

      } catch(error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
            message: message
        }
      }
}

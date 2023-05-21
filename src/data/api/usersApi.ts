import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebase'
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import type { UserI } from '@/data/data.interfaces'

const app = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(app);
const dataBase = collection(db, 'users')

export const allUsers = async (): Promise<unknown> => {
    try{
        const getUsers = await getDocs(dataBase);
        const usersList = getUsers.docs.map((doc) => {
          const user = {...doc.data(), id: doc.id} //get id item
          return user
        })
        
        return usersList as UserI[]

      } catch(error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
            message: message
        }
      }
}

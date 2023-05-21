import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebase'
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import type { ForumElementI } from '@/data/data.interfaces'

const app = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(app);
const dataBase = collection(db, 'forums')

export const allForums = async (): Promise<unknown> => {
    try{
        const getForums = await getDocs(dataBase);
        const forumsList = getForums.docs.map((doc) => {
          const forum = {...doc.data(), id: doc.id} //get id item
          return forum
        })
        
        return forumsList as ForumElementI[]

      } catch(error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
            message: message
        }
      }
}

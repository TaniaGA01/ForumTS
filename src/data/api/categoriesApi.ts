import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebase'
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import type { CategoryI } from '@/data/data.interfaces'

const app = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(app);
const dataBase = collection(db, 'categories')

export const allCategories = async (): Promise<unknown> => {
    try{
        const getCategories = await getDocs(dataBase);
        const categoriesList = getCategories.docs.map((doc) => {
          const categorie = {...doc.data(), id: doc.id} //get id item
          return categorie
        })
        
        return categoriesList as CategoryI[]

      } catch(error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
            message: message
        }
      }
}

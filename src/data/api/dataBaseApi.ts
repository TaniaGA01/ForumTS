import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebase'
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';

const app = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(app);

export const allDataBases = async (data: any): Promise<unknown> => {
  
  const dataBase = collection(db, data)
    try{
        const getDataBases = await getDocs(dataBase);
        const DataBasesList = getDataBases.docs.map((doc) => {
          const dataBase = {...doc.data(), id: doc.id} //get id item
          return dataBase
        })
        
        return DataBasesList

      } catch(error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
            message: message
        }
      }
}

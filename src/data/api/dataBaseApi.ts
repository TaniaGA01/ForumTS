import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebaseConfig'
import * as firestone from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
export const db:firestone.Firestore = firestone.getFirestore(app)

export const allDataBases = async (data: any): Promise<any> => {
  
    try{
        const dataBase = firestone.collection(db, data)
        const getDataBase = await firestone.getDocs(dataBase);
        const dataBaseList = getDataBase.docs.map((doc) => {
          const bdd = {...doc.data(), id: doc.id} 
          return bdd
        })
        
        return dataBaseList.sort()

      } catch(error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
            message: message
        }
      }

}


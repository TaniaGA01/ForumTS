import { initializeApp } from "firebase/app";
import firebaseConfig from '@/config/firebase'
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import type { PostI } from '@/data/data.interfaces'

const app = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(app);
const dataBase = collection(db, 'posts')

export const allPosts = async (): Promise<unknown> => {
    try{
        const getPosts = await getDocs(dataBase);
        const postsList = getPosts.docs.map((doc) => {
          const posts = {...doc.data(), id: doc.id} //get id item
          return posts
        })
        
        return postsList as PostI[]

      } catch(error) {
        let message:string = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
            message: message
        }
      }
}

import { collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
    // console.log(database);
    
	try {
	    const docRef = await addDoc(collection(database, collectionName), data);
		// return docRef;
	  }
	catch (err) {
	    console.log("Write to database", err)
	  }
	}

export async function deleteFromDB(deletedId, collectionName) {
    try {
        await deleteDoc(doc(database, collectionName, deletedId))
    } catch (err) {
        console.log("Delete from database", err)
    }
}

export async function updateDB(docId, data, collectionName) {
	try {
		const docRef = doc(database, collectionName, docId);
		await updateDoc(docRef, data);
		console.log("Document updated with ID: ", docId);
	} catch (err) {
		console.log("Update database", err)
	}
}
    
import { toast } from "react-hot-toast";
import { Timestamp, collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";

import { db } from ".";

const linksRef = collection(db, "links");

export const setLinks = async (body) => {
  try {
    await setDoc(doc(linksRef), {
      ...body,
      created: Timestamp.now(),
    });
    return true;
  } catch (error) {
    toast.error("Internal Server Error");
    return error;
  }
};

export const getLinks = async () => {
  try {
    const querySnapshot = await getDocs(linksRef);
    return querySnapshot.docs
      .map((item) => item.data())
      .map((item) => ({
        ...item,
        created: item.created.toDate(),
      }));
  } catch (error) {
    toast.error("Internal Server Error");
    return error;
  }
};

export const getProjectData = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // if (user) {
      const docRef = doc(db, "projectsnew", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        resolve({
          ...docSnap.data(),
          id: docSnap.id,
        });
      } else {
        // doc.data() will be undefined in this case
        reject("No such document!");
      }
      // }
    } catch (error) {
      reject(error);
    }
  });
};

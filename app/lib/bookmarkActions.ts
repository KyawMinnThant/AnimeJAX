"use server";

import { db } from "@/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { cookies } from "next/headers";

export async function deleteBookmarkByMalId(mal_id: number) {
  try {
    const cookieStore = await cookies();
    const uid = cookieStore.get("uid")?.value;

    if (!uid) return { success: false, message: "Not logged in" };

    // Query bookmarks
    const bookmarkRef = collection(db, "bookmark");
    const q = query(
      bookmarkRef,
      where("id", "==", mal_id),
      where("userid", "==", uid)
    );

    const querySnapshot = await getDocs(q);
    console.log(q);

    // if (querySnapshot.empty) {
    //   return { success: false, message: "Bookmark not found" };
    // }

    // Delete all matching
    const deletePromises = querySnapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, "bookmark", docSnap.id))
    );

    await Promise.all(deletePromises);
    return { success: true };
  } catch (error) {
    console.log("Delete error:", error);
    return { success: false, message: error };
  }
}

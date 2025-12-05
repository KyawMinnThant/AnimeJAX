import { NextResponse } from "next/server";
import { db } from "@/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { mal_id } = await req.json();
    const cookiesuser = await cookies();
    const userid = cookiesuser.get("uid")?.value || null;

    console.log("Deleting bookmark for user:", userid, "and anime ID:", mal_id);

    if (!mal_id || !userid) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const ref = collection(db, "bookmark");
    const q = query(
      ref,
      where("userid", "==", userid),
      where("id", "==", mal_id) // match stored ID
    );

    const snap = await getDocs(q);

    if (snap.empty) {
      return NextResponse.json(
        { error: "Bookmark not found" },
        { status: 404 }
      );
    }

    // take the first matching doc
    const docId = snap.docs[0].id;

    await deleteDoc(doc(db, "bookmark", docId));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

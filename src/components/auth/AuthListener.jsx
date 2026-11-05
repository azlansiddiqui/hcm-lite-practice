"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase/firebase";

import {
  authStateChanged,
  authError,
} from "@/reduxToolkit/features/auth/authSlice";

export default function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (!firebaseUser) {
          dispatch(authStateChanged(null));
          return;
        }

        try {
          const userRef = doc(db, "users", firebaseUser.uid);

          const snapshot = await getDoc(userRef);

          if (!snapshot.exists()) {
            dispatch(authError("User profile not found."));
            await signOut(auth);
            return;
          }

          const profile = snapshot.data();

          const allowedRoles = [
            "admin",
            "hr",
            "employee",
          ];

          if (!allowedRoles.includes(profile.role)) {
            dispatch(authError("Invalid user role."));
            await signOut(auth);
            return;
          }

          const user = {
            uid: firebaseUser.uid,
            name: profile.name || "",
            email: firebaseUser.email || "",
            role: profile.role,
            photoURL: firebaseUser.photoURL || null,
          };

          dispatch(authStateChanged(user));

        } catch (error) {
          console.error("Authentication error:", error);

          dispatch(
            authError("Unable to load your user profile.")
          );
        }
      }
    );

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}
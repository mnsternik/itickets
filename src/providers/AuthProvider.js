import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { auth } from "../util/firebase";
import { authActions } from "../store/auth";
import { uiActions } from "../store/ui";
import { onAuthStateChanged } from "firebase/auth";
import { readUserData, readGroupRole } from "../lib/api";

const AuthProvider = (props) => {

    const dispatch = useDispatch();

    const dispatchUserData = useCallback((userData) => {
        readGroupRole(userData.group, (role) => {
            dispatch(authActions.signIn({ ...userData, role: role }));
        })
    }, [dispatch]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            dispatch(uiActions.setLoading(true))
            if (user) {
                readUserData(user.uid, dispatchUserData);
                localStorage.setItem('itckets-uid', user.uid);
            } else {
                dispatch(authActions.signOut());
                localStorage.removeItem('itckets-uid');
            }
            dispatch(uiActions.setLoading(false))
        });
    }, [dispatch, dispatchUserData])

    return (
        <>
            {props.children}
        </>
    )
};

export default AuthProvider;


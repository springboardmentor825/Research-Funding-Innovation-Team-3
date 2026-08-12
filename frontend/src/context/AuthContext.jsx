import {createContext,useContext,useEffect,useState} from 'react'; import {api,login as doLogin,setAuthToken} from '../services/api';
const C=createContext(null); export function AuthProvider({children}){const [user,setUser]=useState(null);const [loading,setLoading]=useState(true);
 useEffect(()=>{const load=async()=>{try{if(localStorage.getItem('access_token'))setUser(await api('/auth/me'));}catch{setAuthToken(null);}finally{setLoading(false)}};load(); const h=()=>{setUser(null);setLoading(false)};window.addEventListener('auth-expired',h);return()=>window.removeEventListener('auth-expired',h)},[]);
 const login=async(e,p)=>{await doLogin(e,p);setUser(await api('/auth/me'))}; const logout=()=>{setAuthToken(null);setUser(null)}; return <C.Provider value={{user,loading,login,logout}}>{children}</C.Provider>}
export const useAuth=()=>useContext(C);

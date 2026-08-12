const API=import.meta.env.VITE_API_URL||'http://localhost:8000/api/v1';
let token=localStorage.getItem('access_token');
export const authToken=()=>token;
export const setAuthToken=t=>{token=t;if(t)localStorage.setItem('access_token',t);else localStorage.removeItem('access_token');};
export async function api(path,options={}){
 const headers={'Content-Type':'application/json',...(options.headers||{})}; if(token)headers.Authorization=`Bearer ${token}`;
 const res=await fetch(`${API}${path}`,{...options,headers});
 if(res.status===401){setAuthToken(null);window.dispatchEvent(new Event('auth-expired'));}
 const text=await res.text(); let data={}; try{data=text?JSON.parse(text):{}}catch{data={detail:text}};
 if(!res.ok) throw new Error(data.detail||`Request failed (${res.status})`); return data;
}
export const login=async(email,password)=>{const body=new URLSearchParams({username:email,password}); const r=await fetch(`${API}/auth/login`,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body}); const d=await r.json(); if(!r.ok)throw new Error(d.detail||'Login failed'); setAuthToken(d.access_token); return d;};

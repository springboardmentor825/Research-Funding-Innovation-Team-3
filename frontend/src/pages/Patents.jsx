import {useState} from 'react';
import {api} from '../services/api';

const Icon=({name,size=18})=>{
 const p={search:<><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></>,file:<><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></>,bookmark:<><path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.5L6 21z"/></>,arrow:<><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>};
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>
};

export default function Patents(){
 const [q,setQ]=useState('nose'),[results,setResults]=useState([]),[error,setError]=useState(''),[loading,setLoading]=useState(false),[searched,setSearched]=useState(false);
 const search=async()=>{setLoading(true);setError('');setSearched(true);try{setResults((await api(`/patents/search?q=${encodeURIComponent(q)}`)).results||[])}catch(e){setError(e.message)}finally{setLoading(false)}};
 const save=async(r)=>{try{await api('/profile/patents',{method:'POST',body:JSON.stringify(r)});alert('Patent saved to your profile')}catch(e){setError(e.message)}};
 return <section>
  <div className="page-head"><div><span className="eyebrow">Patent intelligence</span><h1>Patents</h1><p>Explore technology, assignees and innovation signals.</p></div></div>
  <div className="search-box"><Icon name="search"/><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} placeholder="Search patents, technologies, assignees..." /><button className="button" onClick={search}>Search <Icon name="arrow" size={17}/></button></div>
  {searched&&!loading&&<div className="result-count">About {results.length.toLocaleString()} results found</div>}
  {loading&&<div className="loading">Searching patents…</div>}
  {error&&<p className="error">{error}</p>}
  <div className="stack">
   {results.map((r,i)=><article className="card patent-card" key={r.external_id||i}>
    <div className={`doc-icon ${i%2?'green':'amber'}`}><Icon name="file" size={25}/></div>
    <div><h3 className="result-title">{r.title}</h3><div className="meta"><span>{r.external_id||'Patent record'}</span><span>·</span><span>{r.filing_date||'No filing date'}</span></div><p className="authors">{r.assignee||'Unknown assignee'}</p><span className="tag">{r.technology_domain||r.classification||'Technology'}</span></div>
    <div className="result-actions"><button className="bookmark"><Icon name="bookmark"/></button><button className="button" onClick={()=>save(r)}>Save</button></div>
   </article>)}
   {!loading&&searched&&!results.length&&!error&&<div className="card state">No patents found. Try another search.</div>}
  </div>
 </section>
}

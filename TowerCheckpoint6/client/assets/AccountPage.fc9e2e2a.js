import{_ as y,o as k,c as o,P as r,l as m,a as i,b as e,F as f,r as w,d,t as h,A as a,p as T,e as x}from"./index.f9475ecf.js";import{a as v}from"./AttendeesService.c89a2e06.js";const A={setup(){async function t(){try{await v.getMyTickets(),m.log("[did i get my tickets?]")}catch(s){r.error(s)}}return k(()=>{t()}),{events:o(()=>a.events),attendees:o(()=>a.attendees),account:o(()=>a.account),tickets:o(()=>a.tickets),async deleteTicket(s){try{await r.confirm("Are you sure you want to delete the ticket?")&&await v.deleteTicket(s)}catch(n){m.log(n),r.error(n.message)}}}}},g=t=>(T("data-v-9ff7e153"),t=t(),x(),t),P=g(()=>e("h1",{class:"bg-dark p-2"},"Tower: Acct Page",-1)),S={class:"container"},b={class:"row d-flex my-3 p-3 justify-content-center"},I=g(()=>e("div",{class:"fs-3"},"Your Event Tickets Here:",-1)),B={class:"col-md-7"},M={class:"card my-3 short"},$=["src"],j={class:"ms-2"},C={class:"ms-2"},D={class:"d-flex justify-content-end"},E=["onClick"];function F(t,s,n,_,H,L){return d(),i(f,null,[P,e("div",S,[e("div",b,[I,(d(!0),i(f,null,w(_.tickets,c=>{var l,p,u;return d(),i("div",B,[e("div",M,[e("img",{class:"m-2 ticketPic",src:(l=c.event)==null?void 0:l.coverImg,alt:""},null,8,$),e("p",j,h((p=c.event)==null?void 0:p.name),1),e("p",C,h((u=c.event)==null?void 0:u.location),1),e("div",D,[e("button",{onClick:N=>_.deleteTicket(c.id),class:"btn smaller btn-danger m-2 p-2"},"Delete ticket!",8,E)])])])}),256))])])],64)}const q=y(A,[["render",F],["__scopeId","data-v-9ff7e153"]]);export{q as default};
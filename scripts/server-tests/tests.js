const crypto=require('crypto');
let pass=0,fail=0;
const t=async(name,fn)=>{try{await fn();pass++;console.log('  ok  ',name)}catch(e){fail++;console.log('  FAIL',name,'\n      ',e.message)}};
const eq=(a,b,m)=>{if(JSON.stringify(a)!==JSON.stringify(b))throw new Error((m||'')+` expected ${JSON.stringify(b)} got ${JSON.stringify(a)}`)};
const ok=(c,m)=>{if(!c)throw new Error(m||'assertion failed')};
const req=(url,method='GET',body,headers={})=>new Request('http://x'+url,{method,headers:{'content-type':'application/json','x-forwarded-for':'10.0.'+Math.floor(Math.random()*250)+'.'+Math.floor(Math.random()*250),...headers},body:body?JSON.stringify(body):undefined});
const call=async(h,r,ctx)=>{const res=await h(r,ctx);return {status:res.status,data:await res.json()}};
(async()=>{
 const reg=load('app/api/auth/register/route.ts'), login=load('app/api/auth/login/route.ts'), me=load('app/api/auth/me/route.ts');
 const orders=load('app/api/orders/route.ts'), track=load('app/api/orders/[number]/route.ts');
 const prods=load('app/api/products/route.ts'), prod=load('app/api/products/[id]/route.ts');
 const val=load('app/api/coupons/validate/route.ts'), news=load('app/api/newsletter/route.ts');
 const hook=load('app/api/payments/webhook/route.ts'), rev=load('app/api/reviews/route.ts');
 const aOrders=load('app/api/admin/orders/route.ts'), aOrder=load('app/api/admin/orders/[id]/route.ts');
 const aProd=load('app/api/admin/products/route.ts'), aProdId=load('app/api/admin/products/[id]/route.ts');
 const stats=load('app/api/admin/stats/route.ts'), ai=load('app/api/ai/assistant/route.ts'), sug=load('app/api/search/suggest/route.ts');
 const ship={name:'Faiza Noor',phone:'+923001234567',address:'Street 5, Model Town',city:'Gujranwala',postalCode:'52250'};

 console.log('Products');
 await t('list returns 57 seeded products',async()=>{const r=await call(prods.GET,req('/api/products?limit=60'));eq(r.data.total,57)});
 await t('filter by category',async()=>{const r=await call(prods.GET,req('/api/products?category=Bags'));ok(r.data.items.every(p=>p.category==='Bags')&&r.data.total>0)});
 await t('price sort asc',async()=>{const r=await call(prods.GET,req('/api/products?sort=price-asc&limit=60'));const p=r.data.items.map(x=>x.price);ok(p.every((v,i)=>i===0||p[i-1]<=v))});
 await t('search by q',async()=>{const r=await call(prods.GET,req('/api/products?q=pearl'));ok(r.data.total>0&&r.data.items.every(p=>JSON.stringify(p).toLowerCase().includes('pearl')))});
 await t('detail by slug + 404',async()=>{const r=await call(prod.GET,req('/x'),{params:Promise.resolve({id:'pearl-drop-necklace'})});eq(r.status,200);const n=await call(prod.GET,req('/x'),{params:Promise.resolve({id:'nope'})});eq(n.status,404)});
 await t('suggest',async()=>{const r=await call(sug.GET,req('/api/search/suggest?q=gold'));ok(r.data.suggestions.length>0)});

 console.log('Auth');
 await t('register validates',async()=>{eq((await call(reg.POST,req('/r','POST',{name:'A',email:'bad',password:'1'}))).status,400)});
 await t('register + session cookie + me',async()=>{const r=await call(reg.POST,req('/r','POST',{name:'Faiza',email:'faiza@test.com',password:'password123'}));eq(r.status,201);ok(!JSON.stringify(r.data).includes('passwordHash'));const m=await call(me.GET,req('/m'));eq(m.data.user.email,'faiza@test.com')});
 await t('duplicate email rejected',async()=>{eq((await call(reg.POST,req('/r','POST',{name:'Faiza',email:'FAIZA@test.com',password:'password123'}))).status,409)});
 await t('wrong password rejected / right accepted',async()=>{jar.clear();eq((await call(login.POST,req('/l','POST',{email:'faiza@test.com',password:'wrongwrong'}))).status,401);eq((await call(login.POST,req('/l','POST',{email:'faiza@test.com',password:'password123'}))).status,200)});
 await t('tampered cookie is rejected',async()=>{const c=jar.get('luxora_session');jar.set('luxora_session',c.slice(0,-3)+'abc');eq((await call(me.GET,req('/m'))).data.user,null);jar.set('luxora_session',c)});

 console.log('Coupons / pricing');
 const A={productId:'bags-1',quantity:1}; // $89
 await t('pricing: subtotal, free shipping over $75',async()=>{const r=await call(val.POST,req('/v','POST',{items:[A]}));eq(r.data.pricing.subtotal,89);eq(r.data.pricing.shipping,0)});
 await t('pricing: shipping fee under $75',async()=>{const r=await call(val.POST,req('/v','POST',{items:[{productId:'makeup-1',quantity:1}]}));eq(r.data.pricing.shipping,12)});
 await t('coupon WELCOME10 = 10% off',async()=>{const r=await call(val.POST,req('/v','POST',{items:[A],code:'welcome10'}));eq(r.data.pricing.discount,8.9);eq(r.data.pricing.total,80.1)});
 await t('invalid coupon / min subtotal rejected',async()=>{eq((await call(val.POST,req('/v','POST',{items:[A],code:'NOPE'}))).status,400);eq((await call(val.POST,req('/v','POST',{items:[A],code:'LUXORA20'}))).status,400)});
 await t('client-sent price is ignored',async()=>{const r=await call(val.POST,req('/v','POST',{items:[{productId:'bags-1',quantity:1,price:1}]}));eq(r.data.pricing.subtotal,89)});
 await t('bad quantity / unknown product / empty rejected',async()=>{for(const items of [[{productId:'bags-1',quantity:0}],[{productId:'zzz',quantity:1}],[]])eq((await call(val.POST,req('/v','POST',{items}))).status,400)});

 console.log('Orders');
 let order;
 await t('cod order placed, total server-side',async()=>{const r=await call(orders.POST,req('/o','POST',{items:[A],shipping:ship,paymentMethod:'cod',couponCode:'WELCOME10',idempotencyKey:'k1'}));eq(r.status,201);order=r.data.order;eq(order.total,80.1);eq(order.paymentStatus,'pending');ok(/^LX-\d+$/.test(order.number))});
 await t('stock was decremented',async()=>{const before=(await call(prod.GET,req('/x'),{params:Promise.resolve({id:'bags-1'})})).data.product.stock;ok(before<=24,'stock '+before)});
 await t('duplicate submit returns same order (idempotent)',async()=>{const r=await call(orders.POST,req('/o','POST',{items:[A],shipping:ship,paymentMethod:'cod',couponCode:'WELCOME10',idempotencyKey:'k1'}));eq(r.data.order.number,order.number)});
 await t('cannot oversell',async()=>{const r=await call(orders.POST,req('/o','POST',{items:[{productId:'bags-1',quantity:10},{productId:'bags-1',quantity:10},{productId:'bags-1',quantity:10}],shipping:ship,paymentMethod:'cod'}));ok(r.status===400,'status '+r.status)});
 await t('invalid shipping rejected',async()=>{eq((await call(orders.POST,req('/o','POST',{items:[A],shipping:{...ship,phone:'abc'},paymentMethod:'cod'}))).status,400)});
 await t('card payment refused until provider configured',async()=>{const s=process.env.PAYMENT_WEBHOOK_SECRET;delete process.env.PAYMENT_WEBHOOK_SECRET;const r=await call(orders.POST,req('/o','POST',{items:[A],shipping:ship,paymentMethod:'card'}));process.env.PAYMENT_WEBHOOK_SECRET=s;eq(r.status,400)});
 await t('my orders (logged in)',async()=>{const r=await call(orders.GET,req('/o'));eq(r.data.orders.length,1)});
 await t('tracking needs matching email',async()=>{const ctx={params:Promise.resolve({number:order.number})};jar.clear();eq((await call(track.GET,req('/t?email=bad@x.com'),ctx)).status,404);eq((await call(track.GET,req('/t?email=faiza@test.com'),ctx)).status,200)});
 await t('guest checkout works',async()=>{const r=await call(orders.POST,req('/o','POST',{items:[{productId:'jewelry-2',quantity:2}],email:'guest@x.com',shipping:ship,paymentMethod:'cod'}));eq(r.status,201)});

 console.log('Payments webhook');
 const body=JSON.stringify({orderNumber:order.number,status:'paid'});
 await t('bad signature rejected',async()=>{const r=await call(hook.POST,new Request('http://x/w',{method:'POST',body,headers:{'x-luxora-signature':'deadbeef'}}));eq(r.status,401)});
 await t('valid signature marks paid + confirmed',async()=>{const sig=crypto.createHmac('sha256','whsec_test').update(body).digest('hex');const r=await call(hook.POST,new Request('http://x/w',{method:'POST',body,headers:{'x-luxora-signature':sig}}));eq(r.status,200)});

 console.log('Admin');
 await t('customer blocked from admin APIs',async()=>{await call(login.POST,req('/l','POST',{email:'faiza@test.com',password:'password123'}));eq((await call(aOrders.GET,req('/a'))).status,403);eq((await call(stats.GET,req('/a'))).status,403)});
 await t('anonymous gets 401',async()=>{jar.clear();eq((await call(aOrders.GET,req('/a'))).status,401)});
 await t('admin login',async()=>{const r=await call(login.POST,req('/l','POST',{email:'boss@luxora.test',password:'SuperSecret123'}));eq(r.data.user.role,'admin')});
 await t('admin sees orders; payment webhook result applied',async()=>{const r=await call(aOrders.GET,req('/a'));eq(r.data.orders.length,2);const o=r.data.orders.find(x=>x.number===order.number);eq(o.paymentStatus,'paid');eq(o.status,'confirmed')});
 await t('admin stats are real',async()=>{const r=await call(stats.GET,req('/a'));eq(r.data.totalOrders,2);ok(r.data.revenue>0)});
 let stockAfter;
 await t('cancel order returns stock',async()=>{const before=(await call(prod.GET,req('/x'),{params:Promise.resolve({id:'bags-1'})})).data.product.stock;const r=await call(aOrder.PATCH,req('/a','PATCH',{status:'cancelled'}),{params:Promise.resolve({id:order.number})});eq(r.status,200);const after=(await call(prod.GET,req('/x'),{params:Promise.resolve({id:'bags-1'})})).data.product.stock;eq(after,before+1)});
 await t('admin create/edit/delete product',async()=>{const c=await call(aProd.POST,req('/a','POST',{name:'Test Scarf',price:20,stock:3,category:'Fashion'}));eq(c.status,201);const id=c.data.product.id;const p=await call(aProdId.PATCH,req('/a','PATCH',{price:25,stock:9}),{params:Promise.resolve({id})});eq(p.data.product.price,25);eq((await call(aProdId.DELETE,req('/a','DELETE'),{params:Promise.resolve({id})})).status,200)});
 await t('invalid status rejected',async()=>{eq((await call(aOrder.PATCH,req('/a','PATCH',{status:'hacked'}),{params:Promise.resolve({id:order.number})})).status,400)});

 console.log('Reviews / newsletter / AI');
 await t('review requires verified purchase',async()=>{jar.clear();await call(login.POST,req('/l','POST',{email:'faiza@test.com',password:'password123'}));eq((await call(rev.POST,req('/r','POST',{productId:'watches-1',rating:5,comment:'Lovely watch'}))).status,400)});
 await t('cancelled order does not qualify; guest-linked? (own non-cancelled needed)',async()=>{eq((await call(rev.POST,req('/r','POST',{productId:'bags-1',rating:5,comment:'Great bag'}))).status,400)});
 await t('verified buyer can review once',async()=>{const o=await call(orders.POST,req('/o','POST',{items:[{productId:'watches-1',quantity:1}],shipping:ship,paymentMethod:'cod'}));eq(o.status,201);eq((await call(rev.POST,req('/r','POST',{productId:'watches-1',rating:5,comment:'Lovely watch'}))).status,201);eq((await call(rev.POST,req('/r','POST',{productId:'watches-1',rating:4,comment:'Again again'}))).status,400)});
 await t('newsletter subscribe + dedupe + validate',async()=>{eq((await call(news.POST,req('/n','POST',{email:'a@b.com'}))).data.already,false);eq((await call(news.POST,req('/n','POST',{email:'a@b.com'}))).data.already,true);eq((await call(news.POST,req('/n','POST',{email:'nope'}))).status,400)});
 await t('AI assistant: "gold earrings under $80"',async()=>{const r=await call(ai.POST,req('/ai','POST',{message:'gold earrings under $80'}));ok(r.data.products.length>0&&r.data.products.every(p=>p.price<=80&&p.category==='Jewelry'),JSON.stringify(r.data.products.map(p=>[p.name,p.price])))});
 console.log('Analytics / settings / alerts / rewards / mail');
 const setP=load('app/api/settings/route.ts'), aSet=load('app/api/admin/settings/route.ts'), evP=load('app/api/events/route.ts');
 const aAn=load('app/api/admin/analytics/route.ts'), aCus=load('app/api/admin/customers/route.ts'), alertP=load('app/api/alerts/route.ts');
 const rew=load('app/api/account/rewards/route.ts'), outbox=load('app/api/admin/outbox/route.ts');
 const asAdmin=async()=>{jar.clear();await call(login.POST,req('/l','POST',{email:'boss@luxora.test',password:'SuperSecret123'}))};
 const asFaiza=async()=>{jar.clear();await call(login.POST,req('/l','POST',{email:'faiza@test.com',password:'password123'}))};
 await t('public settings has no private data',async()=>{const r=await call(setP.GET,req('/s'));eq(r.data.freeShippingThreshold,75);ok(!('taxRate' in r.data))});
 await t('events accepted, junk rejected',async()=>{eq((await call(evP.POST,req('/e','POST',{type:'page_view',sid:'s1',path:'/'}))).status,200);await call(evP.POST,req('/e','POST',{type:'product_view',sid:'s1',productId:'bags-1'}));await call(evP.POST,req('/e','POST',{type:'add_to_cart',sid:'s1',productId:'bags-1'}));await call(evP.POST,req('/e','POST',{type:'search',sid:'s2',q:'Pearl'}));eq((await call(evP.POST,req('/e','POST',{type:'hack',sid:'s1'}))).status,400)});
 await t('analytics: real revenue, funnel, conversion',async()=>{await asAdmin();const r=await call(aAn.GET,req('/a?days=30'));eq(r.status,200);ok(r.data.revenue>0);eq(r.data.funnel[0].step,'Visitors');eq(r.data.funnel[0].count,2);eq(r.data.funnel[2].count,1);ok(r.data.topSearches[0][0]==='pearl');ok(r.data.categories.length>0)});
 await t('analytics blocked for customers',async()=>{await asFaiza();eq((await call(aAn.GET,req('/a'))).status,403);eq((await call(aCus.GET,req('/a'))).status,403)});
 await t('customers list with segments',async()=>{await asAdmin();const r=await call(aCus.GET,req('/a'));const f=r.data.customers.find(c=>c.email==='faiza@test.com');ok(f&&f.orders>=1&&f.spent>0)});
 await t('admin settings change shipping threshold (server pricing follows)',async()=>{const r=await call(aSet.PUT,req('/a','PUT',{storeName:'LUXORA',supportEmail:'hello@luxora.com',supportPhone:'+923001112222',announcement:'Eid sale',freeShippingThreshold:200,flatShipping:15,taxRate:0.1}));eq(r.status,200);const p=await call(val.POST,req('/v','POST',{items:[{productId:'makeup-1',quantity:1}]}));eq(p.data.pricing.shipping,15);ok(p.data.pricing.tax>0);eq(p.data.pricing.freeShippingThreshold,200)});
 await t('invalid settings rejected',async()=>{eq((await call(aSet.PUT,req('/a','PUT',{freeShippingThreshold:-5,flatShipping:1,taxRate:0}))).status,400);await call(aSet.PUT,req('/a','PUT',{storeName:'LUXORA',freeShippingThreshold:75,flatShipping:12,taxRate:0,announcement:''}))});
 await t('back-in-stock alert fires email when restocked',async()=>{await asAdmin();const c=await call(aProd.POST,req('/a','POST',{name:'Alert Bag',price:50,stock:0,category:'Bags'}));const id=c.data.product.id;eq((await call(alertP.POST,req('/al','POST',{email:'wait@x.com',productId:id,kind:'back_in_stock'}))).status,201);await call(aProdId.PATCH,req('/a','PATCH',{stock:5}),{params:Promise.resolve({id})});await new Promise(r=>setTimeout(r,50));const o=await call(outbox.GET,req('/o'));ok(o.data.mails.some(m=>m.to==='wait@x.com'&&/back in stock/.test(m.subject)))});
 await t('alert refused when already in stock',async()=>{eq((await call(alertP.POST,req('/al','POST',{email:'a@x.com',productId:'bags-2',kind:'back_in_stock'}))).status,400)});
 await t('price-drop alert fires',async()=>{const id='bags-3';await call(alertP.POST,req('/al','POST',{email:'drop@x.com',productId:id,kind:'price_drop',targetPrice:1}));const cur=(await call(prod.GET,req('/x'),{params:Promise.resolve({id})})).data.product.price;await call(aProdId.PATCH,req('/a','PATCH',{price:1}),{params:Promise.resolve({id})});await new Promise(r=>setTimeout(r,50));ok((await call(outbox.GET,req('/o'))).data.mails.some(m=>m.to==='drop@x.com'));await call(aProdId.PATCH,req('/a','PATCH',{price:cur}),{params:Promise.resolve({id})})});
 await t('order confirmation + status emails queued',async()=>{const o=(await call(outbox.GET,req('/o'))).data.mails;ok(o.some(m=>/Your LUXORA order LX-/.test(m.subject)));ok(o.some(m=>/is now cancelled/.test(m.subject)))});
 await t('rewards: points only after delivery',async()=>{await asFaiza();eq((await call(rew.GET,req('/r'))).data.points,0);await asAdmin();const all=(await call(aOrders.GET,req('/a'))).data.orders.find(x=>x.email==='faiza@test.com'&&x.status!=='cancelled');await call(aOrder.PATCH,req('/a','PATCH',{status:'delivered'}),{params:Promise.resolve({id:all.number})});await asFaiza();const r=await call(rew.GET,req('/r'));ok(r.data.points>0&&r.data.level==='Bronze')});

 console.log(`\n${pass} passed, ${fail} failed`);process.exit(fail?1:0);
})();

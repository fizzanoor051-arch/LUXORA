const Module=require('module'), path=require('path'), fs=require('fs');
const ts=require('typescript');
const ROOT=path.resolve(__dirname,'../..');
process.env.LUXORA_DATA_DIR=require('os').tmpdir()+'/luxora-test-'+Date.now();
process.env.AUTH_SECRET='test-secret-test-secret';
process.env.ADMIN_EMAIL='boss@luxora.test'; process.env.ADMIN_PASSWORD='SuperSecret123';
process.env.PAYMENT_WEBHOOK_SECRET='whsec_test';
// stubs
const jar=new Map();
const stubs={
 'server-only':{},
 'next/headers':{cookies:async()=>({get:k=>jar.has(k)?{value:jar.get(k)}:undefined,set:(k,v)=>jar.set(k,v),delete:k=>jar.delete(k)})},
 'next/server':{NextResponse:class extends Response{static json(d,i){return new Response(JSON.stringify(d),{status:i?.status??200,headers:{'content-type':'application/json'}})}}},
};
const orig=Module._resolveFilename;
Module._resolveFilename=function(req,parent,...r){
  if(stubs[req]) return req;
  if(req.startsWith('@/')) { const b=path.join(ROOT,'src',req.slice(2)); for(const e of ['.ts','.tsx','/index.ts']) if(fs.existsSync(b+e)) return b+e; }
  return orig.call(this,req,parent,...r);
};
const origLoad=Module._load;
Module._load=function(req,...a){ if(stubs[req]) return stubs[req]; return origLoad.call(this,req,...a); };
require.extensions['.ts']=function(m,f){const out=ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:1,target:99,esModuleInterop:true}}).outputText;m._compile(out,f)};
global.jar=jar;
global.load=(p)=>require(path.join(ROOT,p));
require('./tests.js');

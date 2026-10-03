// raw touch swipe through CDP; returns after momentum settles
module.exports=async function swipe(cdp,x0,y0,dx,dy,steps=14,dt=16){
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x0,y:y0}]});
  for(let i=1;i<=steps;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x0+dx*i/steps,y:y0+dy*i/steps}]});await new Promise(r=>setTimeout(r,dt))}
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
};

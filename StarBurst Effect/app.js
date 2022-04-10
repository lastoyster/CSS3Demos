alert("Click to see the magic!");

function fpsObject(){
        this.fps = 60;
        this.ads = 1;
        this.lastFrame = performance.now();
    

    this.update = ()=>{
        let delT = performance.now()-this.lastFrame;
        this.fps = 1000/(delT);
        this.lastFrame = performance.now();
        this.ads = (delT/(1000/60));
    }
}


const cOb = {};
const fps = new fpsObject();

const init = ()=>{
    cOb.c = q("canvas");
    cOb.w = cOb.c.width = window.innerWidth;
    cOb.h = cOb.c.height = window.innerHeight;
    cOb.ctx = cOb.c.getContext('2d');
    loop();
    
    cOb.c.addEventListener("click", (e)=>{
        let rect = cOb.c.getBoundingClientRect();
        let x = e.clientX-rect.left;
        let y = e.clientY-rect.top;
        let radius = 125+50*Math.random();
        new sb(x,y ,radius);
    });
}



function loop(){
    cOb.ctx.clearRect(0,0,cOb.w,cOb.h);
    fps.update();
    window.requestAnimationFrame(loop);
}



function sb(x,y, rad){
        
        this.boom = false;
        this.cx = x;
        this.cy = y;
        this.rad = rad;
    
    
    
    this.draw = ()=>{
            for(let i = 0; i<=300; i++){
                let a = Math.random()*2*Math.PI;
                let r = this.rad/4+0.75*this.rad*Math.random();
                let x = this.cx + Math.cos(a)*r;
                let y = this.cy + Math.sin(a)*r;
                new star(this.cx, this.cy, 5+2*Math.random(),x,y);
            }
    }
    
    this.draw();
}



function star(ix,iy, r,fx,fy){
        this.x = ix;
        this.y = iy;
        this.fx = fx-ix;
        this.fy = fy-iy;
        this.r = 200 + 55*Math.random();
        this.g = this.r;
        this.b = this.r;
        this.a = 1
        this.rad = r;
        this.rot = Math.random()*2*Math.PI;
        this.rs = 0.075+0.075*Math.random();
        this.rd = (Math.random()>0.5)?1:-1;
    
    this.draw = ()=>{
        let {r,g,b,a,x,y, rad, rot} = this;
        let points = [[-1*rad,-0.25*rad],[-0.25*rad,-0.25*rad],[0,-1*rad],[0.25*rad,-0.25*rad],[1*rad,-0.25*rad],[0.35*rad,0.25*rad],[0.75*rad,1*rad],[0,0.5*rad],[-0.75*rad,1*rad],[-0.35*rad,0.25*rad]];

        cOb.ctx.fillStyle = `rgba(${r},${g},${b},${a}`;
        cOb.ctx.beginPath();
        points.forEach((p,i)=>{
        let nx = p[0]*Math.cos(rot)-p[1]*Math.sin(rot);
            let ny = p[0]*Math.sin(rot)+p[1]*Math.cos(rot);
            p[0] = nx;
            p[1] = ny;
             if(i == 0){
                 cOb.ctx.moveTo(x+p[0],y+p[1]);
             }else{
                 cOb.ctx.lineTo(x+p[0],y+p[1]);
             }
        });
        cOb.ctx.closePath();
        cOb.ctx.fill();
        
        this.update();
    }
    
    this.update = ()=>{
        this.fx *= 0.99;
        this.fy += 2;
        this.x += 0.075*this.fx*fps.ads;
        this.y += 0.075*this.fy*fps.ads;
        this.a -= 0.01*fps.ads;
        this.rot += this.rd*this.rs*fps.ads;
        if(this.a > 0){window.requestAnimationFrame(this.draw);}
    }
    
    this.draw();
}




const q = document.querySelector.bind(document);
window.onload = init;

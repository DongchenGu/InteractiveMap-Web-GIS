import "./Canvas.css"
import React, {useEffect} from "react";
import * as PIXI from 'pixi.js';
import ReactDOM from 'react-dom';

// 是否按下去
let drawing = false;
// 绘画模式
let mode = 'add'
// 初始坐标
let lastPoint = { x: 0, y: 0 };
let tx;
let ctx;
export default function Canvas2(){
    const node = React.createRef();

    useEffect(()=>{
        // 创建一个pixi舞台
        let app = new PIXI.Application({ width: 400, height: 300, backgroundColor: 0xcccccc });
        console.log(node)
        document.getElementById("largeCanvas").appendChild(app.view);
        //node.current.appendChild(app.view);

        // 创建绘制画布
        let canvas = document.createElement('canvas')
        canvas.width = app.renderer.width
        canvas.height = app.renderer.height
        canvas.style.background = '#aaaaaa'
        ctx = canvas.getContext('2d')
        document.getElementById("largeCanvas").appendChild(canvas);


        // 创建交互展示画布
        tx = PIXI.Texture.from(canvas) // 重点在于这里，将原生canvas作为材质使用，每次绘画都要实时调用 tx.update()方法进行更新
        let sp = new PIXI.Sprite(tx)
        sp.name = 'preview'
        sp.width = app.renderer.width
        sp.height = app.renderer.height
        sp.hitArea = new PIXI.Rectangle(0, 0, app.renderer.width, app.renderer.height)
        sp.zIndex = 2
        sp.interactive = true
        app.stage.addChild(sp);




        // 交互行为
        sp.on('mousedown', drawStart);
        sp.on('mouseup', drawEnd);
        sp.on('mouseout', drawEnd);
        sp.on('mousemove', drawMove);
    })





    // document.getElementById('add').onclick = () => mode = 'add'
    // document.getElementById('del').onclick = () => mode = 'del'



    function drawStart(event) {
        let
            r = Math.random() * 1,
            g = Math.random() * 1,
            b = Math.random() * 1,
            a = Math.random() * 1

        if (mode === 'add') {
            ctx.lineWidth = 7;
            ctx.globalCompositeOperation = "source-over"
        } else {
            ctx.lineWidth = 21;
            ctx.globalCompositeOperation = "destination-out"
        }

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = `rgba(${r * 255},${g * 255},${b * 255},1)`

        let { x, y } = event.data.getLocalPosition(this.parent); //获取鼠标移动的位置
        lastPoint = { x, y };

        drawing = true;
    }

    function drawMove(event) {
        if (drawing == true) {
            let { x, y } = event.data.getLocalPosition(this.parent); //获取鼠标移动的位置

            ctx.beginPath();
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(x, y);
            ctx.stroke()
            tx.update()

            // 更新坐标点
            lastPoint = { x, y };
        }
    }

    function drawEnd() {
        drawing = false;
    }

    return(
        <div id="largeCanvas" ref={node}>
        </div>

    )
}
import { useEffect, useRef, useState } from 'react';

export default function Canvas({ color, tool, lineWidth, brushType, sticker, canvasAction, traceImage }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const contextRef = useRef(null);
    const [opacity, setOpacity] = useState(0.4); // Default opacity for trace image setup

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth * 2;
            canvas.height = parent.clientHeight * 2;
            canvas.style.width = `${parent.clientWidth}px`;
            canvas.style.height = `${parent.clientHeight}px`;

            const context = canvas.getContext('2d');
            context.scale(2, 2);
            // Default caps
            context.lineCap = 'round';
            context.lineJoin = 'round';
            contextRef.current = context;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    // Handle Actions
    useEffect(() => {
        if (!canvasAction) return;

        if (canvasAction.type === 'clear') {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        } else if (canvasAction.type === 'save') {
            const canvas = canvasRef.current;
            const link = document.createElement('a');
            link.download = `doodloo-${Date.now()}.png`;
            link.href = canvas.toDataURL(); // Note: This will only save the drawing, not the trace image background
            link.click();
        }
    }, [canvasAction]);

    useEffect(() => {
        if (!contextRef.current) return;
        contextRef.current.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
        contextRef.current.lineWidth = tool === 'eraser' ? lineWidth * 4 : lineWidth;

        // Apply brush type
        if (tool === 'pen') {
            if (brushType === 'square') {
                contextRef.current.lineCap = 'square';
                contextRef.current.lineJoin = 'miter';
            } else {
                // round
                contextRef.current.lineCap = 'round';
                contextRef.current.lineJoin = 'round';
            }
        } else {
            // Eraser always round
            contextRef.current.lineCap = 'round';
            contextRef.current.lineJoin = 'round';
        }

    }, [color, tool, lineWidth, brushType]);

    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;

        if (e.changedTouches && e.changedTouches.length > 0) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            offsetX: clientX - rect.left,
            offsetY: clientY - rect.top
        };
    };

    const startDrawing = (e) => {
        if (tool === 'sticker') {
            placeSticker(e);
            return;
        }

        const { offsetX, offsetY } = getCoordinates(e);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const placeSticker = (e) => {
        e.preventDefault();
        const { offsetX, offsetY } = getCoordinates(e);
        const ctx = contextRef.current;

        ctx.save();
        ctx.font = '40px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sticker, offsetX, offsetY);
        ctx.restore();
    };

    const finishDrawing = () => {
        if (isDrawing) {
            contextRef.current.closePath();
            setIsDrawing(false);
        }
    };

    const draw = (e) => {
        if (!isDrawing || tool === 'sticker') return;
        if (e.type === 'touchmove') e.preventDefault();

        const { offsetX, offsetY } = getCoordinates(e);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    return (
        <div className="canvas-wrapper">
            {traceImage && (
                <div className="trace-layer" style={{ opacity: opacity }}>
                    <img src={traceImage} alt="Trace Reference" />
                    <div className="opacity-slider-container">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={opacity}
                            onChange={(e) => setOpacity(e.target.value)}
                            className="opacity-slider"
                        />
                    </div>
                </div>
            )}
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                onMouseLeave={finishDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={finishDrawing}
            />
            <style>{`
        .canvas-wrapper {
          width: 100%;
          height: 100%;
          background: white;
          border-radius: var(--border-radius);
          box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
          overflow: hidden;
          position: relative;
          cursor: ${tool === 'sticker' ? 'default' : 'crosshair'};
        }
        
        .trace-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none; /* Allow clicks to pass through to canvas */
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
        }
        
        .trace-layer img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        }

        .opacity-slider-container {
             position: absolute;
             bottom: 15px;
             right: 15px;
             pointer-events: auto; /* Allow interaction with slider */
             background: rgba(255,255,255,0.8);
             padding: 5px 10px;
             border-radius: 20px;
             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .opacity-slider {
            width: 100px;
            cursor: pointer;
        }
        
        canvas {
          touch-action: none;
          display: block;
          position: relative;
          z-index: 2; /* Ensure canvas is above image */
          background: transparent; /* Must be transparent to see image underneath */
        }
      `}</style>
        </div>
    );
}

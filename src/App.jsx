import { useState, useEffect } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import TutorialMode from './components/TutorialMode';
import './App.css';

function App() {
  const [color, setColor] = useState('#FFB7B2');
  const [tool, setTool] = useState('pen');
  const [lineWidth, setLineWidth] = useState(5);
  const [brushType, setBrushType] = useState('round');
  const [sticker, setSticker] = useState('🌸');
  const [canvasAction, setCanvasAction] = useState(null);
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [traceImage, setTraceImage] = useState(null);

  // Prevent default touch behaviors to stop scrolling/zooming
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
  }, []);

  const handleAction = (type, payload) => {
    if (type === 'teacher') {
      setIsTeacherMode(true);
    } else if (type === 'trace') {
      if (payload) {
        setTraceImage(URL.createObjectURL(payload));
      } else {
        setTraceImage(null);
      }
    } else {
      setCanvasAction({ type, id: Date.now() });
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Doodloo ✨</h1>
      </header>

      <main className="main-content">
        <Canvas
          color={color}
          tool={tool}
          lineWidth={lineWidth}
          brushType={brushType}
          sticker={sticker}
          canvasAction={canvasAction}
          traceImage={traceImage}
        />
        <TutorialMode
          isActive={isTeacherMode}
          onClose={() => setIsTeacherMode(false)}
        />
      </main>

      <Toolbar
        color={color}
        setColor={setColor}
        tool={tool}
        setTool={setTool}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        brushType={brushType}
        setBrushType={setBrushType}
        sticker={sticker}
        setSticker={setSticker}
        onAction={handleAction}
        traceImage={traceImage}
      />

      <style>{`
        .app-container {
          width: 100%;
          height: 100dvh; /* Dynamic viewport height for mobile */
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 15px;
          gap: 15px;
          overflow: hidden;
        }

        .header h1 {
          font-family: 'Fredoka', cursive;
          font-weight: 600;
          color: var(--primary-color);
          text-shadow: 2px 2px 0px var(--accent-color);
          margin: 0;
          font-size: 2rem; /* Slightly smaller for mobile */
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .main-content {
          flex: 1;
          width: 100%;
          max-width: 800px;
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          padding: 2px;
          position: relative;
          overflow: hidden;
          margin-bottom: 70px; /* Space for toolbar */
        }

        @media (min-width: 600px) {
            .app-container {
                padding: 20px;
                gap: 20px;
            }
            .header h1 {
                font-size: 2.5rem;
            }
            .main-content {
                margin-bottom: 0;
            }
        }
      `}</style>
    </div>
  );
}

export default App;

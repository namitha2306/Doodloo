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
        <div className="creator-badge">
          <span className="role">🎨 Crafted by <span className="name">Namitha</span></span>
          <span className="separator">⋆</span>
          <span className="role">💡 Idea by <span className="name">Hira</span></span>
        </div>
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
          position: fixed; /* Fix the container to prevent page scroll */
          top: 0;
          left: 0;
        }

        .header {
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 5px;
        }

        .creator-badge {
            background: white;
            padding: 5px 15px;
            border-radius: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.8rem;
            color: #888;
            border: 1px solid #F0F0F0;
            animation: slideDown 0.5s ease-out;
        }

        @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .role {
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .name {
            font-weight: 600;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .separator {
            color: var(--accent-color);
            font-size: 1.2em;
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
          touch-action: none; /* Prevent browser handling of gestures in canvas area */
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

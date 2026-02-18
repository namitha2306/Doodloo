import { Palette, Eraser, Sticker, Trash2, Download, GraduationCap, Brush, Circle, Square, Image as ImageIcon, X } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Toolbar({
  color, setColor,
  tool, setTool,
  lineWidth, setLineWidth,
  brushType, setBrushType,
  sticker, setSticker,
  onAction,
  traceImage
}) {
  const colors = [
    '#FFB7B2', '#FF9AA2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#A0E7E5',
    '#C7CEEA', '#B983FF', '#FDFD96', '#9E9E9E', '#5D5D5D'
  ];
  const stickers = ['🌸', '✨', '🐱', '🎀', '🍦', '💖', '🍄', '🌈'];
  const [showBrushMenu, setShowBrushMenu] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onAction('trace', e.target.files[0]);
    }
  };

  return (
    <div className="toolbar-container">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Secondary Web for Stickers */}
      {tool === 'sticker' && (
        <div className="sub-toolbar fade-in">
          {stickers.map((s) => (
            <button
              key={s}
              className={`sticker-btn ${sticker === s ? 'active' : ''}`}
              onClick={() => setSticker(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Secondary Menu for Brush Settings */}
      {showBrushMenu && tool === 'pen' && (
        <div className="sub-toolbar fade-in brush-menu">
          <div className="brush-section">
            <span className="label">Size</span>
            <div className="size-options">
              {[3, 5, 8, 12].map(size => (
                <button
                  key={size}
                  className={`size-btn ${lineWidth === size ? 'active' : ''}`}
                  onClick={() => setLineWidth(size)}
                >
                  <div style={{ width: size, height: size, background: 'currentColor', borderRadius: '50%' }} />
                </button>
              ))}
            </div>
          </div>
          <div className="divider-small"></div>
          <div className="brush-section">
            <span className="label">Type</span>
            <button
              className={`type-btn ${brushType === 'round' ? 'active' : ''}`}
              onClick={() => setBrushType('round')}
              title="Round"
            >
              <Circle size={16} fill={brushType === 'round' ? 'currentColor' : 'none'} />
            </button>
            <button
              className={`type-btn ${brushType === 'square' ? 'active' : ''}`}
              onClick={() => setBrushType('square')}
              title="Square"
            >
              <Square size={16} fill={brushType === 'square' ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      )}

      <div className="toolbar">
        <div className="color-picker">
          {colors.map((c) => (
            <button
              key={c}
              className={`color-btn ${color === c && tool === 'pen' ? 'active' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => {
                setColor(c);
                setTool('pen');
              }}
            />
          ))}
        </div>

        <div className="divider" />

        <button
          className={`tool-btn ${tool === 'pen' && showBrushMenu ? 'active' : ''}`}
          onClick={() => {
            setTool('pen');
            setShowBrushMenu(!showBrushMenu);
          }}
          title="Brush Settings"
        >
          <Brush size={20} color="#5D5D5D" />
        </button>

        <button
          className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
          onClick={() => {
            setTool('eraser');
            setShowBrushMenu(false);
          }}
          title="Eraser"
        >
          <Eraser size={20} color="#5D5D5D" />
        </button>

        <button
          className={`tool-btn ${tool === 'sticker' ? 'active' : ''}`}
          onClick={() => {
            setTool('sticker');
            setShowBrushMenu(false);
          }}
          title="Stickers"
        >
          <Sticker size={20} color="#5D5D5D" />
        </button>

        <div className="divider" />

        <button
          className={`tool-btn action-btn teacher-btn`}
          onClick={() => onAction('teacher')}
          title="Learn to Doodle"
        >
          <GraduationCap size={20} color="#6C5CE7" />
        </button>

        <div className="divider" />

        {traceImage ? (
          <button
            className="tool-btn action-btn bg-red-100"
            onClick={() => onAction('trace', null)} // Clear image
            title="Remove Trace Image"
            style={{ background: '#FFEEEE' }}
          >
            <X size={20} color="#FF6B6B" />
          </button>
        ) : (
          <button
            className="tool-btn action-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Trace Image"
          >
            <ImageIcon size={20} color="#5D5D5D" />
          </button>
        )}

        <button
          className="tool-btn action-btn"
          onClick={() => onAction('clear')}
          title="Clear Canvas"
        >
          <Trash2 size={20} color="#FF6B6B" />
        </button>

        <button
          className="tool-btn action-btn"
          onClick={() => onAction('save')}
          title="Save Drawing"
        >
          <Download size={20} color="#4ECDC4" />
        </button>
      </div>

      <style>{`
        .toolbar-container {
          position: fixed;
          bottom: 20px;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          z-index: 100;
          pointer-events: none; 
        }

        .toolbar, .sub-toolbar {
          pointer-events: auto;
          background: white;
          padding: 8px 16px; 
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: var(--shadow);
        }

        .sub-toolbar {
          padding: 8px 15px;
          gap: 10px;
          animation: slideUp 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        
        .brush-menu {
            border-radius: 20px;
            padding: 10px 20px;
        }
        
        .brush-section {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .label {
            font-size: 0.8rem;
            color: #888;
            font-weight: 500;
            margin-right: 5px;
        }

        .size-options {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .size-btn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #F0F0F0;
            border: 2px solid transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #555;
            padding: 0;
        }

        .size-btn.active {
            border-color: var(--primary-color);
            background: white;
        }

        .type-btn {
            width: 30px;
            height: 30px;
            border-radius: 8px;
            background: #F0F0F0;
            border: 2px solid transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #555;
            padding: 0;
        }

        .type-btn.active {
            border-color: var(--primary-color);
            background: white;
            color: var(--primary-color);
        }
        
        .divider-small {
            width: 1px;
            height: 20px;
            background: #EEE;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
            .toolbar {
                gap: 8px;
                padding: 8px;
            }
            .tool-btn {
                width: 40px;
                height: 40px;
            }
        }

        .color-picker {
          display: flex;
          gap: 6px;
        }

        .color-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          padding: 0;
          transition: transform 0.2s;
        }

        .color-btn.active {
          transform: scale(1.2);
          border-color: var(--text-color);
        }

        .divider {
          width: 1px;
          height: 24px;
          background: #EEE;
        }

        .tool-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #F8F8F8;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid transparent;
          transition: all 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }

        .tool-btn.active {
          background: var(--accent-color);
          border-color: var(--text-color);
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .tool-btn:hover {
          background: var(--secondary-color);
        }
        
        .action-btn:hover {
           transform: translateY(-2px);
        }
        
        .teacher-btn {
            background: #E0EAFF;
        }
        .teacher-btn:hover {
            background: #D1DFFF;
        }

        .sticker-btn {
          font-size: 1.5rem;
          background: transparent;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .sticker-btn:hover {
          background: #f0f0f0;
          transform: scale(1.1);
        }

        .sticker-btn.active {
          background: var(--secondary-color);
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

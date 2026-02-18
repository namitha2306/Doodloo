import { useState } from 'react';
import { tutorials } from '../data/tutorials';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

export default function TutorialMode({ isActive, onClose }) {
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  if (!isActive) return null;

  const handleSelect = (tutorial) => {
    setSelectedTutorial(tutorial);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (selectedTutorial && currentStep < selectedTutorial.steps.length - 1) {
      setCurrentStep(c => c + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(c => c - 1);
    }
  };

  const handleCloseTutorial = () => {
    setSelectedTutorial(null);
    setCurrentStep(0);
  };

  return (
    <div className="tutorial-container">
      {!selectedTutorial ? (
        <div className="tutorial-menu card">
          <div className="card-header">
            <h3>Learn to Draw 🎓</h3>
            <button className="close-btn" onClick={onClose}><X size={20} /></button>
          </div>
          <div className="grid">
            {tutorials.map(t => (
              <button key={t.id} className="tutorial-item" onClick={() => handleSelect(t)}>
                <span className="icon">{t.icon}</span>
                <span className="title">{t.title}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="tutorial-step card">
          <div className="card-header">
            <button className="back-btn" onClick={handleCloseTutorial}><ChevronLeft size={20} /></button>
            <h3>{selectedTutorial.title}</h3>
            <span className="step-indicator">{currentStep + 1}/{selectedTutorial.steps.length}</span>
          </div>

          <div className="step-content">
            {selectedTutorial.steps[currentStep].image ? (
              <div className="step-image-container">
                <img
                  src={selectedTutorial.steps[currentStep].image}
                  alt={`Step ${currentStep + 1}`}
                  className="step-image"
                />
                <div className="step-text">
                  {selectedTutorial.steps[currentStep].text}
                </div>
              </div>
            ) : (
              <div className="step-text">
                {selectedTutorial.steps[currentStep].text}
                <div className="placeholder-image">🖼️ Illustration coming soon</div>
              </div>
            )}
          </div>

          <div className="step-controls">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="nav-btn"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === selectedTutorial.steps.length - 1}
              className="nav-btn"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .tutorial-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 200;
          font-family: 'Fredoka', sans-serif;
        }

        .card {
          background: white;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          width: 300px;
          animation: slideIn 0.3s ease-out;
          border: 2px solid var(--secondary-color);
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          color: var(--text-color);
        }

        .card-header h3 {
          margin: 0;
          font-size: 1.2rem;
          color: var(--primary-color);
        }

        .close-btn, .back-btn {
          background: none;
          border: none;
          color: var(--text-color);
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
        }
        
        .close-btn:hover, .back-btn:hover {
          background: #f0f0f0;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .tutorial-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 15px;
          background: #FFFDF5;
          border: 2px solid #EEE;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tutorial-item:hover {
          border-color: var(--primary-color);
          transform: translateY(-2px);
          background: white;
        }

        .tutorial-item .icon {
          font-size: 2rem;
          margin-bottom: 5px;
        }

        .tutorial-item .title {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-color);
        }

        .step-content {
          background: #FAFAFA;
          border-radius: 15px;
          padding: 20px;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-bottom: 15px;
          border: 2px dashed #E0E0E0;
        }

        .step-image-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          width: 100%;
        }

        .step-image {
           max-width: 100%;
           height: auto;
           max-height: 180px;
           object-fit: contain;
           border-radius: 10px;
           background: white;
           padding: 5px;
           box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .step-text {
          font-size: 1.1rem;
          color: #555;
          line-height: 1.4;
        }

        .placeholder-image {
           font-size: 0.8rem;
           color: #CCC;
           margin-top: 10px;
        }

        .step-controls {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .nav-btn {
          flex: 1;
          background: var(--secondary-color);
          color: var(--text-color);
        }
        
        .nav-btn:disabled {
          background: #EEE;
          color: #CCC;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </div>
  );
}

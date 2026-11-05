import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Play, CheckCircle, Clock } from 'lucide-react';

export default function AdCard({ ad, onWatchComplete }) {
  const [watching, setWatching] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ad.duration);
  const [watched, setWatched] = useState(ad.watched);

  useEffect(() => {
    let timer;
    if (watching && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && watching) {
      setWatching(false);
      setWatched(true);
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      onWatchComplete(ad.id, ad.reward);
    }
    return () => clearInterval(timer);
  }, [watching, timeLeft, ad.id, ad.reward, onWatchComplete]);

  const handleStartWatch = (e) => {
    e.stopPropagation();
    if (!watched && !watching) {
      setWatching(true);
    }
  };

  return (
    <div className="card bg-dark text-white border-secondary h-100 shadow-sm" style={{ zIndex: 10 }}>
      <img src={ad.image} className="card-img-top" alt={ad.title} style={{ height: '160px', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-primary">{ad.category}</span>
          <span className="text-warning fw-bold">+{ad.reward} VEs</span>
        </div>
        <h5 className="card-title text-white">{ad.title}</h5>
        <p className="card-text text-light opacity-75 small">Watch short advertisement and earn instant VEs.</p>
        
        <div className="mt-auto pt-3">
          {watched ? (
            <button className="btn btn-success w-100 disabled text-white" type="button" style={{ cursor: 'default' }}>
              <CheckCircle size={18} className="me-2" /> Watched (+{ad.reward} VEs)
            </button>
          ) : watching ? (
            <button className="btn btn-warning w-100 fw-bold" type="button" disabled>
              <Clock size={18} className="me-2" /> Watching... {timeLeft}s
            </button>
          ) : (
            <button 
              className="btn btn-primary w-100 fw-bold" 
              type="button" 
              onClick={handleStartWatch}
              style={{ cursor: 'pointer', zIndex: 20, position: 'relative' }}
            >
              <Play size={18} className="me-2" /> Watch Advertisement ({ad.duration}s)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
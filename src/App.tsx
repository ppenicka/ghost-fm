import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Ghost,
} from "lucide-react";

// Ghost animation configuration
const GHOST_COUNT = 25;
const GHOST_VARIANTS = ["float-1", "float-2", "float-3", "float-4", "float-5"];
const GHOST_SIZES = [24, 32, 48, 64, 72];

function GhostBackground() {
  const [ghosts, setGhosts] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      size: number;
      variant: string;
      delay: number;
      duration: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    const newGhosts = Array.from({ length: GHOST_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: GHOST_SIZES[Math.floor(Math.random() * GHOST_SIZES.length)],
      variant:
        GHOST_VARIANTS[Math.floor(Math.random() * GHOST_VARIANTS.length)],
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 18,
      opacity: 0.1 + Math.random() * 0.15,
    }));
    setGhosts(newGhosts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ghosts.map((ghost) => (
        <div
          key={ghost.id}
          className={`absolute ${ghost.variant}`}
          style={{
            left: `${ghost.left}%`,
            top: `${ghost.top}%`,
            animationDelay: `${ghost.delay}s`,
            animationDuration: `${ghost.duration}s`,
          }}
        >
          <Ghost
            size={ghost.size}
            className="text-cyan-200 animate-fade-in-out"
            style={
              {
                "--base-opacity": ghost.opacity,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  );
}

// Rest of the App component remains the same
const playlist = [
  {
    id: 1,
    title: "Haunted Melodies",
    artist: "Spectral Sounds",
    duration: "0:06",
    url: "/sample-6s.mp3",
  },
  {
    id: 2,
    title: "Midnight Whispers",
    artist: "Ghost Orchestra",
    duration: "0:12",
    url: "/sample-12s.mp3",
  },
];

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const playNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const playPrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-cyan-900 to-slate-900 text-cyan-100 relative overflow-hidden">
      <GhostBackground />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Radio Station Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Ghost size={48} className="text-cyan-400 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-cyan-200 glow-text">
            GhostFM
          </h1>
          <p className="text-cyan-400">Ethereal Tunes from the Other Side</p>
        </div>

        {/* Now Playing Section */}
        <div className="max-w-2xl mx-auto backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-cyan-500/20 bg-slate-900/40 hover:bg-slate-900/50 transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-1 text-cyan-200">
                {playlist[currentTrack].title}
              </h2>
              <p className="text-cyan-400">{playlist[currentTrack].artist}</p>
            </div>
            <span className="text-cyan-400">
              {playlist[currentTrack].duration}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-cyan-900/30 rounded-full mb-6">
            <div className="w-1/3 h-full bg-cyan-500 rounded-full glow"></div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={playPrevious}
              className="p-2 hover:bg-cyan-800/30 rounded-full transition-colors group"
            >
              <SkipBack size={24} className="group-hover:text-cyan-400" />
            </button>

            <button
              onClick={togglePlay}
              className="p-4 bg-cyan-600/20 hover:bg-cyan-600/40 rounded-full transition-all transform hover:scale-105 border border-cyan-400/20 hover:glow-button"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>

            <button
              onClick={playNext}
              className="p-2 hover:bg-cyan-800/30 rounded-full transition-colors group"
            >
              <SkipForward size={24} className="group-hover:text-cyan-400" />
            </button>

            <button
              onClick={toggleMute}
              className="p-2 hover:bg-cyan-800/30 rounded-full transition-colors group ml-4"
            >
              {isMuted ? (
                <VolumeX size={24} className="group-hover:text-cyan-400" />
              ) : (
                <Volume2 size={24} className="group-hover:text-cyan-400" />
              )}
            </button>
          </div>
        </div>

        {/* Playlist */}
        <div className="max-w-2xl mx-auto mt-8">
          <h3 className="text-xl font-semibold mb-4 text-cyan-200">
            Haunted Playlist
          </h3>
          <div className="space-y-2">
            {playlist.map((track, index) => (
              <div
                key={track.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer backdrop-blur-sm
                  ${
                    currentTrack === index
                      ? "bg-cyan-900/40 border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                      : "hover:bg-cyan-800/20 border border-transparent hover:border-cyan-500/20"
                  }`}
                onClick={() => setCurrentTrack(index)}
              >
                <div>
                  <p className="font-medium text-cyan-200">{track.title}</p>
                  <p className="text-sm text-cyan-400">{track.artist}</p>
                </div>
                <span className="text-cyan-400">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={playlist[currentTrack].url}
        onEnded={playNext}
      />
    </div>
  );
}

export default App;

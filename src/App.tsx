import { useState, useRef, useEffect } from "react";
import { GhostBackground } from "./GhostBackground";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Ghost,
} from "lucide-react";

// Rest of the App component remains the same
const playlist = [
  {
    id: 1,
    title: "AI in Thailand",
    artist: "Neon Saffron",
    duration: "3:42",
    url: "/AI_in_Thailand.mp3",
  },
  {
    id: 2,
    title: "Cyber Freedom",
    artist: "Echo Voltage",
    duration: "3:27",
    url: "/Cyber_Freedom.mp3",
  },
  {
    id: 3,
    title: "Rise of the Machine Gods",
    artist: "Silicon Domination",
    duration: "4:00",
    url: "/Rise_of_the_Machine_Gods.mp3",
  },
  {
    id: 4,
    title: "The Real McCoy",
    artist: "Joy McCoy",
    duration: "2:22",
    url: "/The_Real_McCoy.mp3",
  },
];

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // Progress as a percentage
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
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
    setProgress(0);
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length); // Use functional state update
  };

  const playPrevious = () => {
    setProgress(0);
    setCurrentTrack(
      (prevTrack) => (prevTrack - 1 + playlist.length) % playlist.length
    ); // Ensure positive index
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        setProgress(progress);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    // Reset progress
    setProgress(0);

    // Update the audio element's `src` to the new track
    audio.src = playlist[currentTrack].url;

    // Auto-play the new track if playback is active
    if (isPlaying) {
      audio.play();
    }
  }, [currentTrack, isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-cyan-900 to-slate-900 text-cyan-100 relative overflow-hidden">
      <GhostBackground />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Ghost size={48} className="text-cyan-400 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-cyan-200 glow-text">
            GhostFM
          </h1>
          <p className="text-cyan-400">Ethereal Tunes from the Other Side</p>
        </div>

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
            <div
              className="h-full bg-cyan-500 rounded-full glow"
              style={{ width: `${progress}%` }} // Dynamic width
            ></div>
          </div>

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

      <audio
        ref={audioRef}
        src={playlist[currentTrack].url}
        onEnded={playNext}
      />
    </div>
  );
}

export default App;

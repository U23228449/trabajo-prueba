"use client"

import { useState, useRef, useEffect } from "react"
import { Slider } from "./ui/slider"
import { Button } from "./ui/button"
import { Play, Pause, SkipBack, SkipForward, Shuffle, Star, Volume2 } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface Track {
  id: number
  title: string
  artist: string
  audioSrc: string
  waveformSrc: string
  lyrics: string[]
  timestamps: number[]
}

const tracks: Track[] = [
  {
    id: 1,
    title: "All My Love",
    artist: "Coldplay",
    audioSrc: "/audio/coldplay2.mp3",
    waveformSrc: "/images/coldplay2.jpg",
    lyrics: [
      "",
      "Until I die",
      "Let me hold you if you cry",
      "Be my one, two, three, forever",
      "'Cause you got all my love",
      "Whether it rains or pours, I'm all yours",
      "You've got all my love",
      "Whether it rains, it remains",
      "You've got all my love",
    ],
    timestamps: [0, 2, 4, 9, 15, 21, 29, 35, 43],
  },
  {
    id: 2,
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    audioSrc: "/audio/arctic.mp3",
    waveformSrc: "/images/arctic.jpeg",
    lyrics: [
      "",
      "Secrets I have held in my heart",
      "Are harder to hide than I thought",
      "Maybe I just wanna be yours",
      "I wanna be yours, I wanna be yours",
      "Wanna be yours, wanna be yours, wanna be yours",
    ],
    timestamps: [0 ,1.5, 5, 8, 12, 17],
  },
  {
    id: 3,
    title: "Amazing Day",
    artist: "Coldplay",
    audioSrc: "/audio/coldplay1.mp3",
    waveformSrc: "/images/coldplay1.jpg",
    lyrics: [
      "",
      "And the view",
      "The whole Milky Way",
      "In your eyes",
      "I'm drifting away",
      "And in your arms",
      "I just wanna sway",
      "Amazing day",
      "Amazing day",
      "Amazing day",
      "Amazing day",
      "Oh, oh, oh",
    ],
    timestamps: [0, 1.5, 5, 9, 12, 16, 19, 23, 27, 31, 34, 39],
  },
  {
    id: 4,
    title: "좋다고 말해?",
    artist: "BOL4",
    audioSrc: "/audio/bol4.mp3",
    waveformSrc: "/images/bol4.jpg",
    lyrics: [
      "",
      "If you like me",
      "If you like me, yeah",
      "And then I'm your girlfriend and you're my boyfriend",
      "어서 내게 좋다고 말해줘",
      "If you like me or love me",
      "Just say, yes, yes, yes",
      "And then I'm your girlfriend and you're my boyfriend",
      "어서 내게 좋다고 말해줘",
    ],
    timestamps: [0, 1.5, 4, 7, 11, 14, 16, 19, 22],
  },
  {
    id: 5,
    title: "Die With A Smile (feat. Bruno Mars)",
    artist: "Lady Gaga",
    audioSrc: "/audio/bruno.mp3",
    waveformSrc: "/images/bruno.jpeg",
    lyrics: [
      "If the world was ending, I'd wanna be next to you",
      "If the party was over and our time on Earth was through",
      "I'd wanna hold you just for a while and die with a smile",
      "If the world was ending, I'd wanna be next to you",
      "If the world was ending, I'd wanna be next to you",
      "Ooh",
      "I'd wanna be next to you",
    ],
    timestamps: [0, 8, 18, 27, 36, 45, 48],
  },
  {
    id: 6,
    title: "Lo que siento",
    artist: "Cuco",
    audioSrc: "/audio/cuco.mp3",
    waveformSrc: "/images/cuco.jpg",
    lyrics: [
      "Sabes bien que te quiero",
      "And if you're down to spend your summer with me, just let me know",
      "You know you're my sueño",
      "You came to my life and now I feel alright",
      "Dreaming of you when I'm alone",
    ],
    timestamps: [0, 8, 15, 23, 31],
  },

  {
    id: 7,
    title: "Here With Me",
    artist: "d4vd",
    audioSrc: "/audio/d4vd.mp3",
    waveformSrc: "/images/d4vd.jpg",
    lyrics: [
      "And if it's right",
      "I don't care how long it takes",
      "As long as I'm with you",
      "I've got a smile on my face",
      "Save your tears, it'll be okay",
      "All I know is you're here with me",
      "Oh, oh, oh, oh-oh-oh-oh-oh",
    ],
    timestamps: [0, 3, 10, 13, 18, 27, 36],
  },
  {
    id: 8,
    title: "Golden Hour",
    artist: "JVKE",
    audioSrc: "/audio/jvke.mp3",
    waveformSrc: "/images/jvke.png",
    lyrics: [
      "I was all alone with the love of my life",
      "She's got glitter for skin",
      "My radiant beam in the night",
      "I don't need no light to see you",
      "Shine",
      "It's your golden hour (oh)",
      "You slow down time",
      "In your golden hour (oh)",
      "We were just two lovers"
    ],
    timestamps: [0, 6, 8, 13, 17, 22, 30, 37, 48],
  },
]
const ValentineQuestion = ({
  onYes,
  onNo,
  yesButtonSize,
  noButtonVisible,
}: {
  onYes: () => void
  onNo: () => void
  yesButtonSize: number
  noButtonVisible: boolean
}) => (
  <div className="text-center mt-4 w-full">
    <p className="text-xl font-bold mb-2">Would you be my valentine?</p>
    <div className="flex flex-col items-center gap-4 w-full">
      <Button
        onClick={onYes}
        className="bg-pink-500 text-white hover:bg-pink-600 w-full transition-all duration-300"
        style={{ height: `${yesButtonSize}px`, fontSize: `${yesButtonSize / 3}px` }}
      >
        Yes
      </Button>
      {noButtonVisible && (
        <Button
          onClick={onNo}
          className="bg-gray-300 text-black hover:bg-gray-400 w-full transition-all duration-300"
          style={{ fontSize: `${Math.max(16, 8)}px` }}
        >
          No
        </Button>
      )}
    </div>
  </div>
)
const ValentineGif = () => (
  <div className="text-center mt-4">
    <p className="text-2xl font-bold text-pink-500 mb-4 text-glow-pink-strong ">Hehe, I'll treat you well</p>
    <img
      src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExejU1dXFlOWxybHFvOGQ0ZGUyenI1dHVkY2owbGFkYWlwc3pidzc0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WP1Z0FfnuMuXqPvDlj/giphy.gif"
      alt="Valentine's Day Celebration"
      className="mx-auto rounded-lg"
    />
  </div>
)

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(20)
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [valentineResponse, setValentineResponse] = useState<string | null>(null)
  const [yesButtonSize, setYesButtonSize] = useState(44)
  const [noButtonVisible, setNoButtonVisible] = useState(true)
  const [noButtonPresses, setNoButtonPresses] = useState(0)
  const currentTrack = tracks[currentTrackIndex]

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const remainingTime = duration - currentTime

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100

      const audio = audioRef.current

      const handleLoadedMetadata = () => {
        setDuration(audio.duration)
      }

      const handleEnded = () => {
        handleNextTrack()
      }

      audio.addEventListener("loadedmetadata", handleLoadedMetadata)
      audio.addEventListener("ended", handleEnded)

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audio.removeEventListener("ended", handleEnded)
      }
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrackIndex])


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  useEffect(() => {
    const lyricIndex = currentTrack.timestamps.findIndex(
      (timestamp, index) =>
        currentTime >= timestamp &&
        (index === currentTrack.timestamps.length - 1 || currentTime < currentTrack.timestamps[index + 1]),
    )
    setCurrentLyricIndex(lyricIndex === -1 ? 0 : lyricIndex)
  }, [currentTime, currentTrack])

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    setCurrentTime(e.currentTarget.currentTime)
  }

  const handleSliderChange = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === 0 ? tracks.length - 1 : prevIndex - 1))
    setCurrentTime(0)
    setIsPlaying(true)
  }

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === tracks.length - 1 ? 0 : prevIndex + 1))
    setCurrentTime(0)
    setIsPlaying(true)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  const handleValentineYes = () => {
    setValentineResponse("yes")
  }

  const handleValentineNo = () => {
    setNoButtonPresses((prevPresses) => prevPresses + 1)
    setYesButtonSize((prevSize) => Math.min(prevSize + 20, 160))
    if (noButtonPresses >= 4) {
      setNoButtonVisible(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-black/90 text-white rounded-3xl p-3 space-y-4">
      <div className="space-y-2 py-4 h-20">
        <p className="text-2xl font-medium text-center text-glow-strong">
          Each of these songs reminds me of you
        </p>
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full rounded-lg overflow-hidden"
          >
            <img
              src={currentTrack.waveformSrc || "/placeholder.svg"}
              alt="Waveform"
              className="w-full h-40 object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-1"
          >
            <h2 className="text-lg font-semibold text-glow-strong">{currentTrack.title}</h2>
            <p className="text-sm text-glow-subtle">{currentTrack.artist}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-2 py-4 h-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentTrack.id}-${currentLyricIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <p className="text-2xl font-medium text-center text-glow-strong">
              {currentTrack.lyrics[currentLyricIndex]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={duration}
          step={0.1}
          onValueChange={handleSliderChange}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-sm text-zinc-400">
          <span>{formatTime(currentTime)}</span>
          <span>-{formatTime(remainingTime)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
          <Star className="h-6 w-6 icon-glow" />
        </Button>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" onClick={handlePreviousTrack}>
            <SkipBack className="h-6 w-6 icon-glow" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white h-12 w-12"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="h-8 w-8 icon-glow" /> : <Play className="h-8 w-8 icon-glow" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" onClick={handleNextTrack}>
            <SkipForward className="h-6 w-6 icon-glow" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
          <Shuffle className="h-6 w-6 icon-glow" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-zinc-400" />
        <Slider value={[volume]} max={100} step={1} className="cursor-pointer" onValueChange={handleVolumeChange} />
      </div>

      <audio ref={audioRef} src={currentTrack.audioSrc} onTimeUpdate={handleTimeUpdate} />

      {valentineResponse === "yes" ? (
        <ValentineGif />
      ) : (
        <ValentineQuestion
          onYes={handleValentineYes}
          onNo={handleValentineNo}
          yesButtonSize={yesButtonSize}
          noButtonVisible={noButtonVisible}
        />
      )}
    </div>
  )
}


import { FiVideo } from 'react-icons/fi'
import { MdSlowMotionVideo } from 'react-icons/md'

interface LessonProps {
  title: string
  duration: string
  isCurrent?: boolean
  onPlay: () => void
}

export const Lesson = ({
  title,
  duration,
  onPlay,
  isCurrent = false,
}: LessonProps) => {
  return (
    <button
      onClick={onPlay}
      disabled={isCurrent}
      data-active={isCurrent}
      className="flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400"
    >
      {isCurrent ? (
        <MdSlowMotionVideo className="w-4 h-4 text-emerald-400" />
      ) : (
        <FiVideo className="w-4 h-4 text-zinc-500" />
      )}
      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  )
}

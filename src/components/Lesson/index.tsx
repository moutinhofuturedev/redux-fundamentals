import { FiVideo } from 'react-icons/fi'

interface LessonProps {
  title: string
  duration: string
}

export const Lesson = ({ title, duration }: LessonProps) => {
  return (
    <button className="flex items-center gap-3 text-sm text-zinc-400">
      <FiVideo className="w-4 h-4 text-zinc-500" />
      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  )
}

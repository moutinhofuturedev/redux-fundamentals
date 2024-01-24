import ReactPlayer from 'react-player'
import { FiLoader } from 'react-icons/fi'
import { next, useCurrentModuleAndLesson } from '../../store/slices/player'
import { useAppDispatch, useAppSelector } from '../../store'

export const Video = () => {
  const dispatch = useAppDispatch()
  const { currentLesson } = useCurrentModuleAndLesson()
  const isCourseLoading = useAppSelector((state) => state.player.isLoading)

  const handlePlayNext = () => {
    dispatch(next())
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isCourseLoading ? (
        <div className="flex h-full items-center justify-center">
          <FiLoader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          controls
          playing
          onEnded={handlePlayNext}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
          width="100%"
          height="100%"
        />
      )}
    </div>
  )
}

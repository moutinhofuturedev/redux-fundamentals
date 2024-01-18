import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { next, useCurrentModuleAndLesson } from '../../store/slices/player'

export const Video = () => {
  const dispatch = useDispatch()
  const { currentLesson } = useCurrentModuleAndLesson()

  const handlePlayNext = () => {
    dispatch(next())
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        controls
        playing
        onEnded={handlePlayNext}
        url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
        width="100%"
        height="100%"
      />
    </div>
  )
}

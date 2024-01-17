import ReactPlayer from 'react-player'
import { useAppSelector } from '../../store'
import { useDispatch } from 'react-redux'
import { next } from '../../store/slices/player'

export const Video = () => {
  const dispatch = useDispatch()
  const lesson = useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player

    const currentLesson =
      state.player.course.modules[currentModuleIndex].lessons[
        currentLessonIndex
      ]

    return currentLesson
  })

  const handlePlayNext = () => {
    dispatch(next())
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        controls
        playing
        onEnded={handlePlayNext}
        url={`https://www.youtube.com/watch?v=${lesson.id}`}
        width="100%"
        height="100%"
      />
    </div>
  )
}

import { useEffect } from 'react'
import { FiMessageCircle } from 'react-icons/fi'
import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { Module } from '../components/Module'
import { useAppDispatch, useAppSelector } from '../store'
import { loadCourse, useCurrentModuleAndLesson } from '../store/slices/player'

export const ClassPlayer = () => {
  const modules = useAppSelector((state) => {
    return state.player.course?.modules
  })
  const { currentLesson, currentModule } = useCurrentModuleAndLesson()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(loadCourse())
    }, 2000)
  }, [dispatch])

  useEffect(() => {
    if (currentModule && currentLesson) {
      document.title = `${currentLesson.title} | ${currentModule.title}`
    }
  }, [currentLesson, currentModule])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700">
            <FiMessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-80 absolute top-0 right-0 bottom-0 border-l border-zinc-800 divide-y-2 divide-zinc-900 bg-zinc-900 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {modules &&
              modules.map((module, index) => {
                return (
                  <Module
                    key={module.id}
                    moduleIndex={index}
                    title={module.title}
                    amountOfLessons={module.lessons.length}
                  />
                )
              })}
          </aside>
        </main>
      </div>
    </div>
  )
}

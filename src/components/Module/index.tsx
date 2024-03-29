import * as Collapsible from '@radix-ui/react-collapsible'
import { FiChevronDown } from 'react-icons/fi'
import { Lesson } from '../Lesson'
import { useAppDispatch, useAppSelector } from '../../store'
import { play } from '../../store/slices/player'

interface ModuleProps {
  moduleIndex: number
  title: string
  amountOfLessons: number
}

export const Module = ({
  moduleIndex,
  title,
  amountOfLessons,
}: ModuleProps) => {
  const dispatch = useAppDispatch()
  const isCourseLoading = useAppSelector((state) => state.player.isLoading)
  const { currentModuleIndex, currentLessonIndex } = useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player

    return {
      currentModuleIndex,
      currentLessonIndex,
    }
  })

  const lessons = useAppSelector((state) => {
    return state.player.course?.modules[moduleIndex].lessons
  })

  return (
    <>
      {isCourseLoading ? (
        <Collapsible.Root className="group">
          <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
            <div className="border border-blue-300">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </Collapsible.Trigger>
        </Collapsible.Root>
      ) : (
        <Collapsible.Root className="group">
          <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
            <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
              {moduleIndex + 1}
            </div>
            <div className="flex flex-col gap-1 text-left">
              <strong className="text-sm">{title}</strong>
              <span className="text-xs text-zinc-400">
                {amountOfLessons} aulas
              </span>
            </div>
            <FiChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
          </Collapsible.Trigger>
          <Collapsible.Content>
            <nav className="relative flex flex-col gap-4 p-6">
              {lessons &&
                lessons.map((lesson, lessonIndex) => {
                  const isCurrent =
                    currentModuleIndex === moduleIndex &&
                    currentLessonIndex === lessonIndex

                  return (
                    <Lesson
                      key={lesson.id}
                      title={lesson.title}
                      duration={lesson.duration}
                      onPlay={() => dispatch(play([moduleIndex, lessonIndex]))}
                      isCurrent={isCurrent}
                    />
                  )
                })}
            </nav>
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </>
  )
}

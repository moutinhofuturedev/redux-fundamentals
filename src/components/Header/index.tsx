import { useCurrentModuleAndLesson } from '../../store/slices/player'

export const Header = () => {
  const { currentModule, currentLesson } = useCurrentModuleAndLesson()

  if (!currentModule || !currentLesson) {
    return null
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentModule.title}</h1>
      <span className="text-sm text-zinc-400">
        Módulo &quot;{currentLesson.title}&quot;
      </span>
    </div>
  )
}

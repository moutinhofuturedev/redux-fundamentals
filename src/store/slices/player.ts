import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { useAppSelector } from '..'

interface Course {
  modules: {
    id: string
    title: string
    lessons: {
      id: string
      title: string
      duration: string
    }[]
  }[]
}

interface PlayState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
}

const initialState: PlayState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<Course>) => {
      state.course = action.payload
    },

    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0]
      state.currentLessonIndex = action.payload[1]
    },

    next: (state) => {
      // play automático na próxima aula
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      // play automático na aula do próximo modulo
      const nextModuleIndex = state.currentModuleIndex + 1
      const nextModule = state.course?.modules[nextModuleIndex]

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex

        return
      }

      if (nextModule) {
        state.currentModuleIndex = nextModuleIndex
        state.currentLessonIndex = 0
      }
    },
  },
})

export const useCurrentModuleAndLesson = () => {
  return useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player

    const currentModule = state.player.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return {
      currentModule,
      currentLesson,
    }
  })
}

export const player = playerSlice.reducer

export const { play, next, start } = playerSlice.actions

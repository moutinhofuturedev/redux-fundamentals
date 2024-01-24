import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PlayState } from './types'
import { useAppSelector } from '..'
import { api } from '../../api/api'
import axios, { AxiosError } from 'axios'

export const loadCourse = createAsyncThunk(
  'start',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/courses')

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError

        if (axiosError.response) {
          // O servidor respondeu com um status de erro
          console.error(
            'Erro na resposta do servidor:',
            axiosError.response.data,
          )
          return rejectWithValue(axiosError.response.data)
        } else if (axiosError.request) {
          // A requisição foi feita, mas não recebeu resposta
          console.error(
            'Erro na requisição, sem resposta do servidor:',
            axiosError.request,
          )
          return rejectWithValue({
            message: 'Sem resposta do servidor. Verifique sua conexão.',
          })
        } else {
          // Algo aconteceu durante a configuração da requisição que causou o erro
          console.error(
            'Erro durante a configuração da requisição:',
            axiosError.message,
          )
          return rejectWithValue({
            message: 'Erro desconhecido. Tente novamente mais tarde.',
          })
        }
      }
    }
  },
)

const initialState: PlayState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
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

  extraReducers(builder) {
    // se a chamada da api estiver pendente, loading is true
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true
    })

    // se a chamada da api estiver pendente, loading is false
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload
      state.isLoading = false
    })

    // se a chamada da api for rejeitada, loading is false
    builder.addCase(loadCourse.rejected, (state) => {
      state.course = null
      state.isLoading = false
    })
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

export const { play, next } = playerSlice.actions

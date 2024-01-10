import ReactPlayer from 'react-player'

export const Video = () => {
  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        controls
        url="https://www.youtube.com/watch?v=u99tNt3TZf8"
        width="100%"
        height="100%"
      />
    </div>
  )
}

interface VimeoPlayer {
  on(event: string, callback: (data: { seconds: number; duration: number }) => void): void
}

interface VimeoConstructor {
  Player: new (element: HTMLIFrameElement) => VimeoPlayer
}

interface Window {
  Vimeo?: VimeoConstructor
}

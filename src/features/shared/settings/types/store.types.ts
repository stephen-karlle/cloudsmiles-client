

export type SettingsStoreType = {
  isLoading: boolean
  setIsLoading: (value: boolean) => void

  activeBranch: string
  setActiveBranch: (value: string) => void
}
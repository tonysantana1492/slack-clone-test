import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useChannelStore } from '@/stores'

export enum TYPE_CHANNEL_ACTION {
  GET_ALL,
  GET_BY_ID,
}

export const useChannel = ({ type }: { type: TYPE_CHANNEL_ACTION }) => {
  const { channelId } = useParams()
  const navigate = useNavigate()
  const scrollRef = useRef(null)

  const [isLoading, setLoading] = useState(false)
  const [
    channels,
    getChannels,
    removeChannel,
    selectedChannel,
    getChannelById,
    addMessageToChannel,
  ] = useChannelStore((state) => [
    state.channels,
    state.getChannels,
    state.removeChannel,
    state.selectedChannel,
    state.getChannelById,
    state.addMessageToChannel,
  ])

  // GET CHANNEL SELECTED
  useEffect(() => {
    if (!(type === TYPE_CHANNEL_ACTION.GET_BY_ID)) return
    if (!channelId) navigate('/', { replace: true })

    const getChannelByIdHook = async () => {
      setLoading(true)
      try {
        await getChannelById(channelId as string)
      } finally {
        setLoading(false)
      }
    }

    getChannelByIdHook()
  }, [channelId, getChannelById, navigate, type])

  // GET ALL CHANNELS
  useEffect(() => {
    if (!(type === TYPE_CHANNEL_ACTION.GET_ALL)) return

    const getAllChannels = async () => {
      setLoading(true)

      try {
        await getChannels()
      } finally {
        setLoading(false)
      }
    }
    getAllChannels()
  }, [getChannels, type])

  return {
    isLoading,
    channels,
    getChannels,
    removeChannel,
    selectedChannel,
    addMessageToChannel,
    scrollRef,
  }
}

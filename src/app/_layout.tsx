import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { Slot, Redirect } from 'expo-router'
import { supabase } from '@/utils/supabase' // ajuste o caminho se necessário
import { COLORS } from '@/styles/colors'

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession()
      const session = data?.session
      setIsLoggedIn(!!session)
      setIsLoading(false)
    }

    checkUser()
  }, [])

  if (isLoading) return null 

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      {isLoggedIn ? <Redirect href={{ pathname: "/" as any }} /> : <Redirect href={{ pathname: "/newUser" }} />}
      <Slot />
    </>
  )
}
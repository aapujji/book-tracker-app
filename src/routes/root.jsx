import { Outlet } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Auth from '../Auth';
import Header from '../ui/Header';

const Root = () => {
    const [session, setSession] = useState('');

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
  
      return () => subscription.unsubscribe()
    }, [])
  
    if (!session) {
      return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
};

export default Root;
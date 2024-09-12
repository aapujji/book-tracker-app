import { supabase } from '../lib/supabase';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useEffect, useState, useCallback } from 'react';
import Header from '../ui/Header';
import Dashboard from '../ui/Dashboard';

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
        </>
    )
};

export default Root;
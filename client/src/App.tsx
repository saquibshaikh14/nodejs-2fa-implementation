
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router';
import { HomePage, LoginPage, LandingPage, SignupPage, TwoFactorPage, NotFoundPage, LogoutPage, ProfilePage } from './pages';
import { useAuth } from './context/auth-context';
import { Toaster } from 'react-hot-toast';
import { extendedToast as toast } from './utils/toast';
import { useEffect } from 'react';
import { LoadingIndicator } from './components';

function App() {

  const { isAuthenticated, user, isLoading } = useAuth();
  const show2FA = isAuthenticated && user && (user.twoFAStatus === 'required' || user.twoFAStatus === 'setup');

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <>
      <Toaster />
      {show2FA ? <TwoFactorPage />
        :
        < BrowserRouter >
          <Routes>
            {!show2FA &&
              <>
                <Route index element={isAuthenticated ? <HomePage /> : <LandingPage />} />
                <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} url="/profile" />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/logout' element={<LogoutPage />} />
                <Route path='*' element={<NotFoundPage />} />
              </>
            }

          </Routes>
        </BrowserRouter >}
    </>
  );
}

export default App;

/**
 * 
 * @param url matches Route path
 * @returns 
 */
function ProtectedRoute({ element, url = "" }: { element: React.ReactElement, url: string | null }) {
  const { isAuthenticated, setLastURL } = useAuth();
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(() => {
    if (!isAuthenticated && location.pathname === url) {
      setLastURL(location.pathname);
      toast.error('You need to signin to access this page!', { id: '2fa-error' });
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, location.pathname]);

  return element
}

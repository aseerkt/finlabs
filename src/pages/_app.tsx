import type { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import '@/styles/global.css';
import AuthProvider from '@/context/AuthContext';
import { API_URL } from '@/helpers/constants';
import Navbar from '@/components/Navbar';
import ToastProvider from '@/context/ToastContext';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

dayjs.extend(relativeTime);

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function ShowNavbar() {
  const router = useRouter();
  const show = !['/login', '/register'].includes(router.pathname);

  return show && <Navbar />;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastProvider>
        <ShowNavbar />
        <main className='container mx-auto'>
          <Component {...pageProps} />
        </main>
      </ToastProvider>
    </AuthProvider>
  );
}

export default MyApp;

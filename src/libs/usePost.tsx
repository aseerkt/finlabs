import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/context/ToastContext';

function usePost<Result, InputData>(
  url: string
): [(data: InputData) => Promise<void>, { loading: boolean; result: Result }] {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const toast = useToast();

  const makePostRequest = async (data: InputData) => {
    try {
      setLoading(true);
      const res = await axios.post(url, data);
      if (res.data) {
        setResult(res.data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (err.response.data) {
        toast(err.response.data.error, 'error');
      }
      setLoading(false);
    }
  };

  return [makePostRequest, { loading, result }];
}

export default usePost;

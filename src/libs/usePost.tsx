import axios from 'axios';
import { useState } from 'react';

function usePost<Result, InputData>(url: string) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

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
      setLoading(false);
    }
  };

  return [makePostRequest, { loading, result }];
}

export default usePost;

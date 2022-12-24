import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dataUrl = `http://localhost:5000/${url}`

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (dataUrl) => {
      setLoading(true);
      try {
        const response = await axios.get(dataUrl, {
          cancelToken: source.token
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          console.log(err);
          setData([]);
        }
      } finally {
        isMounted && setLoading(false);
      }
    }

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    }

    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, loading };
}

export default useAxios;
import { useEffect, useState } from 'react';

export default function useUser() {
  const [User, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/User')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  return { User, loading };
}
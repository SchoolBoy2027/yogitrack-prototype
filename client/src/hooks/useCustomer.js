import { useEffect, useState } from 'react';

export default function useCustomer() {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/Customer')
      .then((res) => res.json())
      .then((data) => setCustomer(data))
      .finally(() => setLoading(false));
  }, []);

  return { customer, loading };
}
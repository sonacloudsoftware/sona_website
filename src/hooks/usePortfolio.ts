"use client";

import { useState, useEffect } from 'react';
import { PortfolioItem } from '@/lib/db/schema';

export const usePortfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio items');
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error };
};

"use client";

import { useEffect, useState } from "react";

export interface Order {
  id: string;
  date: string;
  status:
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
  total: number;
  items: number;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Demo orders for frontend development.
        // Later this will come from the LUXORA backend API.

        const demoOrders: Order[] = [
          {
            id: "LUX-1001",
            date: "2026-08-28",
            status: "Delivered",
            total: 128,
            items: 2,
          },
          {
            id: "LUX-1002",
            date: "2026-08-30",
            status: "Shipped",
            total: 89,
            items: 1,
          },
          {
            id: "LUX-1003",
            date: "2026-09-01",
            status: "Processing",
            total: 156,
            items: 3,
          },
        ];

        setOrders(demoOrders);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders.");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  const addOrder = (order: Order) => {
    setOrders((currentOrders) => [order, ...currentOrders]);
  };

  return {
    orders,
    isLoading,
    error,
    getOrderById,
    addOrder,
    orderCount: orders.length,
  };
}
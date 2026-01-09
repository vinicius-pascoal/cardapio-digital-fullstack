"use client";

import { useEffect, useRef } from "react";
import { swalInfo } from "../lib/swal";
import { usePathname } from "next/navigation";
import { useAblyChannel } from "@/hooks/useAblyChannel";
import * as Ably from "ably";

export default function NewOrderNotifier() {
  const lastSeen = useRef<number | string | null>(null);
  const pathname = usePathname();

  // Configurar inscrição Ably para novos pedidos
  useAblyChannel("orders", {
    onMessage: (message: Ably.Types.Message) => {
      if (message.name === "new-order") {
        const order = message.data;

        // Não mostrar alertas se não estiver na rota /orders
        if (pathname === "/orders") {
          // Atualizar lastSeen
          lastSeen.current = String(order.id);

          // Mostrar notificação
          swalInfo({
            title: "Novo Pedido! 🎉",
            html: `
              <div>
                <p><strong>Pedido #${order.id}</strong></p>
                <p>Total: R$ ${order.total?.toFixed(2) || "0.00"}</p>
                <p>${order.itens?.length || 0} itens</p>
              </div>
            `,
            icon: "success",
            allowOutsideClick: true,
          });
        }
      } else if (message.name === "order-update") {
        const order = message.data;
        if (pathname === "/orders") {
          swalInfo({
            title: "Pedido Atualizado",
            html: `
              <p>Pedido #${order.id} foi atualizado</p>
              <p>Novo total: R$ ${order.total?.toFixed(2) || "0.00"}</p>
            `,
            icon: "info",
            allowOutsideClick: true,
          });
        }
      } else if (message.name === "order-delete") {
        const { id } = message.data;
        if (pathname === "/orders") {
          swalInfo({
            title: "Pedido Removido",
            html: `<p>Pedido #${id} foi removido</p>`,
            icon: "warning",
            allowOutsideClick: true,
          });
        }
      }
    },
    onError: (error: Error) => {
      console.error("Erro ao ouvir Ably:", error);
    },
  });

  // Inicialização legada (SSE) - pode ser removida quando Ably estiver totalmente integrado
  useEffect(() => {
    // Inicializa lastSeen silenciosamente para não mostrar o último pedido ao carregar
    try {
      const raw = localStorage.getItem("orders");
      const arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr) && arr.length > 0) {
        const latest = arr[arr.length - 1];
        lastSeen.current = latest?.id ? String(latest.id) : null;
      }
    } catch (e) {
      // ignore
    }

    function onOrdersUpdated() {
      try {
        // só mostramos o alerta se estivermos na rota /orders
        if (pathname !== "/orders") return;
        const raw = localStorage.getItem("orders");
        const arr = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(arr) || arr.length === 0) return;
        const latest = arr[arr.length - 1];
        if (!latest) return;
        if (lastSeen.current && String(latest.id) === String(lastSeen.current)) return;
        // novo pedido
        lastSeen.current = String(latest.id);
        const itemsHtml = (latest.items || []).map((it: any) => `<div>${it.nome} x ${it.quantidade} — ${it.preco || ''}</div>`).join("");
        swalInfo(`Pedido novo #${latest.id}`, `Total: ${latest.total || ''}<br/>${itemsHtml}`);
      } catch (e) {
        // ignore
      }
    }

    window.addEventListener("orders-updated", onOrdersUpdated);
    return () => window.removeEventListener("orders-updated", onOrdersUpdated);
  }, []);

  return null;
}

import { useState, useEffect } from 'react';
import * as Ably from 'ably';
import { useAblyChannel } from '@/hooks/useAblyChannel';

interface Order {
  id: number;
  total: number;
  createdAt: string;
  itens: Array<{
    quantidade: number;
    prato: {
      nome: string;
      preco: string;
    };
  }>;
}

/**
 * Componente de exemplo que demonstra como usar Ably para:
 * - Escutar novos pedidos em tempo real
 * - Atualizar lista quando um pedido é modificado
 * - Remover pedido quando ele é deletado
 */
export function OrdersWithAbly() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<string>('connecting');

  // Hook customizado para escutar o canal de pedidos
  useAblyChannel('orders', {
    onMessage: (message: Ably.Types.Message) => {
      console.log('Mensagem recebida:', message.name, message.data);

      switch (message.name) {
        case 'new-order':
          // Adicionar novo pedido no topo da lista
          setOrders((prev) => [message.data, ...prev]);
          // Mostrar notificação (opcional)
          showNotification(`Novo pedido #${message.data.id} criado!`, 'success');
          break;

        case 'order-update':
          // Atualizar pedido existente
          setOrders((prev) =>
            prev.map((order) =>
              order.id === message.data.id ? message.data : order
            )
          );
          showNotification(`Pedido #${message.data.id} atualizado!`, 'info');
          break;

        case 'order-delete':
          // Remover pedido da lista
          setOrders((prev) => prev.filter((order) => order.id !== message.data.id));
          showNotification(`Pedido #${message.data.id} removido!`, 'warning');
          break;

        default:
          console.log('Evento desconhecido:', message.name);
      }
    },

    onError: (error: Error) => {
      console.error('Erro no canal Ably:', error);
      setConnectionStatus('error');
      showNotification(
        'Erro de conexão com servidor em tempo real',
        'error'
      );
    },
  });

  // Carregar pedidos iniciais
  useEffect(() => {
    fetchOrders();
  }, []);

  // Monitorar status da conexão
  useEffect(() => {
    setConnectionStatus('connected');
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`
      );
      if (!response.ok) throw new Error('Falha ao carregar pedidos');

      const data: Order[] = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      showNotification('Erro ao carregar pedidos', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error') => {
    // Implementar com sua biblioteca de notificações preferida
    // Exemplo com SweetAlert2 (já usado no projeto)
    console.log(`[${type.toUpperCase()}] ${message}`);
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Pedidos em Tempo Real</h2>
        <div className="connection-status">
          <span
            className={`status-indicator ${connectionStatus}`}
            title={`Status: ${connectionStatus}`}
          />
          <span className="status-text">{connectionStatus}</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum pedido ainda</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Pedido #{order.id}</h3>
                <span className="order-total">R$ {order.total.toFixed(2)}</span>
              </div>

              <div className="order-items">
                {order.itens.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <span className="item-name">{item.prato.nome}</span>
                    <span className="item-qty">x{item.quantidade}</span>
                    <span className="item-price">
                      R$ {(Number(item.prato.preco) * item.quantidade).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .orders-container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .orders-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 15px;
        }

        .orders-header h2 {
          margin: 0;
          font-size: 28px;
          color: #333;
        }

        .connection-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background-color: #f5f5f5;
          border-radius: 4px;
        }

        .status-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: pulse 1s infinite;
        }

        .status-indicator.connected {
          background-color: #4caf50;
        }

        .status-indicator.error {
          background-color: #f44336;
        }

        .status-indicator.connecting {
          background-color: #ff9800;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .status-text {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #999;
        }

        .orders-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .order-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .order-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #eee;
        }

        .order-header h3 {
          margin: 0;
          font-size: 18px;
          color: #333;
        }

        .order-total {
          font-size: 18px;
          font-weight: bold;
          color: #4caf50;
        }

        .order-items {
          margin: 12px 0;
        }

        .order-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          font-size: 14px;
          color: #666;
        }

        .item-name {
          flex: 1;
          font-weight: 500;
        }

        .item-qty {
          margin: 0 12px;
          color: #999;
        }

        .item-price {
          font-weight: bold;
          color: #333;
        }

        .order-footer {
          padding-top: 12px;
          border-top: 1px solid #eee;
          font-size: 12px;
          color: #999;
        }

        .order-date {
          display: block;
        }
      `}</style>
    </div>
  );
}

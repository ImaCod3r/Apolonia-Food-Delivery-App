import { supabase } from "@/utils/supabase";

type Order = {
  id: number
  user_id: string
  status: string
  // Adicione outros campos se quiser
}

let channel: ReturnType<typeof supabase.channel> | null = null

export const startOrderListener = (
  userId: string,
  onUpdate: (order: Order) => void
): void => {
  if (!userId || channel) return

  channel = supabase.channel('order_status_updates')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
      },
      (payload) => {
        const order = payload.new as Order
        if (order.user_id === userId) {
          onUpdate(order)
        }
      }
    )
    .subscribe()
}

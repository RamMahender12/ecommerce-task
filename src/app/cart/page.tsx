import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { CartView } from '@/components/cart/CartView';

export default function CartPage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">
          Your cart
        </h1>
        <p className="mt-1 text-brand-muted">Review and update your items.</p>
        <div className="mt-8">
          <CartView />
        </div>
      </div>
    </ProtectedRoute>
  );
}

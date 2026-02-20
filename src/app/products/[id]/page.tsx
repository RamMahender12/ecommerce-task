import { ProductDetails } from '@/components/product/ProductDetails';

type Props = {
  params: { id: string };
};

export default function ProductPage({ params }: Props) {
  const { id } = params;
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ProductDetails productId={id} />
    </div>
  );
}

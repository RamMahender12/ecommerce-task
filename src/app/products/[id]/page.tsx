import { ProductDetails } from '@/components/product/ProductDetails';

type Props = {
  params: { id: string };
};

export default function ProductPage({ params }: Props) {
  const { id } = params;
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails productId={id} />
    </div>
  );
}

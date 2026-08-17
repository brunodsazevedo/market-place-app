import { ProductInterface } from '@/shared/interfaces/Product'

interface UseProductCardViewModelParams {
  product: ProductInterface
}

export const useProductCardViewModel = ({
  product,
}: UseProductCardViewModelParams) => {
  return { product }
}

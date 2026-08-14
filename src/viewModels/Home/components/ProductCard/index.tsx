import { FC } from 'react'
import { Text, View } from 'react-native'

import { ProductInterface } from '@/shared/interfaces/Product'

interface ProductCardParams {
  product: ProductInterface
}

export const ProductCard: FC<ProductCardParams> = ({ product }) => {
  return (
    <View>
      <Text>{product.name}</Text>
    </View>
  )
}

import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { HomeHeader } from './components/HomeHeader'
import { SearchInput } from './components/SearchInput'
import { ProductCard } from './components/ProductCard'

import { ProductInterface } from '@/shared/interfaces/Product'

export const HomeView = () => {
  const productsList: ProductInterface[] = [
    {
      id: 1,
      value: '199.9',
      name: 'Fone de Ouvido Bluetooth',
      description: 'Fone sem fio com cancelamento de ruído e bateria de 20h',
      photo: 'https://example.com/photos/fone-bluetooth.jpg',
      height: '7.5',
      width: '18.2',
      weight: '0.25',
      averageRating: 4.5,
      views: 1523,
      ratingCount: 342,
      categoryId: 1,
      category: { id: 1, name: 'Eletrônicos' },
      createdAt: '2025-01-10T09:00:00.000Z',
      updatedAt: '2025-06-15T14:30:00.000Z',
      deletedAt: '',
    },
    {
      id: 2,
      value: '89.9',
      name: 'Liquidificador Turbo 900W',
      description: 'Liquidificador com 5 velocidades e copo de 2L em vidro',
      photo: 'https://example.com/photos/liquidificador.jpg',
      height: '38.0',
      width: '20.5',
      weight: '2.1',
      averageRating: 4.2,
      views: 872,
      ratingCount: 156,
      categoryId: 2,
      category: { id: 2, name: 'Casa e Cozinha' },
      createdAt: '2025-02-05T11:20:00.000Z',
      updatedAt: '2025-05-20T10:15:00.000Z',
      deletedAt: '',
    },
    {
      id: 3,
      value: '349.0',
      name: 'Bicicleta Ergométrica',
      description:
        'Bicicleta para exercícios com monitor de frequência cardíaca',
      photo: 'https://example.com/photos/bicicleta-ergometrica.jpg',
      height: '120.0',
      width: '55.0',
      weight: '18.5',
      averageRating: 4.7,
      views: 2140,
      ratingCount: 498,
      categoryId: 3,
      category: { id: 3, name: 'Esportes' },
      createdAt: '2024-11-22T08:45:00.000Z',
      updatedAt: '2025-07-01T16:00:00.000Z',
      deletedAt: '',
    },
    {
      id: 4,
      value: '1299.0',
      name: 'Smart TV 50" 4K',
      description: 'Smart TV com HDR, controle por voz e Wi-Fi integrado',
      photo: 'https://example.com/photos/smart-tv.jpg',
      height: '65.0',
      width: '112.5',
      weight: '12.8',
      averageRating: 4.6,
      views: 5320,
      ratingCount: 1207,
      categoryId: 1,
      category: { id: 1, name: 'Eletrônicos' },
      createdAt: '2025-03-18T13:10:00.000Z',
      updatedAt: '2025-08-01T09:40:00.000Z',
      deletedAt: '',
    },
    {
      id: 5,
      value: '59.9',
      name: 'Jogo de Panelas Antiaderente',
      description:
        'Conjunto com 5 peças, cabo termoisolante e revestimento cerâmico',
      photo: 'https://example.com/photos/panelas.jpg',
      height: '15.0',
      width: '30.0',
      weight: '4.3',
      averageRating: 4.3,
      views: 640,
      ratingCount: 98,
      categoryId: 2,
      category: { id: 2, name: 'Casa e Cozinha' },
      createdAt: '2025-04-02T10:00:00.000Z',
      updatedAt: '2025-06-28T17:25:00.000Z',
      deletedAt: '',
    },
    {
      id: 6,
      value: '129.9',
      name: 'Tênis de Corrida',
      description: 'Tênis leve com amortecimento em gel para longas distâncias',
      photo: 'https://example.com/photos/tenis-corrida.jpg',
      height: '12.0',
      width: '10.0',
      weight: '0.6',
      averageRating: 4.4,
      views: 1890,
      ratingCount: 421,
      categoryId: 3,
      category: { id: 3, name: 'Esportes' },
      createdAt: '2025-05-14T15:30:00.000Z',
      updatedAt: '2025-07-19T12:05:00.000Z',
      deletedAt: '',
    },
  ]

  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <FlatList
        data={productsList}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => `${item.id}`}
        ListHeaderComponent={() => (
          <>
            <HomeHeader />

            <SearchInput />
          </>
        )}
        contentContainerClassName="px-4 pb-[120px]"
      />
    </SafeAreaView>
  )
}

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const houseImages = {
  1: 'house',
  2: 'house 2',
  3: 'house 3',
  4: 'house 4',
  5: 'house 5',
  6: 'house 6',
  7: 'house 7',
  8: 'house 8',
}

const rawProperties = [
  {
    id: 1,
    title: '2-х комн. апартаменты',
    buildingName: 'Морской',
    address: 'улица Прапорщика Комарова, 34',
    price: 15500000,
    area: 51,
    rooms: 2,
    floor: 14,
    totalFloors: 25,
    view: 'Вид на море',
    features: ['С мебелью', 'Лоджия 8м²'],
    district: 'Ленинский',
    microdistrict: 'Центр',
    type: 'apartment',
    dealType: 'sale',
    completionDate: 'IV кв. 2025',
    yearBuilt: 2023,
    kitchenArea: 10.3,
    imageKey: 'object1',
    description:
      'Просторная двухкомнатная квартира с видом на море. Современный ремонт, мебель в подарок.',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: '1-к. квартира',
    buildingName: 'Стрелковый',
    address: 'улица Стрелковая, 12',
    price: 8900000,
    area: 38,
    rooms: 1,
    floor: 5,
    totalFloors: 22,
    view: 'Во двор',
    features: ['Без мебели', 'Балкон'],
    district: 'Первореченский',
    microdistrict: 'Снеговая Падь',
    type: 'apartment',
    dealType: 'sale',
    completionDate: 'Сдан',
    yearBuilt: 2018,
    kitchenArea: 8,
    imageKey: 'object2',
    description: 'Светлая однокомнатная квартира в тихом районе.',
    createdAt: '2024-01-10',
  },
  {
    id: 3,
    title: '3-к. квартира',
    buildingName: 'Залив',
    address: 'проспект Острякова, 45',
    price: 22000000,
    area: 85,
    rooms: 3,
    floor: 17,
    totalFloors: 20,
    view: 'Вид на залив',
    features: ['С мебелью', 'Два балкона', 'Гараж'],
    district: 'Ленинский',
    microdistrict: 'Эгершельд',
    type: 'apartment',
    dealType: 'sale',
    completionDate: 'II кв. 2026',
    yearBuilt: 2024,
    kitchenArea: 14,
    imageKey: 'object3',
    description: 'Трёхкомнатная квартира с видом на Амурский залив.',
    createdAt: '2024-01-08',
  },
  {
    id: 4,
    title: 'Студия',
    buildingName: 'Калинина',
    address: 'улица Калинина, 78',
    price: 5500000,
    area: 25,
    rooms: 1,
    floor: 3,
    totalFloors: 15,
    view: 'Во двор',
    features: ['С мебелью'],
    district: 'Советский',
    microdistrict: 'Второй речки',
    type: 'apartment',
    dealType: 'sale',
    completionDate: 'Сдан',
    yearBuilt: 2019,
    kitchenArea: 6,
    imageKey: 'object4',
    description: 'Уютная студия вблизи центра.',
    createdAt: '2024-01-05',
  },
  {
    id: 5,
    title: '2-к. квартира',
    buildingName: 'Берёзка',
    address: 'улица Нейбута, 23',
    price: 12500000,
    area: 58,
    rooms: 2,
    floor: 9,
    totalFloors: 24,
    view: 'Вид на город',
    features: ['Лоджия', 'Кондиционер'],
    district: 'Первореченский',
    microdistrict: 'Березовая роща',
    type: 'apartment',
    dealType: 'sale',
    completionDate: 'III кв. 2025',
    yearBuilt: 2022,
    kitchenArea: 11,
    imageKey: 'object5',
    description: 'Квартира в современном ЖК с охраной.',
    createdAt: '2024-01-02',
  },
  {
    id: 6,
    title: '2-х комн. апартаменты',
    buildingName: 'Золотой Рог',
    address: 'улица Морская, 11',
    price: 18500000,
    area: 73.7,
    rooms: 2,
    floor: 12,
    totalFloors: 20,
    view: 'Вид на море',
    features: ['С мебелью', 'Терраса'],
    district: 'Ленинский',
    microdistrict: 'Золотой Рог',
    type: 'apartment',
    dealType: 'sale',
    completionDate: 'Сдан',
    yearBuilt: 2023,
    kitchenArea: 10.3,
    imageKey: 'object6',
    description: 'Апартаменты в премиальном ЖК на берегу моря.',
    createdAt: '2023-12-28',
  },
  {
    id: 7,
    title: 'Таунхаус',
    buildingName: 'Тихая',
    address: 'посёлок Тихая, 5',
    price: 35000000,
    area: 180,
    rooms: 5,
    floor: 3,
    totalFloors: 3,
    view: 'Вид на горы',
    features: ['Двор', 'Гараж', 'Баня'],
    district: 'Советский',
    microdistrict: 'Сад-город',
    type: 'townhouse',
    dealType: 'sale',
    completionDate: 'Сдан',
    yearBuilt: 2021,
    kitchenArea: 20,
    imageKey: 'object7',
    description: 'Таунхаус в экологически чистом районе.',
    createdAt: '2023-12-20',
  },
  {
    id: 8,
    title: 'Коттедж',
    buildingName: 'Ручьи',
    address: 'село Ручьи, 42',
    price: 42000000,
    area: 250,
    rooms: 6,
    floor: 2,
    totalFloors: 2,
    view: 'Вид на лес',
    features: ['Участок 10 соток', 'Гараж', 'Баня'],
    district: 'Советский',
    microdistrict: 'Сад-город',
    type: 'house',
    dealType: 'sale',
    completionDate: 'Сдан',
    yearBuilt: 2020,
    kitchenArea: 18,
    imageKey: 'object8',
    description: 'Современный коттедж в пригороде.',
    createdAt: '2023-12-15',
  },
]

export const usePropertiesStore = defineStore('properties', () => {
  const properties = ref(rawProperties)

  const filters = ref({
    district: '',
    microdistrict: '',
    rooms: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    dealType: 'sale',
    type: '',
  })

  const searchQuery = ref('')

  const filteredProperties = computed(() => {
    let result = [...properties.value]

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(
        (p) =>
          p.address.toLowerCase().includes(query) ||
          p.title.toLowerCase().includes(query) ||
          p.district.toLowerCase().includes(query) ||
          (p.buildingName && p.buildingName.toLowerCase().includes(query))
      )
    }

    if (filters.value.district) {
      const d = filters.value.district.toLowerCase()
      result = result.filter(
        (p) =>
          p.district.toLowerCase().includes(d) ||
          p.microdistrict.toLowerCase().includes(d)
      )
    }

    if (filters.value.microdistrict) {
      result = result.filter((p) => p.microdistrict === filters.value.microdistrict)
    }

    if (filters.value.rooms) {
      const rooms = parseInt(filters.value.rooms)
      if (rooms === 4) {
        result = result.filter((p) => p.rooms >= 4)
      } else {
        result = result.filter((p) => p.rooms === rooms)
      }
    }

    if (filters.value.minPrice) {
      result = result.filter((p) => p.price >= parseInt(filters.value.minPrice))
    }
    if (filters.value.maxPrice) {
      result = result.filter((p) => p.price <= parseInt(filters.value.maxPrice))
    }
    if (filters.value.minArea) {
      result = result.filter((p) => p.area >= parseFloat(filters.value.minArea))
    }
    if (filters.value.maxArea) {
      result = result.filter((p) => p.area <= parseFloat(filters.value.maxArea))
    }
    if (filters.value.dealType) {
      result = result.filter((p) => p.dealType === filters.value.dealType)
    }
    if (filters.value.type) {
      result = result.filter((p) => p.type === filters.value.type)
    }

    return result
  })

  function getPropertyById(id) {
    return properties.value.find((p) => p.id === parseInt(id))
  }

  function updateFilters(newFilters) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function resetFilters() {
    filters.value = {
      district: '',
      microdistrict: '',
      rooms: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
      dealType: 'sale',
      type: '',
    }
    searchQuery.value = ''
  }

  return {
    properties,
    filters,
    searchQuery,
    filteredProperties,
    getPropertyById,
    updateFilters,
    resetFilters,
  }
})

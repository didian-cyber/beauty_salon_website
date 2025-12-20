export interface Service {
  id: number
  category: string
  name: string
  description?: string
  time: string
  priceMaster: number
  priceTopMaster: number
  icon?: string
}

const initialServicesData: Service[] = [
  {
    id: 1,
    category: 'manicure',
    name: 'Маникюр и покрытие гель лак «Все включено»',
    description: 'Комплексный уход за ногтями с покрытием гель-лаком',
    time: '2ч 30мин',
    priceMaster: 2300,
    priceTopMaster: 2800,
  },
  {
    id: 2,
    category: 'manicure',
    name: 'Маникюр без покрытия',
    description: 'Гигиенический маникюр без декоративного покрытия',
    time: '1ч',
    priceMaster: 1800,
    priceTopMaster: 2200,
  },
  {
    id: 3,
    category: 'manicure',
    name: 'Японский маникюр P.Shine',
    description: 'Технология японского маникюра для здоровых ногтей',
    time: '2ч',
    priceMaster: 2100,
    priceTopMaster: 2600,
  },
  {
    id: 4,
    category: 'manicure',
    name: 'Наращивание ногтей',
    description: 'Наращивание ногтей гелем или акрилом',
    time: '3ч',
    priceMaster: 3300,
    priceTopMaster: 3800,
  },
  
  {
    id: 5,
    category: 'pedicure',
    name: 'Полный педикюр с покрытием гель лак',
    description: 'Полный комплекс ухода за стопами с покрытием',
    time: '2ч',
    priceMaster: 2800,
    priceTopMaster: 3300,
  },
  {
    id: 6,
    category: 'pedicure',
    name: 'Педикюр «Пальчики» с покрытием гель лак',
    description: 'Уход только за пальцами ног с покрытием',
    time: '1ч',
    priceMaster: 1800,
    priceTopMaster: 2200,
  },
  {
    id: 7,
    category: 'pedicure',
    name: 'Педикюр без покрытия ногтей',
    description: 'Гигиенический педикюр без декоративного покрытия',
    time: '1ч 30мин',
    priceMaster: 2000,
    priceTopMaster: 2500,
  },
  {
    id: 8,
    category: 'pedicure',
    name: 'Японский педикюр',
    description: 'Японская технология ухода за стопами',
    time: '2ч',
    priceMaster: 2500,
    priceTopMaster: 3000,
  },
  {
    id: 9,
    category: 'pedicure',
    name: 'Пленочный педикюр',
    description: 'Педикюр с использованием специальных пленок',
    time: '1ч 30мин',
    priceMaster: 2200,
    priceTopMaster: 2700,
  },
  
  {
    id: 10,
    category: 'haircut',
    name: 'Стрижка женская',
    description: 'Женская стрижка любой сложности',
    time: '1ч',
    priceMaster: 1500,
    priceTopMaster: 2000,
  },
  {
    id: 11,
    category: 'haircut',
    name: 'Стрижка мужская',
    description: 'Мужская стрижка и оформление',
    time: '45мин',
    priceMaster: 1200,
    priceTopMaster: 1600,
  },
  {
    id: 12,
    category: 'haircut',
    name: 'Стрижка детская',
    description: 'Детская стрижка для мальчиков и девочек',
    time: '45мин',
    priceMaster: 800,
    priceTopMaster: 1200,
  },
  {
    id: 13,
    category: 'haircut',
    name: 'Повседневная укладка на браш',
    description: 'Повседневная укладка с использованием браша',
    time: '45мин',
    priceMaster: 800,
    priceTopMaster: 1200,
  },
  {
    id: 14,
    category: 'haircut',
    name: 'Вечерняя укладка локоны/волны',
    description: 'Вечерняя укладка с созданием локонов или волн',
    time: '1ч',
    priceMaster: 1200,
    priceTopMaster: 1700,
  },
  {
    id: 15,
    category: 'haircut',
    name: 'Окрашивание коротких волос',
    description: 'Окрашивание волос до плеч',
    time: '2ч',
    priceMaster: 2200,
    priceTopMaster: 2700,
  },
  {
    id: 16,
    category: 'haircut',
    name: 'Окрашивание средних волос',
    description: 'Окрашивание волос до лопаток',
    time: '2ч 30мин',
    priceMaster: 2800,
    priceTopMaster: 3300,
  },
  {
    id: 17,
    category: 'haircut',
    name: 'Тотал блонд короткие волосы',
    description: 'Полное осветление коротких волос',
    time: '3ч 30мин',
    priceMaster: 4500,
    priceTopMaster: 5200,
  },
  {
    id: 18,
    category: 'haircut',
    name: 'Тотал блонд длинные волосы',
    description: 'Полное осветление длинных волос',
    time: '4ч 30мин',
    priceMaster: 6800,
    priceTopMaster: 7500,
  },
  {
    id: 19,
    category: 'haircut',
    name: 'Обесцвечивание коротких волос',
    description: 'Обесцвечивание волос до плеч',
    time: '3ч',
    priceMaster: 3800,
    priceTopMaster: 4500,
  },
  {
    id: 20,
    category: 'haircut',
    name: 'Обесцвечивание длинных волос',
    description: 'Обесцвечивание волос до лопаток',
    time: '4ч',
    priceMaster: 5800,
    priceTopMaster: 6500,
  },
  
  {
    id: 21,
    category: 'lashes',
    name: 'Ламинирование ресниц',
    description: 'Ламинирование для придания объема и изгиба',
    time: '1ч',
    priceMaster: 1800,
    priceTopMaster: 2300,
  },
  {
    id: 22,
    category: 'lashes',
    name: 'Наращивание Classic',
    description: 'Классическое наращивание 1:1',
    time: '2ч',
    priceMaster: 2500,
    priceTopMaster: 3000,
  },
  {
    id: 23,
    category: 'lashes',
    name: 'Наращивание объем 1,5D',
    description: 'Объемное наращивание 1.5D',
    time: '2ч 30мин',
    priceMaster: 2800,
    priceTopMaster: 3300,
  },
  {
    id: 24,
    category: 'lashes',
    name: 'Наращивание объем 2D',
    description: 'Объемное наращивание 2D',
    time: '3ч',
    priceMaster: 3200,
    priceTopMaster: 3700,
  },
  {
    id: 25,
    category: 'lashes',
    name: 'Наращивание объем 3D',
    description: 'Объемное наращивание 3D',
    time: '3ч 30мин',
    priceMaster: 3800,
    priceTopMaster: 4300,
  },
  {
    id: 26,
    category: 'lashes',
    name: 'Наращивание объем 4D',
    description: 'Объемное наращивание 4D',
    time: '4ч',
    priceMaster: 4200,
    priceTopMaster: 4700,
  },
  {
    id: 27,
    category: 'lashes',
    name: 'Наращивание «Уголки»',
    description: 'Наращивание только внешних уголков',
    time: '1ч 30мин',
    priceMaster: 1800,
    priceTopMaster: 2300,
  },
  {
    id: 28,
    category: 'lashes',
    name: 'Снятие ресниц без последующего наращивания',
    description: 'Аккуратное снятие нарощенных ресниц',
    time: '30мин',
    priceMaster: 500,
    priceTopMaster: 700,
  },
  
  {
    id: 29,
    category: 'brows',
    name: 'Коррекция бровей',
    description: 'Коррекция формы бровей',
    time: '30мин',
    priceMaster: 600,
    priceTopMaster: 800,
  },
  {
    id: 30,
    category: 'brows',
    name: 'Окрашивание краской',
    description: 'Окрашивание бровей краской',
    time: '30мин',
    priceMaster: 700,
    priceTopMaster: 900,
  },
  {
    id: 31,
    category: 'brows',
    name: 'Долговременная укладка',
    description: 'Долговременная укладка бровей',
    time: '1ч',
    priceMaster: 1500,
    priceTopMaster: 1800,
  },
  
  {
    id: 32,
    category: 'depilation',
    name: 'Комплекс 1 (подмышки, бикини, голень)',
    description: 'Комплексная депиляция зон',
    time: '1ч 30мин',
    priceMaster: 3200,
    priceTopMaster: 3700,
  },
  {
    id: 33,
    category: 'depilation',
    name: 'Комплекс 2 (подмышки, бикини, ноги полностью)',
    description: 'Полная депиляция ног',
    time: '2ч',
    priceMaster: 4200,
    priceTopMaster: 4700,
  },
  {
    id: 34,
    category: 'depilation',
    name: 'Комплекс 3 (подмышки, бикини, ноги, руки)',
    description: 'Полная депиляция тела',
    time: '2ч 30мин',
    priceMaster: 5200,
    priceTopMaster: 5700,
  },
  {
    id: 35,
    category: 'depilation',
    name: 'Комплекс 4 (лицо полностью)',
    description: 'Депиляция лица',
    time: '1ч',
    priceMaster: 1800,
    priceTopMaster: 2300,
  }
]

export const getServicesData = (): Service[] => {
  try {
    const stored = localStorage.getItem('beautyServices')

    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // Ignore
  }

  if (initialServicesData.length > 0 && !localStorage.getItem('beautyServices')) {
    localStorage.setItem('beautyServices', JSON.stringify(initialServicesData))
  }

  return initialServicesData
}

let _servicesDataCache: Service[] | null = null

export const servicesData = new Proxy({} as Service[], {
  get(_target, prop) {
    if (!_servicesDataCache) {
      _servicesDataCache = getServicesData()
    }
    const data = getServicesData()

    if (JSON.stringify(data) !== JSON.stringify(_servicesDataCache)) {
      _servicesDataCache = data
    }

    return Reflect.get(data, prop)
  }
})

export const serviceCategories = [
  { id: 'manicure', name: 'Маникюр' },
  { id: 'pedicure', name: 'Педикюр' },
  { id: 'haircut', name: 'Стрижка и окрашивание' },
  { id: 'lashes', name: 'Ресницы' },
  { id: 'brows', name: 'Брови' },
  { id: 'depilation', name: 'Депиляция' }
]

export const getServicesByCategory = (category: string): Service[] => {
  return getServicesData().filter(service => service.category === category)
}

export const getCategoryName = (categoryId: string): string => {
  const category = serviceCategories.find(cat => cat.id === categoryId)

  return category ? category.name : categoryId
}
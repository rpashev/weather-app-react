import { LanguageMapType } from './en';

export const es: LanguageMapType = Object.freeze({
  linkTitles: {
    Login: 'Iniciar sesión',
    Home: 'Inicio',
    ['Sign Up']: 'Registrarse',
    Logout: 'Cerrar sesión',
    Map: 'Mapa',
    Settings: 'Ajustes',
  },
  pages: {
    login: {
      title: 'Iniciar sesión',
      email: 'Correo electrónico',
      password: 'Contraseña',
      errorEmail: '¡Por favor, introduzca un correo electrónico válido!',
      errorPassword: '¡La contraseña debe tener al menos 6 caracteres!',
      submitBtn: 'Enviar',
    },
    signUp: {
      title: 'Registrarse',
      email: 'Correo electrónico',
      password: 'Contraseña',
      errorEmail: '¡Por favor, introduzca un correo electrónico válido!',
      errorPassword: '¡La contraseña debe tener al menos 6 caracteres!',
      repPassword: 'Repetir contraseña',
      errorRepPassword: '¡Las contraseñas deben coincidir!',
      submitBtn: 'Enviar',
    },
    home: {
      titleTracked: 'Ubicaciones rastreadas',
      searchPlaceholder: 'Buscar ubicación...',
      noResultsLabel: '¡No se encontraron resultados!',
      noTrackedLocationsLabel: 'Aún no hay ubicaciones rastreadas.',
      editLocationsTooltip: 'Editar ubicaciones rastreadas',
    },
    settings: {
      title: 'Ajustes',
      units: 'Unidades imperiales',
      lang: 'Idioma',
      darMode: 'Modo oscuro',
      detectBtn: 'Detectar ubicación',
      changeLoc: 'Cambiar ubicación',
    },
    map: {
      legTemp: 'Temperatura',
      legWind: 'Velocidad del viento',
      legPrecip: 'Precipitación',
      legPressure: 'Presión',
      legClouds: 'Nubosidad en',
      filtClouds: 'Nubosidad',
      filtWind: 'Viento',
      checkbox: 'Mostrar ubicaciones rastreadas',
    },
  },
  locCard: {
    details: 'Detalles',
    feelsLike: 'Sensación térmica',
    wind: 'Viento',
    humidity: 'Humedad',
    sunrise: 'Amanecer',
    sunset: 'Atardecer',
    addTooltip: 'Agregar a las ubicaciones rastreadas',
    removeTooltip: 'Eliminar de las ubicaciones rastreadas',
    closePopup: 'Cerrar ventana emergente',
    viewDet: 'Ver detalles',
  },
  detDialog: {
    title: 'Clima para',
    feelsLike: 'Sensación térmica',
    wind: 'Viento',
    precipitation: 'Precipitación',
    maxTemp: 'Temperatura máxima',
    minTemp: 'Temperatura mínima',
    avgTemp: 'Temperatura promedio',
    weather: 'Clima',
    filtWind: 'Viento',
    filtPrecipitation: 'Precipitación',
    filtTemp: 'Temperatura',
    closeBtn: 'Cerrar',
    chartWind: 'Viento medido en ',
    chartTemp: 'Temperatura medida en ',
    chartRain: 'Probabilidad de lluvia en %',
  },
  weatherLocEditDialog: {
    title: 'Sus ubicaciones rastreadas',
    hint: '* Arrastre y suelte para cambiar el orden de las ubicaciones',
    submitBtn: 'Enviar',
    close: 'Cerrar',
    removeTooltip: 'Eliminar de las ubicaciones rastreadas',
  },
  messages: {
    successRegister: 'Registrado exitosamente',
    errRegister: '¡No se pudo registrar!',
    successLogin: 'Inicio de sesión exitoso',
    errLogin: '¡No se pudo iniciar sesión!',
    successReplaceLocations: 'Ubicaciones guardadas exitosamente.',
    errReplaceLocations: '¡No se pudieron guardar las ubicaciones!',
    successAddLocation: 'Ubicación añadida exitosamente',
    errAddLocation: '¡No se pudo añadir la ubicación!',
    errForecast: '¡Error al cargar el pronóstico!',
    errFetchLocations: '¡No se pudieron obtener las ubicaciones!',
    errLoadList: '¡Error al cargar la lista!',
    errLoadCity: '¡Error al cargar la ciudad!',
    successRemoveLocaion: 'Ubicación eliminada exitosamente.',
    errRemoveLocation: '¡No se pudo eliminar la ubicación!',
    successLogout: '¡Ha cerrado sesión exitosamente!',
    errGeoPermission:
      '¡El usuario denegó la Geolocalización! Puede restablecer el permiso desde el icono a la izquierda de la URL.',
  },
});

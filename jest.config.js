module.exports = {
  testEnvironment: 'node', // Ejecutar en un entorno Node.js
  verbose: true, // Mostrar detalles de las pruebas
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.js$', // Patrón para los archivos de prueba
  moduleFileExtensions: ['js', 'json', 'node'], // Extensiones de archivo que Jest debe considerar
};